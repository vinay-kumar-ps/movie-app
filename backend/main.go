package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

// Movie struct to represent a movie object
type Movie struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Year        string `json:"year"`
	Genre       string `json:"genre"`
	BannerImage string `json:"banner_image"`
}

// moviesData holds the movie data
var moviesData []Movie

func main() {
	// Parse the JSON data into moviesData
	data, err := ioutil.ReadFile("movies.json")
	if err != nil {
		log.Fatal(err)
	}

	// Unmarshal the JSON data into moviesData slice
	err = json.Unmarshal(data, &moviesData)
	if err != nil {
		log.Fatal(err)
	}

	// Create a new Gin router
	router := gin.Default()

	router.Use(cors.Default())

	// Define your HTTP handlers
	router.GET("/", homeHandler)
	router.GET("/api/movies", getMovies)
	router.GET("/api/movies/search", searchMovies)

	// Start the Gin server
	if err := router.Run(); err != nil {
		log.Fatal("Server failed to start: ", err)
	}
	fmt.Println("Server started")
}

// Handler for the root route
func homeHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Welcome to the Movie API!"})
}

// Handler for /api/movies
func getMovies(c *gin.Context) {
	c.JSON(http.StatusOK, moviesData)
}

// Handler for /api/movies/search
func searchMovies(c *gin.Context) {
	// Extract the query parameters
	title := c.Query("title")
	genre := c.Query("genre")

	// Log the received search parameters
	fmt.Printf("Received search parameters: title=%s, genre=%s\n", title, genre)

	// Search moviesData for movies matching the criteria
	var searchResults []Movie
	for _, movie := range moviesData {
		if (title == "" || strings.Contains(strings.ToLower(movie.Title), strings.ToLower(title))) &&
			(genre == "" || strings.EqualFold(movie.Genre, genre)) {
			searchResults = append(searchResults, movie)
		}
	}

	// Log the search results
	fmt.Printf("Search results: %v\n", searchResults)

	// Encode searchResults as JSON and write to response
	c.JSON(http.StatusOK, searchResults)
}

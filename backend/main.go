package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

// Movie struct to represent a movie object
type Movie struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Year        int    `json:"year"`
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

	// Define your HTTP handlers
	// http.HandleFunc("/", homeHandler)
	http.HandleFunc("/api/movies", getMovies)
	http.HandleFunc("/api/movies/search", searchMovies)

	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Server failed to start: ", err)
	}
	fmt.Println("Server started")
}

// Handler for /api/movies
func getMovies(w http.ResponseWriter, r *http.Request) {
	// Encode moviesData as JSON and write to response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(moviesData)
}

// // Handler for the home page
// func homeHandler(w http.ResponseWriter, r *http.Request) {
// 	// Render the home page template
// 	tmpl, err := template.ParseFiles("index.html")
// 	if err != nil {
// 		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
// 		return
// 	}
// 	if err := tmpl.Execute(w, nil); err != nil {
// 		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
// 	}
// }

// // Handler for /api/movies/search
func searchMovies(w http.ResponseWriter, r *http.Request) {

	// Extract the query parameters
	title := r.URL.Query().Get("title")
	genre := r.URL.Query().Get("genre")

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
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(searchResults)
}

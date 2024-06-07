// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://movie-app-j1xq.onrender.comnp', // Your Gin backend URL
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove /api prefix
      },
    })
  );
};

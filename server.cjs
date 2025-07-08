const express = require("express");  // Import Express
const addon = require("./index.cjs");  // Import the entire addon (with handlers)

const app = express();  // Create an Express app

// Test route for the root URL (/) to ensure it's working
app.get("/", (req, res) => {
  res.send("✅ Arabic Addon is working!");  // Confirm addon is running on the root URL
});

// Explicitly handle /catalog route
app.get("/catalog", (req, res) => {
  const catalogHandler = addon.defineCatalogHandler;  // Access the catalog handler

  // Call the catalog handler and send the response
  catalogHandler({ type: 'movie', id: 'arabic', extra: {} })
    .then(response => {
      res.json(response);  // Send catalog data as JSON response
    })
    .catch(err => {
      res.status(500).send("Error fetching catalog: " + err.message);
    });
});

// Explicitly handle /stream route
app.get("/stream/:id", (req, res) => {
  const streamHandler = addon.defineStreamHandler;  // Access the stream handler

  // Call the stream handler and send the response for the movie
  streamHandler({ type: 'movie', id: req.params.id })
    .then(response => {
      res.json(response);  // Send stream data as JSON response
    })
    .catch(err => {
      res.status(500).send("Error fetching stream: " + err.message);
    });
});

// Default handler for unmatched routes
app.use((req, res) => {
  res.status(404).send('404 - Not Found');  // Handle any unmatched routes
});

const port = process.env.PORT || 10000;  // Set port for the server

app.listen(port, () => {
  console.log(`✅ Arabic addon is running on port ${port}`);
});

const express = require("express");  // Import Express
const addonRouter = require("./index.cjs");  // Import the router from your addon

const app = express();  // Create an Express app

// Allow CORS for all domains
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Serve the manifest as a JSON file
app.get("/manifest.json", (req, res) => {
  const manifest = {
    id: "org.arabic.addon",
    version: "1.0.0",
    name: "Arabic Addon",
    description: "Arabic movies for Stremio",
    types: ["movie"],
    catalogs: [
      {
        type: "movie",
        id: "arabic",
        name: "Arabic Movies",
      },
    ],
    resources: ["catalog", "stream"],
  };

  res.setHeader("Content-Type", "application/json");
  res.json(manifest);  // Ensure the manifest is sent as JSON
});

// Manually handle the /catalog route to return metadata for Arabic movie
app.get("/catalog", (req, res) => {
  console.log("Handling /catalog request manually")

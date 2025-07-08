const sdk = require("stremio-addon-sdk");  // Import Stremio SDK
const express = require("express");  // Import Express
const addonRouter = require("./index.cjs");  // Import the router from your addon

const app = express();  // Create an Express app

// Correctly create the addon using the SDK's Addon class
const addon = sdk.addonBuilder({
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
});

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
  console.log("Handling /catalog request manually");

  const catalogId = req.query.id || 'arabic';  // Default to 'arabic' if not provided

  if (catalogId === 'arabic') {
    res.json({
      metas: [
        {
          id: "movie1",  // Unique ID for the movie
          type: "movie",  // Type should be 'movie'
          name: "Turner Video",  // Movie name
          poster: "https://via.placeholder.com/300x450.png?text=Turner+Video",  // Movie poster URL
        }
      ]
    });
  } else {
    res.json({ metas: [] });
  }
});

// Define the stream handler for returning the actual movie URL for streaming
addon.defineStreamHandler(function ({ type, id }) {
  console.log("Handling stream request for:", type, id);

  if (id === "movie1") {  // Make sure the movie ID matches the one in the catalog
    return Promise.resolve({
      streams: [
        {
          title: "Turner Video",  // Movie title
          url: "https://dn721907.ca.archive.org/0/items/turner_video_12414/12414.mp4"  // Valid MP4 URL for streaming
        },
      ],
    });
  }

  return Promise.resolve({ streams: [] });
});

// Use the router returned by getRouter() from your addon (for other routes like /stream)
app.use("/", addon.getRouter());  // Attach the addon router to the Express app

// Default handler for unmatched routes
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Use the dynamic PORT variable (Render sets PORT dynamically)
const port = process.env.PORT || 10000;  // Render sets PORT dynamically
app.listen(port, () => {
  console.log(`✅ Arabic addon is running on port ${port}`);
});

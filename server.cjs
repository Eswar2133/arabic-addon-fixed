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

  // Set the correct content-type for JSON
  res.setHeader("Content-Type", "application/json");

  // Send the manifest as JSON
  res.json(manifest);  // Ensure the manifest is sent as JSON
});

// Manually handle the /catalog route
app.get("/catalog", (req, res) => {
  console.log("Handling /catalog request manually");

  const catalogId = req.query.id || 'arabic';

  if (catalogId === 'arabic') {
    res.json({
      metas: [
        {
          id: "movie1",
          type: "movie",
          name: "Arabic Movie 1",
          poster: "https://via.placeholder.com/300x450.png?text=Arabic+Movie+1",
        },
      ],
    });
  } else {
    res.json({ metas: [] });
  }
});

// Use the router returned by getRouter() from your addon
app.use("/", addonRouter);  // Attach the addon router to the Express app

// Default handler for unmatched routes
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`✅ Arabic addon is running on port ${port}`);
});

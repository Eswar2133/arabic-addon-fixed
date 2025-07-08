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

// Test route for the root URL (/) to ensure it's working
app.get("/", (req, res) => {
  res.send("✅ Arabic Addon is working!");  // Confirm addon is running on the root URL
});

// Manually handle the /catalog route if not using `defineCatalogHandler`
app.get("/catalog", (req, res) => {
  console.log("Handling /catalog request manually");

  // If `id` is provided in query, use it, else default to 'arabic'
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

// Attach the router from your addon (for other routes like /stream)
app.use("/", addonRouter);  // Use the router returned by getRouter()

// Default handler for unmatched routes
app.use((req, res) => {
  res.status(404).send('404 - Not Found');  // Handle any unmatched routes
});

const port = process.env.PORT || 10000;  // Set port for the server

app.listen(port, () => {
  console.log(`✅ Arabic addon is running on port ${port}`);
});

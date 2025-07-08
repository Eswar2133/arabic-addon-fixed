const express = require("express");  // Import Express
const addonRouter = require("./index.cjs");  // Import the router from your addon

const app = express();  // Create an Express app

// Test route for the root URL (/) to ensure it's working
app.get("/", (req, res) => {
  res.send("✅ Arabic Addon is working!");  // Confirm addon is running on the root URL
});

// Handle the /catalog route manually
app.get("/catalog", (req, res) => {
  console.log("Handling /catalog request manually");

  // Manually return the metadata for the Arabic catalog
  if (req.query.id === 'arabic') {
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

// Use the router returned by getRouter() from your addon (for other routes like /stream)
app.use("/", addonRouter);  // Attach the addon router to the Express app

// Default handler for unmatched routes
app.use((req, res) => {
  res.status(404).send('404 - Not Found');  // Handle any unmatched routes
});

const port = process.env.PORT || 10000;  // Set port for the server

app.listen(port, () => {
  console.log(`✅ Arabic addon is running on port ${port}`);
});

const express = require("express");  // Import Express
const addonRouter = require("./index.cjs");  // Import the router from your addon

const app = express();  // Create an Express app

// Use the router returned by getRouter() from your addon
app.use("/", addonRouter);  // Attach the addon router to the Express app

// Default handler for when no routes are matched
app.use((req, res) => {
  res.status(404).send('404 - Not Found');  // Handle any unmatched routes
});

const port = process.env.PORT || 10000;  // Set port for the server

app.listen(port, () => {
  console.log(`✅ Arabic addon is running on port ${port}`);
});

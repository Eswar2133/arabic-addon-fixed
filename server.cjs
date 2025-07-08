const express = require("express");  // Import Express
const addonRouter = require("./index.cjs");  // Import the router directly from the addon

const app = express();  // Create an Express app

// Use the router returned by getRouter() from your addon
app.use("/", addonRouter);  // Attach the addon router to the Express app

const port = process.env.PORT || 10000;  // Set port for the server

app.listen(port, () => {
  console.log(`✅ Arabic addon is running on port ${port}`);
});

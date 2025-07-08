const express = require("express");
const addonRouter = require("./index.cjs");

const app = express();

// Allow CORS for all domains
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// The rest of your routes
app.get("/", (req, res) => {
  res.send("✅ Arabic Addon is working!");
});

// Attach the router from your addon
app.use("/", addonRouter);

// Default 404 handler
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`✅ Arabic addon is running on port ${port}`);
});

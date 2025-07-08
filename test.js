const sdk = require("stremio-addon-sdk");  // Import the SDK

// Check if sdk is available
console.log('Stremio SDK:', sdk);

// Create a basic manifest for the addon
const manifest = {
  id: "org.arabic.addon",
  version: "1.0.0",
  name: "Arabic Addon",
  description: "Arabic movies for Stremio",
  types: ["movie"],
  catalogs: [{ type: "movie", id: "arabic", name: "Arabic Movies" }],
  resources: ["catalog", "stream"],
};

// Initialize the addon
const addon = new sdk.Addon(manifest);

// Check if the addon was created successfully
console.log('Addon instance:', addon);

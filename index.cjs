const sdk = require("stremio-addon-sdk");  // Import the entire SDK

console.log(sdk);  // Log the SDK to check how it's structured

// Access addonBuilder from the SDK
const addonBuilder = sdk.addonBuilder;

const manifest = {
  id: "org.arabic.addon",
  version: "1.0.0",
  name: "Arabic Addon",
  description: "Arabic movies and shows for Stremio",
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

// Instantiate the builder correctly using addonBuilder as a function
const builder = addonBuilder(manifest);  // Call addonBuilder directly

console.log('builder:', builder);  // Log the builder to check what we get

// If builder has a method `getInterface`, call it; otherwise, check the builder structure
if (builder && typeof builder.getInterface === 'function') {
  module.exports = builder.getInterface();
} else {
  // Fallback: if getInterface is not available, log the builder structure
  console.log('No getInterface method found. Builder structure:', builder);
}

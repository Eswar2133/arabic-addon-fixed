const sdk = require("stremio-addon-sdk");  // Import the entire SDK

console.log("SDK:", sdk);  // Log the SDK to check how it's structured

// Access Addon class from the SDK
const Addon = sdk;  // The entire SDK is the Addon class

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

// Instantiate the Addon class directly
const addon = new Addon(manifest);  // Instantiate the Addon class with the manifest

console.log("Addon instantiated:", addon);  // Log to check if it's instantiated correctly

// Define catalog handler (this should respond to /catalog requests)
addon.defineCatalogHandler(({ type, id, extra }) => {
  if (id === "arabic") {
    return Promise.resolve({
      metas: [
        {
          id: "movie1",
          type: "movie",
          name: "Arabic Movie 1",
          poster: "https://via.placeholder.com/300x450.png?text=Arabic+Movie+1",
        },
      ],
    });
  }
  return Promise.resolve({ metas: [] });
});

// Define stream handler (this should respond to stream requests)
addon.defineStreamHandler(({ type, id }) => {
  if (id === "movie1") {
    return Promise.resolve({
      streams: [
        {
          title: "Arabic Movie Stream",
          url: "https://example.com/arabic-movie1.mp4",
        },
      ],
    });
  }
  return Promise.resolve({ streams: [] });
});

// Export the router directly
module.exports = addon.getRouter();  // Export the router from the addon instance

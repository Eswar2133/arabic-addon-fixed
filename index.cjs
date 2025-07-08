const sdk = require("stremio-addon-sdk");  // Import the SDK

console.log("SDK Available:", sdk);  // Log to confirm SDK is available

// Define the manifest
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

// Correctly initialize the addon
const addon = sdk(manifest);  // Initialize the addon correctly

// Log addon object to verify its methods
console.log("Addon Object:", addon);

// Define the catalog handler (this handles the /catalog route)
addon.defineCatalogHandler(function ({ type, id, extra }) {
  console.log("Handling /catalog request:", type, id);  // Log to track handler call
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

// Define the stream handler (this handles requests for streaming)
addon.defineStreamHandler(function ({ type, id }) {
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

// Export the router for routing requests (this handles routes like /catalog, /stream)
module.exports = addon.getRouter();  // Export the router from the addon instance

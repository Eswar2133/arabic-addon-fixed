const sdk = require("stremio-addon-sdk");  // Import the entire SDK

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

// Correctly create the addon instance using sdk()
const addon = sdk(manifest);  // Initialize the addon correctly

console.log("Addon instantiated:", addon);  // Log to check if it's instantiated correctly

// Explicitly define catalog handler (this should handle the /catalog route)
addon.defineCatalogHandler(function ({ type, id, extra }) {
  console.log("Handling catalog request for:", type, id);  // Log to track the catalog handler

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

// Define stream handler (this handles requests for streaming)
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

// Export the router from the addon to handle requests (e.g., /catalog, /stream)
module.exports = addon.getRouter();  // Export the router from the addon instance

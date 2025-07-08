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

// Initialize the addon
const addon = new sdk.Addon(manifest);

// Log available methods of the addon instance to debug
console.log('Available methods on addon:', Object.keys(addon));

// Check if defineCatalogHandler exists
console.log('defineCatalogHandler exists:', typeof addon.defineCatalogHandler);

// Define catalog handler
addon.defineCatalogHandler(({ type, id, extra }) => {
  console.log('Handling catalog request:', type, id);
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

// Define stream handler
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

// Export the router from the Addon class
module.exports = addon.getRouter();  // Export the router from the addon instance

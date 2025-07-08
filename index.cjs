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

// Instantiate the Addon directly (no 'new' keyword needed)
const addon = sdk(manifest);  // Correct way to instantiate the addon using the function export

console.log("Addon instantiated:", addon);  // Log to check if it's instantiated correctly

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

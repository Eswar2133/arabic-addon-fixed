const sdk = require("stremio-addon-sdk");  // Import the SDK

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

// Initialize the addon using sdk()
const addon = sdk(manifest);  // Initialize the addon correctly

console.log("Addon instantiated:", addon);  // Log to check if it's instantiated correctly

// Define the catalog handler (used for the /catalog route)
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

// Define the stream handler (used for the /stream route)
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

// Export the router (to handle routes like /catalog, /stream)
module.exports = addon.getRouter();  // This exposes the router to handle routes

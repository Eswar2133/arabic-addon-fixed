const sdk = require("stremio-addon-sdk");  // Import the entire SDK

console.log("SDK:", sdk);  // Log the SDK to check how it's structured

// Check if addonBuilder exists and log it
console.log("addonBuilder:", sdk.addonBuilder);  // Log addonBuilder to check its structure

// Assuming sdk.addonBuilder is available as a function or an object
const addonBuilder = sdk.addonBuilder;  // Access addonBuilder from the SDK

if (typeof addonBuilder !== 'function') {
  console.error('addonBuilder is not a function. SDK structure:', sdk);
} else {
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

  // Instantiate the builder correctly using addonBuilder
  const builder = new addonBuilder(manifest);  // Correct instantiation with 'new'

  builder.defineCatalogHandler(({ type, id, extra }) => {
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
  });

  builder.defineStreamHandler(({ type, id }) => {
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

  module.exports = builder.getInterface();  // Export using module.exports in CommonJS
}

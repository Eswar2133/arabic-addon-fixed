const sdk = require("stremio-addon-sdk");  // Use require to import CommonJS module

const { addonBuilder } = sdk;  // Access addonBuilder from the default export

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

// Instantiate the builder correctly
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

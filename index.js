const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
  id: "org.arabic.addon",
  version: "1.0.0",
  name: "Arabic Addon",
  description: "Arabic Movies and Series",
  types: ["movie"],
  catalogs: [
    {
      type: "movie",
      id: "arabic",
      name: "Arabic Movies",
    },
  ],
  resources: ["catalog", "stream"],
  idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

// Sample catalog handler
builder.defineCatalogHandler(({ type, id, extra }) => {
  if (type === "movie" && id === "arabic") {
    const metas = [
      {
        id: "tt1234567",
        type: "movie",
        name: "Sample Arabic Movie",
        poster: "https://via.placeholder.com/300x450?text=Arabic+Movie",
      },
    ];
    return Promise.resolve({ metas });
  }

  return Promise.resolve({ metas: [] });
});

// Sample stream handler
builder.defineStreamHandler(({ type, id }) => {
  if (type === "movie" && id === "tt1234567") {
    return Promise.resolve({
      streams: [
        {
          title: "Arabic Stream",
          url: "https://example.com/arabicmovie.mp4",
        },
      ],
    });
  }

  return Promise.resolve({ streams: [] });
});

module.exports = builder.getInterface();

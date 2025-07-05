import * as sdk from 'stremio-addon-sdk';
const { addonBuilder } = sdk;

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

const builder = addonBuilder(manifest);

// Sample catalog handler
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

// Sample stream handler
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

export default builder.getInterface();

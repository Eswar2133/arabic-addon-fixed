import { addonBuilder } from "stremio-addon-sdk";

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

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(() => {
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

builder.defineStreamHandler(({ id }) => {
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

// This is the correct export for ES Modules
export default builder.getInterface();

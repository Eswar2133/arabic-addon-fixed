const http = require("http");  // CommonJS require()

const addonInterface = require("./index.cjs");  // Require the index.cjs file

process.on("unhandledRejection", (reason) => {
  console.error("🔥 Unhandled Rejection:", reason);
});

const server = http.createServer((req, res) => {
  // Optional test route to verify SDK exports
  if (req.url === "/test-export") {
    const addonSDK = require("stremio-addon-sdk");  // Use require to check SDK exports
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(Object.keys(addonSDK)));
    return;
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (typeof addonInterface === "function") {
    addonInterface(req, res);
  } else if (addonInterface && typeof addonInterface.handler === "function") {
    addonInterface.handler(req, res);
  } else {
    res.writeHead(500);
    res.end("❌ Addon interface is not callable");
    console.error("❌ Addon interface is not callable:", addonInterface);
  }
});

const port = process.env.PORT || 7000;
server.listen(port, () => {
  console.log(`✅ Arabic addon is running on port ${port}`);
});

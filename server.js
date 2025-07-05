const http = require("http");
const handler = require("./index");

process.on("unhandledRejection", (reason) => {
  console.error("🔥 Unhandled Rejection:", reason);
});

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }
  handler(req, res);
});

const port = process.env.PORT || 7000;
server.listen(port, () => {
  console.log(`✅ Arabic addon is running on port ${port}`);
});

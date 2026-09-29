const { createServer } = require("http");
const next = require("next");
const morgan = require("morgan");

// Custom Next.js server so every request passes through morgan. Runs the same
// dev pipeline as `next dev` (Fast Refresh included); nodemon restarts this file
// when server.js or next.config.ts change, while app edits reload in-browser.
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const requests = morgan(dev ? "dev" : "combined");

app.prepare().then(() => {
  const upgradeHandler = app.getUpgradeHandler();
  const httpServer = createServer((req, res) => {
    requests(req, res, () => handle(req, res));
  });

  // Forward the upgrade so Fast Refresh's WebSocket keeps working over the
  // custom server.
  httpServer.on("upgrade", (req, socket, head) => {
    upgradeHandler(req, socket, head);
  });

  const port = Number(process.env.PORT || 3000);
  httpServer.listen(port, () => {
    console.log(`> NoteFlow ready on http://localhost:${port} (${dev ? "dev" : "prod"})`);
  });
});
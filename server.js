const express = require("express");
const rateLimiter = require("express-rate-limit");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();

app.use(
  rateLimiter({
    windowMs: 5 * 60 * 1000,
    limit: 10,
    message: "You exceeded your request limit (10)",
  }),
);

app.use(
  cors({
    origin: "*",
  }),
);

let count = 0;

// Trust the first proxy
app.set("trust proxy", true);

app.get("/", (req, res) => {
  // Get the client's IP address
  // const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // res.send(`Client IP address: ${clientIp}`);
  res.send(`your request count ${count++}`);
});
const server = app.listen(port, console.log("server is running at port", port));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

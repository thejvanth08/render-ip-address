const express = require("express");
const rateLimiter = require("express-rate-limit");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();

// app.use(rateLimiter({
//   windowMs: 5 * 60 * 1000,
//   limit: 10,
//   message: "You exceeded your request limit"
// }));

app.use(cors({
  origin: "*"
}));

let counter = 0;

app.get("/", (req, res) => {
  counter++;
  res.json({ 
    "requestCount": counter,
    "your ip address": req.ip  
  });
})

const server = app.listen(port, console.log("server is running at port", port));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
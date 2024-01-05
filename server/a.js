import http from "http";
import fs from "fs";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const index = fs.readFileSync(`${__dirname}/index.html`);

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(index);
});

const server = http.createServer(app);
const io = new Server(server);

function sendTime() {
  io.emit("time", { time: new Date().toJSON() });
}

setInterval(sendTime, 10000);

io.on("connection", (socket) => {
  socket.emit("welcome", { message: "Welcome!", id: socket.id });

  socket.on("i am client", console.log);
});

const port = 2500;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

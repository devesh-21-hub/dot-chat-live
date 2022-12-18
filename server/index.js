require("./config");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
const path = require("path");
const { createServer } = require("http");
const http = require("http");
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// ||

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("/", function (req, res) {
  try {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  } catch (error) {
    console.log(error.message);
  }
});

const socket = require("socket.io");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/status", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const server = createServer(app);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connection established");

  socket.on("typing", () => {
    socket.broadcast.emit("userIsTyping", "User is typing");
  });
  socket.on("nottyping", () => {
    socket.broadcast.emit("userIsNotTyping", "User is typing");
  });
});

const users = require("./src/routes/users");
app.use(users);
const conversations = require("./src/routes/conversations");
app.use(conversations);
const messages = require("./src/routes/messages");
app.use(messages);

server.listen(process.env.PORT || 9000, () => {
  console.log("Server listening on port 9000");
});

//module.exports = { io };

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

let items = [];

io.on("connection", (socket) => {
  socket.emit("updateItems", items);

  socket.on("addItem", (text) => {
    items.push(text);
    io.emit("updateItems", items);
  });

  socket.on("deleteItem", (text) => {
    items = items.filter(i => i !== text);
    io.emit("updateItems", items);
  });

  socket.on("itemChosen", (text) => {
    io.emit("itemPopup", text);
  });
});

http.listen(3000, () => console.log("Server running on http://localhost:3000"));

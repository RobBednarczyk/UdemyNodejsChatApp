const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public")
const port = process.env.PORT || 3000;

var app = express();
// var server = http.createServer((req, res) => {});
// the express and http module are integrated
var server = http.createServer(app);
// get a websocket back
var io = socketIO(server);


app.use(express.static(publicPath));

// no longer use the express server
// app.listen(port, () => {
//     console.log(`Server started on port: ${port}`);
// })

// register an event listener
io.on("connection", (socket) => {
    console.log("New user connected");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    })
});


// now use the http server
server.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})

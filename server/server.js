const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
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

    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat App!"));
    // socket.emit("newMessage", {
    //     from: "Admin",
    //     text: "Welcome to the chat App!",
    //     createdAt: new Date().toString()
    // });
    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));
    // socket.broadcast.emit("newMessage", {
    //     from: "Admin",
    //     text: "New user joined",
    //     createdAt: new Date().toString()
    // })

    // create a custom event; specify data sent
    // socket.emit("newMessage", {
    //     from: "jenny@example.com",
    //     text: "First message",
    //     createdAt: new Date().toString()
    // });

    // create a custom event; specify data sent
    // socket.emit("newEmail", {
    //     from: "jenny@example.com",
    //     text: "Hey! What's going on?",
    //     createdAt: 123
    // });

    // add callback argument
    socket.on("createMessage", (newMessage, callback) => {
        console.log("createMessage", newMessage);
        // socket.emit emits a message to a single connection
        // socket.emit("newMessage", newMessage);


        // io.emit emits an event to every single connection
        io.emit("newMessage", generateMessage(newMessage.from, newMessage.text));
        // send back some data
        callback();



    });

    socket.on("createLocationMessage", (coords) => {
        //io.emit("newMessage", generateMessage("Admin", `${coords.latitude}, ${coords.longitude}`));
        // emit a url instead of the coords
        io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
    })

    // inside nodeJs can safely use arrow functions
    // socket.on("createEmail", (newEmail) => {
    //     console.log("createEmail", newEmail);
    // });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

});


// now use the http server
server.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})

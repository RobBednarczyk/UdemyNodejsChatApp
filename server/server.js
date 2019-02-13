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

    socket.emit("newMessage", {
        from: "Admin",
        text: "Welcome to the chat App!",
        createdAt: new Date().toString()
    });

    socket.broadcast.emit("newMessage", {
        from: "Admin",
        text: "New user joined",
        createdAt: new Date().toString()
    })

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

    socket.on("createMessage", (newMessage) => {
        console.log("createMessage", newMessage);
        // socket.emit emits a message to a single connection
        // socket.emit("newMessage", newMessage);


        // io.emit emits an event to every single connection
        io.emit("newMessage", {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });

        // send to everybody except this socket
        // socket.broadcast.emit("newMessage", {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().toString()
        // });

    });

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

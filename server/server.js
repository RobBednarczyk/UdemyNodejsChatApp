const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users.js");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
// var server = http.createServer((req, res) => {});
// the express and http module are integrated
var server = http.createServer(app);
// get a websocket back
var io = socketIO(server);
//
var users = new Users();


app.use(express.static(publicPath));

// no longer use the express server
// app.listen(port, () => {
//     console.log(`Server started on port: ${port}`);
// })

// register an event listener
io.on("connection", (socket) => {
    console.log("New user connected");
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

    socket.on("join", (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name and room name are required");
        }
        socket.join(params.room);
        // socket.leave(params.room);
        // remove the user from any previous rooms
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room);
        // emit an event
        io.to(params.room).emit("updateUserList", users.getUserList(params.room));

        // io.emit -> io.to("The Office Fans").emit -> send the event to everybody in the room
        // socket.broadcast.emit -> socket.broadcast.to("asdfs").emit
        // socket.emit

        socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat App!"));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined the room.`));

        callback();
    })

    // add callback argument
    socket.on("createMessage", (newMessage, callback) => {
        //console.log("createMessage", newMessage);
        // socket.emit emits a message to a single connection
        // socket.emit("newMessage", newMessage);
        var user = users.getUser(socket.id);

        if (user && isRealString(newMessage.text)) {
            // io.emit emits an event to every single connection
            io.to(user.room).emit("newMessage", generateMessage(user.name, newMessage.text));
        }

        // send back some data
        callback();



    });

    socket.on("createLocationMessage", (coords) => {
        //io.emit("newMessage", generateMessage("Admin", `${coords.latitude}, ${coords.longitude}`));
        var user = users.getUser(socket.id);

        if (user) {
            // emit a url instead of the coords
            io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }

    })

    // inside nodeJs can safely use arrow functions
    // socket.on("createEmail", (newEmail) => {
    //     console.log("createEmail", newEmail);
    // });

    socket.on("disconnect", () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left`));
        }
        console.log("Client disconnected");
    });

});


// now use the http server
server.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})

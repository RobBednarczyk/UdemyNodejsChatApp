// make a request from the client to the server to open up socket
// and keep the connection open
var socket = io();
// use function() istead of arrow function for the mobile browser compatibility
socket.on("connect", function() {
    console.log("Connected to server");

    // legacy code
    // socket.emit("createEmail", {
    //     to: "kate@example.com",
    //     text: "Hey! This is Jenny!"
    // })

    socket.emit("createMessage", {
        from: "andrew@example.com",
        text: "Some very secret message"
    });

});

socket.on("disconnect", function() {
    console.log("Disconnected from server");
});

// create a listener to a custom event
// socket.on("newEmail", function(email) {
//     console.log("New email", email);
//
// })

// create a listener to a custom event
socket.on("newMessage", function(message) {
    console.log("New message", message);
})

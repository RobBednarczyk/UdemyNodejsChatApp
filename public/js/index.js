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

    // socket.emit("createMessage", {
    //     from: "andrew@example.com",
    //     text: "Some very secret message"
    // });

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
    // create a DOM element using jQuery
    var li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    jQuery("#messages").append(li);
});

// create a listener to receive a location url
socket.on("newLocationMessage", function(message) {
    var li = jQuery("<li></li>");
    var a = jQuery("<a target='_blank'>My current location</>");

    li.text(`${message.from}: `);
    a.attr("href", message.url);
    li.append(a);
    jQuery("#messages").append(li);
});

// event acknowledgements - standard event emitter, 3rd argument - callback
// callback function fires when the acknowledge event arrives
// socket.emit("createMessage", {
//     from: "Frank",
//     text: "Hello!"
//     // data variable comes from the server
// }, (data) => {
//     console.log(data);
// });

// add jquery selectors, override the default behaviour that causes the page to refresh
jQuery("#message-form").on("submit", function (e) {
    e.preventDefault();

    var messageTextbox = jQuery("[name=message]");

    socket.emit("createMessage", {
        from: "User",
        text: messageTextbox.val()
    }, () => {
        // clear the message field
        messageTextbox.val("");
    });
});

// add the geolocation functionality
var locationButton = jQuery("#send-location");
locationButton.on("click", function() {

    if (!navigator.geolocation) {
        // return alert pop up window
        return alert("Geolocation not supported by your browser");
    }
    // disable the button after sending location
    locationButton.attr("disabled", "disabled").text("Sending location...");

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr("disabled").text("Send location");
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        console.log(position);

    }, function() {
        locationButton.removeAttr("disabled").text("Send location");
        alert("Unable to fetch location");
    })
});

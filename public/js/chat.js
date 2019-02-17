// make a request from the client to the server to open up socket
// and keep the connection open
var socket = io();

function scrollToBottom() {
    // selectors
    var messages = jQuery("#messages");
    // select the last list element
    var newMessage = messages.children("li:last-child")
    // heights
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        //console.log("Should scroll");
        messages.scrollTop(scrollHeight);
    }
}

// use function() istead of arrow function for the mobile browser compatibility
socket.on("connect", function() {
    // get the parameters from the url
    var params = jQuery.deparam(window.location.search);
    // emit an event that the server will listen to
    socket.emit("join", params, function (err) {
        if (err) {
            alert(err);
            // redirect user to the root page
            window.location.href = "/"
        } else {
            console.log("No error");
        }
    });
    //console.log("Connected to server");

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

socket.on("updateUserList", function(users) {
    //console.log("Users list", users);
    var ol = jQuery("<ol></ol>");
    users.forEach(function(user) {
        ol.append(jQuery("<li></li>").text(user))
    });

    jQuery("#users").html(ol);
})



// create a listener to a custom event
socket.on("newMessage", function(message) {
    // // console.log("New message", message);
    // var formattedTime = moment(message.createdAt).format("HH:mm");
    // // create a DOM element using jQuery
    // var li = jQuery("<li></li>");
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery("#messages").append(li);
    var template = jQuery("#message-template").html();
    var formattedTime = moment(message.createdAt).format("HH:mm");
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery("#messages").append(html);
    scrollToBottom();
});

// create a listener to receive a location url
socket.on("newLocationMessage", function(message) {

    // var li = jQuery("<li></li>");
    // var a = jQuery("<a target='_blank'>My current location</>");
    //
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr("href", message.url);
    // li.append(a);
    var template = jQuery("#location-message-template").html();
    var formattedTime = moment(message.createdAt).format("HH:mm");
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    jQuery("#messages").append(html);
    scrollToBottom();
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

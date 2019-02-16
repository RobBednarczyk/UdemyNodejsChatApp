var moment = require("moment");

var generateMessage = (from, text) => {
    return {
        from,
        text,
        // new Date().toString() = moment().valueOf()
        // createdAt: new Date().toString()
        createdAt: moment().valueOf()
    };
};

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
}

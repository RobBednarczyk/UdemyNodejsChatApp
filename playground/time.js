var moment = require("moment");

// current point in time
var date = moment();

// add, subtract some values
date.add(1, "year").subtract(12, "months");

console.log(date.format("MMM Do, YYYY"));

var hour = moment();
console.log(hour.format("h:mm a"));

var createdAt = moment(1234);
console.log(createdAt.format("h:mm a"));

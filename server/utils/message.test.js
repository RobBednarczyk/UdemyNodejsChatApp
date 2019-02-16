const expect = require("expect");
var {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
    it("should generate the correct message object", () => {
        var from = "Robbon";
        var text = "Hello World!";
        var res = generateMessage(from, text);
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        //expect(res).toInclude({from, text});
        expect(typeof res.createdAt).toBe("string");
    });
});

describe("generateLocationMessage", () => {
    it("should generate correct location object", () => {
        var from = "Robbon";
        var latitude = 45.649;
        var longitude = 13.778;
        var url = "https://www.google.com/maps?q=45.649,13.778"
        var res = generateLocationMessage(from, latitude, longitude);
        expect(res.from).toBe(from);
        expect(res.url).toBe(url);
        expect(typeof res.createdAt).toBe("string");
    })
})

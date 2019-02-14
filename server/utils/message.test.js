const expect = require("expect");
var {generateMessage} = require("./message");

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

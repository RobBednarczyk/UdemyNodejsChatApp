const expect = require("expect");
// import isRealString
const {isRealString} = require("./validation");



describe("isRealString", () => {

    it("should reject a non-string value", () => {
        var res = isRealString(5);
        expect(res).toBeFalsy();
    });

    it("should reject strin with only spaces", () => {
        var res = isRealString("    ");
        expect(res).toBeFalsy();
    });

    it("should allow string with non-space characters", () => {
        var res = isRealString("  testString  ");
        expect(res).toBeTruthy();
    })

});

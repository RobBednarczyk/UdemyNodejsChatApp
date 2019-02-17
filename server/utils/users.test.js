const expect = require("expect");
const {Users} = require("./users.js");

describe("Users", () => {

    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Katie",
            room: "Node Course"
        },
        {
            id: "2",
            name: "Jen",
            room: "React Course"
        },
        {
            id: "3",
            name: "Matt",
            room: "Node Course"
        }];
    })

    it("should add a new user", () => {
        var users = new Users();

        expect(users.users.length).toBe(0);

        var user = {
            id: "123",
            name: "Robert",
            room: "kawasaki"
        };
        var newUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);

    });

    it("should return names for node course", () => {
        var userList = users.getUserList("Node Course");
        expect(userList).toEqual(["Katie", "Matt"]);
    });

    it("should return names for react course", () => {
        var userList = users.getUserList("React Course");
        expect(userList).toEqual(["Jen"]);
    });

    it("should remove a user", () => {
        var userRemoved = users.removeUser("3");
        expect(userRemoved).toEqual({
            id: "3",
            name: "Matt",
            room: "Node Course"
        });
        expect(users.users.length).toBe(2);
    });

    it("should not remove a user", () => {
        var userRemoved = users.removeUser("someNonExistingId");
        expect(userRemoved).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it("should find a user", () => {
        var user = users.getUser("2");
        expect(user).toEqual({
            id: "2",
            name: "Jen",
            room: "React Course"
        });
    });

    it("should not find a user", () => {
        var user = users.getUser("someNonExistingId");
        expect(user).toBeFalsy();
    });
})

// add user (id, name, room)
// remove user (id)
// fetch a user (id)
// get user list (room)

class Users {

    constructor() {
        this.users = [];
    }
    // add user to the users array
    addUser(id, name, room) {
        // create a user object
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        // return user that was removed
        var userToBeRemoved = this.users.filter((user) => user.id === id);
        var usersLeft = this.users.filter((user) => user.id !== id);
        this.users = usersLeft;
        return userToBeRemoved[0];
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray
    }

}

module.exports = {
    Users
};

// class Person {
//     // add a constructor function - fires automatically during createLocationMessage
//     constructor(name, age) {
//         // set a property on this individual person
//         this.name = name;
//         this.age = age;
//     }
//
//     getUserDescription() {
//         return `${this.name} is ${this.age} years old.`
//     }
// }
//
// var me = new Person("Robbon", 33);
// // console.log("this.name", me.name);
// // console.log("this.age", me.age);
// var desc = me.getUserDescription();
// console.log(desc);

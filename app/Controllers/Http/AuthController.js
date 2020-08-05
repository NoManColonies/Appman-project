'use strict'

class AuthController {
    login ({ view,  request, response }) {
        const name = "Geng";
        const age = 19;
        const array = ["1", "2", "3", "4"];
        const obj = {
            item1: "1",
            item2: "2",
            item3: "3",
        };

        return view.render("login", { name, age, array, obj });
    }

    register ({ view,  request, response}) {
        const name = "register";
        const age = 20;
        const array = ["5", "6", "7"];
        const obj = {
            item1: "4",
            item2: "5",
            item3: "6",
        };

        return view.render("register", { name, age, array, obj });
    }
}

module.exports = AuthController

'use strict';

const Database = use("Database");

class AuthController {
    async login ({ view,  request, response }) {
        const users = await Database.select("*")
        .from("profiles")
        // .whereNot({
        //     name: "John"
        // })
        // .whereBetween('age', [18, 32]);


        const name = "Geng";
        const age = 19;
        const array = ["1", "2", "3", "4"];
        const obj = {
            item1: "1",
            item2: "2",
            item3: "3",
        };

        return view.render("login", { name, age, users, obj });
    }

    async loginUser ({ view, request, response }) {
        const { username, password } = request.body;
        // console.log(profile);

        return response.redirect("/login");
    }

    loginForgetGet ({ view, request, response }) {
        return view.render("/login_forget");
    }

    loginForget ({ view, request, response }) {

        return response.redirect("/login_forget");
    }

    register ({ view,  request, response}) {
        return view.render("register");
    }

    async registerUser ({ view, request, response }) {
        const { username, email, password} = request.body;
        
        await Database.from("profiles").insert({
            username,
            email,
            password
        })
        console.log(username, email, password);

        return response.redirect("/login")
    }
}

module.exports = AuthController

'use strict'

const Database = use("Database");

class AuthController {
    async login ({ view, request, response }) {
        // const users = await Database.select("*").from("user").where("name","!=","John");
        // const users = await Database.select("*")
        // .from("user")
        // .where("name","!=","John") หรือ .whereNot({age : 20}) หรือ .whereBetween('age',[18,32])
        // const users = await Databse.from("user")
        const name = "chubby";
        return view.render("login", { name })
    } 
    loginUser({ view, request, response }) {
        const { username, password } = request.body
        // {_csrf,uername:"",password:""}
        // const profile = request.hasBody()
        // return view.render("login")
        return response.redirect("/login")
    }

    register({ view }) {
        return view.render("register")
    }

    async registerUser({ request, response }){
        const { username, email, password } = request.body;
        // await Database.from("users").insert({email,password});
        await Database.insert({ username, email, password }).into("profiles")
        return response.redirect("/register")
    }

    async checkLoginState({ response, request }) {
        const { username } = request.body;

        const result = await Database.select("username").from("profiles").where({ username: username });
        
        return response.send(result);
    }
}

module.exports = AuthController

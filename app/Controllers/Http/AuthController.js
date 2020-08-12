'use strict'

const Database = use("Database");

const argon2 = require('argon2');

const tokens = {
    owner: "",
    token: "",
    expirationData: ""
}

class AuthController {
    async login ({ view, session, response }) {
        const username = session.get('owner');
        const token = session.get('token');
        
        const result = await Database.collection('user_profile').where({ username }).findOne();
        
        if (result !== null && argon2.verify(result.token, token)) {
            tokens.owner = username;

            await this.genToken(session);

            return response.redirect("/");
        }

        return view.render("/login-register");
    } 
    async loginUser({ session, request, response }) {
        const { username, password } = request.body
        // {_csrf,uername:"",password:""}
        // const profile = request.hasBody()
        // return view.render("login")

        const result = await Database.collection('user_profile').where({ username }).findOne();

        if (result !== null && argon2.verify(result.password, password)) {
            tokens.owner = result.username;

            await this.genToken(session);

            return response.redirect("/")
        }

        return response.redirect("/login")
    }

    async register({ request, response }) {
        const { name, email, username, password } = request.body;
        console.log(request.body);

        if (request.body === undefined || request.body === null) {
            return response.redirect("/login-register");
        }

        const result = await Database.collection('user_profile').where({ username }).findOne();

        if (result !== null) {
            console.log("not ok");
            return response.route("/login-register", { ok: false});
        }
        console.log("ok")
        // await Database.from("users").insert({email,password});
        await Database.collection('user_profile').insert({ username, email, password: await argon2.hash(password), name });
    
        return response.route("/login-register", { ok: true });
    }

    async registerUser({ request, response }){
        console.log(request);
        const { name, username, email, password } = request.body;

        if (request.body === undefined || request.body === null) {
            return response.redirect("/login-register");
        }

        await Database.collection('user_profile').insert({ username, email, password: await argon2.hash(password), name });

        return response.redirect("/login-register");
    }

    async checkLoginState({ response, request }) {
        const { username } = request.body;

        // const result = await Database.select("username").from("profiles").where({ username: username });
        // const db = await Database.connect('popRentDB');
        const result = await Database.collection('user_profile').find({ username: username });
        console.log(result);

        const regex = new RegExp('@facebook.com');

        if (result[0] !== undefined && result[0].email.match(regex)) {
            tokens.owner = result[0].username;

            await this.genToken();
        }

        return response.send(result);
    }

    async loginViaFacebook ({ response, request }) {

        // console.log(response.body);
        // const { userID, accessToken } = request.body;

        // const result = await fetch(`https://graph.facebook.com/v8.0/${userID}?fields=picture,id,name&access_token=${accessToken}`, { method: "get" })
        // const data = await result.json();

        // if (data === undefined) {
        //     return response.redirect("/login");
        // }

        // const userData = await Database.collection('user_profile').find({ username: data.name });

        // if (userData[0] !== undefined && await argon2.verify(userData[0].password, `facebook:${data.id}`) && userData[0].username === data.name) {
        //     console.log("logged in.")
            
        //     await this.genToken();

        // } else {
        //     await Database.collection('user_profile').insert({ username: data.name, email: `${data.id}@facebook.com`, password: await argon2.hash(`facebook:${data.id}`) });

        //     console.log("logged in. Successfully registered user.")
        // }
        // return response.redirect("/");
    }

    async updateUserProfile({ response, request }) {
        const { username, data } = request.body;

        await Database.collection("user_profile").where({ username: username }).update({ data: data });

        const result = await Database.collection('user_profile').find({ username: username });
        console.log(result);

        return response.send(result);
    }

    async logoutUser ({ response, session }) {
        await Database.collection("user_profile").where({
            username: tokens.owner
        }).update({
            token: ""
        });
        tokens.token = "";
        tokens.owner = "";
        session.put('token', "");
        session.put('owner', "");
        
        return response.redirect("/");
    }

    async addProduct ({  }) {

    }

    async listProduct ({ view, response, request }) {
        const { category } = request.body;

        const fetchedData = await Database.collection('product_list').where({ category }).findMany();

        return view.render('/shop', { fetchedData });
    }

    async genToken (session) {
        const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        const result = await Database.collection("user_profile").where({
            username: tokens.owner
        }).update({
            token: await argon2.hash(hash)
        });

        const test = await Database.collection('user_profile').where({ username: tokens.owner }).findOne();

        if (result) {
            tokens.token = hash;
            session.put('token', hash);
            session.put('owner', tokens.owner);
        }
        console.log("Token: " + tokens.token, test);
    }

    async verifyToken ({ response, session }) {
        if (tokens.token !== session.get('token')) {
            tokens.token = session.get('token');
        }
        if (tokens.owner !== session.get('owner')) {
            tokens.owner = session.get('owner');
        }

        const hash = await Database.collection('user_profile').where({ username: tokens.owner }).findOne();

        if (hash === null) {
            return response.send(false);
        }

        const result = await argon2.verify(hash.token? hash.token : "null", tokens.token)

        if (result) {
            await this.genToken(session);
        } else {
            tokens.token = "";
            tokens.owner = "";
            session.put('token', "");
            session.put('owner', "");
        }

        return response.send(result);
    }
}

module.exports = AuthController

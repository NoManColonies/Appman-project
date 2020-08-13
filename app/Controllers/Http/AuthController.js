'use strict'

const Database = use("Database");

const argon2 = require('argon2');

const tokens = {
    owner: "",
    token: "",
    expirationData: ""
}

class AuthController {
    async loadLandingPage ({ view, session }) {
        const state = await this.verifyLogin(session);

        return view.render("main", { state });
    }

    async login ({ view, session, response }) {
        const username = session.get('owner');
        const token = session.get('token');
        
        const result = await Database.collection('user_profile').where({ username }).findOne();
        
        if (result !== null && argon2.verify(result.token, token)) {
            tokens.owner = username;

            await this.genToken(session);

            return response.redirect("/");
        }

        return view.render("/login-register", { state: false });
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

        const result = await Database.collection('user_profile').where({ username: username }).findOne();
        console.log(result);

        return response.send(result);
    }

    async logoutUser ({ session }) {
        await Database.collection("user_profile").where({
            username: tokens.owner
        }).update({
            token: ""
        });
        tokens.token = "";
        tokens.owner = "";
        session.put('token', "");
        session.put('owner', "");        
    }

    async addProduct ({ request, view, session }) {
        const state = await this.verifyLogin(session);
        
        if (!state) {
            return response.send("session failed");
        }

        const { productname, description, category, thumbnail } = request.body;

        const fetchedData = await Database.collection('product_list').where({ name: productname, owner: tokens.owner }).findOne();

        if (fetchedData) {
            return view.render("/add-sub-product", { name: fetchedData.name });
        }

        const categoryArray = category.split(',');
        categoryArray.push("all");

        await Database.collection('product_list').insert({ name: productname, owner: tokens.owner, description, category: categoryArray, thumbnail });

        return view.render("/add-sub-product", { name: productname, state });
    }

    async addSubProduct ({ session, request, response, view }) {
        const state = await this.verifyLogin(session);

        if (!state) {
            return response.send("session failed");
        }

        const { name, pricePday, deposit, color, size, quantity, submit } = request.body;

        const fetchedData = await Database.collection('product_list').where({ name }).findOne();

        if (fetchedData) {
            let type = fetchedData.type;
            if (type !== undefined && type !== null) {
                type.push({
                    pricePday: parseInt(pricePday),
                    deposite: parseInt(deposit),
                    color,
                    size,
                    quantity: parseInt(quantity)
                });
            } else {
                type = [{
                    pricePday: parseInt(pricePday),
                    deposit: parseInt(deposit),
                    color,
                    size,
                    quantity: parseInt(quantity)
                }];
            }
            
            const filteredColor = fetchedData.type? fetchedData.type.filter(prop => prop.color === color) : undefined;
            const filteredSize = filteredColor? filteredColor.filter(prop => prop.size === size) : undefined;

            if (filteredSize) {
                return view.render('/add-sub-product', { name, state, msg: "product already exist." });
            }

            await Database.collection('product_list').where({ name }).update({ type });

            if (submit === "1") {
                return response.redirect('/addProduct');
            } else if (submit === "2") {
                return view.render('/add-sub-product', { name, state });
            }
        } else {
            console.log("product not found.");
            return view.render('/add-sub-product', { name, state, msg: "product not found." });;
        }
    }

    async loadAddProduct ({ view, session, response }) {
        const state = await this.verifyLogin(session);

        if (!state) {
            return response.redirect("/login-register");
        }

        return view.render("/test", { user: tokens.owner, state });
    }

    async loadListProduct ({ view, session }) {
        const state = await this.verifyLogin(session);

        const fetchedData = await Database.collection('product_list').where({}).find();

        return view.render('/shop', { items: fetchedData, state });
    }

    async listProduct ({ view, request, session }) {
        const state = await this.verifyLogin(session);

        const { category } = request.body;

        const filter = new RegExp(category);

        const categoryfilter = category? filter : /all/;
        
        const fetchedData = await Database.collection('product_list').where({ 'category': categoryfilter }).find();
        console.log(fetchedData);

        return view.render('/shop', { items: fetchedData, state });
    }

    async loadProductDetail ({ view, session, request, response }) {
        const state = await this.verifyLogin(session);

        const { name } = request.get();
        
        const filter = new RegExp(name);

        const fetchedData = await Database.collection('product_list').where({ 'name': filter }).findOne();

        if (!fetchedData) {
            return response.send("product does not exist.");
        }

        return view.render('/detail', { product: fetchedData, state });
    }

    async loadProducts ({ session, view, response }) {
        const state = await this.verifyLogin(session);

        if (!state) {
            return response.redirect("/login-register");
        }

        const fetchedData = await Database.collection('user_profile').where({ username: tokens.owner }).findOne();

        if (fetchedData.product) {
            const products = [];
            const data = await Database.collection('product_list').where({}).find();

            fetchedData.product.forEach(element => {
                const filtered = data.filter(prop => prop === element.name);
                products.push(filtered);
            });

            return view.render("/products", { products });
        }

        return response.redirect("/login-register");        
    }

    async getCart ({ session, view, response }) {
        const state = await this.verifyLogin(session);

        if (!state)
        {
            return response.redirect("/login-register");   
        }

        const fetchedData = await Database.collection("user_profile").where({ username: tokens.owner }).findOne();

        return view.render("/cart", { cart: fetchedData.cart, state });
    }

    async deleteFromCart ({ session, request, response }) {
        const state = await this.verifyLogin(session);

        if (!state) {
            return response.redirect("/login-register");
        }

        const { name } = request.get();

        const fetchedData = await Database.collection('user_profile').where({ username: tokens.owner }).findOne();

        if (fetchedData) {
            const cart = fetchedData.cart.filter(prop => prop.name !== name);

            console.log(cart, name);

            await Database.collection('user_profile').where({ username: tokens.owner }).update({
                cart
            });

            return response.redirect("/cart");
        }

        return response.send("error: user not found.");
    }

    async checkout ({ view, session, response, request }) {
        const state = await this.verifyLogin(session);

        if (!state) {
            return response.redirect("/login-register");
        }

        const { name, color, size, quantity, process } = request.get();

        const fetchedData = await Database.collection('product_list').where({ name: new RegExp(name) }).findOne();

        if (!fetchedData) {
            return response.send("error: product does not exist.");
        }

        if (process == 2) {
            await Database.collection('user_profile').where({ username: tokens.owner }).update({
                cart: [{
                    name, color, size, quantity: parseInt(quantity), process, price: parseInt(fetchedData.type[0].pricePday)
                }]
            });
    
            return view.render("/checkout", { state, name, color, size, quantity, process, product: fetchedData, price: fetchedData.type[0].pricePday });
        } else if (process == 1) {
            const user = await Database.collection('user_profile').where({ username: tokens.owner }).findOne();

            if (user) {
                let cart = user.cart;

                if (cart === undefined || cart === null) {
                    cart = [];
                }

                cart.push({
                    name, color, size, quantity: parseInt(quantity), price: fetchedData.type[0].pricePday, path: fetchedData.thumbnail, deposit: fetchedData.type[0].deposit
                });

                await Database.collection('user_profile').where({ username: tokens.owner }).update({
                    cart
                });

                return;
            }
            
            return response.redirect("/shop");
        }

        return response.send("error: process not match.");
    }

    async processOrder ({ session, response }) {
        const state = await this.verifyLogin(session);

        if (!state) {
            return response.redirect("/login-register");
        }

        const fetchedData = await Database.collection('user_profile').where({ username: tokens.owner }).findOne();

        const { name, color, size, price, quantity } = fetchedData.cart[0];

        let transaction = fetchedData.transaction;

        console.log(fetchedData.cart);
        
        if (transaction === undefined || transaction === null) {
            transaction = [{
                name,
                color,
                size,
                price,
                quantity,
                total: quantity + price
            }];
        } else {
            transaction.push({
                name,
                color,
                size,
                price,
                quantity,
                total: quantity + price
            });
        }


        await Database.collection('user_profile').where({ username: tokens.owner }).update({
            transaction,
            cart: []
        });

        const productData = await Database.collection('product_list').where({ name: new RegExp(name) }).findOne();

        productData.type.forEach((element, index, elements) => {
            if (element.color === color && element.size === size) {
                elements[index].quantity -= quantity;
            }
        });

        await Database.collection('product_list').where({ name }).update({
            type: productData.type
        });

        return response.send("0");
    }

    async genToken (session) {
        const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        const result = await Database.collection("user_profile").where({
            username: tokens.owner
        }).update({
            token: await argon2.hash(hash)
        });

        // const test = await Database.collection('user_profile').where({ username: tokens.owner }).findOne();

        if (result) {
            tokens.token = hash;
            session.put('token', hash);
            session.put('owner', tokens.owner);
        }
        // console.log("Token: " + tokens.token, test);
    }

    // For debugging purpose.
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

    async verifyLogin (session) {
        if (tokens.token !== session.get('token')) {
            tokens.token = session.get('token');
        }
        if (tokens.owner !== session.get('owner')) {
            tokens.owner = session.get('owner');
        }

        const hash = await Database.collection('user_profile').where({ username: tokens.owner }).findOne();

        if (hash === null) {
            tokens.token = "";
            tokens.owner = "";
            session.put('token', "");
            session.put('owner', "");
            return false;
        }

        const result = await argon2.verify(hash.token? hash.token : "null", tokens.token);

        if (result) {
            await this.genToken(session);
        } else {
            tokens.token = "";
            tokens.owner = "";
            session.put('token', "");
            session.put('owner', "");
        }

        return result;
    }
}

module.exports = AuthController

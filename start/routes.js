"use strict";

const AuthController = require('../app/Controllers/Http/AuthController');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on('/').render("main")
// Route.get('/login', "AuthController.login");
// Route.get('/login',"AuthController.login");
// Route.on('/register').render('/login-register');
Route.post('/login-register',"AuthController.register");
Route.post("/login","AuthController.loginUser");
Route.post("/wow","AuthController.addProduct");
// Route.post('/register',"AuthController.register");
Route.get('/login-register', "AuthController.login");
Route.get('/test', "AuthController.addp");
Route.on('/shop').render('shop');
Route.on('/detail').render('detail');
Route.on('/update').render('/update-stock');


Route.post("/api/register", "AuthController.registerUser")
Route.post("/api/login", "AuthController.checkLoginState")
Route.post("/api/", "AuthController.verifyToken")
Route.post("/api/facebook", "AuthController.loginViaFacebook")
Route.post("/api/logout", "AuthController.logoutUser")
Route.post("/api/logologout", "AuthController.verifyLogin")

// Route.post("/", "AuthController.verifyToken")

// Route.get("/login",(context) => {
//     const {view,request,response} = context
//     const name = "chubby"
//     const age = 2
//     const friends = ["C","H","U","B","B","Y"]
//     const adderss = {
//         postcode: "50340",
//         country: "Korea"
//     }

//     return view.render("login",{name,age,friends})
// })
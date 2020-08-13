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

Route.on('/update').render('/update-stock');
Route.get('/', "AuthController.loadLandingPage");
Route.get('/login-register', "AuthController.login");
Route.get('/shop', "AuthController.loadListProduct");
Route.get('/cart', "AuthController.getCart");
Route.get('/addProduct', "AuthController.loadAddProduct");
Route.get('/detail', "AuthController.loadProductDetail");
Route.get('/checkout', "AuthController.checkout");
Route.get('/delete', "AuthController.deleteFromCart");
Route.get('/products', "AuthController.loadProducts");
Route.post('/login-register',"AuthController.register");
Route.post("/login","AuthController.loginUser");
Route.post("/shop", "AuthController.listProduct");
Route.post("/addProduct","AuthController.addProduct");
Route.post("/addSubProduct","AuthController.addSubProduct");

// Whitelisted routes path.
Route.post("/api/", "AuthController.verifyToken");
Route.post("/api/register", "AuthController.registerUser");
Route.post("/api/login", "AuthController.checkLoginState");
Route.post("/api/facebook", "AuthController.loginViaFacebook");
Route.post("/api/logout", "AuthController.logoutUser");
Route.post("/api/logologout", "AuthController.verifyLogin");
Route.post("/api/checkout", "AuthController.processOrder");

Route.on('/update-stock').render('update-stock');
Route.on('/cart-checkout').render('cart-checkout');

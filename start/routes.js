"use strict";

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

Route.on("/").render("home");
// Route.on("/register").render("register");

Route.get("/login", (context) => {
  const { view, request, response } = context;

  const name = "Geng";
  const age = 19;
  const array = ["1", "2", "3", "4"];
  const obj = {
    item1: "1",
    item2: "2",
    item3: "3",
  };

  return view.render("login", { name, age, array, obj });
});

Route.get("/register", (context) => {
  const { view, request, response } = context;

  const name = "register";
  const age = 20;
  const array = ["5", "6", "7"];
  const obj = {
    item1: "4",
    item2: "5",
    item3: "6",
  };

  return view.render("register", { name, age, array, obj });
});

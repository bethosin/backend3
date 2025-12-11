
const express = require("express");
const Router = express.Router();
const { endpoint } = require("../utils/endpoint");
const { deleteProduct, addProduct, fetchProduct, productDisplay} = require("../Controllers/product.controller");
const { addUser, fetchUser, deleteUser, updateUser, authenticateUser, userDash } = require("../Controllers/user.controller");



const userEndpoint = [];

Router.get("/music", (request, response) => {
  console.log("Music API is running");
  response.json(musicEndpoint);
});

Router.get("/", (request, response) => {
  //  response.send('Welcome to Backend class');
  console.log("Backend is running");
  response.json(endpoint);
});

Router.get("/about", (req, res) => {
  res.send(`<h1>About Page</h1>`);
  console.log("About page is being accessed");
});

Router.get("/welcome", (req, res) => {
  console.log("Welcome page is being displayed");
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});
Router.get("/service", (req, res) => {
  res.sendFile(__dirname + "/service.html");
});

Router.get("/home", (req, res) => {
  const user = { endpoint };
  res.render("index", { user });
});
Router.get("/signup", (req, res) => {
  res.render("signup", { userToEdit: null, index: null });
});






Router.post("/update/:index", (req, res) => {
  let index = req.params.index;

  userEndpoint[index] = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
  };

  res.redirect("/dashboard");
});

Router.get("/dashboard", (req, res) => {
  res.render("dashboard", { userEndpoint });
});

Router.get("/signin", (req, res) => {
  res.render("signin");
});

Router.post("/delete/:index", (req, res) => {
  console.log(req.params.index);
  let removeUser = req.params.index;
  if (removeUser < 0 && removeUser >= userEndpoint.length) {
  }
  userEndpoint.splice(removeUser, 1);
  res.redirect("/dashboard");
});

Router.post("/edit/:index", (req, res) => {
  let index = req.params.index;
  let userToEdit = userEndpoint[index];

  res.render("signup", { userToEdit, index });
});

Router.get("/addproduct", productDisplay);

Router.post("/product", addProduct  );

Router.get("/allproducts", fetchProduct);

Router.get("/allusers", fetchUser);

Router.post("/userdelete/:id", deleteUser);

Router.post("/useredit/:id", updateUser);

Router.post("/productdelete/:id", deleteProduct);

Router.post("/register", addUser);

Router.post("/signin", authenticateUser);

Router.get("/user-dash", userDash);


module.exports = Router;
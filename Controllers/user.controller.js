const e = require("cors");
const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");

const addUser = (req, res) => {
  let form = new userModel(req.body);
  form
    .save()
    .then(() => {
      console.log("User registered successfully");
      res.send({ status: true, message: "user saved" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchUser = (req, res) => {
  userModel
    .find()
    .then((user) => {
      console.log(user);
      res.render("allusers", { allusers: user });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteUser = (req, res) => {
  const userId = req.params.id;

  console.log("Deleting user with ID:", userId);

  userModel
    .findByIdAndDelete(userId)
    .then((result) => {
      if (!result) {
        console.log("User not found");
      } else {
        console.log("Deleted user:", result.firstname);
      }
      res.redirect("/allusers");
    })
    .catch((err) => {
      console.log("Error deleting user:", err);
    });
};

const updateUser = (req, res) => {
  const userId = req.params.id;

  userModel
    .findByIdAndUpdate(userId, req.body)
    .then((result) => {
      if (!result) console.log("User not found");
      else console.log("Updated user:", result.firstname);
      res.redirect("/allusers");
    })
    .catch((err) => console.log("Error updating user:", err));
};

const authenticateUser = (req, res) => {
  console.log(req.body);
  let { password } = req.body;
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      if (user) {
        //  email is valid
        user.validatePassword(password, (error, same) => {
          console.log(password);
          if (!same) {
            res.send({ status: false, message: "invalid password" });
          } else {
            let token = jwt.sign(
              { email: req.body.email },
              process.env.JWT_SECRET,
              { expiresIn: "3s" }
            );
            console.log("Generated Token:", token);
            res.send({ status: true, message: "login successful", token });
          }
        });
      } else {
        res.send({ status: false, message: "user not found" });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const userDash = (req, res) => {
  let token =
    ("User Dashboard Accessed", req.headers.authorization.split(" ")[1]);
  console.log("Received Token:", token);
  jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err) {
      console.log("Token verification failed:", err);
      res.send({ status: false, message: "unauthorized access" });
    } else {
      console.log("Token verified successfully:", result);
      let email = result.email;
      userModel.findOne({ email: email }).
      then((user) => {
        res.send({ status: true, message: "Token is Valid", user });
        console.log(user);
      });
    }
  });
};

module.exports = {
  addUser,
  fetchUser,
  deleteUser,
  updateUser,
  authenticateUser,
  userDash,
};

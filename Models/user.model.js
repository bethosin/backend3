const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const e = require("cors");
//user Schema
const UserSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
});
let saltRound = 10;
UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, saltRound, (error, hashedPassword) => {
    console.log(this.password);
    if (error) {
      console.log(error, "passsword could not be hshed");
    } else {
      this.password = hashedPassword;
      console.log(hashedPassword);
      next();
    }
  });
});

UserSchema.methods.validatePassword = function (password, callback) {
  console.log(password, this.password);
  bcrypt.compare(password, this.password, (error, same) => {
    if (!error) {
      console.log("Password match result:", same);
      callback(error, same);
    } else {
      next();
    }
  });
};
//user Model
//comes with two things like key and value comes with name of the model and schema
const userModel = mongoose.model("User_Data", UserSchema, "User_Data");

module.exports = userModel;

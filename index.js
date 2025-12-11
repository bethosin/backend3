const express = require("express");
const app = express();
const mongoose = require("mongoose");
const adminRoute = require("./Routes/admin.route");
require("dotenv").config()
const cors = require("cors");
const PORT = process.env.PORT || 5500;


app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", adminRoute);


const URI = process.env.MONGO_DB_URI;

mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Database connection error:");
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//dotenv it help us to keep secret

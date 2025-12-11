const mongoose = require("mongoose");
//product Schema
const ProductSchema = mongoose.Schema({
  product_name: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_quantity: { type: String, required: true },
  product_date: { type: Date, default: Date.now() },
});
//prroduct Model
//comes with two things like key and value comes with name of the model and schema
const productModel = mongoose.model(
  "Product_Collection",
  ProductSchema,
  "Product_Collection"
);

module.exports = productModel;

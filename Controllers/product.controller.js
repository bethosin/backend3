const productModel = require("../Models/product.model");

const productDisplay = (req, res) => {
      res.render("product");
}

const addProduct = (req, res) =>{
     let form = new productModel(req.body);
     form
       .save()
       .then(() => {
         console.log("Product saved successfully");
         res.send({status: true, message: "Product added successfully"});
        //  res.redirect("allproducts");
       })
       .catch((err) => {
         console.log(err);
       });
}

const fetchProduct = (req, res) =>{
     productModel
       .find()
       .then((product) => {
         console.log(product);
         res.render("allproducts", { allproducts: product });
       })
       .catch((err) => {
         console.log(err);
       });
}

const deleteProduct = (req, res) =>{
     const productId = req.params.id;

     console.log("Deleting product with ID:", productId);

     productModel
       .findByIdAndDelete(productId)
       .then((result) => {
         if (!result) {
           console.log("Product not found");
         } else {
           console.log("Deleted product:", result.product_name);
         }
         res.redirect("/allproducts");
       })
       .catch((err) => {
         console.log("Error deleting product:", err);
       });
}
module.exports = {
    addProduct,
    fetchProduct,
    deleteProduct,
    productDisplay
}
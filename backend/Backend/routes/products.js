const express = require("express");
const router = express.Router();

const {
  getProducts,
  deleteProduct,
  addNewProduct,
  updateProduct,
  getSingleProduct,
} = require("../controllers/productController");

router.route("/category/products/:id").get(getProducts);

router.route("/category/singleproducts/:id").get(getSingleProduct);

router.route("/category/products/delete").delete(deleteProduct);
router.route("/category/products/new").post(addNewProduct);
router.route("/category/products/update").put(updateProduct);
module.exports = router;

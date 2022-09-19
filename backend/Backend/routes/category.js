const express = require("express");
const router = express.Router();

const {
  getCategories,
  newCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory,
} = require("../controllers/categorController");

router.route("/categories").get(getCategories);
router.route("/categories/new").post(newCategory);
router.route("/categories/:id").put(updateCategory).delete(deleteCategory);
router.route("/category/:id").get(getSingleCategory);

module.exports = router;

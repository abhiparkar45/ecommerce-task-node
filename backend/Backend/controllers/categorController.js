const Category = require("../models/category");

// create new category
exports.newCategory = async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category,
  });
};

//get all categories
exports.getCategories = async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    success: true,
    count: categories.length,
    categories,
  });
};

//update a category
exports.updateCategory = async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    category,
  });
};

//get single Category
exports.getSingleCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.status(200).json({
    success: true,
    category,
  });
};

//Delete a category
exports.deleteCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: "category is deleted",
  });
};

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

//delete a product
exports.deleteProduct = async (req, res, next) => {
  const category_id = await req.body.Category_id;
  const product_id = await req.body.Product_id;

  const category = await Category.findById(category_id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  const find = await Category.find(product_id);
  if (!find) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }
  res.status(200).json({
    success: true,
    find,
  });
};

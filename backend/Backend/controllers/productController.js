const Category = require("../models/category");

//get all products
exports.getProducts = async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }
  const products = await category.products;
  const TotalProducts = await products.length;

  const pageNumber = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const startIndex = (pageNumber - 1) * limit;
  const endIndex = pageNumber * limit;
  const finalResult = await products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(TotalProducts / limit);
  const totalPagesArr = [];
  let page1 = 1;
  let index1 = 0;
  while (page1 <= totalPages) {
    totalPagesArr[index1] = page1;
    page1++;
    index1++;
  }

  res.status(200).json({
    success: true,
    resultPerPage: limit,
    TotalProducts: TotalProducts,
    pageNumber: pageNumber,
    finalResult: finalResult,
    totalPages: totalPages,
    totalPagesArr: totalPagesArr,
  });
};

//add a new Product
exports.addNewProduct = async (req, res, next) => {
  const category_id = await req.body.category_id;
  const product = await req.body.product;
  await Category.update({ _id: category_id }, { $push: { products: product } });
  //const product = await Category.products.create(req.body);

  res.status(200).json({
    success: true,
    message: "Added",
    category_id,
    product,
  });
};

//delete a product
exports.deleteProduct = async (req, res, next) => {
  const category_id = await req.body.Category_id;
  const product_id = await req.body.Product_id;

  const category = await Category.findById(category_id);
  const Allproducts = category.products;

  const products = Allproducts.filter(
    (e) => e._id.toString() !== product_id.toString()
  );

  await Category.findByIdAndUpdate(
    category_id,
    {
      products,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    products,
  });
};

//update a product
exports.updateProduct = async (req, res, next) => {
  const category_id = await req.body.category_id;
  const product_id = await req.body.product_id;
  const productName = await req.body.productName;
  const productPrice = await req.body.productPrice;

  const updatedProduct = {
    productName: productName,
    productPrice: productPrice,
    product_id: product_id,
  };

  const category = await Category.findById(category_id);
  const products = category.products;

  const Index = products.findIndex(
    (obj) => obj._id.toString() === product_id.toString()
  );
  products[Index] = updatedProduct;

  await Category.findByIdAndUpdate(
    category_id,
    {
      products,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    Index,
  });
};

//get a single Product
exports.getSingleProduct = async (req, res, next) => {
  const product_id = await req.params.id;

  const result = await Category.find(
    { "products._id": product_id },
    { products: { $elemMatch: { _id: product_id } } }
  );
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }
  res.status(200).json({
    success: true,
    result,
  });
};

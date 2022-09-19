const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Please Enter catogory name !"],
    trim: true,
    maxLength: [30, "category name cannot exceed 30 !"],
  },
  products: [
    {
      productName: {
        type: String,
        required: [true, "Please Add Product Name !"],
        trim: true,
        maxLength: [30, "category name cannot exceed 30 !"],
      },
      productPrice: {
        type: Number,
        required: [true, "Please Enter Price of Product"],
        trim: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", categorySchema);

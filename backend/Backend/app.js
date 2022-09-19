const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());

//import all routes
const categories = require("./routes/category");
const products = require("./routes/products");

app.use("/api", categories);
app.use("/api", products);

module.exports = app;

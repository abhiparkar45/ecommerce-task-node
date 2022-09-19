import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ShowProducts = () => {
  //const [currentProductName, setCurrentProductName] = useState("");
  const navigate = useNavigate();
  const [category_id, setCategory_id] = useState("");
  const [deleteProduct_id, setDeleteProduct_id] = useState("");
  const [editProduct, setEditProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [updatedProductName, setUpdatedProductName] = useState("");
  const [updatedProductPrice, setUpdatedProductPrice] = useState(0);
  const [UpdateProduct_id, setUpdateProduct_id] = useState("");
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [productPerPage, setProductPerPage] = useState(5);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [initialPageNumber, setInitialPageNumber] = useState([]);

  useEffect(() => {
    const { data } = axios
      .get(
        `http://localhost:4000/api/category/products/${id}?page=${currentPageNumber}&limit=${productPerPage}`
      )
      .then((res) => {
        setProducts(res.data.finalResult);
        setCategory_id(id);
        setTotalPages(res.data.totalPages);
        setProductPerPage(res.data.resultPerPage);
        setCurrentPageNumber(res.data.pageNumber);
        setInitialPageNumber(res.data.totalPagesArr);
      });
  }, [id, currentPageNumber, productPerPage]);

  const deleteProduct = (e, d_id) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:4000/api/category/products/delete`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          Category_id: category_id,
          Product_id: d_id,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  const submitHandler1 = async (e) => {
    e.preventDefault();

    const formData = {
      category_id: category_id,
      product: { productName: productName, productPrice: productPrice },
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `http://localhost:4000/api/category/products/new`,
      formData,
      config
    );
    console.log(data);
  };
  const updateProductFunc = async (e) => {
    e.preventDefault();
    const data = {
      category_id: category_id,
      product_id: UpdateProduct_id,
      productName: updatedProductName,
      productPrice: updatedProductPrice,
    };
    await axios
      .put(`http://localhost:4000/api/category/products/update`, data)
      .then((res) => console.log(res));
  };
  const getAllProductDetail = async (id) => {
    const { data } = await axios.get(
      `http://localhost:4000/api/category/singleproducts/${id}`
    );
    console.log(data.result[0].products[0]);
    setUpdatedProductName(data.result[0].products[0].productName);
    setUpdatedProductPrice(data.result[0].products[0].productPrice);
    setUpdateProduct_id(data.result[0].products[0]._id);
  };
  console.log(updatedProductName);
  console.log(updatedProductPrice);
  return (
    <>
      <button onClick={(e) => navigate("/")}>Back to Categories</button>

      <h3>Total Page: {totalPages}</h3>
      <h3>Product Per Page: {productPerPage}</h3>
      <h3>Set Products Per Page</h3>
      <select onChange={(ev) => setProductPerPage(ev.target.value)}>
        <option>5</option>
        <option>10</option>
        <option>15</option>
      </select>
      <h3>Current Page Number:{currentPageNumber}</h3>

      <h3>
        Go To Page Number:{" "}
        <select onChange={(ev) => setCurrentPageNumber(ev.target.value)}>
          {initialPageNumber.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>
      </h3>
      {editProduct ? (
        <>
          <hr />
          <h1>Update Product</h1>
          <form onSubmit={updateProductFunc}>
            <h5>Product Name:</h5>
            <input
              onChange={(e) => setUpdatedProductName(e.target.value)}
              value={updatedProductName}
            />
            <h5>Product Price:</h5>
            <input
              onChange={(e) => setUpdatedProductPrice(e.target.value)}
              value={updatedProductPrice}
            />
            <button type="submit">Submit</button>
          </form>
          <hr />
        </>
      ) : (
        <>
          <hr />
          <h1>Add New Product</h1>
          <form onSubmit={submitHandler1}>
            <input
              onChange={(e) => setProductName(e.target.value)}
              placeholder="New Product Name"
            />
            <input
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Price"
            />
            <button type="submit">Submit</button>
          </form>
          <hr />
        </>
      )}

      {products.map((e) => (
        <div key={e._id}>
          <h4>Product ID:{e._id}</h4>
          <h4>Product Name:{e.productName}</h4>
          <h4>Category ID:{category_id}</h4>

          <button
            type="button"
            value={e._id}
            onClick={(ev) => {
              getAllProductDetail(ev.target.value);
              setEditProduct(true);
            }}
          >
            Edit
          </button>
          <button
            value={e._id}
            onClick={(ev) => {
              deleteProduct(ev, e._id);
            }}
          >
            Delete
          </button>
          {editProduct ? (
            <button onClick={() => setEditProduct(false)}>Add New</button>
          ) : (
            <></>
          )}
          <hr />
        </div>
      ))}
    </>
  );
};

export default ShowProducts;

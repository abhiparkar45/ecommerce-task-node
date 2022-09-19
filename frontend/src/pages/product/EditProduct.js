import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentProduct, setCurrentProduct] = useState("");

  useEffect(() => {
    const { data } = axios
      .get(`http://localhost:4000/api/category/singleproducts/:id${id}`)
      .then((res) => console.log(res.data.product));
  }, []);
  const updateProductFunc = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={updateProductFunc}>
        <input
          onChange={(e) => setCurrentProduct(e.target.value)}
          value={currentProduct}
        />
        <button type="submit">Submit</button>
      </form>
      <button
        onClick={() => {
          navigate(`/`);
        }}
      >
        Cancel
      </button>
    </>
  );
}

export default EditProduct;

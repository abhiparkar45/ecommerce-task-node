import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    const { data } = axios
      .get(`http://localhost:4000/api/category/${id}`)
      .then((res) => setCurrentCategory(res.data.category.categoryName));
  }, []);
  const updateCategoryFunc = async (e) => {
    e.preventDefault();

    const formData = {
      categoryName: currentCategory,
    };

    await axios
      .put(`http://localhost:4000/api/categories/${id}`, formData)
      .then((res) => console.log(res));
    navigate("/");
  };

  return (
    <>
      <form onSubmit={updateCategoryFunc}>
        <input
          onChange={(e) => setCurrentCategory(e.target.value)}
          value={currentCategory}
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

export default EditCategory;

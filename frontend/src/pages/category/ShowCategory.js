import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios, { Axios } from "axios";

const ShowCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showAddNewCategory, setShowAddNewCategory] = useState(false);
  const [showEditCtegory, setShowEditCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const getData = async () => {
    const { data } = await axios.get("http://localhost:4000/api/categories");
    const req_data = data.categories;
    setCategories(req_data);
  };
  useEffect(() => {
    getData();
  }, []);

  const deleteCategory = (id, e) => {
    e.preventDefault();
    console.log(id);
    axios
      .delete(`http://localhost:4000/api/categories/${id}`)
      .then((res) => console.log(res));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      categoryName: newCategoryName,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `http://localhost:4000/api/categories/new`,
      formData,
      config
    );
  };

  console.log(showAddNewCategory);
  return (
    <>
      <hr />
      <form onSubmit={submitHandler}>
        <h3>add new Category:</h3>
        <input
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New Category Name"
        />
        <button type="submit">Submit</button>
      </form>
      <hr />
      {categories.map((e) => (
        <div key={e._id}>
          <h4>{e.categoryName}</h4>
          <button
            onClick={() => {
              navigate(`/category/${e._id}`);
            }}
          >
            Show Products
          </button>
          <button
            onClick={() => {
              navigate(`/EditCategory/${e._id}`);
            }}
          >
            Edit
          </button>
          <button onClick={(ev) => deleteCategory(e._id, ev)}>Delete</button>
          <hr />
        </div>
      ))}
    </>
  );
};

export default ShowCategory;

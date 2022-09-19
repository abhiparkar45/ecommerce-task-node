import "./App.css";
import ShowCategory from "./pages/category/ShowCategory";
import EditCategory from "./pages/category/EditCategory";
import ShowProducts from "./pages/product/ShowProducts";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProduct from "./pages/product/EditProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowCategory />}></Route>
          <Route path="/EditCategory/:id" element={<EditCategory />}></Route>
          <Route path="/category/:id" element={<ShowProducts />}></Route>
          <Route path="/EditProduct/:id" element={<EditProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

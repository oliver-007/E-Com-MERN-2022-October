import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "../screens/auth/AdminLogin";
import Categories from "../screens/dashboard/Categories";
import CreateCatagory from "../screens/dashboard/CreateCatagory";
import CreateProduct from "../screens/dashboard/CreateProduct";
import EditProduct from "../screens/dashboard/EditProduct";
import Orders from "../screens/dashboard/Orders";
import Products from "../screens/dashboard/Products";
import UpdateCategory from "../screens/dashboard/UpdateCategory";
import Login from "../screens/home/auth/Login";
import Register from "../screens/home/auth/Register";
import Cart from "../screens/home/Cart";
import CatProducts from "../screens/home/CatProducts";
import Home from "../screens/home/Home";
import Prodcut from "../screens/home/Prodcut";
import SearchProducts from "../screens/home/SearchProducts";
import Dashboard from "../screens/users/Dashboard";
import Private from "./Private";
import Public from "./Public";
import UserAuthRoute from "./UserAuthRoute";
import UserRoute from "./UserRoute";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cat-products/:name" element={<CatProducts />} />
        <Route
          path="search-products/:keyword/:page"
          element={<SearchProducts />}
        />
        <Route path="cart" element={<Cart />} />
        <Route path="cat-products/:name/:page" element={<CatProducts />} />
        <Route path="product/:id" element={<Prodcut />} />

        <Route element={<UserAuthRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route element={<UserRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>

        <Route path="auth">
          <Route
            path="admin-login"
            element={
              <Public>
                <AdminLogin />
              </Public>
            }
          />
        </Route>
        <Route path="dashboard">
          <Route
            path="products"
            element={
              <Private>
                <Products />
              </Private>
            }
          />
          <Route
            path="products/:page"
            element={
              <Private>
                <Products />
              </Private>
            }
          />
          <Route
            path="edit-product/:id"
            element={
              <Private>
                <EditProduct />
              </Private>
            }
          />
          <Route
            path="categories"
            element={
              <Private>
                <Categories />
              </Private>
            }
          />{" "}
          <Route
            path="categories/:page"
            element={
              <Private>
                <Categories />
              </Private>
            }
          />
          <Route
            path="create-category"
            element={
              <Private>
                <CreateCatagory />
              </Private>
            }
          />
          <Route
            path="update-category/:id"
            element={
              <Private>
                <UpdateCategory />
              </Private>
            }
          />
          <Route
            path="create-product"
            element={
              <Private>
                <CreateProduct />
              </Private>
            }
          />
          <Route
            path="orders"
            element={
              <Private>
                <Orders />
              </Private>
            }
          />
          <Route
            path="orders/:page"
            element={
              <Private>
                <Orders />
              </Private>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;

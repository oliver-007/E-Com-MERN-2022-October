import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ side, closeSidebar }) => {
  return (
    <div
      className={`fixed ${side} sm:left-0 top-0 w-64 h-screen bg-gray-800 z-10 transition-all duration-300 `}
    >
      <i
        className="bi bi-x-lg absolute top-6 right-4 sm:hidden block cursor-pointer text-lg"
        onClick={closeSidebar}
      ></i>
      <div className=" flex items-center bg-white p-4">
        <img src="/logo.jpg" alt="logo" className=" w-10 h-10" />
        <p className=" ml-3 text-red-600 font-semibold">E-Com Oliver</p>
      </div>
      <ul className="mt-4">
        <li className=" px-4 py-3 cursor-pointer transition-all duration-300  text-white flex items-center hover:bg-gray-600 ">
          <i className="bi bi-archive-fill mr-2 inline-block"></i>{" "}
          <Link to="/dashboard/products" className=" text-base capitalize ">
            products
          </Link>
        </li>
        <li className=" px-4 py-3 cursor-pointer transition-all duration-300  text-white flex items-center hover:bg-gray-600 ">
          <i className="bi bi-cart-fill mr-2 inline-block"></i>{" "}
          <Link to="/dashboard/orders" className=" text-base capitalize ">
            orders
          </Link>
        </li>
        <li className=" px-4 py-3 cursor-pointer transition-all duration-300  text-white flex items-center hover:bg-gray-600 ">
          <i className="bi bi-people-fill mr-2 inline-block"></i>{" "}
          <Link to="/dashboard/customers" className=" text-base capitalize ">
            customers
          </Link>
        </li>
        <li className=" px-4 py-3 cursor-pointer transition-all duration-300  text-white flex items-center hover:bg-gray-600 ">
          <i className="bi bi-grid-fill mr-2 inline-block"></i>{" "}
          <Link to="/dashboard/categories" className=" text-base capitalize ">
            categories
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

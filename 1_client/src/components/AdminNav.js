import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../store/reducers/authReducer";

const AdminNav = ({ openSidebar }) => {
  const dispatch = useDispatch();

  const adminLogout = () => {
    dispatch(logout("admin-token"));
  };

  return (
    <nav className=" fixed left-0 sm:left-64 top-4 right-0 mx-4 ">
      <div className=" bg-gray-800 w-full flex p-4 justify-between sm:justify-end items-center">
        <i
          className="bi bi-filter-left text-white text-2xl
        sm:hidden block "
          onClick={openSidebar}
        ></i>
        <Link to="/" className=" btn-dark text-white">
          <i className="bi bi-arrow-left"></i> home
        </Link>
        <button
          className=" py-2 px-4 bg-indigo-600 text-white rounded-md capitalize "
          onClick={adminLogout}
        >
          logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;

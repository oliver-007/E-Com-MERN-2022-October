import React from "react";
import { Link, NavLink } from "react-router-dom";
import { BsPersonCircle, BsFillCartFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/authReducer";

const AccountList = () => {
  const dispatch = useDispatch();

  const logoutHandle = () => {
    dispatch(logout("userToken"));
  };

  return (
    <>
      <NavLink to="/user" className="account-list">
        <BsPersonCircle size={22} />
        <span className="account-list-title">my account</span>
      </NavLink>
      <NavLink to="/orders" className="account-list">
        <BsFillCartFill size={22} />
        <span className="account-list-title">orders</span>
      </NavLink>
      <Link onClick={logoutHandle}>
        <span className=" account-list cursor-pointer">
          <MdLogout size={22} />
          <span className="account-list-title">logout</span>
        </span>
      </Link>
    </>
  );
};

export default AccountList;

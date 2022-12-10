import React from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsHandbag } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import { toggleSearchBar } from "../../store/reducers/globalReducer";

const Nav = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);

  const { items } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  return (
    <>
      <nav className="nav">
        <div className="my-container">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className=" flex items-center ">
                <img
                  src="/logo.jpg"
                  alt="logo"
                  className=" h-10  object-cover"
                />
                <h3 className=" capitalize ml-2 text-orange-700 font-semibold">
                  {" "}
                  e-com oliver{" "}
                </h3>
              </div>
            </Link>

            <ul className=" flex items-center ">
              <li className="nav-li cursor-pointer ">
                <FiSearch
                  size={21}
                  onClick={() => dispatch(toggleSearchBar())}
                />
              </li>

              {/* ****** Admin login  ******* */}
              <li className="nav-li">
                {" "}
                <Link to="/auth/admin-login" className="nav-link">
                  {" "}
                  admin
                </Link>{" "}
              </li>

              {/* ****** showing user name  ***** */}

              {userToken ? (
                <li className="nav-li">
                  <Link to="/user" className="nav-link">
                    {user.name}
                  </Link>
                </li>
              ) : (
                <li className="nav-li">
                  {" "}
                  <Link to="/login" className="nav-link">
                    sign in
                  </Link>{" "}
                </li>
              )}
              {/* ****** showing Cart icon with quantity ***** */}
              <li className="nav-li relative ">
                <Link to="/cart">
                  <BsHandbag size={20} />
                  {items > 0 && <span className="nav-circle">{items}</span>}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* ********* search bar  ******** */}
      <Search />
    </>
  );
};

export default Nav;

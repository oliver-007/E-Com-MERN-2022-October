import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSearchBar } from "../../store/reducers/globalReducer";

const Search = () => {
  const { searchBar } = useSelector((keyword) => keyword.globalReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // *******  search input keyword state  *******
  const [keyword, setKeyword] = useState("");

  // ******** search product func  *******
  const searchProducts = () => {
    if (keyword === "") {
      return;
    } else {
      navigate(`/search-products/${keyword}/1`);
      dispatch(toggleSearchBar());
      setKeyword("");
    }
  };

  // ********* closing search bar func ********
  const closeSearch = (e) => {
    const id = e.target.getAttribute("id");
    id === "search" && dispatch(toggleSearchBar());
  };
  return (
    searchBar && (
      <motion.div
        initial={{ opacity: 0, x: "100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="fixed inset-0 w-full h-full bg-black/50 z-50"
        id="search"
        onClick={closeSearch}
      >
        <div className=" flex -mx-8 justify-center px-8 ">
          <div className=" w-full sm:w-10/12 md:w-8/12 lg:w-6/12 px-8 mt-10 relative">
            <input
              type="text"
              name=""
              id=""
              className=" w-full bg-white h-[50px] rounded outline-none pl-5 pr-14"
              placeholder="Search products...."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <FiSearch
              className=" absolute top-[13px] right-12 text-2xl text-gray-500 cursor-pointer "
              onClick={searchProducts}
            />
          </div>
        </div>
      </motion.div>
    )
  );
};

export default Search;

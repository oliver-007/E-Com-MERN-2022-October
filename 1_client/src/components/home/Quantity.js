import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Quantity = ({ quantity, inc, dec, theme }) => {
  return (
    <div className=" flex last:border-r last:rounded-r-lg  first:rounded-l-lg  overflow-hidden shadow-lg ">
      <span
        className={` flex border p-4 border-r-0 cursor-pointer hover:bg-indigo-500 hover:text-white transition-all duration-300 ${
          theme === "indigo" && "bg-indigo-600 text-white "
        } `}
        onClick={dec}
      >
        <AiOutlineMinus />
      </span>
      <span className=" flex flex-1 border items-center justify-center font-medium  border-r-0  ">
        {quantity}
      </span>
      <span
        className={`flex border p-4 border-r-0 cursor-pointer hover:bg-indigo-500 hover:text-white transition-all duration-300 ${
          theme === "indigo" && "bg-indigo-600 text-white"
        } `}
        onClick={inc}
      >
        <AiOutlinePlus />
      </span>
    </div>
  );
};

export default Quantity;

import React, { useState } from "react";
import currency from "currency-formatter";
import h2p from "html2plaintext";
import htmlReactParser from "html-react-parser";
import { motion } from "framer-motion";
import { BsCheck2 } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

import DetailsImage from "./DetailsImage";
import Quantity from "./Quantity";
import { addCart } from "../../store/reducers/cartReducer";
import { discount } from "../../utils/discount";

const DetailsCard = ({ product }) => {
  // ******** Size state  *******
  const [sizeState, setSizeState] = useState(
    product?.sizes?.length > 0 && product.sizes[0].name
  );
  console.log(sizeState);
  //  ********* Color state  **********
  const [colorState, setColorState] = useState(
    product?.colors?.length > 0 && product.colors[0].color
  );
  console.log(colorState);
  // ******** Quantity state *******
  const [quantity, setQuantity] = useState(1);
  // *******  increment func ********
  const inc = () => {
    setQuantity(quantity + 1);
  };
  // ********* Decrement func  ***********
  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // ******* Discount price func  ******

  const discountPrice = discount(product.price, product.discount);

  // ******* description text formatting  *******
  let desc = h2p(product.description);
  desc = htmlReactParser(desc);

  const dispatch = useDispatch();

  // ****** Add to cart func  ******
  const addToCart = () => {
    const {
      ["colors"]: colors,
      ["sizes"]: sizes,
      ["createdAt"]: createdAt,
      ["updatedAt"]: updatedAt,
      ...newProduct
    } = product;

    newProduct["color"] = colorState;
    newProduct["size"] = sizeState;
    newProduct["quantity"] = quantity;

    const cart = localStorage.getItem("cart");
    const cartItems = cart ? JSON.parse(cart) : [];
    const checkItem = cartItems.find((item) => item._id === newProduct._id);

    if (!checkItem) {
      cartItems.push(newProduct);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      dispatch(addCart(newProduct));
      toast.success(`${newProduct.title} is added to cart. `);
    } else {
      toast.error(`${newProduct.title} is already in cart ! `);
      return;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-wrap -mx-5"
    >
      <Toaster position=" top-center" />
      <div className="w-full md:w-6/12 p-5 order-2 md:order-1 lg:order-1 ">
        <div className=" flex flex-wrap -mx-1 ">
          {/* ****** DetailsImage component   ******* */}
          {[1, 2, 3].map((imgNo) => (
            <DetailsImage imgNo={imgNo} key={imgNo} product={product} />
          ))}
        </div>
      </div>
      <div className="w-full md:w-6/12 p-5 order-1 md:order-2 lg:order-2 ">
        <h1 className=" text-2xl font-bold text-gray-900 capitalize ">
          {" "}
          {product.title}{" "}
        </h1>
        <div className=" flex justify-between my-5">
          <span className=" text-2xl font-bold text-gray-900">
            {" "}
            {currency.format(discountPrice, { code: "USD" })}{" "}
          </span>
          <span className=" text-xl line-through text-gray-500 ">
            {" "}
            {currency.format(product.price, { code: "USD" })}{" "}
          </span>
        </div>

        {/* *******  Sizes in stock ******** */}
        {product.sizes.length > 0 && (
          <>
            <h3 className=" text-base font-medium capitalize text-gray-600 mb-3  ">
              sizes
            </h3>
            <div className=" flex flex-wrap -mx-1 ">
              {product.sizes.map((size) => (
                <div
                  className={`p-2 m-1 border border-gray-300  rounded cursor-pointer ${
                    sizeState === size.name && "bg-indigo-600  "
                  } `}
                  key={size.name}
                  onClick={() => setSizeState(size.name)}
                >
                  <span
                    className={` text-sm font-semibold uppercase ${
                      sizeState === size.name ? "text-white" : "text-gray-900"
                    } `}
                  >
                    {" "}
                    {size.name}{" "}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ******* Colors in stock ****** */}
        {product.colors.length > 0 && (
          <>
            <h3 className=" text-base font-medium capitalize text-gray-600 mb-2 mt-3">
              colors
            </h3>
            <div className=" flex flex-wrap -mx-1 ">
              {product.colors.map((color) => (
                <div
                  key={color.color}
                  className=" border border-gray-300 rounded m-1 p-1 cursor-pointer "
                  onClick={() => setColorState(color.color)}
                >
                  <span
                    className="min-w-[40px] min-h-[40px] rounded flex items-center justify-center"
                    style={{ backgroundColor: color.color }}
                  >
                    {colorState === color.color && (
                      <BsCheck2 className=" text-white" size={20} />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ****  Add to cart & Quantity **** */}

        <div className="flex -mx-3 items-center">
          <div className="w-full sm:w-6/12 p-3 ">
            <Quantity quantity={quantity} inc={inc} dec={dec} />
          </div>
          <div className="w-full sm:w-6/12 p-3">
            <button
              className=" btn btn-indigo shadow-lg shadow-gray-500 "
              onClick={addToCart}
            >
              add to cart
            </button>
          </div>
        </div>

        <h3 className=" text-base font-medium capitalize text-gray-600 mb-2 mt-3">
          description
        </h3>
        <div className=" mt-4 leading-7 description "> {desc} </div>
      </div>
    </motion.div>
  );
};

export default DetailsCard;

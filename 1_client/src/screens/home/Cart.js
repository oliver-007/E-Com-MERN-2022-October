import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import currency from "currency-formatter";
import { BsTrash } from "react-icons/bs";

import Nav from "../../components/home/Nav";
import { discount } from "../../utils/discount";
import Quantity from "../../components/home/Quantity";
import {
  decQuantity,
  incQuantity,
  removeItem,
} from "../../store/reducers/cartReducer";
import { useNavigate } from "react-router-dom";
import { useSendPaymentMutation } from "../../store/services/paymentService";

const Cart = () => {
  // ***** cart reducer  ****
  const { cart, total } = useSelector((state) => state.cartReducer);

  // ****** auth reducer *****
  const { userToken, user } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  // ******* increment func  ******
  const inc = (id) => {
    dispatch(incQuantity(id));
  };

  // ***** Decrement func ******
  const dec = (id) => {
    dispatch(decQuantity(id));
  };

  // ***** Remove func  *****
  const remove = (item) => {
    // **** user verification alert ****
    if (
      window.confirm(
        `You are trying to remove " ${item.title} " item. Are you sure ? `
      )
    ) {
      dispatch(removeItem(item._id));
    }
  };

  const navigate = useNavigate();
  // ****** paymentService mutation RTK Query hook  *******
  const [doPayment, response] = useSendPaymentMutation();
  // console.log("payment response : ", response);
  // console.log(user);

  // ****** Pay func  ******
  const pay = () => {
    if (userToken) {
      doPayment({ cart, id: user.id });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (response?.isSuccess) {
      window.location.href = response?.data?.url;
    }
  }, [response]);

  return (
    <>
      <Nav />
      <motion.div
        initial={{ opacity: 0, x: "100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="my-container mt-28"
      >
        {cart.length > 0 ? (
          <>
            <div className=" table-container">
              <table className=" w-full">
                <thead>
                  <tr className="thead-tr">
                    <th className="th">image</th>
                    <th className="th">name</th>
                    <th className="th">color</th>
                    <th className="th">size</th>
                    <th className="th">price</th>
                    <th className="th">quantity</th>
                    <th className="th">total</th>
                    <th className="th">delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const total = currency.format(
                      discount(item.price, item.discount) * item.quantity,
                      { code: "USD" }
                    );

                    return (
                      <tr className=" even:bg-gray-100" key={item._id}>
                        {/* ***** showing Image  **** */}
                        <td className="td">
                          <img
                            src={`/images/${item.image1}`}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-full "
                          />
                        </td>

                        {/* ***** showing Title  **** */}
                        <td className=" td font-medium"> {item.title} </td>

                        {/* **** showing Color **** */}
                        <td className="td">
                          <span
                            className="block w-[15px] h-[15px] rounded-full "
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </td>

                        {/* **** showing Size **** */}
                        <td className="td">
                          <span className=" font-semibold"> {item.size} </span>
                        </td>

                        {/* ***** showing Price **** */}
                        <td className="td font-bold text-gray-900 ">
                          {currency.format(
                            discount(item.price, item.discount),
                            { code: "USD" }
                          )}
                        </td>
                        {/* ***** showing Quantity ***** */}
                        <td className="td">
                          <Quantity
                            quantity={item.quantity}
                            inc={() => inc(item._id)}
                            dec={() => dec(item._id)}
                            theme="indigo"
                          />
                        </td>

                        {/* **** showing Total **** */}
                        <td className="td font-bold">{total}</td>

                        {/* ***** showing Delete button **** */}
                        <td className="td">
                          <span
                            className="cursor-pointer"
                            onClick={() => remove(item)}
                          >
                            <BsTrash className=" text-rose-600" size={20} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ****** Total & Checkout  ***** */}
            <div className=" bg-indigo-50 p-4 flex justify-end mt-5 rounded-md">
              <div>
                <span className=" text-lg font-semibold text-indigo-800 mr-10">
                  {currency.format(total, { code: "USD" })}
                </span>
                <button
                  className=" btn bg-indigo-600 text-sm font-medium py-2.5 "
                  onClick={pay}
                >
                  {response.isLoading ? "Loading..." : "Checkout"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className=" bg-indigo-50 border border-indigo-100 p-4 rounded-md text-sm font-medium text-indigo-800 ">
            Cart is Empty !
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Cart;

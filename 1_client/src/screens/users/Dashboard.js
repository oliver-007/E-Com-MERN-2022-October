import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import AccountList from "../../components/home/AccountList";
import Header from "../../components/home/Header";
import Nav from "../../components/home/Nav";
import { emptyCart } from "../../store/reducers/cartReducer";
import { useVerifyPaymentQuery } from "../../store/services/paymentService";

const Dashboard = () => {
  const { user } = useSelector((state) => state.authReducer);

  // ******* verify payment func ******
  const [params] = useSearchParams();
  const id = params.get("session_id");
  const { data, isSuccess } = useVerifyPaymentQuery(id, {
    skip: id ? false : true,
  });

  // ****** clear Cart ******
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("cart");
      dispatch(emptyCart());
      toast.success(data.msg);
      navigate("/user");
    }
  }, [isSuccess]);

  return (
    <>
      <Nav />
      <Toaster position="top-center" />
      <div className=" mt-[70px] ">
        <Header> my account </Header>
        <div className=" my-container mt-[40px] ">
          <div className=" flex flex-wrap -mx-6">
            <div className=" w-full md:w-4/12 p-6">
              <AccountList />
            </div>
            <div className=" w-full md:w-8/12 p-6">
              <h1 className="heading">name</h1>
              <span className=" block mt-3 capitalize font-medium text-sm">
                {" "}
                {user?.name}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import Header from "../../../components/home/Header";
import Nav from "../../../components/home/Nav";
import { useUserLoginMutation } from "../../../store/services/authService";
import { setUserToken } from "../../../store/reducers/authReducer";
import { useForm } from "../../../hooks/Form";
import { showError } from "../../../utils/showError";

const Login = () => {
  //  ******** custom hook for binding form data  ********

  const { state, onChange } = useForm({
    email: "",
    password: "",
  });

  // // ********  login data state  *********

  // const [state, setState] = useState({
  //   email: "",
  //   pasword: "",
  // });

  // // *********  field data set to state func  *********

  // const onChange = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };

  // ******** user login -- RTK Query hooks  *********

  const [loginUser, response] = useUserLoginMutation();
  console.log(response);

  // ********  submit func  *********

  const submitHandle = (e) => {
    e.preventDefault();

    loginUser(state);
  };

  // ******** errors state   **********

  const [errors, setErrors] = useState([]);

  // ***** errors effect  ****

  useEffect(() => {
    if (response.isError) {
      setErrors(response?.error?.data?.errors);
    }
  }, [response.error?.data]);

  // ********* token store in localstorage + redux store  *********
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem("userToken", response?.data?.token);
      dispatch(setUserToken(response.data?.token));
      navigate("/user");
    }
  }, [response.isSuccess]);

  // ********** showing ERROR func  ************

  // const showError = (fieldName) => {
  //   const existError = errors.find((err) => err.param === fieldName);
  //   if (existError) {
  //     return existError.msg;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <>
      <Nav />

      <div className=" mt-[70px] pb-[80px] ">
        <Header>sign in</Header>
        <div className="flex flex-wrap justify-center ">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
            }}
            className="w-full p-6 sm:w-10/12 md:w-8/12 lg:w-6/12  "
          >
            <form
              onSubmit={submitHandle}
              className=" bg-white rounded-lg -mt-12 border border-gray-200 p-10 "
            >
              <h1 className="heading mb-5">sign in </h1>
              <div className="mb-4">
                <label htmlFor="email" className=" form-label">
                  {" "}
                  email{" "}
                </label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  value={state.email}
                  className={`form-input ${
                    showError(errors, "email")
                      ? "bg-rose-50 border-rose-600"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder=" E-mail..."
                  onChange={onChange}
                />

                {/* ****** showing error  ***** */}

                {showError(errors, "email") && (
                  <span className="text-rose-600 text-sm font-medium ">
                    {" "}
                    {showError(errors, "email")}{" "}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className=" form-label">
                  {" "}
                  password{" "}
                </label>

                <input
                  type="password"
                  name="password"
                  id="password"
                  value={state.password}
                  className={`form-input ${
                    showError(errors, "password")
                      ? "bg-rose-50 border-rose-600"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Password..."
                  onChange={onChange}
                />

                {/* ****** showing error  ***** */}

                {showError(errors, "password") && (
                  <span className=" text-rose-600 text-sm font-medium">
                    {" "}
                    {showError(errors, "password")}{" "}
                  </span>
                )}
              </div>

              <div className=" mb-4">
                <input
                  type="submit"
                  value={`${response.isLoading ? "Loading..." : "sign in"}`}
                  className=" btn btn-indigo w-full"
                  disabled={response.isLoading ? true : false}
                />
              </div>

              <div>
                <p>
                  Don't have an account ?{" "}
                  <span className=" capitalize font-medium text-base text-blue-600">
                    <Link to="/register">register</Link>
                  </span>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;

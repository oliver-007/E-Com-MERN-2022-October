import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Header from "../../../components/home/Header";
import Nav from "../../../components/home/Nav";
import { useUserRegisterMutation } from "../../../store/services/authService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../store/reducers/authReducer";
import { setSuccess } from "../../../store/reducers/globalReducer";
import { useForm } from "../../../hooks/Form";
import { showError } from "../../../utils/showError";

const Register = () => {
  // ******** custom hook for binding FORM data  *******

  const { state, onChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  // // ******** register data state ********
  // const [state, setState] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // // *********  field data set to state func  *********

  // const onChange = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };

  // ******* user-register RTK Query hooks  ******

  const [registerUser, response] = useUserRegisterMutation();
  console.log(response);

  // ******* submit form data func *******

  const submitHandle = (e) => {
    e.preventDefault();

    registerUser(state);
  };

  // ***** error data state   ****
  const [errors, setErrors] = useState([]);

  // ******* set ERROR effect  ********

  useEffect(() => {
    if (response.isError) {
      setErrors(response?.error?.data?.errors);
    }
  }, [response?.error?.data]);

  // ******* token store in localstorage + redux store   *******
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem("userToken", response?.data?.token);
      dispatch(setUserToken(response?.data?.token));
      dispatch(setSuccess(response?.data?.msg));
      navigate("/login");
    }
  }, [response.isSuccess]);

  // ******* showing errors func  *******

  // const showError errors,= (fieldName) => {
  //   const exist = errors.find((err) => err.param === fieldName);
  //   if (exist) {
  //     return exist.msg;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <>
      {/* ****** showing Navbar   ******* */}

      <Nav />

      <div className=" mt-[70px] pb-[80px] ">
        <Header>sign up</Header>
        <div className="flex flex-wrap justify-center ">
          <motion.div
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
            }}
            className="w-full p-6 sm:w-10/12 md:w-8/12 lg:w-6/12  "
          >
            <form
              onSubmit={submitHandle}
              className=" bg-white rounded-lg -mt-12 border border-gray-200 p-10 "
            >
              <h1 className="heading mb-5">sign up </h1>
              <div className="mb-4">
                <label htmlFor="name" className=" form-label">
                  {" "}
                  name{" "}
                </label>

                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`form-input ${
                    showError(errors, "name")
                      ? " border-rose-600 bg-rose-50 "
                      : " border-gray-300 bg-white "
                  } `}
                  placeholder=" Name..."
                  value={state.name}
                  onChange={onChange}
                />

                {/* ******** showing error  ******* */}

                {showError(errors, "name") && (
                  <span className="error"> {showError(errors, "name")} </span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className=" form-label">
                  {" "}
                  email{" "}
                </label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`form-input ${
                    showError(errors, "email")
                      ? " border-rose-600 bg-rose-50 "
                      : " border-gray-300 bg-white "
                  } `}
                  placeholder=" E-mail..."
                  value={state.email}
                  onChange={onChange}
                />

                {/* ******** showing error  ******* */}

                {showError(errors, "email") && (
                  <span className="error"> {showError(errors, "email")} </span>
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
                  className={`form-input ${
                    showError(errors, "password")
                      ? " border-rose-600 bg-rose-50 "
                      : " border-gray-300 bg-white "
                  } `}
                  placeholder="Password..."
                  value={state.password}
                  onChange={onChange}
                />

                {/* ******** showing error  ******* */}

                {showError(errors, "password") && (
                  <span className="error">
                    {" "}
                    {showError(errors, "password")}{" "}
                  </span>
                )}
              </div>

              <div className=" mb-4">
                <input
                  type="submit"
                  value={`${response.isLoading ? "Loading..." : "sing up"}`}
                  className=" btn btn-indigo w-full"
                  disabled={response.isLoading ? true : false}
                />
              </div>

              <div>
                <p>
                  Already have an account ?{" "}
                  <span className=" capitalize font-medium text-base text-blue-600">
                    <Link to="/login">login</Link>
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

export default Register;

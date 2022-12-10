import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAdminToken } from "../../store/reducers/authReducer";
import { useAuthLoginMutation } from "../../store/services/authService";

const AdminLogin = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [login, response] = useAuthLoginMutation();
  // console.log("my response", response);

  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];

  const adminLoginFunc = (e) => {
    e.preventDefault();
    login(state);
  };

  // **** saving token to localstorage ****
  useEffect(() => {
    if (response.isSuccess && response.data.admin) {
      localStorage.setItem("admin-token", response?.data?.token);
      dispatch(setAdminToken(response?.data?.token));
      navigate("/dashboard/products");
    }
  }, [response.isSuccess]);

  return (
    <div className=" bg-black1 h-screen flex justify-center items-center">
      <form
        className=" bg-black2 p-2 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12 rounded "
        onSubmit={adminLoginFunc}
      >
        <h3 className=" mb-4 text-white capitalize font-semibold text-lg">
          admin dashboard login
        </h3>
        {errors.length > 0 &&
          errors.map((error, key) => (
            <div key={key}>
              <p className=" alert-danger "> {error.msg} </p>
            </div>
          ))}
        <div className=" mb-4 mt-4">
          <input
            type="email"
            name="email"
            className=" w-full bg-black1 p-4 rounded outline-none text-white"
            placeholder="Enter email"
            value={state.email}
            onChange={handleInputs}
          />
        </div>
        <div className=" mb-4">
          <input
            type="password"
            name="password"
            className=" w-full bg-black1 p-4 rounded outline-none text-white"
            placeholder="Password"
            value={state.password}
            onChange={handleInputs}
          />
        </div>
        <div className=" mb-4">
          <input
            type="submit"
            value={response.isLoading ? "Loading..." : "sign in"}
            className=" bg-indigo-600 w-full p-4 rounded text-white uppercase font-semibold cursor-pointer"
          />
        </div>
        <div>
          <Link to="/" className="  text-white capitalize ">
            <i className="bi bi-arrow-left"></i> home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;

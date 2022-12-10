import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { setSuccess } from "../../store/reducers/globalReducer";

import {
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
} from "../../store/services/categoryService";
import Wrapper from "./Wrapper";

const UpdateCategory = () => {
  const [state, setState] = useState("");
  const { id } = useParams();

  const { data, isFetching } = useFetchCategoryQuery(id);

  useEffect(() => {
    data?.category && setState(data.category?.name);
  }, [data?.category]);

  const [saveUpdate, response] = useUpdateCategoryMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];

  const updateSubmit = (e) => {
    e.preventDefault();
    saveUpdate({ name: state, id });
  };

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(setSuccess(response?.data?.message));
      navigate("/dashboard/categories");
    }
  }, [response.isSuccess, dispatch, navigate, response?.data?.message]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/categories" className=" btn-dark">
          <i className="bi bi-arrow-left"></i> category list
        </Link>
      </ScreenHeader>

      {!isFetching ? (
        <form className=" w-full md:w-8/12 " onSubmit={updateSubmit}>
          <h3 className=" text-lg capitalize mb-3 ">update category</h3>

          {errors.length > 0 &&
            errors.map((error, key) => (
              <p className="alert-danger" key={key}>
                {error.msg}
              </p>
            ))}

          <div className=" mb-3">
            <input
              type="text"
              name=""
              className="form-control"
              placeholder=" Category Name ..."
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="submit"
              value={response.isLoading ? "loading..." : "update category"}
              className=" btn btn-indigo"
            />
          </div>
        </form>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default UpdateCategory;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { clearMessage, setSuccess } from "../../store/reducers/globalReducer";
import {
  useDeleteCategoryMutation,
  useGetQuery,
} from "../../store/services/categoryService";
import Wrapper from "./Wrapper";

const Categories = () => {
  const { success } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();

  let { page } = useParams();
  if (!page) page = 1;

  const { data = [], isFetching } = useGetQuery(page);

  const [removeCategory, response] = useDeleteCategoryMutation();

  //      *********  Delete category  *********
  const deleteCategory = (category) => {
    const catgId = category._id;
    const catgName = category.name;

    if (window.confirm(`Are you sure to Delete " ${catgName} " category ?`)) {
      removeCategory(catgId);
    }
  };

  // *********** Deleting Effect   **********

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(setSuccess(response.data?.msg));
    }
  }, [response?.data?.msg, dispatch, response.isSuccess]);

  // *********** All Effect   **********

  useEffect(() => {
    dispatch(setSuccess(success));

    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch, success]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/create-category" className=" btn-dark">
          add category <i className="bi bi-plus-lg"></i>
        </Link>
      </ScreenHeader>
      {success && <div className="alert-success"> {success} </div>}
      {!isFetching ? (
        data?.categories?.length > 0 && (
          <>
            <div>
              <table className=" dashboard-table ">
                <thead>
                  <tr className="dashboard-tr">
                    <th className=" dashboard-th ">name</th>
                    <th className=" dashboard-th ">edit</th>
                    <th className=" dashboard-th ">delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.categories?.map((category) => (
                    <tr key={category._id} className=" odd:bg-gray-800 ">
                      <td className=" p-3 capitalize text-sm font-normal text-gray-400  ">
                        {category.name}
                      </td>
                      <td className=" p-3 capitalize text-sm font-normal text-gray-400  ">
                        <Link
                          to={`/dashboard/update-category/${category._id} `}
                          className=" btn btn-warning "
                        >
                          edit
                        </Link>
                      </td>
                      <td className=" p-3  text-sm font-normal text-gray-400  ">
                        <button
                          className="btn btn-danger capitalize"
                          onClick={() => deleteCategory(category)}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path="dashboard/categories"
            />
          </>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Categories;

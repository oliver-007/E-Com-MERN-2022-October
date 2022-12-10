import React, { useEffect } from "react";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { clearMessage, setSuccess } from "../../store/reducers/globalReducer";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../store/services/productService";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

const Products = () => {
  let { page } = useParams();

  if (!page) {
    page = 1;
  }

  const { data = [], isFetching } = useGetProductsQuery(page);

  const { success } = useSelector((state) => state.globalReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    return () => {
      dispatch(clearMessage());
    };
  }, [success]);

  // ******* delete product -- RTK Query hooks   *******

  const [delProduct, response] = useDeleteProductMutation();

  // ********** delete success msg showing  ***********

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
    }
  }, [response?.data?.msg]);

  // ********* delete product func  *********

  const deleteProduct = (product) => {
    if (window.confirm(`Are you sure to delete " ${product.title} " ?`)) {
      delProduct(product._id);
    }
  };

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/create-product" className=" btn-dark">
          add product <i className="bi bi-plus-lg"></i>
        </Link>
      </ScreenHeader>

      <Toaster position="top-center" />

      {!isFetching ? (
        data?.products?.length > 0 ? (
          <div>
            <table className="dashboard-table">
              <thead>
                <tr className=" dashboard-tr">
                  <th className="dashboard-th ">name</th>
                  <th className="dashboard-th ">price</th>
                  <th className="dashboard-th ">stock</th>
                  <th className="dashboard-th ">image</th>
                  <th className="dashboard-th ">edit</th>
                  <th className="dashboard-th ">delete</th>
                </tr>
              </thead>

              <tbody>
                {data?.products?.map((product) => (
                  <tr className=" odd:bg-gray-800  " key={product._id}>
                    <td className=" p-3 capitalize text-sm font-normal text-gray-400">
                      {" "}
                      {product.title}{" "}
                    </td>
                    <td className=" p-3 capitalize text-sm font-normal text-gray-400">
                      {" "}
                      {product.price}{" "}
                    </td>
                    <td className=" p-3 capitalize text-sm font-normal text-gray-400">
                      {" "}
                      {product.stock}{" "}
                    </td>
                    <td className=" p-3 capitalize text-sm font-normal text-gray-400">
                      <img
                        src={`/images/${product.image1}`}
                        alt="name"
                        className=" w-20 h-20 rounded-md object-cover"
                      />
                    </td>
                    <td className=" p-3 capitalize text-sm font-normal text-gray-400">
                      <Link
                        to={`/dashboard/edit-product/${product._id}`}
                        className="btn btn-warning"
                      >
                        edit{" "}
                      </Link>
                    </td>
                    <td className=" p-3 capitalize text-sm font-normal text-gray-400">
                      <span
                        className=" btn btn-danger cursor-pointer"
                        onClick={() => deleteProduct(product)}
                      >
                        {" "}
                        delete{" "}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path="dashboard/products"
            />
          </div>
        ) : (
          "No Products"
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Products;

import React from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { useGetOrdersQuery } from "../../store/services/orderService";
import Wrapper from "./Wrapper";

const Orders = () => {
  let { page } = useParams();
  page = page ? page : 1;
  const { data, isFetching } = useGetOrdersQuery(page);
  console.log("data", data);

  return (
    <Wrapper>
      <ScreenHeader>Orders</ScreenHeader>
      {!isFetching ? (
        data?.orders?.length > 0 && (
          <>
            <div className=" overflow-x-auto">
              <table className="dashboard-table">
                <thead>
                  <tr className="dashboard-tr">
                    <th className="dashboard-th">title</th>
                    <th className="dashboard-th">quantity</th>
                    <th className="dashboard-th">image</th>
                    <th className="dashboard-th">received</th>
                    <th className="dashboard-th">delivered</th>
                    <th className="dashboard-th">details</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.orders?.map((order) => (
                    <tr key={order._id}>
                      <td className="dashboard-td">{order.productId.title}</td>
                      <td className="dashboard-td">{order.quantities}</td>
                      <td className="dashboard-td">
                        <img
                          src={`/images/${order.productId.image1}`}
                          alt={order.title}
                          className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] rounded-full object-cover "
                        />
                      </td>
                      <td className="dashboard-td">
                        {order.received ? "Yes" : "No"}
                      </td>
                      <td className="dashboard-td">
                        {order.status ? "Yes" : "No"}
                      </td>
                      <td className="dashboard-td">
                        <Link to="" className="btn btn-indigo ">
                          details
                        </Link>
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
              path="dashboard/orders"
            />
          </>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Orders;

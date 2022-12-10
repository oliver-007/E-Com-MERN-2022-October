import React from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import Nav from "../../components/home/Nav";
import { useGetProductQuery } from "../../store/services/productService";
import DetailsCard from "../../components/home/DetailsCard";
import ProductLoader from "../../components/home/ProductLoader";

const Prodcut = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetProductQuery(id);

  console.log(data);

  return (
    <>
      <Nav />
      <div className="my-container mt-24">
        {isFetching ? (
          <ProductLoader />
        ) : (
          <>
            {" "}
            <ul className="flex items-center  ">
              <li className=" capitalize text-gray-600">
                <Link to="/">home</Link>
              </li>
              <MdOutlineKeyboardArrowRight />
              <li className=" capitalize text-gray-600">
                <Link to={`/cat-products/${data.category}`}>
                  {data.category}
                </Link>
              </li>
              <MdOutlineKeyboardArrowRight />
              <li className="capitalize text-gray-600">
                <Link to={`/product/${data._id}`}>{data.title}</Link>
              </li>
            </ul>
            <DetailsCard product={data} />
          </>
        )}
      </div>
    </>
  );
};

export default Prodcut;

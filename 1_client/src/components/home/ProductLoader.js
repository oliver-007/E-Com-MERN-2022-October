import React from "react";
import Skeleton from "../skeleton/Skeleton";
import Thumbnail from "../skeleton/Thumbnail";
import Text from "../skeleton/Text";
import Circle from "../skeleton/Circle";

const ProductLoader = () => {
  return (
    <Skeleton>
      <div className="flex flex-wrap -mx-5">
        <div className="w-full md:w-6/12 p-5 order-2 md:order-1 lg:order-1  ">
          <div className=" flex flex-wrap -mx-1 ">
            <Thumbnail height="400px" />
          </div>
        </div>
        <div className="w-full md:w-6/12 p-5 order-1 md:order-2 lg:order-2 ">
          <h1 className=" text-2xl font-bold text-gray-900 capitalize ">
            <Text mt="10px" />
          </h1>
          <div className=" flex justify-between my-5">
            <span className=" text-2xl font-bold text-gray-900">
              <Text mt="10px" />
            </span>
            <span className=" text-xl line-through text-gray-500 ">
              <Text mt="10px" />
            </span>
          </div>

          <div>
            <h3 className=" text-base font-medium capitalize text-gray-600 mb-3  ">
              <Text mt="10px" />
            </h3>
            <div className=" flex flex-wrap -mx-1 ">
              <div className=" p-2 m-1 border border-gray-300  rounded cursor-pointer">
                <span className=" text-sm font-semibold uppercase text-gray-900 ">
                  <Circle />
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className=" text-base font-medium capitalize text-gray-600 mb-2 mt-3">
              <Text mt="10px" />
            </h3>
            <div className=" flex flex-wrap -mx-1 ">
              <div className=" border border-gray-300 rounded m-1 p-1 cursor-pointer ">
                <span className="min-w-[40px] min-h-[40px] rounded flex items-center justify-center">
                  <Circle />
                </span>
              </div>
            </div>
          </div>

          <h3 className=" text-base font-medium capitalize text-gray-600 mb-2 mt-3">
            <Text mt="10px" />
          </h3>
          <Text mt="10px" />
        </div>
      </div>
    </Skeleton>
  );
};

export default ProductLoader;

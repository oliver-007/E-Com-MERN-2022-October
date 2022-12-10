import React from "react";

const DetailsImage = ({ product, imgNo }) => {
  let img = product[`image${imgNo}`];
  return (
    <div className="w-full sm:w-6/12 p-1 ">
      <img
        src={`/images/${img}`}
        alt="product"
        className=" w-full h-auto object-cover "
      />
    </div>
  );
};

export default DetailsImage;

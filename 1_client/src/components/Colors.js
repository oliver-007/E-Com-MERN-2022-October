import React from "react";

const Colors = ({ colors, deleteColor }) => {
  return (
    <div>
      {colors.length > 0 && <h1 className="right-heading">colors list</h1>}
      {colors.length > 0 && (
        <div className=" flex flex-wrap -mx-1">
          {colors.map((color) => (
            <div className=" p-1" key={color.id}>
              <div
                className=" w-[30px] h-[30px] rounded-full cursor-pointer "
                style={{ background: color.color }}
                onClick={() => deleteColor(color.id)}
              ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Colors;

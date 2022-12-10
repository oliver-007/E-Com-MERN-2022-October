import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import h2p from "html2plaintext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TwitterPicker } from "react-color";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { useAllcategoriesQuery } from "../../store/services/categoryService";
import Spinner from "../../components/Spinner";
import Colors from "../../components/Colors";
import SizeList from "../../components/SizeList";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../store/services/productService";
import { setSuccess } from "../../store/reducers/globalReducer";

const EditProduct = () => {
  const { id } = useParams();
  const { data: product, isFetching: fetching } = useGetProductQuery(id);

  const { data = [], isFetching } = useAllcategoriesQuery();

  //   ********** description state  **********
  const [value, setValue] = useState("");

  //   ********** product state  ************
  const [state, setState] = useState({
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    category: "",
    colors: [],
  });

  // ********* Sizes state : ********

  const [sizes] = useState([
    { name: "xsm" },
    { name: "sm" },
    { name: "md" },
    { name: "lg" },
    { name: "1y" },
    { name: "2y" },
    { name: "3y" },
    { name: "4y" },
    { name: "5y" },
  ]);

  const [sizeList, setSizeList] = useState([]);

  // ****** handle input func  ******

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // *******  save colors func  *******
  const saveColors = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.hex);
    setState({
      ...state,
      colors: [...filtered, { color: color.hex, id: uuidv4() }],
    });
  };

  // *********  delete color func  *********

  const deleteColor = (id) => {
    const filteredColors = state.colors.filter((clr) => clr.id !== id);
    setState({ ...state, colors: filteredColors });
  };

  // choose Size func

  const chooseSize = (sizeObject) => {
    const filteredSize = sizeList.filter(
      (size) => size.name !== sizeObject.name
    );
    setSizeList([...filteredSize, sizeObject]);
  };

  // ******** delete Size  *******
  const deleteSize = (name) => {
    const filteredSize = sizeList.filter((size) => size.name !== name);
    setSizeList(filteredSize);
  };

  // ******* update Product -- RTK Query hooks  ********
  const [updateProduct, response] = useUpdateProductMutation();

  // *******  Submit product func  ********

  const createPro = (e) => {
    e.preventDefault();
    updateProduct(state);
  };

  // ******** ERROR msg showing Toast func ********
  useEffect(() => {
    if (!response.isSuccess) {
      response?.error?.data?.errors.map((err) => toast.error(err.msg));
    }
  }, [response?.error?.data?.errors]);

  // ******* Success Msg showing func  **********
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
      navigate("/dashboard/products");
    }
  }, [response.isSuccess]);

  //  ****** fetching remaining state from DB *****

  useEffect(() => {
    if (!fetching) {
      setState(product);
      setSizeList(product.sizes);
      setValue(h2p(product.description));
    }
  }, [product]);

  // *******  description state update  *********

  useEffect(() => {
    setState({ ...state, description: value });
  }, [value]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/products" className=" btn-dark">
          <i className="bi bi-arrow-left"></i> products list
        </Link>
      </ScreenHeader>

      {/* *******   Toaster  ********* */}

      <Toaster position=" top-right" reverseOrder={true} />

      {!fetching ? (
        <div className=" flex flex-wrap -mx-3">
          <form className=" w-full xl:w-8/12 p-3" onSubmit={createPro}>
            <h3 className=" pl-3 capitalize text-lg font-medium text-gray-400">
              {" "}
              edit product{" "}
            </h3>

            <div className=" flex flex-wrap">
              <div className=" w-full md:w-6/12 p-3">
                <label htmlFor="title" className="label">
                  title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title..."
                  className=" form-control"
                  value={state.title}
                  onChange={handleInput}
                />
              </div>
              <div className=" w-full md:w-6/12 p-3">
                <label htmlFor="price" className="label">
                  price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="price..."
                  className=" form-control"
                  value={state.price}
                  onChange={handleInput}
                />
              </div>
              <div className=" w-full md:w-6/12 p-3">
                <label htmlFor="discount" className="label">
                  discount
                </label>
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="discount..."
                  className=" form-control"
                  value={state.discount}
                  onChange={handleInput}
                />
              </div>
              <div className=" w-full md:w-6/12 p-3">
                <label htmlFor="stock" className="label">
                  stock
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  placeholder="stock..."
                  className=" form-control"
                  value={state.stock}
                  onChange={handleInput}
                />
              </div>

              {/* categories */}

              <div className=" w-full md:w-6/12 p-3">
                <label htmlFor="categories" className="label">
                  categories
                </label>

                {!isFetching ? (
                  data?.categories?.length > 0 && (
                    <select
                      name="category"
                      id="categories"
                      className="form-control"
                      value={state.category}
                      onChange={handleInput}
                    >
                      <option value="">Choose category</option>
                      {data?.categories?.map((category) => (
                        <option value={category.name} key={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  )
                ) : (
                  <Spinner />
                )}
              </div>

              {/* showing colors */}

              <div className=" w-full md:w-6/12 p-3">
                <label htmlFor="colors" className="label">
                  choose colors
                </label>
                <TwitterPicker onChangeComplete={saveColors} />
              </div>

              {/* showing sizes */}

              <div className=" w-full  p-3">
                <label htmlFor="sizes" className="label">
                  choose sizes
                </label>

                {sizes.length > 0 && (
                  <div className=" flex flex-wrap -mx-3 ">
                    {sizes.map((size) => (
                      <div
                        key={size.name}
                        className="size"
                        onClick={() => chooseSize(size)}
                      >
                        {size.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ****** Text Editor ****** */}

              <div className=" w-full p-3">
                <label htmlFor="description" className="label">
                  {" "}
                  description{" "}
                </label>
                <ReactQuill
                  id="description"
                  theme="snow"
                  placeholder="Description..."
                  value={value}
                  onChange={setValue}
                />
              </div>

              <div className=" w-full p-3">
                <input
                  type="submit"
                  value={response.isLoading ? "Loading..." : "save product"}
                  disabled={response.isLoading ? true : false}
                  className=" btn btn-indigo"
                />
              </div>
            </div>
          </form>

          {/* ******** Preview section :  selected Color + Size + images ******* */}

          <div className=" w-full xl:w-4/12 p-3">
            <Colors colors={state.colors} deleteColor={deleteColor} />
            <SizeList list={sizeList} deleteSize={deleteSize} />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default EditProduct;

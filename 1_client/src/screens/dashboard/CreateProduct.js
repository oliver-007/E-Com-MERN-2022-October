import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
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
import ImgPreview from "../../components/ImgPreview";
import { useCProductMutation } from "../../store/services/productService";
import { setSuccess } from "../../store/reducers/globalReducer";

const CreateProduct = () => {
  const { data = [], isFetching } = useAllcategoriesQuery();
  const [value, setValue] = useState("");

  const [state, setState] = useState({
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    category: "",
    colors: [],
    image1: "",
    image2: "",
    image3: "",
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

  // ********* product image preview state  **********

  const [preview, setPreview] = useState({
    image1: "",
    image2: "",
    image3: "",
  });

  //  ********** preview image handle func   *********

  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({ ...state, [e.target.name]: e.target.files[0] });

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview({ ...preview, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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

  // ******* Create Product -- RTK Query hooks  ********

  const [createNewProduct, response] = useCProductMutation();

  // *******  Submit product func  ********

  const createPro = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", JSON.stringify(state));
    formData.append("sizes", JSON.stringify(sizeList));
    formData.append("description", value);
    formData.append("image1", state.image1);
    formData.append("image2", state.image2);
    formData.append("image3", state.image3);

    createNewProduct(formData);
  };

  // ******** ERROR msg showing Toast func ********
  useEffect(() => {
    if (!response.isSuccess) {
      response?.error?.data?.errors.map((err) => toast.error(err.msg));
    }
  }, [response?.error?.data?.errors, response.isSuccess]);

  // ******* Success Msg showing func  **********
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (response.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
      navigate("/dashboard/products");
    }
  }, [response?.data?.msg]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/products" className=" btn-dark">
          <i className="bi bi-arrow-left"></i> products list
        </Link>
      </ScreenHeader>

      {/* *******   Toaster  ********* */}

      <Toaster position=" top-right" reverseOrder={true} />

      <div className=" flex flex-wrap -mx-3">
        <form className=" w-full xl:w-8/12 p-3" onSubmit={createPro}>
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

            {/* ****** file input  ****** */}

            <div className=" w-full p-3">
              <label htmlFor="image1" className="label">
                Image 1
              </label>
              <input
                type="file"
                id="image1"
                name="image1"
                className="input-file"
                onChange={imageHandle}
              />
            </div>
            <div className=" w-full p-3">
              <label htmlFor="image2" className="label">
                Image 2
              </label>
              <input
                type="file"
                id="image2"
                name="image2"
                className="input-file"
                onChange={imageHandle}
              />
            </div>
            <div className=" w-full p-3">
              <label htmlFor="image3" className="label">
                Image 3
              </label>
              <input
                type="file"
                id="image3"
                name="image3"
                className="input-file"
                onChange={imageHandle}
              />
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
          <ImgPreview url={preview.image1} heading="image 1" />
          <ImgPreview url={preview.image2} heading="image 2" />
          <ImgPreview url={preview.image3} heading="image 3" />
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;

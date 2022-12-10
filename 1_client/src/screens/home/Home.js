import React from "react";
import Categories from "../../components/home/Categories";
import HomeProduct from "../../components/home/HomeProduct";
import Nav from "../../components/home/Nav";
import Slider from "../../components/home/Slider";
import { useRandomCategoriesQuery } from "../../store/services/categoryService";

const Home = () => {
  const { data, isFetching } = useRandomCategoriesQuery();

  return (
    <>
      <Nav />
      <div className=" mt-[75px]">
        <Slider />
      </div>
      <div className="my-container mt-10 ">
        <Categories />
        {!isFetching &&
          data?.categories.map((category) => (
            <HomeProduct category={category} key={category._id} />
          ))}
      </div>
    </>
  );
};

export default Home;

import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import ProductList from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

function Home() {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <ProductList category={"airpodes"} heading={"Popular Airpodes"}/>
      <ProductList category={"earphones"} heading={"Popular Earphones"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Popular Mobiles"}/>
      <VerticalCardProduct category={"television"} heading={"Popular Television"}/>
      <VerticalCardProduct category={"camera"} heading={"Popular Camera"}/>


    </div>
  );
}

export default Home;

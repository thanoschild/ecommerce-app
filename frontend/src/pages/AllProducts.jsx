import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import summaryApi from "../common";
import ProductCard from "../components/ProductCard";

function AllProducts() {
  const [openUploadProduct, SetOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  async function fetchAllProduct() {
    const fetchResponse = await fetch(summaryApi.allProduct.url, {
      method: summaryApi.allProduct.method,
    });

    const dataResponse = await fetchResponse.json();
    setAllProduct(dataResponse?.data || []);
  }

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => SetOpenUploadProduct(true)}
        >
          Add Product
        </button>
      </div>

      <div className="flex justify-start flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => {
          return (
            <ProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct}/>
          );
        })}
      </div>

      {openUploadProduct && (
        <UploadProduct onClose={() => SetOpenUploadProduct(false)} fetchdata={fetchAllProduct}/>
      )}
    </div>
  );
}

export default AllProducts;

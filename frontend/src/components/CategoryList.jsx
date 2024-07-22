import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import { Link } from "react-router-dom";

export default function CategoryList() {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(13).fill(null);

  async function fetchCategoryProduct() {
    setLoading(true);
    const fetchResponse = await fetch(summaryApi.categoryProduct.url, {
      method: summaryApi.categoryProduct.method,
    });

    const responseData = await fetchResponse.json();
    setLoading(false);
    setCategoryProducts(responseData.data);
  }

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between gap-4 overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  key={index + "categoryLoading"}
                ></div>
              );
            })
          : categoryProducts.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product?.category}
                  className="cursor-pointer"
                  key={"product" + index}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                    <img
                      src={product?.productImage[0]}
                      alt={product.category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
}

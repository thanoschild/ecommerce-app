import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import EditProduct from "./EditProduct";
import displayCurrency from "../helpers/DisplayCurrency";

function ProductCard({ data, fetchdata }) {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded w-60 h-[310px]">
      <div className="">
        <img
          src={data?.productImage[0]}
          alt=""
          className="w-44 h-44 mx-auto object-cover"
        />
        <h1 className="mx-auto text-ellipsis line-clamp-2">{data.productName}</h1>
        <div className="">
          <p className="font-semibold">{displayCurrency(data.sellingPrice)}</p>
          <div
            className="w-fit ml-auto p-2 bg-green-300 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editProduct && (
        <EditProduct
          product={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
}

export default ProductCard;

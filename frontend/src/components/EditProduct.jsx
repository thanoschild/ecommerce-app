import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import productCatagory from "../helpers/ProductCatagory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/UploadImage";
import DisplayImage from "./DisplayImage";
import { MdDeleteOutline } from "react-icons/md";
import summaryApi from "../common";
import { toast } from "react-toastify";

function EditProduct({onClose, product, fetchdata}) {
  const [data, setData] = useState({
    ...product,
    productName: product?.productName,
    brandName: product?.brandName,
    category: product?.category,
    productImage: product?.productImage || [],
    description: product?.description,
    price: product?.price,
    sellingPrice: product?.sellingPrice,
  });
  const [fullImage, setFullImage] = useState("");
  const [fullScreen, setFullScreen] = useState(false);

  function handleOnChange(e) {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleUploadProduct(e) {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  }

  async function handleDeleteProductImage(index) {
    const newProductImages = [...data.productImage];
    newProductImages.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImages],
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const fetchData = await fetch(summaryApi.updateProduct.url, {
      method: summaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await fetchData.json();
    if (resData.success) {
      toast.success(resData.message);
      onClose();
      fetchdata();
    }
    if (resData.error) {
      toast.error(resData.message);
    }
    console.log("data: ", resData);
  }

  return (
    <div className="fixed bg-red-200 bg-opacity-30 w-full h-full top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between text-xl font-bold pb-3">
          <div className="">Edit product</div>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-500 cursor-pointer"
            onClick={onClose}
          >
            <IoClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name: </label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="enter product name"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          ></input>

          <label htmlFor="productName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="enter brand name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          ></input>

          <label htmlFor="brandName" className="mt-3">
            Product Name:{" "}
          </label>
          <select
            value={data.category}
            name="category"
            className="p-2 bg-slate-100 border rounded"
            required
            onChange={handleOnChange}
          >
            <option value="">Select Catagory</option>
            {productCatagory.map((element, index) => {
              return (
                <option value={element.value} key={element.value + index}>
                  {element.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="brandName" className="mt-3">
            Product Image:
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-3xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div className="">
            {data.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((element, index) => {
                  return (
                    <div className="relative group" key={index}>
                      <img
                        src={element}
                        alt={element}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setFullScreen(true);
                          setFullImage(element);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDeleteOutline />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please upload product image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="enter price"
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          ></input>

          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price:
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="enter sellingPrice"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          ></input>

          <label htmlFor="description" className="mt-3">
            Description:
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="enter product description"
            rows={3}
            name="description"
            value={data.description}
            onChange={handleOnChange}
            required
          ></textarea>

          <button className="px-3 py-1 mb-10 bg-red-500 text-white hover:bg-red-600">
            Update Product
          </button>
        </form>
      </div>
      {fullScreen && (
        <DisplayImage
          imageUrl={fullImage}
          onClose={() => setFullScreen(false)}
        />
      )}
    </div>
  );
}

export default EditProduct;

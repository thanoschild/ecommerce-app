import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import moment from "moment";
import displayCurrency from "../helpers/DisplayCurrency";

function OrderPage() {
  const [data, setData] = useState([]);

  async function fetchOrderDetails() {
    const response = await fetch(summaryApi.order.url, {
      method: summaryApi.order.method,
      credentials: "include",
    });

    const resData = await response.json();
    setData(resData.data);
  }

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div>
      {!data[0] && <p>No Order available</p>}
      <div className="p-4 w-full">
        {data.map((item, index) => {
          return (
            <div className="border" key={item.userId + index}>
              <p className="text-lg font-semibold">
                {moment(item.createdAt).format("LL")}
              </p>
              <div className="border rounded">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="grid gap-1">
                    {item?.productDetails.map((product, index) => {
                      return (
                        <div
                          className="flex gap-3 bg-slate-100"
                          key={product + index}
                        >
                          <img
                            src={product.image[0]}
                            className="w-28 h-28 bg-slate-200 object-scale-down p-2"
                            alt=""
                          />
                          <div className="">
                            <div className="font font-medium text-lg text-ellipsis line-clamp-1">
                              {product.name}
                            </div>
                            <div className="flex items-center gap-5 mt-1">
                              <div className="text-lg text-red-500">
                                {displayCurrency(product.price)}
                              </div>
                              <p>Quantity: {product.quantity}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                    <div className="">
                      <div className="text-lg font-medium">Payment Details:</div>
                      <p className="ml-1">
                        Payment Method:{" "}
                        {item.paymentDetails.payment_method_type}
                      </p>
                      <p className="ml-1">
                        Payment Status: {item.paymentDetails.payment_status}
                      </p>
                    </div>
                    <div className="">
                      <div className="text-lg font-medium">
                        Shipping Details
                      </div>
                      {item.shipping_options.map((shipping, index) => {
                        return (
                          <div
                            className="ml-1"
                            key={shipping + index}
                          >
                            Shipping Amount: {shipping.shipping_amount}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="font-semibold ml-auto w-fit text-lg min-w-[300px]">
                  Total Amount: {displayCurrency(item.totalAmount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderPage;

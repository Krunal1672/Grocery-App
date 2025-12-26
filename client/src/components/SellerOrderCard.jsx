import React from "react";
import { assets } from "../assets/assets";

const SellerOrderCard = ({ order }) => {
  // ✅ Safely get first available product image
  const getOrderImage = () => {
    const firstItem = order.items?.find(
      (item) => item.product?.image?.length
    );

    return firstItem
      ? `http://localhost:5000/images/${firstItem.product.image[0]}`
      : assets.box_icon;
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800">
      
      {/* Products */}
      <div className="flex gap-5">
        <img
          className="w-12 h-12 object-cover opacity-60"
          src={getOrderImage()}
          alt="order"
        />

        <div>
          {order.items?.map((item, index) => {
            if (!item.product) {
              return (
                <p key={index} className="text-red-500 text-sm">
                  Product not available
                </p>
              );
            }

            return (
              <p key={index} className="font-medium">
                {item.product.name}
                <span
                  className={`text-indigo-500 ${
                    item.quantity < 2 && "hidden"
                  }`}
                >
                  {" "}x {item.quantity}
                </span>
              </p>
            );
          })}
        </div>
      </div>

      {/* Address */}
      <div className="text-sm">
        {order.address ? (
          <>
            <p className="font-medium mb-1">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state}, {order.address.zipcode},{" "}
              {order.address.country}
            </p>
          </>
        ) : (
          <p className="text-red-500">Address not available</p>
        )}
      </div>

      {/* Amount */}
      <p className="font-medium text-base my-auto text-black/70">
        ${order.amount}
      </p>

      {/* Meta */}
      <div className="flex flex-col text-sm">
        <p>Method: {order.paymentType}</p>
        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
      </div>
    </div>
  );
};

export default SellerOrderCard;

import React from "react";

const OrderItem = ({ item, order, isLast }) => {
  // ✅ Guard: product may be null/undefined
  if (!item?.product) {
    return (
      <div className="p-4 text-red-500 border-b border-gray-300">
        Product not available
      </div>
    );
  }

  const { product, quantity } = item;

  return (
    <div
      className={`relative bg-white text-gray-800/70 ${
        !isLast && "border-b"
      } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 w-full max-w-4xl`}
    >
      <div className="flex items-center mb-4 md:mb-0">
        <div className="p-4 rounded-lg">
          {product.image?.length > 0 && (
            <img
              src={`http://localhost:5000/images/${product.image[0]}`}
              alt={product.name}
              className="w-16 h-16"
            />
          )}
        </div>

        <div className="ml-4">
          <h2 className="text-xl font-medium">{product.name}</h2>
          <p>{product.category}</p>
        </div>
      </div>

      <div className="text-lg font-medium">
        <p>Quantity: {quantity}</p>
        <p>Status: {order.status}</p>
        <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      <p className="text-lg">
        Amount: ${product.offerPrice * quantity}
      </p>
    </div>
  );
};

export default OrderItem;

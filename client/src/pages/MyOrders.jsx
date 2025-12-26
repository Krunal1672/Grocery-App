import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import OrderItem from "../components/OrderItem";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");

      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="mt-12 pb-16">
      <p className="text-2xl md:text-3xl font-medium">My Orders</p>

      {myOrders.map((order) => (
        <div
          key={order._id}
          className="my-8 border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
        >
          <p className="flex justify-between items-center gap-6 mb-4">
            <span>Order ID: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>Total: ₹{order.amount}</span>
          </p>

          {order.items.map((item, index) => (
            <OrderItem
              key={index}
              item={item}
              order={order}
              isLast={index === order.items.length - 1}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;

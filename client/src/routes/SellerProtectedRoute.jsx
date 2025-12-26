import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import SellerLogin from "../components/seller/SellerLogin";

const SellerProtectedRoute = ({ children }) => {
  const { isSeller } = useContext(AppContext);

  // while checking auth (optional safety)
  if (isSeller === null || isSeller === undefined) return null;

  if (!isSeller) {
    return <SellerLogin />;
  }

  return children;
};

export default SellerProtectedRoute;

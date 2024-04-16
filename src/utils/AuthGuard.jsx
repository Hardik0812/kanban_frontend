import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthGuard;

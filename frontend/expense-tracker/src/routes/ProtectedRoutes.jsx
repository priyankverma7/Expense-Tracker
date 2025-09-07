import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// ✅ For pages that require login
export const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" />;
  }
  return children;
};

// ✅ For pages that should not be visible if logged in (login/signup)
export const PublicRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");

  if (token && user) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

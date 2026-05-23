import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getIsAuthed } from "@/auth/storage";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  if (!getIsAuthed()) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }
  return children;
};

export default ProtectedRoute;


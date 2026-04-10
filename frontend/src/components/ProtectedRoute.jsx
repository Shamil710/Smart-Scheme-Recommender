import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PageLoader } from "./Loader";
import React from "react";

export default function ProtectedRoute() {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <PageLoader />;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

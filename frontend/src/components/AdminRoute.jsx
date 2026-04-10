import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PageLoader } from "./Loader";
import { useEffect } from "react";
import React from "react";

export default function AdminRoute() {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { PageLoader } from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ExploreSchemes from "./pages/ExploreSchemes";
import SchemeDetails from "./pages/SchemeDetails";
import EligibilityCheck from "./pages/EligibilityCheck";
import Results from "./pages/Results";
import SavedSchemes from "./pages/SavedSchemes";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSchemes from "./pages/AdminSchemes";
import AddScheme from "./pages/AddSchemes";
import EditScheme from "./pages/EditSchemes";

export default function App() {
  const { loading } = useAuth();

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<ExploreSchemes />} />
          <Route path="/schemes/:id" element={<SchemeDetails />} />

          {/* Protected (user) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved" element={<SavedSchemes />} />
            <Route path="/eligibility" element={<EligibilityCheck />} />
            <Route path="/results" element={<Results />} />
          </Route>

          {/* Admin only */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/schemes" element={<AdminSchemes />} />
            <Route path="/admin/add" element={<AddScheme />} />
            <Route path="/admin/edit/:id" element={<EditScheme />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

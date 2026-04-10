import React from "react";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAdmin, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const userLinks = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/saved", label: "Saved" },
    { to: "/eligibility", label: "Check Eligibility" },
  ];

  const adminLinks = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/schemes", label: "Manage Schemes" },
    { to: "/admin/add", label: "Add Scheme" },
  ];

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore Schemes" },
  ];

  const navLinks = isLoggedIn
    ? isAdmin
      ? adminLinks
      : userLinks
    : publicLinks;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 nav-blur border-b border-slate-100 shadow-sm">
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-navy-700 to-civic-600 flex items-center justify-center shadow-md">
              <span className="text-white font-heading font-bold text-sm">
                GS
              </span>
            </div>
            <div>
              <span className="font-heading font-bold text-navy-800 text-lg leading-none">
                GovScheme
              </span>
              {isAdmin && (
                <span className="ml-2 tag bg-amber-50 text-amber-700 border border-amber-200 text-[10px]">
                  Admin
                </span>
              )}
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? "bg-navy-700 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-navy-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth actions */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-600 to-civic-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {user?.name?.split(" ")[0]}
                  </span>
                </Link>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="btn-secondary text-sm py-2"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm py-2">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`h-0.5 bg-current rounded transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <span
                className={`h-0.5 bg-current rounded transition-all ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 bg-current rounded transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white overflow-hidden"
          >
            <div className="page-container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.to)
                      ? "bg-navy-700 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-slate-100 mt-2 pt-2 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Profile ({user?.name})
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn-secondary text-sm py-2.5 text-left px-4"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="btn-secondary text-sm text-center"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="btn-primary text-sm text-center"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

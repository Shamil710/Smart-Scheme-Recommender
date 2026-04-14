//

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { useEffect } from "react";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const role = user.role?.trim();

      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await login(form);
      console.log("🚀 Login result in Login.jsx:", res);

      // ✅ NO NAVIGATION HERE
    } catch (err) {
      console.error("❌ Login error:", err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Invalid email or password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!form.email || !form.password) {
  //     setError("Please fill in all fields.");
  //     return;
  //   }

  //   setLoading(true);
  //   setError("");

  //   try {
  //     // login() in AuthContext calls authService.login()
  //     // which saves token, sets user state, and returns { success, data: { token, user } }
  //     const res = await login(form);

  //     console.log("🚀 Login result in Login.jsx:", res);

  //     // Redirect based on role
  //     const role = (res.data.role || res.data.user?.role)?.trim();
  //     console.log("ROLE:", role, "| length:", role.length);
  //     if (role === "admin") {
  //       navigate("/admin", { replace: true });
  //     } else {
  //       navigate("/dashboard", { replace: true });
  //     }
  //   } catch (err) {
  //     console.error("❌ Login error:", err);
  //     const msg =
  //       err.response?.data?.message ||
  //       err.message ||
  //       "Invalid email or password.";
  //     setError(msg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-8"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-700 to-civic-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-heading font-bold text-xl">
                GS
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-navy-800">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Sign in to your GovScheme account
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input-field"
                autoComplete="email"
                disabled={loading}
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input-field"
                autoComplete="current-password"
                disabled={loading}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <Loader size="sm" /> : "Sign In"}
            </motion.button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-civic-600 font-medium hover:text-civic-700"
            >
              Create one free
            </Link>
          </p>
        </motion.div>

        {/* Demo hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800"
        >
          <p className="font-semibold mb-1">Demo Credentials</p>
          <p>User: user@demo.com / password123</p>
          <p>Admin: admin@demo.com / admin123</p>
        </motion.div>
      </div>
    </div>
  );
}

import React from "react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { adminService } from "../services/adminService";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getAllSchemes()
      .then((res) => {
        if (res.success) setSchemes(res.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categoryBreakdown = schemes.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {});

  const stateBreakdown = schemes.reduce((acc, s) => {
    const key = s.state || "All India";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 7);

  const quickActions = [
    {
      to: "/admin/add",
      icon: "➕",
      label: "Add New Scheme",
      desc: "Create a new government scheme",
      color: "from-green-500 to-emerald-600",
    },
    {
      to: "/admin/schemes",
      icon: "📋",
      label: "Manage Schemes",
      desc: "Edit or delete existing schemes",
      color: "from-navy-600 to-civic-600",
    },
    {
      to: "/explore",
      icon: "👁️",
      label: "Preview Portal",
      desc: "See user-facing scheme list",
      color: "from-purple-500 to-violet-600",
    },
  ];

  return (
    <div className="page-container py-8 animate-fade-in">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <span className="tag bg-amber-50 text-amber-700 border border-amber-200">
            👑 Admin Panel
          </span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-navy-800">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Welcome back, {user?.name}. Here's your system overview.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {[
          {
            label: "Total Schemes",
            value: loading ? "—" : schemes.length,
            icon: "📋",
            color: "text-navy-700 bg-navy-50",
          },
          {
            label: "Categories",
            value: loading ? "—" : Object.keys(categoryBreakdown).length,
            icon: "🗂️",
            color: "text-purple-700 bg-purple-50",
          },
          {
            label: "States Covered",
            value: loading ? "—" : Object.keys(stateBreakdown).length,
            icon: "📍",
            color: "text-civic-700 bg-civic-50",
          },
          {
            label: "With Apply Link",
            value: loading ? "—" : schemes.filter((s) => s.apply_link).length,
            icon: "🔗",
            color: "text-green-700 bg-green-50",
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="card p-5"
          >
            <div
              className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center text-xl mb-3`}
            >
              {stat.icon}
            </div>
            <p className="font-heading font-bold text-2xl text-navy-800">
              {stat.value}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {quickActions.map((action, i) => (
          <motion.div
            key={action.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={action.to}
              className="card-hover p-6 flex items-center gap-4 cursor-pointer block"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}
              >
                {action.icon}
              </div>
              <div>
                <p className="font-heading font-bold text-navy-800">
                  {action.label}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">{action.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h2 className="font-heading font-bold text-navy-800 mb-4">
            Top Categories
          </h2>
          {loading ? (
            <Loader />
          ) : topCategories.length > 0 ? (
            <div className="space-y-3">
              {topCategories.map(([cat, count]) => (
                <div key={cat} className="flex items-center gap-3">
                  <span className="text-sm text-slate-600 w-32 flex-shrink-0">
                    {cat}
                  </span>
                  <div className="flex-1 bg-slate-100 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / schemes.length) * 100}%` }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="h-2 rounded-full bg-gradient-to-r from-navy-600 to-civic-500"
                    />
                  </div>
                  <span className="text-sm font-semibold text-navy-700 w-8 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">No data available</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-navy-800">
              Recent Schemes
            </h2>
            <Link
              to="/admin/schemes"
              className="text-sm text-civic-600 hover:text-civic-700 font-medium"
            >
              View All
            </Link>
          </div>
          {loading ? (
            <Loader />
          ) : schemes.length > 0 ? (
            <div className="space-y-3">
              {schemes.slice(0, 5).map((scheme) => (
                <div
                  key={scheme.id || scheme._id}
                  className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-navy-800 truncate max-w-[200px]">
                      {scheme.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {scheme.category} · {scheme.state || "All India"}
                    </p>
                  </div>
                  <Link
                    to={`/admin/edit/${scheme.id || scheme._id}`}
                    className="text-xs text-civic-600 hover:text-civic-700 font-medium px-3 py-1 rounded-lg hover:bg-civic-50 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-500 text-sm mb-3">No schemes yet.</p>
              <Link to="/admin/add" className="btn-primary text-sm">
                Add First Scheme
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

import React from "react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { adminService } from "../services/adminService";
import { SkeletonTable } from "../components/Loader";

export default function AdminSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await adminService.getAllSchemes();
      if (res.success) setSchemes(res.data || []);
    } catch {
      toast.error("Failed to load schemes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await adminService.deleteScheme(
        deleteTarget.id || deleteTarget._id,
      );
      if (res.success) {
        setSchemes((prev) =>
          prev.filter(
            (s) => (s.id || s._id) !== (deleteTarget.id || deleteTarget._id),
          ),
        );
        toast.success("Scheme deleted successfully");
        setDeleteTarget(null);
      } else {
        toast.error(res.message || "Delete failed");
      }
    } catch {
      toast.error("Failed to delete scheme");
    } finally {
      setDeleting(false);
    }
  };

  const filtered = schemes.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.category?.toLowerCase().includes(search.toLowerCase()) ||
      s.state?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="page-container py-8 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="section-title mb-1">Manage Schemes</h1>
            <p className="text-slate-500 text-sm">
              {!loading && `${schemes.length} total schemes`}
            </p>
          </div>
          <Link to="/admin/add" className="btn-primary text-sm">
            + Add Scheme
          </Link>
        </div>

        {/* Search */}
        <div className="card p-4 mb-6">
          <input
            type="text"
            placeholder="Search schemes by name, category, or state…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Scheme Name
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                    Category
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                    State
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                    Income Limit
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                    Age Range
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-4">
                      <SkeletonTable rows={5} />
                    </td>
                  </tr>
                ) : filtered.length > 0 ? (
                  filtered.map((scheme, i) => (
                    <motion.tr
                      key={scheme.id || scheme._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-medium text-navy-800 text-sm truncate max-w-[200px]">
                            {scheme.name}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5 sm:hidden">
                            {scheme.category}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="tag bg-slate-50 text-slate-700 border border-slate-200">
                          {scheme.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell text-sm text-slate-600">
                        {scheme.state || "All India"}
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell text-sm text-slate-600">
                        {scheme.income_limit
                          ? `₹${Number(scheme.income_limit).toLocaleString("en-IN")}`
                          : "—"}
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell text-sm text-slate-600">
                        {scheme.min_age && scheme.max_age
                          ? `${scheme.min_age}–${scheme.max_age} yrs`
                          : "—"}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/edit/${scheme.id || scheme._id}`}
                            className="text-xs font-medium text-civic-600 hover:text-civic-700 px-3 py-1.5 rounded-lg hover:bg-civic-50 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(scheme)}
                            className="text-xs font-medium text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <p className="text-3xl mb-3">📋</p>
                      <p className="text-slate-500 text-sm">No schemes found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(15, 14, 46, 0.6)",
              backdropFilter: "blur(4px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setDeleteTarget(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl mx-auto mb-4">
                🗑️
              </div>
              <h3 className="font-heading text-xl font-bold text-navy-800 text-center mb-2">
                Delete Scheme?
              </h3>
              <p className="text-slate-500 text-sm text-center mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-navy-700">
                  "{deleteTarget.name}"
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="btn-secondary flex-1"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="btn-danger flex-1 flex items-center justify-center gap-2"
                >
                  {deleting ? "Deleting…" : "Yes, Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

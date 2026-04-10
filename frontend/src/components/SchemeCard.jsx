import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";

const categoryColors = {
  Agriculture: "bg-green-50 text-green-700 border-green-200",
  Education: "bg-blue-50 text-blue-700 border-blue-200",
  Health: "bg-red-50 text-red-700 border-red-200",
  Housing: "bg-amber-50 text-amber-700 border-amber-200",
  Employment: "bg-purple-50 text-purple-700 border-purple-200",
  Finance: "bg-cyan-50 text-cyan-700 border-cyan-200",
  Social: "bg-pink-50 text-pink-700 border-pink-200",
  Default: "bg-slate-50 text-slate-700 border-slate-200",
};

const categoryIcons = {
  Agriculture: "🌾",
  Education: "📚",
  Health: "🏥",
  Housing: "🏠",
  Employment: "💼",
  Finance: "💰",
  Social: "🤝",
  Default: "📋",
};

export default function SchemeCard({
  scheme,
  onSave,
  onUnsave,
  isSaved,
  showActions = true,
}) {
  const colorClass = categoryColors[scheme.category] || categoryColors.Default;
  const icon = categoryIcons[scheme.category] || categoryIcons.Default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-700 to-civic-600 flex items-center justify-center text-2xl shadow-md">
            {icon}
          </div>
          <div>
            <h3 className="font-heading font-bold text-navy-800 text-base leading-snug line-clamp-2">
              {scheme.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {scheme.state || "All India"}
            </p>
          </div>
        </div>
        <span className={`tag border text-xs shrink-0 ${colorClass}`}>
          {scheme.category}
        </span>
      </div>

      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
        {scheme.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {scheme.min_age != null && scheme.max_age != null && (
          <span className="tag ...">
            Age {scheme.min_age}-{scheme.max_age}
          </span>
        )}
        {scheme.income_limit != null && scheme.income_limit !== 0 && (
          <span
            className="tag bg-slate-50 text-slate-600 border border-slat
          e-200"
          >
            Income ≤ ₹{scheme.income_limit.toLocaleString("en-IN")}
          </span>
        )}
        {scheme.occupation && (
          <span className="tag bg-slate-50 text-slate-600 border border-slate-200">
            {scheme.occupation}
          </span>
        )}
        {scheme.beneficiary_category && (
          <span className="tag bg-navy-50 text-navy-700 border border-navy-100">
            {scheme.beneficiary_category}
          </span>
        )}
      </div>

      {showActions && (
        <div className="flex items-center gap-3 pt-2 border-t border-slate-50">
          <Link
            to={`/schemes/${scheme.id || scheme._id}`}
            className="btn-primary text-sm flex-1 text-center"
          >
            View Details
          </Link>
          {onSave && !isSaved && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onSave(scheme.id || scheme._id)}
              className="btn-secondary text-sm px-4"
            >
              Save
            </motion.button>
          )}
          {onUnsave && isSaved && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onUnsave(scheme.id || scheme._id)}
              className="text-sm px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            >
              Unsave
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
}

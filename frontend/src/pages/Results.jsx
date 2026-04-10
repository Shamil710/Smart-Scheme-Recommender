import React from "react";

import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SchemeCard from "../components/SchemeCard";
import toast from "react-hot-toast";
import { schemeService } from "../services/schemeService";
import { useState, useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Results() {
  const { state } = useLocation();
  // const schemes = state?.schemes || [];
  const [schemes, setSchemes] = useState([]);
  const criteria = state?.criteria;
  const auto = state?.auto;
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    if (state?.schemes) {
      // ✅ data coming from manual OR auto navigation
      setSchemes(state.schemes);
    } else {
      // optional fallback (if user directly opens /results)
      const fetchAuto = async () => {
        try {
          const res = await schemeService.autoCheckEligibility();
          setSchemes(res.data);
        } catch (err) {
          console.error("Error fetching results:", err);
        }
      };

      fetchAuto();
    }
  }, []);

  const handleSave = async (id) => {
    try {
      await schemeService.saveScheme(id);
      setSavedIds([...savedIds, id]);
      toast.success("Scheme saved!");
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleUnsave = async (id) => {
    try {
      await schemeService.unsaveScheme(id);
      setSavedIds(savedIds.filter((s) => s !== id));
      toast.success("Removed");
    } catch {
      toast.error("Failed to unsave");
    }
  };

  return (
    <div className="page-container py-8 animate-fade-in">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Link
            to="/eligibility"
            className="text-sm text-slate-500 hover:text-navy-700 transition-colors"
          >
            ← Back to Eligibility Check
          </Link>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl shadow-lg">
            ✅
          </div>
          <div>
            <h1 className="section-title">Eligibility Results</h1>
            <p className="text-slate-500 text-sm mt-1">
              {auto
                ? "Recommended schemes based on your profile (flexible match)"
                : "Schemes matching your exact criteria"}
              {" — "}
              <span className="font-semibold text-navy-700">
                {schemes.length} schemes found
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Criteria summary */}
      {criteria && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="card p-5 mb-8 flex flex-wrap gap-3"
        >
          <span className="text-sm text-slate-500 font-medium">
            Checked for:
          </span>
          {Object.entries(criteria).map(
            ([k, v]) =>
              v && (
                <span
                  key={k}
                  className="tag bg-navy-50 text-navy-700 border border-navy-100"
                >
                  {k}:{" "}
                  {k === "income" ? `₹${Number(v).toLocaleString("en-IN")}` : v}
                </span>
              ),
          )}
        </motion.div>
      )}

      {schemes.length > 0 ? (
        <>
          {/* Top match */}
          {schemes[0] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-1 rounded-3xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400"
            >
              <div className="bg-white rounded-[20px] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🏆</span>
                  <span className="font-heading font-bold text-amber-600">
                    Best Match
                  </span>
                </div>
                <SchemeCard
                  scheme={schemes[0]}
                  isSaved={savedIds.includes(schemes[0].id || schemes[0]._id)}
                  onSave={handleSave}
                  onUnsave={handleUnsave}
                  showActions
                />
              </div>
            </motion.div>
          )}

          {/* Rest */}
          {schemes.length > 1 && (
            <>
              <h2 className="font-heading font-semibold text-navy-800 mb-5">
                Other Eligible Schemes ({schemes.length - 1})
              </h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {schemes.slice(1).map((scheme) => (
                  <motion.div
                    key={scheme.id || scheme._id}
                    variants={itemVariants}
                  >
                    <SchemeCard
                      scheme={scheme}
                      isSaved={savedIds.includes(scheme.id || scheme._id)}
                      onSave={handleSave}
                      onUnsave={handleUnsave}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-6xl mb-4">😔</p>
          <h2 className="font-heading text-2xl font-bold text-navy-800 mb-3">
            No Eligible Schemes Found
          </h2>
          <p className="text-slate-500 max-w-md mx-auto mb-8">
            We couldn't find schemes matching your current criteria. Try
            updating your profile or explore all available schemes.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/eligibility" className="btn-secondary">
              Try Again
            </Link>
            <Link to="/explore" className="btn-primary">
              Explore All Schemes
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

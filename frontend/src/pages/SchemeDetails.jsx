import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { schemeService } from "../services/schemeService";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function SchemeDetails() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const res = await schemeService.getSchemeById(id);
        if (res.success) setScheme(res.data);
      } catch {
        toast.error("Failed to load scheme details");
      } finally {
        setLoading(false);
      }
    };
    fetchScheme();
  }, [id]);

  const handleSave = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to save schemes");
      return;
    }
    setSaveLoading(true);
    try {
      if (saved) {
        await schemeService.unsaveScheme(id);
        setSaved(false);
        toast.success("Removed from saved");
      } else {
        await schemeService.saveScheme(id);
        setSaved(true);
        toast.success("Scheme saved!");
      }
    } catch {
      toast.error("Action failed");
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20">
        <Loader text="Loading scheme details…" />
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="page-container py-20 text-center">
        <p className="text-5xl mb-4">❌</p>
        <h2 className="font-heading text-2xl font-bold text-navy-800 mb-2">
          Scheme not found
        </h2>
        <Link to="/explore" className="btn-primary mt-4 inline-block">
          Back to Explore
        </Link>
      </div>
    );
  }

  const details = [
    { label: "Category", value: scheme.category },
    { label: "State", value: scheme.state || "All India" },
    { label: "Occupation", value: scheme.occupation || "All" },
    {
      label: "Beneficiary Category",
      value: scheme.beneficiary_category || "All",
    },
    {
      label: "Minimum Age",
      value: scheme.min_age ? `${scheme.min_age} years` : "No limit",
    },
    {
      label: "Maximum Age",
      value: scheme.max_age ? `${scheme.max_age} years` : "No limit",
    },
    {
      label: "Income Limit",
      value: scheme.income_limit
        ? `₹${Number(scheme.income_limit).toLocaleString("en-IN")} / year`
        : "No limit",
    },
  ];

  return (
    <div className="page-container py-8 animate-fade-in">
      <Link
        to="/explore"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-navy-700 mb-6 transition-colors"
      >
        ← Back to Explore
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="card p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-700 to-civic-600 flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                  📋
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-bold text-navy-800 leading-tight">
                    {scheme.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="tag bg-civic-50 text-civic-700 border border-civic-200">
                      {scheme.category}
                    </span>
                    <span className="tag bg-slate-50 text-slate-600 border border-slate-200">
                      {scheme.state || "All India"}
                    </span>
                  </div>
                </div>
              </div>

              <h2 className="font-heading font-semibold text-navy-800 mb-3">
                About this Scheme
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {scheme.description}
              </p>
            </div>

            {/* Eligibility */}
            <div className="card p-8">
              <h2 className="font-heading font-semibold text-navy-800 mb-5">
                Eligibility Criteria
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {details.map((d) => (
                  <div
                    key={d.label}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
                  >
                    <span className="text-sm text-slate-500">{d.label}</span>
                    <span className="text-sm font-semibold text-navy-700">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Apply */}
            <div className="card p-6">
              <h3 className="font-heading font-semibold text-navy-800 mb-4">
                Apply for this Scheme
              </h3>
              {scheme.apply_link ? (
                <a
                  href={scheme.apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center block"
                >
                  Apply Now →
                </a>
              ) : (
                <p className="text-sm text-slate-500">
                  Application link not available. Contact your nearest
                  government office.
                </p>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={saveLoading}
                className={`w-full mt-3 py-2.5 px-4 rounded-xl text-sm font-medium border transition-all ${
                  saved
                    ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {saveLoading
                  ? "Saving…"
                  : saved
                    ? "🔖 Saved"
                    : "🔖 Save Scheme"}
              </motion.button>
            </div>

            {/* Quick Check */}
            <div className="card p-6">
              <h3 className="font-heading font-semibold text-navy-800 mb-3">
                Quick Check
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                See if you're eligible for this scheme based on your profile.
              </p>
              {isLoggedIn ? (
                <Link
                  to="/eligibility"
                  className="btn-secondary text-sm w-full text-center block"
                >
                  Check My Eligibility
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="btn-primary text-sm w-full text-center block"
                >
                  Login to Check
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

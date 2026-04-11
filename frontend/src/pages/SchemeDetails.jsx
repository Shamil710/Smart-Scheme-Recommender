import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { schemeService } from "../services/schemeService";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { FileText, Tag, MapPin, IndianRupee, User } from "lucide-react";

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

  const benefitsList = scheme?.benefits
    ? scheme.benefits.split(",").map((item) => item.trim())
    : [];

  const documentsList = scheme?.documents
    ? scheme.documents.split(",").map((item) => item.trim())
    : [];

  return (
    <div className="page-container py-8 animate-fade-in">
      <Link
        to="/explore"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-navy-700 mb-6"
      >
        ← Back to Explore
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* ABOUT + BENEFITS */}
            <div className="card p-8 shadow-md transition hover:shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-700 to-civic-600 flex items-center justify-center shadow-lg">
                  <FileText className="text-white" size={28} />
                </div>

                <div className="flex-1">
                  <h1 className="font-heading text-2xl font-bold text-navy-800">
                    {scheme.name}
                  </h1>

                  {/* 🔥 ICON TAG SYSTEM */}
                  <div className="flex flex-wrap gap-3 mt-5">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-civic-50 text-civic-700">
                      <Tag size={14} /> {scheme.category}
                    </span>

                    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-slate-50 text-slate-600">
                      <MapPin size={14} /> {scheme.state || "All India"}
                    </span>

                    {scheme.income_limit && (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-green-50 text-green-700">
                        <IndianRupee size={14} />≤ ₹
                        {scheme.income_limit.toLocaleString()}
                      </span>
                    )}

                    {scheme.min_age && (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700">
                        <User size={14} /> {scheme.min_age}+
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <h2 className="font-semibold text-navy-800 mb-2">
                About this Scheme
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {scheme.description}
              </p>

              {/* BENEFITS */}
              {scheme.benefits && (
                <>
                  <h2 className="font-semibold text-navy-800 mb-2">Benefits</h2>

                  <div className="bg-green-50 border border-green-100 rounded-xl p-4 transition hover:shadow-sm">
                    <p className="text-green-900 text-sm leading-relaxed">
                      {scheme.benefits}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* DOCUMENTS */}
            <div className="card p-8 shadow-sm transition  hover:shadow-sm transition">
              <h2 className="font-semibold text-navy-800 mb-4">
                Documents Required
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {documentsList.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 transition hover:bg-slate-100"
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-100 text-blue-600">
                      <FileText size={16} />
                    </div>

                    <span className="text-sm text-slate-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ELIGIBILITY */}
            <div className="card p-8 shadow-sm transition hover:shadow-md">
              <h2 className="font-semibold text-navy-800 mb-4">
                Eligibility Criteria
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {details.map((d) => (
                  <div
                    key={d.label}
                    className="flex justify-between p-3 rounded-xl bg-slate-50"
                  >
                    <span className="text-slate-500">{d.label}</span>
                    <span className="font-semibold text-navy-700">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="space-y-6 sticky top-24 h-fit">
            {/* APPLY */}
            <div className="card p-6 shadow-sm transition hover:shadow-md">
              <h3 className="font-semibold text-navy-800 mb-4">
                Apply for this Scheme
              </h3>

              {scheme.apply_link ? (
                <a
                  href={scheme.apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-navy-700 to-civic-600 text-white py-3 rounded-xl text-center font-semibold hover:opacity-90 transition block"
                >
                  Apply Now →
                </a>
              ) : (
                <p className="text-sm text-slate-500">
                  Application link not available.
                </p>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={saveLoading}
                className={`w-full mt-3 py-2.5 px-4 rounded-xl border ${
                  saved
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                {saveLoading
                  ? "Saving…"
                  : saved
                    ? "🔖 Saved"
                    : "🔖 Save Scheme"}
              </motion.button>
            </div>

            {/* QUICK CHECK */}
            <div className="card p-6 shadow-sm transition hover:shadow-md">
              <h3 className="font-semibold text-navy-800 mb-3">Quick Check</h3>

              <p className="text-sm text-slate-500 mb-4">
                Check eligibility based on your profile
              </p>

              {isLoggedIn ? (
                <Link
                  to="/eligibility"
                  className="btn-secondary w-full text-center block"
                >
                  Check My Eligibility
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="btn-primary w-full text-center block"
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

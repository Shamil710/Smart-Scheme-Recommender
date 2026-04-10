import React from "react";
import { useState } from "react";
import API from "../services/api";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { schemeService } from "../services/schemeService";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const categories = ["General", "OBC", "SC", "ST", "EWS", "Minority"];
const occupations = [
  "Farmer",
  "Student",
  "Government Employee",
  "Private Employee",
  "Self Employed",
  "Unemployed",
  "Retired",
  "Other",
];
const states = [
  "All India",
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

export default function EligibilityCheck() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    age: user?.age || "",
    income: user?.income || "",
    occupation: user?.occupation || "",
    category: user?.category || "",
    state: user?.state || "",
  });
  const [loading, setLoading] = useState(false);
  const [autoLoading, setAutoLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleManualCheck = async (e) => {
    e.preventDefault();
    if (
      !form.age ||
      !form.income ||
      !form.occupation ||
      !form.category ||
      !form.state
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const categoryMap = {
        General: "all",
        OBC: "obc",
        SC: "sc",
        ST: "st",
        EWS: "ews",
        Minority: "minority",
      };

      const mappedForm = {
        ...form,
        category: categoryMap[form.category] || "all",
      };

      const res = await schemeService.checkEligibility(mappedForm);
      if (res.success) {
        // navigate("/results", { state: { criteria: form } });
        navigate("/results", {
          state: {
            schemes: res.data,
            criteria: mappedForm,
            auto: false, // 🔥 ADD THIS
          },
        });
      } else {
        toast.error(res.message || "Check failed");
      }
    } catch {
      toast.error("Failed to check eligibility");
    } finally {
      setLoading(false);
    }
  };

  const handleAutoCheck = async () => {
    setAutoLoading(true);
    try {
      const categoryMap = {
        General: "all",
        OBC: "obc",
        SC: "sc",
        ST: "st",
        EWS: "ews",
        Minority: "minority",
      };

      const mappedUser = {
        ...user,
        category: categoryMap[user.category] || "all",
      };

      const res = await schemeService.autoCheckEligibility(mappedUser);

      if (res.success) {
        navigate("/results", { state: { schemes: res.data, auto: true } });
      } else {
        toast.error(res.message || "Auto check failed");
      }
    } catch {
      toast.error("Auto check failed");
    } finally {
      setAutoLoading(false);
    }
  };

  return (
    <div className="page-container py-8 max-w-2xl animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="section-title mb-1">Eligibility Check</h1>
        <p className="text-slate-500 text-sm mb-8">
          Fill in your details to find schemes you qualify for.
        </p>

        {/* Auto check */}
        <div className="card p-6 mb-6 bg-gradient-to-br from-navy-50 to-civic-50 border-navy-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-700 to-civic-600 flex items-center justify-center text-2xl flex-shrink-0">
              ⚡
            </div>
            <div className="flex-1">
              <h2 className="font-heading font-bold text-navy-800 mb-1">
                Quick Auto-Check
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Use your saved profile data to instantly check eligibility — no
                manual entry needed.
              </p>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAutoCheck}
                disabled={autoLoading}
                className="btn-primary flex items-center gap-2"
              >
                {autoLoading ? (
                  <Loader size="sm" />
                ) : (
                  "⚡ Auto Check with My Profile"
                )}
              </motion.button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-sm text-slate-400 font-medium">
            or fill manually
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Manual form */}
        <div className="card p-8">
          <h2 className="font-heading font-semibold text-navy-800 mb-6">
            Manual Eligibility Check
          </h2>
          <form
            onSubmit={handleManualCheck}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            <div>
              <label className="label">Your Age</label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                placeholder="e.g. 28"
                min="1"
                max="120"
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Annual Income (₹)</label>
              <input
                name="income"
                type="number"
                value={form.income}
                onChange={handleChange}
                placeholder="e.g. 250000"
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Occupation</label>
              <select
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select occupation</option>
                {occupations.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="label">State</label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select state</option>
                {states.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? <Loader size="sm" /> : "🔍 Check Eligibility"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

import React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import Loader from "../components/Loader";
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

const categories = ["General", "OBC", "SC", "ST"];
const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
];

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: user?.age || "",
    income: user?.income || "",
    occupation: user?.occupation || "",
    category: user?.category || "",
    state: user?.state || "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        age: Number(form.age),
        income: Number(form.income),
        state: form.state,
      };

      if (form.occupation !== "Select occupation") {
        payload.occupation = form.occupation;
      }

      if (form.category !== "Select category") {
        payload.category = form.category;
      }

      console.log("SENDING PAYLOAD:", payload);

      const res = await authService.updateProfile(payload);

      if (res.user) {
        updateUser(res.user);
        toast.success("Profile updated successfully!");
        console.log("UPDATE RESPONSE:", res);
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container py-8 max-w-2xl animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="section-title mb-1">Your Profile</h1>
        <p className="text-slate-500 text-sm mb-8">
          Update your information to get better scheme matches.
        </p>

        <div className="card p-8">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-700 to-civic-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-heading font-bold text-2xl">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-heading font-bold text-navy-800 text-lg">
                {user?.name}
              </p>
              <p className="text-slate-500 text-sm">{user?.email}</p>
              <span
                className={`tag mt-1 ${user?.role === "admin" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-civic-50 text-civic-700 border-civic-200"} border`}
              >
                {user?.role === "admin" ? "👑 Admin" : "👤 User"}
              </span>
            </div>
          </div>

          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2"
              >
                <span className="text-lg">✅</span>
                Profile updated successfully!
              </motion.div>
            )}
          </AnimatePresence>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            <div className="sm:col-span-2">
              <label className="label">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Age</label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
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
                {/* {occupations.map((o) => (
                  <option key={o}>{o}</option>
                ))} */}

                {occupations.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
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
                {/* {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))} */}
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
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
                {loading ? <Loader size="sm" /> : "Save Changes"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

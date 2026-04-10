import React from "react";

import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { adminService } from "../services/adminService";
import Loader, { PageLoader } from "../components/Loader";

const categories = [
  "Agriculture",
  "Education",
  "Health",
  "Housing",
  "Employment",
  "Finance",
  "Social",
  "Other",
];
const occupations = [
  "All",
  "Farmer",
  "Student",
  "Government Employee",
  "Private Employee",
  "Self Employed",
  "Unemployed",
  "Retired",
];
const beneficiaryCategories = [
  "All",
  "General",
  "OBC",
  "SC",
  "ST",
  "EWS",
  "Minority",
  "Women",
  "Disabled",
];
const states = [
  "All India",
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

export default function EditScheme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    adminService
      .getSchemeById(id)
      .then((res) => {
        if (res.success) setForm(res.data);
        else toast.error("Failed to load scheme");
      })
      .catch(() => toast.error("Failed to load scheme"))
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.category || !form.state) {
      toast.error("Name, description, category and state are required");
      return;
    }
    setLoading(true);
    try {
      const res = await adminService.updateScheme(id, form);
      if (res.success) {
        toast.success("Scheme updated successfully!");
        navigate("/admin/schemes");
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <PageLoader />;
  if (!form)
    return (
      <div className="page-container py-20 text-center">
        <p className="text-5xl mb-4">❌</p>
        <h2 className="font-heading text-xl font-bold text-navy-800 mb-4">
          Scheme not found
        </h2>
        <Link to="/admin/schemes" className="btn-primary">
          Back to Schemes
        </Link>
      </div>
    );

  return (
    <div className="page-container py-8 max-w-3xl animate-fade-in">
      <Link
        to="/admin/schemes"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-navy-700 mb-6 transition-colors"
      >
        ← Back to Schemes
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="section-title mb-1">Edit Scheme</h1>
        <p className="text-slate-500 text-sm mb-8">
          Update the details for this scheme.
        </p>

        <div className="card p-8">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="sm:col-span-2">
              <p className="font-heading font-semibold text-navy-800 text-sm mb-4 pb-2 border-b border-slate-100">
                Basic Information
              </p>
            </div>

            <div className="sm:col-span-2">
              <label className="label">Scheme Name *</label>
              <input
                name="name"
                value={form.name || ""}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label">Description *</label>
              <textarea
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                rows={4}
                className="input-field resize-none"
              />
            </div>

            <div>
              <label className="label">Category *</label>
              <select
                name="category"
                value={form.category || ""}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">State *</label>
              <select
                name="state"
                value={form.state || ""}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select state</option>
                {states.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 mt-2">
              <p className="font-heading font-semibold text-navy-800 text-sm mb-4 pb-2 border-b border-slate-100">
                Eligibility Criteria
              </p>
            </div>

            <div>
              <label className="label">Minimum Age</label>
              <input
                name="min_age"
                type="number"
                value={form.min_age || ""}
                onChange={handleChange}
                min="0"
                max="120"
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Maximum Age</label>
              <input
                name="max_age"
                type="number"
                value={form.max_age || ""}
                onChange={handleChange}
                min="0"
                max="120"
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Annual Income Limit (₹)</label>
              <input
                name="income_limit"
                type="number"
                value={form.income_limit || ""}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Occupation</label>
              <select
                name="occupation"
                value={form.occupation || ""}
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
              <label className="label">Beneficiary Category</label>
              <select
                name="beneficiary_category"
                value={form.beneficiary_category || ""}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select category</option>
                {beneficiaryCategories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Apply Link (URL)</label>
              <input
                name="apply_link"
                type="url"
                value={form.apply_link || ""}
                onChange={handleChange}
                placeholder="https://..."
                className="input-field"
              />
            </div>

            <div className="sm:col-span-2 flex gap-4 mt-2">
              <Link
                to="/admin/schemes"
                className="btn-secondary flex-1 text-center"
              >
                Cancel
              </Link>
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {loading ? <Loader size="sm" /> : "💾 Save Changes"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

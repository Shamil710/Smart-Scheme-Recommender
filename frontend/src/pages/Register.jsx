import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
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
const categories = ["General", "OBC", "SC", "ST", "EWS", "Minority"];
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

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    income: "",
    occupation: "",
    category: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const required = [
      "name",
      "email",
      "password",
      "age",
      "income",
      "occupation",
      "category",
      "state",
    ];
    if (required.some((f) => !form[f])) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = form;
      const res = await register(payload);

      if (res.success) {
        setError(""); // clear old errors
        setSuccess("User registered successfully ✅");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setSuccess("");
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setSuccess("");
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-700 to-civic-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-heading font-bold text-xl">
                GS
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-navy-800">
              Create your account
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Join GovScheme to discover benefits you're eligible for
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm"
            >
              {success}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="label">Full Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ramesh Kumar"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Email *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Age *</label>
                <input
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="25"
                  min="1"
                  max="120"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Password *</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Confirm Password *</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Annual Income (₹) *</label>
                <input
                  name="income"
                  type="number"
                  value={form.income}
                  onChange={handleChange}
                  placeholder="250000"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Occupation *</label>
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
                <label className="label">Category *</label>
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
              <div>
                <label className="label">State *</label>
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
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-8"
            >
              {loading ? <Loader size="sm" /> : "Create Account"}
            </motion.button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-civic-600 font-medium hover:text-civic-700"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

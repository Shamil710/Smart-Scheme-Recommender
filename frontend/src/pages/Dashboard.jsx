import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { schemeService } from "../services/schemeService";
import SchemeCard from "../components/SchemeCard";
import Loader from "../components/Loader";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { user } = useAuth();
  const [savedSchemes, setSavedSchemes] = useState([]);
  const [eligibleSchemes, setEligibleSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("TOKEN:", localStorage.getItem("govscheme_token"));
    const fetchData = async () => {
      try {
        const [savedRes, eligibleRes] = await Promise.all([
          schemeService.getSavedSchemes(),
          schemeService.autoCheckEligibility(),
        ]);

        // ✅ Fix saved schemes (already correct logic)
        const savedList = savedRes.data || [];
        setSavedSchemes(savedList);

        // ✅ FIX ELIGIBLE SCHEMES (THIS WAS MISSING)
        const eligibleList = eligibleRes.data || [];
        setEligibleSchemes(eligibleList);

        console.log("SAVED:", savedList);
        console.log("ELIGIBLE:", eligibleList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("STATE UPDATED:", savedSchemes);
  }, [savedSchemes]);

  const quickActions = [
    {
      to: "/eligibility",
      icon: "🔍",
      label: "Check Eligibility",
      desc: "Find schemes you qualify for",
      color: "from-navy-600 to-civic-600",
    },
    {
      to: "/explore",
      icon: "🗺️",
      label: "Explore Schemes",
      desc: "Browse all available schemes",
      color: "from-purple-600 to-indigo-600",
    },
    {
      to: "/saved",
      icon: "🔖",
      label: "Saved Schemes",
      desc: `${savedSchemes.length} saved`,
      color: "from-amber-500 to-orange-500",
    },
    {
      to: "/profile",
      icon: "👤",
      label: "Edit Profile",
      desc: "Update your information",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <div className="page-container py-8 animate-fade-in">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-heading text-3xl font-bold text-navy-800">
          Welcome back, {user?.name?.split(" ")[0]}! 👋
        </h1>
        <p className="text-slate-500 mt-1">
          Here's an overview of your scheme activity.
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
            label: "Saved Schemes",
            value: savedSchemes.length,
            icon: "🔖",
            color: "text-amber-600 bg-amber-50",
          },
          {
            label: "Eligible Schemes",
            value: eligibleSchemes.length,
            icon: "✅",
            color: "text-green-600 bg-green-50",
          },
          {
            label: "Your State",
            value: user?.state || "N/A",
            icon: "📍",
            color: "text-civic-600 bg-civic-50",
          },
          {
            label: "Category",
            value: user?.category || "N/A",
            icon: "🏷️",
            color: "text-purple-600 bg-purple-50",
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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
      >
        {quickActions.map((action) => (
          <motion.div key={action.to} variants={itemVariants}>
            <Link
              to={action.to}
              className="card-hover p-5 flex flex-col gap-3 cursor-pointer block"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-2xl shadow-md`}
              >
                {action.icon}
              </div>
              <div>
                <p className="font-heading font-semibold text-navy-800 text-sm">
                  {action.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{action.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Profile Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <h2 className="font-heading font-bold text-navy-800 mb-4">
            Your Profile
          </h2>
          <div className="space-y-3">
            {[
              {
                label: "Age",
                value: user?.age ? `${user.age} years` : "Not set",
              },
              {
                label: "Income",
                value: user?.income
                  ? `₹${Number(user.income).toLocaleString("en-IN")} / year`
                  : "Not set",
              },
              { label: "Occupation", value: user?.occupation || "Not set" },
              { label: "Category", value: user?.category || "Not set" },
              { label: "State", value: user?.state || "Not set" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
              >
                <span className="text-sm text-slate-500">{item.label}</span>
                <span className="text-sm font-medium text-navy-700">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/profile"
            className="btn-secondary text-sm w-full text-center mt-4 block"
          >
            Edit Profile
          </Link>
        </motion.div>

        {/* Eligible Schemes Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-navy-800">
              Eligible Schemes
            </h2>
            <Link
              to="/results"
              className="text-sm text-civic-600 hover:text-civic-700 font-medium"
            >
              View All
            </Link>
          </div>
          {loading ? (
            <Loader text="Fetching schemes…" />
          ) : eligibleSchemes.length > 0 ? (
            <div className="space-y-3">
              {eligibleSchemes.slice(0, 3).map((scheme) => (
                <Link
                  key={scheme.id || scheme._id}
                  to={`/schemes/${scheme.id || scheme._id}`}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-600 to-civic-600 flex items-center justify-center text-lg flex-shrink-0">
                    📋
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-navy-800 text-sm truncate">
                      {scheme.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {scheme.category} · {scheme.state || "All India"}
                    </p>
                  </div>
                  <span className="tag bg-green-50 text-green-700 border border-green-200 text-xs flex-shrink-0">
                    Eligible
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-slate-500 text-sm">
                No eligible schemes found. Update your profile to get better
                matches.
              </p>
              <Link
                to="/eligibility"
                className="btn-primary text-sm mt-4 inline-block"
              >
                Check Eligibility
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

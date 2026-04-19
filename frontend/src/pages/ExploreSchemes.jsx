import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { schemeService } from "../services/schemeService";
import { useAuth } from "../context/AuthContext";
import SchemeCard from "../components/SchemeCard";
import { SkeletonCard } from "../components/Loader";

const categoryMap = {
  "Social Welfare": "social justice",
  "Women Empowerment": "women development",
};

const categories = [
  "",
  "Agriculture",
  "Education",
  "Health",
  "Housing",
  "Employment",
  "Social Welfare",
  "Women Empowerment",
];
const states = [
  "",
  "Central",
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

export default function ExploreSchemes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoggedIn } = useAuth();
  const [schemes, setSchemes] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [state, setState] = useState("");

  useEffect(() => {
    fetchSchemes();
  }, [category, state, search]);

  useEffect(() => {
    const fetchSaved = async () => {
      if (!isLoggedIn) return;

      try {
        const res = await schemeService.getSavedSchemes();

        const ids = (res.data || []).map((s) => s.id || s.scheme_id);

        setSavedIds(ids);
        console.log("PROD RESPONSE:", res);
        console.log("PROD DATA:", res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSaved();
  }, []); // ✅ IMPORTANT

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const params = {
        search: search || "",
        category: category
          ? categoryMap[category] || category.toLowerCase()
          : "",
        state: state ? state.toLowerCase() : "",
      };
      console.log("FILTER VALUES:", {
        search,
        category,
        state,
      });
      const res = await schemeService.getAllSchemes(params);
      if (res.success) setSchemes(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Server is waking up... please wait ⏳");
    } finally {
      setLoading(false);
    }
  };

  // const fetchSaved = async () => {
  //   try {
  //     const res = await schemeService.getSavedSchemes();

  //     if (res.success) {
  //       const savedSchemeIds = res.data.map((s) => s.scheme_id); // ✅ IMPORTANT
  //       setSavedIds(savedSchemeIds);
  //       console.log("Fetched saved scheme IDs:", res.data, savedSchemeIds); // Debug log
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleSave = async (id) => {
    try {
      await schemeService.saveScheme(id);
      setSavedIds((prev) => [...prev, id]);
      toast.success("Scheme saved!");
      console.log("Saved scheme ID:", id); // Debug log
    } catch (err) {
      if (err.response?.data?.message?.includes("already")) {
        toast.info("Already saved");
      } else {
        toast.error("Failed to save scheme");
      }
    }
  };

  const handleUnsave = async (id) => {
    try {
      await schemeService.unsaveScheme(id);
      setSavedIds((prev) => prev.filter((sid) => sid !== id));
      toast.success("Scheme removed from saved");
    } catch (err) {
      if (err.response?.data?.message === "Scheme already saved") {
        toast.info("Already saved");
      } else {
        toast.error("Error saving scheme");
      }
    }
  };

  return (
    <div className="page-container py-8 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="section-title mb-1">Explore Schemes</h1>
        <p className="text-slate-500 text-sm mb-6">
          Browse and search all government welfare schemes.
        </p>

        {/* Filters */}
        <div className="card p-5 mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search schemes by name or description…"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              setSearchParams({ search: value, category, state });
            }}
            className="input-field flex-1"
          />
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              const value = e.target.value;
              setCategory(value);
              setSearchParams({ search, category: value, state });
            }}
            className="input-field sm:w-44"
          >
            <option value="">All Categories</option>
            {categories.filter(Boolean).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={state}
            onChange={(e) => {
              const value = e.target.value;
              setState(value);
              setSearchParams({ search, category, state: value });
            }}
            className="input-field sm:w-44"
          >
            <option value="">All States</option>
            {states.filter(Boolean).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={() => {
              setSearch("");
              setCategory("");
              setState("");
              setSearchParams({});
            }}
            className="btn-secondary text-sm whitespace-nowrap"
          >
            Clear Filters
          </button>
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-5">
          {loading ? "Loading…" : `${schemes.length} schemes found`}
          {(category || state || search) && " with current filters"}
        </p>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : schemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {schemes.map((scheme) => (
              <SchemeCard
                key={scheme.id || scheme._id}
                scheme={scheme}
                isSaved={savedIds.includes(scheme.id || scheme._id)}
                onSave={isLoggedIn ? handleSave : undefined}
                onUnsave={isLoggedIn ? handleUnsave : undefined}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-6xl mb-4">🔍</p>
            <h3 className="font-heading text-xl font-bold text-navy-800 mb-2">
              No schemes found
            </h3>
            <p className="text-slate-500">
              Try adjusting your filters or search terms.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

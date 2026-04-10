import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { schemeService } from "../services/schemeService";
import SchemeCard from "../components/SchemeCard";
import { SkeletonCard } from "../components/Loader";

export default function SavedSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSaved();
  }, []);

  const fetchSaved = async () => {
    try {
      const res = await schemeService.getSavedSchemes();
      setSchemes(res.data || []);
      console.log("Fetched saved schemes:", res);
    } catch {
      toast.error("Failed to load saved schemes");
    } finally {
      setLoading(false);
    }
  };

  // const handleUnsave = async (id) => {
  //   try {
  //     await schemeService.unsaveScheme(id);
  //     setSchemes((prev) => prev.filter((s) => s.scheme_id !== id));
  //     toast.success("Removed from saved");
  //   } catch {
  //     toast.error("Failed to remove scheme");
  //   }
  // };

  const handleUnsave = async (id) => {
    try {
      await schemeService.unsaveScheme(id);

      setSchemes((prev) => prev.filter((s) => s.id !== id));
      console.log("Deleting ID:", id);
      console.log("Before:", schemes);

      toast.success("Removed from saved");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove scheme");
    }
  };

  return (
    <div className="page-container py-8 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="section-title mb-1">Saved Schemes</h1>
            <p className="text-slate-500 text-sm">
              {!loading &&
                `${schemes.length} scheme${schemes.length !== 1 ? "s" : ""} saved`}
            </p>
          </div>
          <Link to="/explore" className="btn-primary text-sm">
            + Browse More
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : schemes.length > 0 ? (
          <AnimatePresence>
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {schemes.map((scheme, i) => (
                <motion.div
                  key={scheme.id || scheme._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <SchemeCard scheme={scheme} isSaved onUnsave={handleUnsave} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-4xl mx-auto mb-5">
              🔖
            </div>
            <h2 className="font-heading text-xl font-bold text-navy-800 mb-2">
              No saved schemes yet
            </h2>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
              Browse government schemes and save the ones that interest you for
              quick access.
            </p>
            <Link to="/explore" className="btn-primary">
              Explore Schemes
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

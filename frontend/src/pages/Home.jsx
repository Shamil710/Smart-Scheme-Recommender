import React from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const stats = [
  { label: "Active Schemes", value: "450+" },
  { label: "States Covered", value: "36" },
  { label: "Citizens Helped", value: "2M+" },
  { label: "Categories", value: "12" },
];

const categories = [
  {
    icon: "🌾",
    label: "Agriculture",
    count: "82 schemes",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: "📚",
    label: "Education",
    count: "65 schemes",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: "🏥",
    label: "Health",
    count: "94 schemes",
    color: "from-red-400 to-rose-500",
  },
  {
    icon: "🏠",
    label: "Housing",
    count: "43 schemes",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: "💼",
    label: "Employment",
    count: "57 schemes",
    color: "from-purple-400 to-violet-500",
  },
  {
    icon: "💰",
    label: "Finance",
    count: "38 schemes",
    color: "from-cyan-400 to-teal-500",
  },
];

const steps = [
  {
    num: "01",
    title: "Create Account",
    desc: "Register with your basic details and profile information.",
  },
  {
    num: "02",
    title: "Fill Your Profile",
    desc: "Add age, income, occupation, state and category details.",
  },
  {
    num: "03",
    title: "Check Eligibility",
    desc: "Our system matches you to the most relevant schemes.",
  },
  {
    num: "04",
    title: "Apply Directly",
    desc: "Get direct links to apply for schemes you qualify for.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="hero-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-civic-400 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-navy-400 blur-3xl" />
        </div>
        <div className="page-container relative z-10 py-24 lg:py-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium border border-white/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                450+ Government Schemes Available
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              Find Government Schemes
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-civic-300 to-amber-300">
                You're Eligible For
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              India's most comprehensive platform to discover, check
              eligibility, and apply for central and state government welfare
              schemes — all in one place.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {isLoggedIn ? (
                <>
                  <Link
                    to="/eligibility"
                    className="btn-gold w-full sm:w-auto text-center px-8"
                  >
                    Check My Eligibility
                  </Link>
                  <Link
                    to="/explore"
                    className="btn-secondary w-full sm:w-auto text-center px-8"
                  >
                    Explore All Schemes
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn-gold w-full sm:w-auto text-center px-8"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/explore"
                    className="btn-secondary w-full sm:w-auto text-center px-8 border-white/30 text-white hover:bg-white/10"
                  >
                    Browse Schemes
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={itemVariants}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              >
                <p className="font-heading font-extrabold text-3xl text-white">
                  {s.value}
                </p>
                <p className="text-white/60 text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-slate-50">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title mb-3">Browse by Category</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Explore thousands of government welfare schemes organized by
              sector.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {categories.map((cat) => (
              <motion.div key={cat.label} variants={itemVariants}>
                <Link
                  to={`/explore?category=${cat.label}`}
                  className="group card-hover p-6 flex flex-col items-center text-center gap-3 cursor-pointer"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-navy-800 text-sm">
                      {cat.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{cat.count}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="section-title mb-3">How It Works</h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Get matched to eligible schemes in under 5 minutes, completely
              free.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-navy-200 via-civic-300 to-navy-200" />
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-navy-700 to-civic-600 flex items-center justify-center mb-4 shadow-lg shadow-navy-700/20 relative z-10">
                  <span className="font-heading font-bold text-white text-xl">
                    {s.num}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-navy-800 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!isLoggedIn && (
        <section className="py-20 bg-gradient-to-br from-navy-800 to-civic-800">
          <div className="page-container text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to find your benefits?
              </h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto">
                Join over 2 million citizens who have discovered schemes they
                qualify for.
              </p>
              <Link to="/register" className="btn-gold text-base px-10 py-3.5">
                Create Free Account
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}

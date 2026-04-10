import React from "react";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-400 mt-auto">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-navy-600 to-civic-600 flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">
                  GS
                </span>
              </div>
              <span className="font-heading font-bold text-white text-xl">
                GovScheme
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Your one-stop platform to discover, check eligibility, and apply
              for government welfare schemes across India.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                ["/", "Home"],
                ["/explore", "Explore Schemes"],
                ["/eligibility", "Check Eligibility"],
                ["/dashboard", "Dashboard"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="hover:text-civic-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "Agriculture",
                "Education",
                "Health",
                "Housing",
                "Employment",
                "Finance",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/explore?category=${cat}`}
                    className="hover:text-civic-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © 2024 GovScheme. Built for citizens of India.
          </p>
          <p className="text-xs">
            Data sourced from official government portals.
          </p>
        </div>
      </div>
    </footer>
  );
}

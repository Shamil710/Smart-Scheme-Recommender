import React from "react";

export default function Loader({ size = "md", text = "" }) {
  const sz = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" }[size];
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className={`${sz} relative`}>
        <div className="absolute inset-0 rounded-full border-[3px] border-slate-100" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-civic-600 animate-spin" />
      </div>
      {text && <p className="text-sm text-slate-500">{text}</p>}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-[3px] border-slate-100" />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-navy-700 animate-spin" />
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent border-t-civic-500 animate-spin"
            style={{ animationDuration: "0.6s", animationDirection: "reverse" }}
          />
        </div>
        <div className="text-center">
          <p className="font-heading font-bold text-xl text-navy-800">
            GovScheme
          </p>
          <p className="text-slate-500 text-sm mt-1">
            Loading your experience…
          </p>
        </div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="skeleton w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
        <div className="skeleton h-3 w-4/6 rounded" />
      </div>
      <div className="mt-5 flex gap-2">
        <div className="skeleton h-8 w-24 rounded-full" />
        <div className="skeleton h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 py-3 border-b border-slate-100"
        >
          <div className="skeleton h-4 w-4 rounded" />
          <div className="skeleton h-4 w-48 rounded flex-1" />
          <div className="skeleton h-4 w-24 rounded" />
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-8 w-16 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

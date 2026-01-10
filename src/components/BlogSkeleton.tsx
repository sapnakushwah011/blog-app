"use client";

export default function BlogSkeleton() {
  return (
    <div className="w-full max-w-[330px] sm:max-w-[300px] bg-[#4a7a99]/50 animate-pulse rounded-xl overflow-hidden">
      {/* Image placeholder */}
      <div className="h-48 sm:h-40 bg-gray-400" />

      {/* Content placeholder */}
      <div className="p-5 space-y-3">
        <div className="h-4 w-24 bg-gray-500 rounded-full" /> {/* Category */}
        <div className="h-5 bg-gray-500 rounded" /> {/* Title */}
        <div className="h-3 bg-gray-500 rounded w-3/4" /> {/* Description */}
        <div className="h-6 w-20 bg-gray-600 rounded-full mt-2" /> {/* Button */}
      </div>
    </div>
  );
}

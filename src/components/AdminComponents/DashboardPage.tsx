"use client";

import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AllState {
  title: string;
  count: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<AllState[]>([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/stats");
      setStats(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">
          Admin Dashboard
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Admin</span>
          <Image
            src={assets.profile_icon}
            width={40}
            height={40}
            alt="profile"
            className="rounded-full border"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-sm text-gray-500 uppercase tracking-wide">
                  {stat.title}
                </h4>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  #
                </div>
              </div>

              <p className="text-2xl font-bold text-gray-800 mt-2">
                {stat.count}
              </p>

              <p className="text-sm text-green-600 mt-2">
                ↑ Updated recently
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

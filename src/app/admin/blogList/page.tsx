"use client";

import BlogTableItem from "@/components/AdminComponents/BlogTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Blog {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  author: string;
  author_img: string;
  date: string;
  __v: number;
}

export default function Page() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBlog = async (mongoId: string) => {
    if (!mongoId) return;

    const response = await axios.delete("/api/blog", {
      params: { id: mongoId },
    });

    if (response.data.success) {
      toast.success(response.data.msg);
      fetchBlogs();
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Blogs</h1>
        <p className="text-gray-500 mt-1">Manage all published blogs here</p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-5xl">
        <div className="overflow-x-auto max-h-[75vh]">
          <table className="w-full text-sm text-gray-600">
            <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700 border-b">
              <tr>
                <th className="hidden sm:table-cell px-6 py-4">Author</th>
                <th className="px-6 py-4">Blog Title</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {blogs.length > 0 ? (
                blogs.map((item, index) => (
                  <BlogTableItem
                    key={index}
                    mongoId={item._id}
                    author={item.author}
                    author_img={item.author_img}
                    title={item.title}
                    date={item.date}
                    deleteBlog={deleteBlog}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400">
                    No blogs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

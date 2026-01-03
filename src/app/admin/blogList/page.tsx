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

export default function page() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = async () => {
       const response = await axios.get("/api/blog");
       const result = response.data.blogs || [];
       setBlogs(result);
    };

    const deleteBlog = async (mongoId: string) => {
        if (!mongoId) return;

        const response = await axios.delete("/api/blog", { params: { id: mongoId } });

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
        <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 ">
            <h1>All Blogs</h1>
            <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="hidden sm:block px-6 py-3">
                                Author Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Blog Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((item, index) => (
                            <BlogTableItem 
                               key={index}
                               mongoId={item._id}
                               author={item.author} 
                               author_img={item.author_img} 
                               title={item.title} 
                               date={item.date}
                               deleteBlog={deleteBlog}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
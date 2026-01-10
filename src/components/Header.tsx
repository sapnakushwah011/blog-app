"use client";

import Image from "next/image";
import { assets } from "@/assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Header() {
  const [email, setEmail] = useState<string>("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await axios.post("/api/email", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error("Error");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1d3f] relative overflow-hidden flex flex-col lg:flex-row gap-4 items-center justify-center px-4 sm:px-6 lg:px-12">
      
      {/* LEFT CONTENT */}
      <div className="flex-1 text-white z-10 mt-40 md:mt-30 text-center lg:text-start">
        
        {/* Heading */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Don’t Miss Out <br/>
            on Our Latest Insights
          </h1>
          <p>
            Discover expert tips, modern design ideas, and real-world project
            stories that help you create spaces with purpose and style.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[400px] scale-75 sm:scale-100 mt-10 border rounded-full mx-auto lg:mx-0"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-non flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="border-l border-white py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* RIGHT CARD */}
      <div className="flex-1 flex justify-end z-10 mt-12 md:mt-30">
        <div className="bg-[#4a7a99] rounded-2xl p-8 w-full max-w-[550px] relative overflow-hidden">
          
          {/* Title */}
          <p className="text-gray-200 text-xs uppercase mb-2 mt-10">
            Innovative Design Solutions
          </p>

          <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
            Crafting <br />
            Spaces That <br />
            Inspire
          </h2>

          {/* Description */}
          <p className="text-gray-200 mb-4 text-sm">
            We transform ideas into timeless spaces through thoughtful design,
            modern aesthetics, and functional architecture tailored to your
            lifestyle.
          </p>

          {/* Button */}
          <button className="bg-[#0f1d3f] text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition">
            Explore Designs
          </button>

          {/* IMAGE – POSITION UNCHANGED */}
          <div className="absolute top-0 right-0 w-48 h-32 md:w-64 md:h-48 -translate-x-8 translate-y-8 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=800&q=80"
              alt="Blog"
              width={400}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* BACKGROUND SHAPES */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-20 rotate-45" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400 rounded-full opacity-20 -rotate-12" />
    </div>
  );
}

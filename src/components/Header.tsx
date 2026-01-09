import Image from "next/image";
import { assets } from "@/assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

export default function Header() {
  const [email, setEmail] = useState<string>("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);

    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  return (
    <>
      <div className="h-screen bg-[#0f1d3f] relative overflow-hidden flex items-center px-16">
        {/* Left Content */}
        <div className="flex-1 text-white z-10">
          {/* Logo */}
          <div className="mb-8">
            <span className="text-4xl italic text-white font-bold">
              @Blogger
            </span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Latest Blogs</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Obcaecati pariatur quisquam atque expedita cupiditate quia
            </p>
          </div>

          <form
            onSubmit={onSubmitHandler}
            className="flex justify-between max-w-100 scale-75 sm:scale-100 mt-10 border"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="pl-4 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="border-l border-white py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Right Card */}
        <div className="flex-1 flex justify-end z-10">
          <div className="bg-[#4a7a99] rounded-2xl p-8 w-[500px] relative">
            {/* Title */}
            <p className="text-gray-200 text-xs uppercase mb-2">
              Innovative Design Solutions
            </p>
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
              Crafting Spaces That Inspire
            </h2>

            {/* Description */}
            <p className="text-gray-200 mb-6 text-sm">
              Transforming visions into reality with cutting-edge architectural
              designs that blend functionality and aesthetics.
            </p>

            {/* Button */}
            <button className="bg-[#0f1d3f] text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition">
              Explore Our Projects
            </button>

            {/* Image */}
            <div className="absolute top-0 right-0 w-48 h-32 md:w-64 md:h-48 -translate-x-8 translate-y-8 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1598300050972-944c9a60d8b3?auto=format&fit=crop&w=400&q=80"
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Optional Abstract Background Shapes */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-20 rotate-45"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400 rounded-full opacity-20 -rotate-12"></div>
      </div>
    </>
  );
}

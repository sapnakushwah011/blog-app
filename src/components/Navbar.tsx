"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent text-white py-4 fixed top-0 left-0 w-full z-50">
      {/* Centered container */}
      <div className="rounded-4xl border border-white max-w-xl lg:max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
        {/* Desktop Menu */}
        <ul className="flex flex-1 justify-center space-x-8">
          <li className="hover:text-gray-300 cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">
            <Link href="/about">Category</Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        {/* <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"}
              ></path>
            </svg>
          </button>
        </div> */}
      </div>

      {/* Mobile Menu */}
      {/* {isOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-[90%] max-w-sm bg-[#0f1d3f] border border-gray-600 rounded-lg px-6 py-4 flex flex-col space-y-4 z-50 shadow-lg">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-center hover:text-gray-300">Home</Link>
          <Link href="/category" onClick={() => setIsOpen(false)} className="text-center hover:text-gray-300">Category</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-center hover:text-gray-300">Contact</Link>
          <button className="bg-blue-500 w-full py-2 rounded-lg hover:bg-blue-600 transition">
            Get Started
          </button>
        </div>
      )} */}
    </nav>
  );
}

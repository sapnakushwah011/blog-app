"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent text-white py-4 fixed top-0 left-0 w-full z-50">
      
      {/* TOP ROW */}
      <div className="relative max-w-7xl mx-auto px-4 flex items-center">
        
        {/* LOGO - LEFT */}
        <Image src={assets.blog_logo} alt="Logo" width={150} />

        {/* CENTER NAV BOX (DESKTOP) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-full justify-center">
          <div className="rounded-4xl border border-white w-full max-w-xl lg:max-w-3xl px-4 py-5 flex items-center justify-between">
            <ul className="flex flex-1 justify-center space-x-8">
              <li className="hover:text-gray-300 cursor-pointer">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <Link href="/category">Category</Link>
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* HAMBURGER - MOBILE */}
        <div className="ml-auto md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 8h16M4 16h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE NAV BOX */}
      {isOpen && (
        <div className="md:hidden absolute left-1/2 -translate-x-1/2 mt-4 w-[90%] max-w-xl rounded-4xl border border-white px-6 py-5">
          <ul className="flex flex-col space-y-4 text-center">
            <li onClick={() => setIsOpen(false)}>
              <Link href="/">Home</Link>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <Link href="/category">Category</Link>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

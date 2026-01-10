"use client";

import { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import {
  HomeIcon,
  PlusCircleIcon,
  ListBulletIcon,
  UsersIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "/admin", icon: HomeIcon, label: "Dashboard" },
    { href: "/admin/addProduct", icon: PlusCircleIcon, label: "Add Blog" },
    { href: "/admin/blogList", icon: ListBulletIcon, label: "Blog List" },
    {
      href: "/admin/subscriptions",
      icon: UsersIcon,
      label: "Subscription",
    },
  ];

  return (
    <div
      className={`flex flex-col bg-[#0f1d3f] transition-all duration-300 ${
        isOpen ? "w-80" : "w-20"
      }`}
    >
      {/* Logo + Hamburger */}
      <div className="flex items-center justify-between px-2 sm:pl-4 py-3 border-b border-white">
        {isOpen && <Image src={assets.blog_logo} width={120} alt="Logo" />}

        {isOpen ? (
          <button onClick={toggleSidebar} className="text-white border-none focus:border-none cursor-pointer">
            <XMarkIcon className="w-8 h-8 text-white" />
          </button>
        ) : (
          <button onClick={toggleSidebar} className="p-2">
            <Bars3Icon className="w-8 h-8 text-white" />
          </button>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex flex-col mt-5 px-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 font-medium px-3 py-2 text-white mb-3 transition-all duration-300 ${
                !isOpen ? "justify-center" : ""
              }`}
            >
              {/* <Image className="bg-white" src={item.icon} width={28} alt="" /> */}
              <Icon className="w-6 h-6 text-white" />
              {isOpen && <p>{item.label}</p>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

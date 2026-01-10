"use client";

import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <main className="bg-[#0f1d3f]">
      <ToastContainer />
      <Navbar />
      <Header />
      <BlogList />
      <Footer />
    </main>
  );
}

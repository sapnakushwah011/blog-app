import { assets } from "@/assets/assets";
import Sidebar from "@/components/AdminComponents/sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex">
        <ToastContainer />
        <Sidebar />
        <div className="flex flex-col w-full">{children}</div>
      </div>
    </>
  );
}

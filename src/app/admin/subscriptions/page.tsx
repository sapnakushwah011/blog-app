"use client";

import SubsTableItem from "@/components/AdminComponents/SubsTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface Email {
  _id: string;
  email: string;
  date: string;
  __v: number;
}

export default function page() {
  const [emails, setEmails] = useState<Email[]>([]);

  const fetchEmails = async () => {
    const response = await axios.get("/api/email");
    const result = response.data.emails || [];
    setEmails(result);
  };

  const deleteEmail = async (mongoId: string) => {
    if (!mongoId) return;

    const response = await axios.delete("/api/email", {
      params: { id: mongoId },
    });

    if (response.data.success) {
      toast.success(response.data.msg);
      fetchEmails();
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Subscription</h1>
        <p className="text-gray-500 mt-1">Manage all subscriptions here</p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-5xl">
        <div className="overflow-x-auto max-h-[75vh]">
          <table className="w-full text-sm text-gray-600">
            <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700 border-b">
              <tr>
                <th className="hidden sm:table-cell px-6 py-4">Email</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {emails.length > 0 ? (
                emails.map((item, index) => (
                  <SubsTableItem
                    key={index}
                    mongoId={item._id}
                    email={item.email}
                    date={item.date}
                    deleteEmail={deleteEmail}
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

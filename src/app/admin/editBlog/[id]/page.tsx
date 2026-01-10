"use client";

import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Data {
  title: string;
  description: string;
  category: string;
  author: string;
  author_img: string;
}

const DEFAULT_VALUES = {
  title: "",
  description: "",
  category: "Startup",
  author: "John Doe",
  author_img: "/author_img.png",
};

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [data, setData] = useState<Data>(DEFAULT_VALUES);

  // fetch blog data
  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: { id: id },
    });
    setData(response.data.blog);
    setPreviewImage(response.data.blog.image);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  const onChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append("image", image);

    const response = await axios.put("/api/blog", formData, {
        params: { id: id },
    });
    if (response.data.success) {
      toast.success(response.data.msg);
      router.push("/admin/blogList");
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-start px-10 py-5">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Blog</h1>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Thumbnail
            </label>
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-black transition"
            >
              <Image
                src={
                  image
                    ? URL.createObjectURL(image)
                    : previewImage
                    ? previewImage
                    : assets.upload_area
                }
                width={160}
                height={90}
                alt="upload"
                className="object-contain"
              />

              <p className="text-sm text-gray-500 mt-3">
                Click to upload image
              </p>
            </label>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImage(file);
                }
                e.target.value = "";
              }}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={data.title}
              onChange={onChangeHandler}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Description
            </label>
            <textarea
              name="description"
              rows={6}
              placeholder="Write blog content here..."
              value={data.description}
              onChange={onChangeHandler}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="w-48 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="Startup">Startup</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-40 h-12 bg-black text-white rounded-lg hover:bg-gray-900 transition active:scale-95"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}

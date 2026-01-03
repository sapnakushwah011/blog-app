"use client";

import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

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
}

export default function page() {
    const [image, setImage] = useState<File | null>(null);
    const [data, setData] = useState<Data>(DEFAULT_VALUES);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("author", data.author);
        formData.append("author_img", data.author_img);
        if (image) formData.append("image", image);

        const response = await axios.post("/api/blog", formData);
        if (response.data.success) {
            toast.success(response.data.msg);
            setData(DEFAULT_VALUES);
            setImage(null);
        } else {
            toast.error("Error")
        }
    };


    return (
        <>
           <form onSubmit={onSubmitHandler} className="pt-5 px-5 md:pt-12 sm:pl-16">
                <p className="text-xl">Upload thumbnail</p>
                <label htmlFor="image">
                    <Image className="mt-4" src={!image ? assets.upload_area : URL.createObjectURL(image)} width={140} height={70} alt="" />
                </label>
                <input 
                    type="file" 
                    id="image"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setImage(file);
                        }
                    }}
                    hidden 
                    required 
                />
                <p className="text-xl mt-4">Blog Title</p>
                <input 
                    className="w-full sm:w-[500px] mt-4 px-4 py-3 border" 
                    type="text"  
                    placeholder="Type here" 
                    required
                    name="title"
                    value={data.title}
                    onChange={onChangeHandler}
                />
                <p className="text-xl mt-4">Blog Description</p>
                <textarea 
                    className="w-full sm:w-[500px] mt-4 px-4 py-3 border" 
                    placeholder="write content here" 
                    rows={6} 
                    required
                    name="description"
                    value={data.description}
                    onChange={onChangeHandler}
                />
                <p className="text-xl mt-4">Blog Category</p>
                <select 
                    name="category" 
                    className="w-40 mt-4 px-4 py-3 border text-gray-500"
                    value={data.category}
                    onChange={onChangeHandler}
                >
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
                <br />
                <button type="submit" className="mt-8 w-40 h-12 bg-black text-white"> Add</button>
           </form>
        </>
    )
}
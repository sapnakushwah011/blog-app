import { ConnectDB } from "../../../lib/config/db";
const { NextResponse } = require("next/server");
import { writeFile } from "fs/promises"
import BlogModel from "../../../lib/models/BlogModel";
const fs = require('fs');

const LoadDB = async () => {
   await ConnectDB();
} 

LoadDB();

// Get API for fetching all blog
export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get("id");
    if(blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json({ blog });
    } else {
        const blogs = await BlogModel.find({});
        return NextResponse.json({ blogs });
    }
};

// POST API for create blog
export async function POST(request) {
    try {
        const formData = await request.formData();
        const timestamp = Date.now();
    
        const image = formData.get('image');
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const path = `./public/${timestamp}_${image.name}`;
        await writeFile(path, buffer);
        const imgURL = `/${timestamp}_${image.name}`;

        const blogData = {
           title: `${formData.get('title')}`,
           description: `${formData.get('description')}`,
           category: `${formData.get('category')}`,
           author: `${formData.get('author')}`,
           image: `${imgURL}`,
           author_img: `${formData.get('author_img')}`,
        }

        await BlogModel.create(blogData);
        return NextResponse.json({ success: true, msg: "Blog Added" })
    } catch(error) {
        console.error(error);
    }
};

// Delete API to delete blog
export async function DELETE(request) {
    const Id = await request.nextUrl.searchParams.get("id");
    const blog = await BlogModel.findById(Id);

    fs.unlink(`./public/${blog.image}`, () => {});
    await BlogModel.findByIdAndDelete(Id);

    return NextResponse.json({ success: true, msg: "Blog Deleted." });
};
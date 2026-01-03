import { ConnectDB } from "../../../lib/config/db";
const { NextResponse } = require("next/server");
import EmailModel from "../../../lib/models/EmailModel";

const LoadDB = async () => {
   await ConnectDB();
} 

LoadDB();

// Get API for fetching all blog
export async function GET(request) {
    const emailId = request.nextUrl.searchParams.get("id");
    if(emailId) {
        const email = await EmailModel.findById(blogId);
        return NextResponse.json({ email });
    } else {
        const emails = await EmailModel.find({});
        return NextResponse.json({ emails });
    }
};

// POST API for create blog
export async function POST(request) {
    try {
        const formData = await request.formData();
        const emailData = { email: `${formData.get('email')}`,}
        await EmailModel.create(emailData);
        return NextResponse.json({ success: true, msg: "Email Subscribed" })
    } catch(error) {
        console.error(error);
    }
};

// Delete API to delete blog
export async function DELETE(request) {
    const Id = await request.nextUrl.searchParams.get("id");
    const blog = await EmailModel.findById(Id);

    fs.unlink(`./public/${blog.image}`, () => {});
    await EmailModel.findByIdAndDelete(Id);

    return NextResponse.json({ msg: "Blog Deleted." });
};
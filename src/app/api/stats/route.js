import { ConnectDB } from "../../../lib/config/db";
const { NextResponse } = require("next/server");
import EmailModel from "../../../lib/models/EmailModel";
import BlogModel from "../../../lib/models/BlogModel";

const LoadDB = async () => {
   await ConnectDB();
} 

LoadDB();


// GET API to return counts of blogs and email subscriptions
export async function GET() {
    try {
        const blogCount = await BlogModel.countDocuments({});
        const emailCount = await EmailModel.countDocuments({});

        const result = [
            { title: "Total Blogs", count: blogCount },
            { title: "Total Subscriptions", count: emailCount }
        ];

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, msg: "Failed to fetch counts." }, { status: 500 });
    }
}
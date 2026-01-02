import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://sapnakushwahsr_db_user:SAPNA%409522@cluster0.9qgyzyj.mongodb.net/blog-app');
    console.log('Database connected');
}
// import mongoose from "mongoose";

// export const ConnectDB = async () => {
//     await mongoose.connect('mongodb+srv://sapnakushwahsr_db_user:952273@cluster0.9qgyzyj.mongodb.net/blog-app');
//     console.log('Database connected');
// }

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const ConnectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  console.log("Database connected");
  return cached.conn;
};

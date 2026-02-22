import mongoose from "mongoose";

import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.DB_URL) {
      console.warn("⚠️  DB_URL is not defined in environment variables - running without database");
      return;
    }
    const conn = await mongoose.connect(ENV.DB_URL);
    console.log("✅ Connected to MongoDB:", conn.connection.host);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB", error);
    console.warn("⚠️  Continuing without database connection for development");
    // Don't exit the process, just warn and continue
  }
};
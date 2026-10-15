import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    problem: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    // stream video call ID
    callId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Indexes for better query performance
sessionSchema.index({ status: 1, createdAt: -1 }); // For active sessions query
sessionSchema.index({ host: 1, createdAt: -1 }); // For user's sessions
sessionSchema.index({ participant: 1, createdAt: -1 }); // For user's sessions
sessionSchema.index({ difficulty: 1, status: 1 }); // For filtering by difficulty

const Session = mongoose.model("Session", sessionSchema);

export default Session;
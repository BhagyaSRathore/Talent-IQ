import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    // Check if Stream is configured
    if (!process.env.STREAM_API_KEY || process.env.STREAM_API_KEY === 'your_stream_api_key') {
      return res.status(200).json({
        token: "mock_token",
        userId: req.user.clerkId,
        userName: req.user.name,
        userImage: req.user.profileImage,
        message: "Stream API not configured - using mock token"
      });
    }

    // use clerkId for Stream (not mongodb _id)=> it should match the id we have in the stream dashboard
    const token = chatClient.createToken(req.user.clerkId);

    res.status(200).json({
      token,
      userId: req.user.clerkId,
      userName: req.user.name,
      userImage: req.user.profileImage,
    });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
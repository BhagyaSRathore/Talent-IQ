import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      // find user in db by clerk ID
      let user = await User.findOne({ clerkId });

      // If user doesn't exist, create them automatically
      if (!user) {
        console.log("User not found in DB, creating new user:", clerkId);
        
        // Get user info from Clerk
        const clerkUser = req.auth();
        
        user = await User.create({
          clerkId: clerkId,
          email: clerkUser.sessionClaims?.email || `user_${clerkId}@temp.com`,
          name: clerkUser.sessionClaims?.name || clerkUser.sessionClaims?.firstName || "User",
          profileImage: clerkUser.sessionClaims?.imageUrl || "",
        });
        
        console.log("✅ New user created:", user);
      }

      // attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
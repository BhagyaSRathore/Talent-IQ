import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

let chatClient = null;
let streamClient = null;

if (!apiKey || !apiSecret || apiKey === 'your_stream_api_key') {
  console.warn("⚠️  STREAM_API_KEY or STREAM_API_SECRET is missing - video/chat features will be disabled");
  // Create mock clients that won't crash the app
  chatClient = {
    channel: () => ({
      create: async () => console.warn("Stream not configured"),
      addMembers: async () => console.warn("Stream not configured"),
      delete: async () => console.warn("Stream not configured"),
    }),
    createToken: () => "mock_token",
    upsertUser: async () => console.warn("Stream not configured"),
    deleteUser: async () => console.warn("Stream not configured"),
  };
  streamClient = {
    video: {
      call: () => ({
        getOrCreate: async () => console.warn("Stream not configured"),
        delete: async () => console.warn("Stream not configured"),
      }),
    },
  };
} else {
  chatClient = StreamChat.getInstance(apiKey, apiSecret);
  streamClient = new StreamClient(apiKey, apiSecret);
}

export { chatClient, streamClient };

export const upsertStreamUser = async (userData) => {
  try {
    if (apiKey && apiKey !== 'your_stream_api_key') {
      await chatClient.upsertUser(userData);
      console.log("Stream user upserted successfully:", userData);
    }
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    if (apiKey && apiKey !== 'your_stream_api_key') {
      await chatClient.deleteUser(userId);
      console.log("Stream user deleted successfully:", userId);
    }
  } catch (error) {
    console.error("Error deleting the Stream user:", error);
  }
};
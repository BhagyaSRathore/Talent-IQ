import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import { chatAPI } from '../config/api';
import { MessageSquare, Loader2, AlertCircle } from 'lucide-react';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPanel = ({ sessionId, callId, user }) => {
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if Stream is configured
        if (!STREAM_API_KEY || STREAM_API_KEY === 'your_stream_api_key_here') {
          throw new Error('Stream Chat not configured');
        }

        // Get Stream token from backend
        const tokenResponse = await chatAPI.getStreamToken();
        const { token, userId, userName, userImage } = tokenResponse.data;

        // Check if we got a mock token
        if (token === 'mock_token') {
          throw new Error('Stream API keys not configured on server');
        }

        // Initialize Stream Chat client
        const client = StreamChat.getInstance(STREAM_API_KEY);
        
        await client.connectUser(
          {
            id: userId,
            name: userName || 'User',
            image: userImage || `https://ui-avatars.com/api/?name=${userName || 'User'}`,
          },
          token
        );

        setChatClient(client);

        // Get or create channel for this session
        const chatChannel = client.channel('messaging', callId, {
          name: `Session Chat`,
          members: [userId],
        });

        await chatChannel.watch();
        setChannel(chatChannel);
      } catch (err) {
        console.error('Error initializing chat:', err);
        setError(err.message || 'Failed to initialize chat');
      } finally {
        setLoading(false);
      }
    };

    if (user && callId) {
      initializeChat();
    }

    // Cleanup
    return () => {
      if (chatClient) {
        chatClient.disconnectUser().catch(console.error);
      }
    };
  }, [sessionId, callId, user]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-blue-400 animate-spin mx-auto mb-2" />
          <p className="text-slate-300 text-sm">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900 p-4">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-white mb-2">Chat Unavailable</h3>
          <p className="text-xs text-slate-400 mb-3">{error}</p>
          <div className="text-xs text-slate-500 bg-slate-800 p-3 rounded max-w-xs">
            <p className="font-semibold mb-1">Setup required:</p>
            <p className="text-left">
              1. Get API keys from getstream.io<br />
              2. Configure VITE_STREAM_API_KEY<br />
              3. Configure STREAM_API_KEY & STREAM_API_SECRET
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!chatClient || !channel) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900">
        <p className="text-slate-400 text-sm">Initializing chat...</p>
      </div>
    );
  }

  return (
    <div className="h-full stream-chat-custom">
      <Chat client={chatClient} theme="messaging dark">
        <Channel channel={channel}>
          <Window>
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPanel;

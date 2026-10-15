import { useEffect, useState } from 'react';
import {
  StreamVideo,
  StreamVideoClient,
  Call,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { 
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { chatAPI } from '../config/api';
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, Users, Loader2 } from 'lucide-react';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const VideoCallUI = ({ onLeave }) => {
  const call = useCall();
  const { useLocalParticipant, useParticipants } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const participants = useParticipants();
  
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);

  const toggleMic = async () => {
    if (call) {
      await call.microphone.toggle();
      setIsMicOn(call.microphone.state.status === 'enabled');
    }
  };

  const toggleCamera = async () => {
    if (call) {
      await call.camera.toggle();
      setIsCameraOn(call.camera.state.status === 'enabled');
    }
  };

  const leaveCall = async () => {
    if (call) {
      await call.leave();
    }
    if (onLeave) {
      onLeave();
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Video Layout */}
      <div className="flex-1 relative">
        <SpeakerLayout />
      </div>

      {/* Custom Controls */}
      <div className="bg-slate-800 border-t border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-300 text-sm">
            <Users className="h-4 w-4" />
            <span>{participants.length} participant{participants.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMic}
              className={`p-3 rounded-full transition-colors ${
                isMicOn
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
              title={isMicOn ? 'Mute' : 'Unmute'}
            >
              {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </button>

            <button
              onClick={toggleCamera}
              className={`p-3 rounded-full transition-colors ${
                isCameraOn
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
              title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
            >
              {isCameraOn ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </button>

            <button
              onClick={leaveCall}
              className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
              title="Leave call"
            >
              <PhoneOff className="h-5 w-5" />
            </button>
          </div>

          <button
            onClick={() => setShowParticipants(!showParticipants)}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors"
          >
            <Users className="h-4 w-4 inline mr-1" />
            Participants
          </button>
        </div>
      </div>

      {/* Participants Panel */}
      {showParticipants && (
        <div className="absolute right-4 bottom-20 bg-slate-800 rounded-lg shadow-xl p-4 w-64 max-h-80 overflow-y-auto">
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      )}
    </div>
  );
};

const VideoCall = ({ sessionId, callId, user, onLeave }) => {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeCall = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if Stream is configured
        if (!STREAM_API_KEY || STREAM_API_KEY === 'your_stream_api_key_here') {
          throw new Error('Stream SDK not configured. Please add VITE_STREAM_API_KEY to your .env file.');
        }

        // Get Stream token from backend
        const tokenResponse = await chatAPI.getStreamToken();
        const { token, userId } = tokenResponse.data;

        // Initialize Stream Video client
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user: {
            id: userId,
            name: user?.name || 'User',
            image: user?.profileImage || `https://ui-avatars.com/api/?name=${user?.name || 'User'}`,
          },
          token,
        });

        setClient(videoClient);

        // Join or create call
        const videoCall = videoClient.call('default', callId);
        await videoCall.join({ create: true });
        
        setCall(videoCall);
      } catch (err) {
        console.error('Error initializing video call:', err);
        setError(err.message || 'Failed to initialize video call');
      } finally {
        setLoading(false);
      }
    };

    if (user && callId) {
      initializeCall();
    }

    // Cleanup
    return () => {
      if (call) {
        call.leave().catch(console.error);
      }
      if (client) {
        client.disconnectUser().catch(console.error);
      }
    };
  }, [sessionId, callId, user]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-300">Connecting to video call...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900 p-6">
        <div className="text-center max-w-md">
          <VideoOff className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Video Call Unavailable</h3>
          <p className="text-slate-400 mb-4">{error}</p>
          <div className="text-xs text-slate-500 bg-slate-800 p-3 rounded">
            <p className="font-semibold mb-1">Configuration needed:</p>
            <p>1. Get API key from getstream.io</p>
            <p>2. Add VITE_STREAM_API_KEY to frontend/.env</p>
            <p>3. Add STREAM_API_KEY and STREAM_API_SECRET to backend/.env</p>
          </div>
        </div>
      </div>
    );
  }

  if (!client || !call) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900">
        <p className="text-slate-400">Initializing...</p>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <Call call={call}>
        <VideoCallUI onLeave={onLeave} />
      </Call>
    </StreamVideo>
  );
};

export default VideoCall;

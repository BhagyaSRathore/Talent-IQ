import { useEffect, useState } from 'react';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { 
  StreamCall,
  SpeakerLayout,
  CallControls,
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
    <div className="h-full flex flex-col bg-background">
      {/* Video Layout */}
      <div className="flex-1 relative">
        <SpeakerLayout />
      </div>

      {/* Custom Controls */}
      <div className="bg-surface-elevated border-t border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <Users className="h-4 w-4" />
            <span>{participants.length} participant{participants.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMic}
              className={`p-3 rounded-full transition-colors ${
                isMicOn
                  ? 'bg-surface hover:bg-border text-text-primary'
                  : 'bg-error hover:bg-error/90 text-white'
              }`}
              title={isMicOn ? 'Mute' : 'Unmute'}
            >
              {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </button>

            <button
              onClick={toggleCamera}
              className={`p-3 rounded-full transition-colors ${
                isCameraOn
                  ? 'bg-surface hover:bg-border text-text-primary'
                  : 'bg-error hover:bg-error/90 text-white'
              }`}
              title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
            >
              {isCameraOn ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </button>

            <button
              onClick={leaveCall}
              className="p-3 rounded-full bg-error hover:bg-error/90 text-white transition-colors"
              title="Leave call"
            >
              <PhoneOff className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
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
            image: user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}`,
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
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Connecting to video call...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-background p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mb-4 mx-auto">
            <VideoOff className="h-8 w-8 text-warning" />
          </div>
          <h3 className="heading-4 mb-2">Video Setup Required</h3>
          <p className="text-small mb-4">{error}</p>
          <div className="text-xs text-text-tertiary bg-surface-elevated p-3 rounded-lg border border-border text-left">
            <p className="font-semibold mb-2">Quick Setup:</p>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Get free API key from <a href="https://getstream.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">getstream.io</a></li>
              <li>Add to <code className="code-inline">frontend/.env</code>:<br/>
                <code className="text-xs">VITE_STREAM_API_KEY=your_key</code>
              </li>
              <li>Add to <code className="code-inline">backend/.env</code>:<br/>
                <code className="text-xs">STREAM_API_KEY=your_key</code><br/>
                <code className="text-xs">STREAM_API_SECRET=your_secret</code>
              </li>
              <li>Restart both servers</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  if (!client || !call) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <p className="text-text-tertiary">Initializing...</p>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <VideoCallUI onLeave={onLeave} />
      </StreamCall>
    </StreamVideo>
  );
};

export default VideoCall;


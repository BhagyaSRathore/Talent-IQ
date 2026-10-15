import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useSession } from '../context/SessionContext';
import { sessionAPI, executionAPI } from '../config/api';
import { useSocket } from '../hooks/useSocket';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import CodeEditor from '../components/CodeEditor';
import OutputConsole from '../components/OutputConsole';
import VideoCall from '../components/VideoCall';
import ChatPanel from '../components/ChatPanel';
import { 
  Code2, 
  Users, 
  X, 
  ChevronLeft,
  ChevronRight,
  WifiOff,
  Wifi,
  LogOut,
  Video,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

const SessionRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: clerkUser } = useUser();
  const { currentSession, setCurrentSession, endSession } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Panel visibility
  const [showVideo, setShowVideo] = useState(true);
  const [showChat, setShowChat] = useState(true);
  
  // Code execution state
  const [executionOutput, setExecutionOutput] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionError, setExecutionError] = useState(null);

  // Socket connection
  const { socket, isConnected, participants } = useSocket(id, currentUser);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const response = await sessionAPI.getSessionById(id);
        setCurrentSession(response.data.session);
        
        if (clerkUser) {
          setCurrentUser({
            _id: clerkUser.id,
            name: clerkUser.fullName || clerkUser.firstName || 'User',
            email: clerkUser.primaryEmailAddress?.emailAddress,
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch session');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [id, setCurrentSession, clerkUser]);

  const handleEndSession = async () => {
    try {
      await endSession(id);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to end session');
    }
  };

  const handleRunCode = async (code, language) => {
    setIsExecuting(true);
    setExecutionError(null);
    setExecutionOutput(null);

    try {
      const response = await executionAPI.runCode({
        code,
        language,
        stdin: '',
      });
      
      setExecutionOutput(response.data.output);
      
      if (response.data.isMock) {
        console.warn('Using mock execution - Judge0 API not configured');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Execution failed';
      setExecutionError(errorMessage);
      console.error('Code execution error:', err);
    } finally {
      setIsExecuting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner text="Loading session..." />
      </div>
    );
  }

  if (error || !currentSession) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="max-w-md w-full">
          <ErrorMessage message={error || 'Session not found'} />
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 w-full btn btn-secondary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isHost = clerkUser?.id === currentSession.host?.clerkId;

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Header */}
      <header className="flex-shrink-0 bg-surface border-b border-border px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold text-text-primary">{currentSession.problem}</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`badge badge-${currentSession.difficulty} text-xs`}>
                    {currentSession.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Connection Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-elevated">
              {isConnected ? (
                <>
                  <Wifi className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-success">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-error" />
                  <span className="text-sm font-medium text-error">Disconnected</span>
                </>
              )}
            </div>

            {/* Participants Count */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-elevated">
              <Users className="h-4 w-4 text-text-secondary" />
              <span className="text-sm font-medium text-text-secondary">
                {participants.length + 1}/2
              </span>
            </div>

            {/* Panel Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowVideo(!showVideo)}
                className={`icon-btn ${showVideo ? 'bg-primary/10 text-primary' : ''}`}
                title={showVideo ? 'Hide video' : 'Show video'}
              >
                <Video className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowChat(!showChat)}
                className={`icon-btn ${showChat ? 'bg-primary/10 text-primary' : ''}`}
                title={showChat ? 'Hide chat' : 'Show chat'}
              >
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>

            {/* End Session Button */}
            {isHost && (
              <button
                onClick={() => setShowEndConfirm(true)}
                className="btn btn-danger btn-sm"
              >
                <LogOut className="h-4 w-4" />
                End Session
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Video */}
        {showVideo && (
          <div className="w-80 flex-shrink-0 bg-sidebar border-r border-border flex flex-col">
            <div className="panel-header flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text-primary">Video Call</h3>
              <button
                onClick={() => setShowVideo(false)}
                className="icon-btn"
                title="Close video panel"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <VideoCall
                sessionId={id}
                callId={currentSession.callId}
                user={currentUser}
                onLeave={() => {}}
              />
            </div>

            {/* Participants List */}
            <div className="panel-header border-t">
              <h4 className="text-xs font-semibold text-text-secondary mb-2">
                PARTICIPANTS ({participants.length + 1})
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-text-primary">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="font-medium">You</span>
                </div>
                {participants.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-text-primary">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>{p.userName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Center Panel - Code Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="panel-header flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Code Editor</h3>
            <div className="flex items-center gap-2">
              {!showVideo && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="icon-btn"
                  title="Show video panel"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <CodeEditor
              sessionId={id}
              socket={socket}
              currentUser={currentUser}
              onRunCode={handleRunCode}
            />
          </div>
        </div>

        {/* Right Panel - Output & Chat */}
        {showChat && (
          <div className="w-96 flex-shrink-0 bg-sidebar border-l border-border flex flex-col">
            {/* Output Console */}
            <div className="flex-1 min-h-0 flex flex-col border-b border-border">
              <div className="panel-header">
                <h3 className="text-sm font-semibold text-text-primary">Output</h3>
              </div>
              <div className="flex-1 min-h-0">
                <OutputConsole
                  output={executionOutput}
                  isLoading={isExecuting}
                  error={executionError}
                />
              </div>
            </div>

            {/* Chat Panel */}
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="panel-header flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text-primary">Chat</h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="icon-btn"
                  title="Close chat panel"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 min-h-0">
                <ChatPanel
                  sessionId={id}
                  callId={currentSession.callId}
                  user={currentUser}
                />
              </div>
            </div>
          </div>
        )}

        {/* Closed Chat Indicator */}
        {!showChat && (
          <button
            onClick={() => setShowChat(true)}
            className="fixed bottom-6 right-6 btn btn-primary shadow-xl"
            title="Show chat"
          >
            <MessageSquare className="h-5 w-5" />
            Show Chat
          </button>
        )}
      </div>

      {/* End Session Modal */}
      {showEndConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="card-elevated max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-error/10 rounded-full">
                <AlertCircle className="h-6 w-6 text-error" />
              </div>
              <div className="flex-1">
                <h3 className="heading-4 mb-1">End Session?</h3>
                <p className="text-body text-sm">
                  This will disconnect all participants and cannot be undone.
                </p>
              </div>
              <button
                onClick={() => setShowEndConfirm(false)}
                className="icon-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEndConfirm(false)}
                className="flex-1 btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleEndSession}
                className="flex-1 btn btn-danger"
              >
                End Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionRoom;


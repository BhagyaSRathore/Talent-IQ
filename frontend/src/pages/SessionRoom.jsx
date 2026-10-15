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
  Maximize2,
  Minimize2,
  WifiOff,
  Wifi,
  Maximize
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
  const [editorExpanded, setEditorExpanded] = useState(false);
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
        
        // Set current user info for socket
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
        stdin: '', // Can be enhanced to accept custom input
      });
      
      setExecutionOutput(response.data.output);
      
      // Show warning if mock execution
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
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading session..." />
      </div>
    );
  }

  if (error || !currentSession) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorMessage message={error || 'Session not found'} />
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 w-full btn-secondary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isHost = clerkUser?.id === currentSession.host?.clerkId;

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-blue-400" />
              <h1 className="text-xl font-bold text-white">{currentSession.problem}</h1>
            </div>
            <span className={`badge ${
              currentSession.difficulty === 'easy' ? 'badge-easy' :
              currentSession.difficulty === 'medium' ? 'badge-medium' :
              'badge-hard'
            }`}>
              {currentSession.difficulty.toUpperCase()}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <>
                  <Wifi className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-red-400" />
                  <span className="text-sm text-red-400">Disconnected</span>
                </>
              )}
            </div>

            {/* Participants */}
            <div className="flex items-center space-x-2 text-slate-300">
              <Users className="h-5 w-5" />
              <span className="text-sm">
                {currentSession.participant ? '2/2' : '1/2'} participants
              </span>
            </div>

            {/* End Session Button */}
            {isHost && (
              <button
                onClick={() => setShowEndConfirm(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors duration-200"
              >
                End Session
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Video/Participants */}
        {!editorExpanded && showVideo && (
          <div className="w-80 flex-shrink-0 bg-slate-900 border-r border-slate-700 flex flex-col">
            {/* Video Area */}
            <div className="flex-1 min-h-0">
              <VideoCall
                sessionId={id}
                callId={currentSession.callId}
                user={currentUser}
                onLeave={() => {}}
              />
            </div>

            {/* Active Participants */}
            <div className="p-4 border-t border-slate-700 flex-shrink-0">
              <h3 className="text-sm font-semibold text-slate-300 mb-2">
                Active ({participants.length + 1})
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-slate-300 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>You</span>
                </div>
                {participants.map((p, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-slate-300 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{p.userName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Center Panel - Code Editor */}
        <div className={`flex flex-col ${editorExpanded ? 'flex-1' : 'flex-1'}`}>
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
            <h2 className="text-sm font-semibold text-slate-300">Code Editor</h2>
            <button
              onClick={() => setEditorExpanded(!editorExpanded)}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              title={editorExpanded ? 'Show panels' : 'Expand editor'}
            >
              {editorExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>
          <div className="flex-1">
            <CodeEditor
              sessionId={id}
              socket={socket}
              currentUser={currentUser}
              onRunCode={handleRunCode}
            />
          </div>
        </div>

        {/* Right Panel - Output Console & Chat */}
        {!editorExpanded && (
          <div className="w-96 flex-shrink-0 bg-slate-900 border-l border-slate-700 flex flex-col">
            <div className="flex-1 min-h-0">
              <OutputConsole
                output={executionOutput}
                isLoading={isExecuting}
                error={executionError}
              />
            </div>

            {/* Chat Area */}
            {showChat && (
              <div className="h-80 border-t border-slate-700 bg-slate-800 flex flex-col flex-shrink-0">
                <div className="px-4 py-2 border-b border-slate-700 flex items-center justify-between flex-shrink-0">
                  <h3 className="font-semibold text-sm text-white">Chat</h3>
                  <button
                    onClick={() => setShowChat(false)}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    Hide
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
            )}

            {!showChat && (
              <div className="p-2 border-t border-slate-700 bg-slate-800 flex-shrink-0">
                <button
                  onClick={() => setShowChat(true)}
                  className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors"
                >
                  Show Chat
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* End Session Confirmation Modal */}
      {showEndConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full p-6 animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-800">End Session?</h3>
              <button
                onClick={() => setShowEndConfirm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-slate-600 mb-6">
              Are you sure you want to end this session? This action cannot be undone and will disconnect all participants.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowEndConfirm(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleEndSession}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
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

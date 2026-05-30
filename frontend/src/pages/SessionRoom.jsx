import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Video, MessageSquare, Code2, Users, X } from 'lucide-react';

const SessionRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentSession, setCurrentSession, endSession } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/sessions/${id}`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${await window.Clerk?.session?.getToken()}`,
          },
        });
        
        if (!response.ok) throw new Error('Failed to fetch session');
        
        const data = await response.json();
        setCurrentSession(data.session);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [id, setCurrentSession]);

  const handleEndSession = async () => {
    try {
      await endSession(id);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to end session');
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

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
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
            <div className="flex items-center space-x-2 text-slate-300">
              <Users className="h-5 w-5" />
              <span className="text-sm">
                {currentSession.participant ? '2/2' : '1/2'} participants
              </span>
            </div>
            <button
              onClick={() => setShowEndConfirm(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              End Session
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Call Area */}
        <div className="flex-1 bg-slate-900 p-6">
          <div className="h-full card bg-slate-800 border-slate-700 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <Video className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg font-semibold mb-2">Video Call Area</p>
              <p className="text-sm">
                Video calling feature requires Stream Video SDK integration
              </p>
              <p className="text-xs mt-4 text-slate-500">
                Configure VITE_STREAM_API_KEY in your .env file
              </p>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col">
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center space-x-2 text-white">
              <MessageSquare className="h-5 w-5" />
              <h2 className="font-semibold">Chat</h2>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="text-center text-slate-400 text-sm">
              <p>Chat feature requires Stream Chat SDK integration</p>
              <p className="mt-2 text-xs text-slate-500">
                Configure Stream API keys in your .env file
              </p>
            </div>
          </div>

          <div className="p-4 border-t border-slate-700">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              disabled
            />
          </div>
        </div>
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
              Are you sure you want to end this session? This action cannot be undone.
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

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import SessionCard from '../components/SessionCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Search, Filter, RefreshCw } from 'lucide-react';

const Sessions = () => {
  const navigate = useNavigate();
  const { activeSessions, loading, error, fetchActiveSessions, joinSession } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    fetchActiveSessions();
  }, [fetchActiveSessions]);

  const handleJoinSession = async (sessionId) => {
    try {
      setLocalError(null);
      await joinSession(sessionId);
      navigate(`/session/${sessionId}`);
    } catch (err) {
      setLocalError(err.response?.data?.message || 'Failed to join session');
    }
  };

  const handleRefresh = () => {
    fetchActiveSessions();
  };

  const filteredSessions = activeSessions.filter((session) => {
    const matchesSearch = session.problem.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || session.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Active Sessions</h1>
            <p className="text-slate-600">Join a session and start practicing</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Filters */}
        <div className="card p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="input-field pl-10 appearance-none cursor-pointer"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Messages */}
        {(error || localError) && (
          <ErrorMessage
            message={error || localError}
            onClose={() => setLocalError(null)}
          />
        )}

        {/* Sessions Grid */}
        {loading ? (
          <LoadingSpinner text="Loading sessions..." />
        ) : filteredSessions.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                {searchTerm || difficultyFilter !== 'all'
                  ? 'No sessions match your filters'
                  : 'No active sessions available'}
              </h3>
              <p className="text-slate-500 mb-6">
                {searchTerm || difficultyFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Be the first to create a session!'}
              </p>
              {!searchTerm && difficultyFilter === 'all' && (
                <button
                  onClick={() => navigate('/create-session')}
                  className="btn-primary"
                >
                  Create Session
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p className="text-slate-600">
                Found <span className="font-semibold">{filteredSessions.length}</span> session{filteredSessions.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSessions.map((session) => (
                <SessionCard
                  key={session._id}
                  session={session}
                  onJoin={handleJoinSession}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sessions;

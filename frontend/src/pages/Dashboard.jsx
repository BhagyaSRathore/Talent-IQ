import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useSession } from '../context/SessionContext';
import SessionCard from '../components/SessionCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Plus, TrendingUp, Clock, Users } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { activeSessions, myRecentSessions, loading, error, fetchActiveSessions, fetchMyRecentSessions, joinSession } = useSession();
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    fetchActiveSessions();
    fetchMyRecentSessions();
  }, [fetchActiveSessions, fetchMyRecentSessions]);

  const handleJoinSession = async (sessionId) => {
    try {
      setLocalError(null);
      await joinSession(sessionId);
      navigate(`/session/${sessionId}`);
    } catch (err) {
      setLocalError(err.response?.data?.message || 'Failed to join session');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="card p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.firstName || 'Developer'}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Ready to practice and improve your coding skills?
              </p>
            </div>
            <button
              onClick={() => navigate('/create-session')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create New Session</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            icon={<Users className="h-6 w-6" />}
            title="Active Sessions"
            value={activeSessions.length}
            color="blue"
          />
          <StatCard
            icon={<Clock className="h-6 w-6" />}
            title="Recent Sessions"
            value={myRecentSessions.length}
            color="indigo"
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6" />}
            title="Total Practice"
            value={myRecentSessions.length}
            color="purple"
          />
        </div>

        {/* Error Message */}
        {(error || localError) && (
          <ErrorMessage
            message={error || localError}
            onClose={() => setLocalError(null)}
          />
        )}

        {/* Active Sessions */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Active Sessions</h2>
            <button
              onClick={() => navigate('/sessions')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All →
            </button>
          </div>

          {loading ? (
            <LoadingSpinner text="Loading sessions..." />
          ) : activeSessions.length === 0 ? (
            <div className="card p-12 text-center">
              <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                No Active Sessions
              </h3>
              <p className="text-slate-500 mb-6">
                Be the first to create a session and start practicing!
              </p>
              <button
                onClick={() => navigate('/create-session')}
                className="btn-primary"
              >
                Create Session
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeSessions.slice(0, 6).map((session) => (
                <SessionCard
                  key={session._id}
                  session={session}
                  onJoin={handleJoinSession}
                />
              ))}
            </div>
          )}
        </section>

        {/* Recent Sessions */}
        {myRecentSessions.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Your Recent Sessions</h2>
              <button
                onClick={() => navigate('/history')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                View All →
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRecentSessions.slice(0, 3).map((session) => (
                <SessionCard
                  key={session._id}
                  session={session}
                  showJoinButton={false}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    indigo: 'from-indigo-500 to-indigo-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} text-white`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-600 font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

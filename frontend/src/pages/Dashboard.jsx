import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useSession } from '../context/SessionContext';
import SessionCard from '../components/SessionCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Plus, TrendingUp, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';

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
        <div className="relative overflow-hidden">
          <div className="card-elevated p-8 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border-primary/20">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                    Welcome Back
                  </span>
                </div>
                <h1 className="heading-2 mb-2">
                  Hello, {user?.firstName || 'Developer'}! 👋
                </h1>
                <p className="text-body max-w-2xl">
                  Ready to sharpen your coding skills? Start a new interview session or join an existing one.
                </p>
              </div>
              <button
                onClick={() => navigate('/create-session')}
                className="btn btn-primary btn-lg shadow-lg hover:shadow-xl"
              >
                <Plus className="h-5 w-5" />
                <span>Create New Session</span>
              </button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl -z-0"></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            icon={<Users className="h-6 w-6" />}
            title="Active Sessions"
            value={activeSessions.length}
            description="Available to join"
            color="primary"
          />
          <StatCard
            icon={<Clock className="h-6 w-6" />}
            title="Recent Sessions"
            value={myRecentSessions.length}
            description="Your past interviews"
            color="accent"
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6" />}
            title="Total Practice"
            value={myRecentSessions.length}
            description="Completed sessions"
            color="success"
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
            <div>
              <h2 className="heading-3">Active Sessions</h2>
              <p className="text-small mt-1">Join an ongoing interview session</p>
            </div>
            <button
              onClick={() => navigate('/sessions')}
              className="btn btn-ghost text-primary hover:text-primary-hover"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {loading ? (
            <LoadingSpinner text="Loading sessions..." />
          ) : activeSessions.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="empty-state">
                <div className="w-16 h-16 bg-surface-elevated rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-8 w-8 text-text-tertiary" />
                </div>
                <h3 className="empty-state-title">No Active Sessions</h3>
                <p className="empty-state-description">
                  There are no active interview sessions at the moment. Create one to get started!
                </p>
                <button
                  onClick={() => navigate('/create-session')}
                  className="btn btn-primary"
                >
                  <Plus className="h-4 w-4" />
                  Create Session
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeSessions.slice(0, 6).map((session) => (
                <SessionCard
                  key={session._id}
                  session={session}
                  onJoin={() => handleJoinSession(session._id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Recent Activity */}
        {myRecentSessions.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="heading-3">Recent Activity</h2>
                <p className="text-small mt-1">Your latest practice sessions</p>
              </div>
              <button
                onClick={() => navigate('/history')}
                className="btn btn-ghost text-primary hover:text-primary-hover"
              >
                View History
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="card divide-y divide-border">
              {myRecentSessions.slice(0, 5).map((session) => (
                <div
                  key={session._id}
                  className="p-4 hover:bg-surface-elevated transition-colors cursor-pointer"
                  onClick={() => navigate(`/session/${session._id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-primary">{session.problem}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`badge badge-${session.difficulty}`}>
                          {session.difficulty}
                        </span>
                        <span className="text-small">
                          {new Date(session.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-text-tertiary" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <section>
          <h2 className="heading-3 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <QuickActionCard
              title="Browse Problems"
              description="Explore our collection of coding challenges"
              icon={<TrendingUp className="h-6 w-6" />}
              onClick={() => navigate('/problems')}
            />
            <QuickActionCard
              title="View All Sessions"
              description="See all available interview sessions"
              icon={<Users className="h-6 w-6" />}
              onClick={() => navigate('/sessions')}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, description, color }) => {
  const colorClasses = {
    primary: 'text-primary bg-primary/10',
    accent: 'text-accent bg-accent/10',
    success: 'text-success bg-success/10',
  };

  return (
    <div className="card-hover p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-small mb-2">{title}</p>
          <p className="text-4xl font-bold text-text-primary mb-1">{value}</p>
          <p className="text-small">{description}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({ title, description, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="card-hover p-6 text-left w-full group"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-small">{description}</p>
        </div>
        <ArrowRight className="h-5 w-5 text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </button>
  );
};

export default Dashboard;

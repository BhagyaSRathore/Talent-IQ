import { useEffect } from 'react';
import { useSession } from '../context/SessionContext';
import SessionCard from '../components/SessionCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { History as HistoryIcon, TrendingUp } from 'lucide-react';

const History = () => {
  const { myRecentSessions, loading, error, fetchMyRecentSessions } = useSession();

  useEffect(() => {
    fetchMyRecentSessions();
  }, [fetchMyRecentSessions]);

  const stats = {
    total: myRecentSessions.length,
    easy: myRecentSessions.filter(s => s.difficulty === 'easy').length,
    medium: myRecentSessions.filter(s => s.difficulty === 'medium').length,
    hard: myRecentSessions.filter(s => s.difficulty === 'hard').length,
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Session History</h1>
          <p className="text-slate-600">Review your past practice sessions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Sessions" value={stats.total} color="blue" />
          <StatCard label="Easy" value={stats.easy} color="green" />
          <StatCard label="Medium" value={stats.medium} color="yellow" />
          <StatCard label="Hard" value={stats.hard} color="red" />
        </div>

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Sessions List */}
        {loading ? (
          <LoadingSpinner text="Loading history..." />
        ) : myRecentSessions.length === 0 ? (
          <div className="card p-12 text-center">
            <HistoryIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              No Session History
            </h3>
            <p className="text-slate-500 mb-6">
              Complete your first session to see it here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">
                Completed Sessions ({myRecentSessions.length})
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRecentSessions.map((session) => (
                <SessionCard
                  key={session._id}
                  session={session}
                  showJoinButton={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    red: 'from-red-500 to-red-600',
  };

  return (
    <div className="card p-6">
      <div className="text-center">
        <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} text-white mb-2`}>
          <TrendingUp className="h-5 w-5" />
        </div>
        <p className="text-3xl font-bold text-slate-800 mb-1">{value}</p>
        <p className="text-sm text-slate-600 font-medium">{label}</p>
      </div>
    </div>
  );
};

export default History;

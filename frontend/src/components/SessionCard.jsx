import { Users, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SessionCard = ({ session, onJoin, showJoinButton = true }) => {
  const navigate = useNavigate();
  
  const getDifficultyBadge = (difficulty) => {
    const badges = {
      easy: 'badge badge-easy',
      medium: 'badge badge-medium',
      hard: 'badge badge-hard',
    };
    return badges[difficulty] || badges.easy;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleJoin = () => {
    if (onJoin) {
      onJoin(session._id);
    } else {
      navigate(`/session/${session._id}`);
    }
  };

  return (
    <div className="card p-6 hover:scale-[1.02] transition-transform duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">
            {session.problem}
          </h3>
          <div className="flex items-center space-x-2 mb-3">
            <span className={getDifficultyBadge(session.difficulty)}>
              {session.difficulty.toUpperCase()}
            </span>
            {session.status === 'active' && (
              <span className="badge bg-green-100 text-green-700 flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Active</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm text-slate-600">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>Host: {session.host?.name || 'Unknown'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4" />
          <span>
            {session.participant ? '2/2 participants' : '1/2 participants'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>{formatDate(session.createdAt)}</span>
        </div>
      </div>

      {showJoinButton && session.status === 'active' && !session.participant && (
        <button
          onClick={handleJoin}
          className="w-full btn-primary"
        >
          Join Session
        </button>
      )}

      {session.participant && (
        <div className="text-center text-sm text-slate-500 py-2 bg-slate-50 rounded-lg">
          Session Full
        </div>
      )}

      {session.status === 'completed' && (
        <div className="text-center text-sm text-slate-500 py-2 bg-slate-50 rounded-lg">
          Completed
        </div>
      )}
    </div>
  );
};

export default SessionCard;

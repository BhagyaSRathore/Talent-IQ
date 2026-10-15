import { Users, Clock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SessionCard = ({ session, onJoin, showJoinButton = true }) => {
  const navigate = useNavigate();
  
  const getDifficultyBadge = (difficulty) => {
    const badges = {
      easy: 'badge-easy',
      medium: 'badge-medium',
      hard: 'badge-hard',
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
    <div className="card-hover p-6 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {session.problem}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`badge ${getDifficultyBadge(session.difficulty)}`}>
              {session.difficulty.toUpperCase()}
            </span>
            {session.status === 'active' && (
              <span className="badge badge-success flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                <span>Active</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Host: {session.host?.name || 'Unknown'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>
            {session.participant ? '2/2 participants' : '1/2 participants'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{formatDate(session.createdAt)}</span>
        </div>
      </div>

      {showJoinButton && session.status === 'active' && !session.participant && (
        <button
          onClick={handleJoin}
          className="w-full btn btn-primary group/btn"
        >
          <span>Join Session</span>
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      )}

      {session.participant && (
        <div className="text-center text-sm text-text-tertiary py-2 bg-surface-elevated rounded-lg border border-border">
          Session Full
        </div>
      )}

      {session.status === 'completed' && (
        <div className="text-center text-sm text-text-tertiary py-2 bg-surface-elevated rounded-lg border border-border">
          Completed
        </div>
      )}
    </div>
  );
};

export default SessionCard;


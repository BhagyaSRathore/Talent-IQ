import { useState, useEffect } from 'react';
import { executionAPI } from '../config/api';
import { Clock, Code, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const SubmissionsList = ({ sessionId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    if (sessionId) {
      fetchSubmissions();
    }
  }, [sessionId]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await executionAPI.getSessionSubmissions(sessionId);
      setSubmissions(response.data.submissions || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    if (!status) return <AlertCircle className="h-4 w-4 text-slate-400" />;
    
    if (status.id === 3) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (status.id >= 4) {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
    return <AlertCircle className="h-4 w-4 text-yellow-500" />;
  };

  const getStatusColor = (status) => {
    if (!status) return 'text-slate-500';
    if (status.id === 3) return 'text-green-600';
    if (status.id >= 4) return 'text-red-600';
    return 'text-yellow-600';
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner text="Loading submissions..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-400">
        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        <Code className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>No submissions yet</p>
        <p className="text-sm mt-1">Run or submit code to see it here</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {submissions.map((submission) => (
        <div
          key={submission._id}
          onClick={() => setSelectedSubmission(submission)}
          className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {getStatusIcon(submission.status)}
              <span className={`text-sm font-semibold ${getStatusColor(submission.status)}`}>
                {submission.status?.description || 'Unknown'}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <span className="px-2 py-1 bg-slate-700 rounded">
                {submission.language}
              </span>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{formatTime(submission.createdAt)}</span>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-slate-400">
            By: {submission.user?.name || 'Unknown'}
          </div>
          
          {submission.time && (
            <div className="text-xs text-slate-500 mt-1">
              Execution: {submission.time}s | Memory: {(submission.memory / 1024).toFixed(2)} MB
            </div>
          )}
        </div>
      ))}

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSubmission(null)}
        >
          <div 
            className="card max-w-4xl w-full p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-800">Submission Details</h3>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedSubmission.status)}
                  <span className={`font-semibold ${getStatusColor(selectedSubmission.status)}`}>
                    {selectedSubmission.status?.description}
                  </span>
                </div>
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-700">
                  {selectedSubmission.language}
                </span>
                <span className="text-slate-500">
                  {new Date(selectedSubmission.createdAt).toLocaleString()}
                </span>
              </div>

              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Code:</h4>
                <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{selectedSubmission.code}</code>
                </pre>
              </div>

              {selectedSubmission.stdout && (
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Output:</h4>
                  <pre className="bg-green-50 p-4 rounded-lg overflow-x-auto text-sm text-green-800">
                    {selectedSubmission.stdout}
                  </pre>
                </div>
              )}

              {selectedSubmission.stderr && (
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Errors:</h4>
                  <pre className="bg-red-50 p-4 rounded-lg overflow-x-auto text-sm text-red-800">
                    {selectedSubmission.stderr}
                  </pre>
                </div>
              )}

              {selectedSubmission.compileOutput && (
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">Compilation:</h4>
                  <pre className="bg-orange-50 p-4 rounded-lg overflow-x-auto text-sm text-orange-800">
                    {selectedSubmission.compileOutput}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionsList;

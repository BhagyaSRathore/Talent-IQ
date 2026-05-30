import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import ErrorMessage from '../components/ErrorMessage';
import { Code2, Loader2 } from 'lucide-react';

const CreateSession = () => {
  const navigate = useNavigate();
  const { createSession, loading } = useSession();
  const [formData, setFormData] = useState({
    problem: '',
    difficulty: 'medium',
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.problem.trim()) {
      setError('Please enter a problem description');
      return;
    }

    try {
      const session = await createSession(formData);
      navigate(`/session/${session._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create session');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const problemSuggestions = [
    'Two Sum',
    'Reverse Linked List',
    'Valid Parentheses',
    'Binary Tree Traversal',
    'Merge Sort Implementation',
    'LRU Cache Design',
    'System Design: URL Shortener',
    'Dynamic Programming: Coin Change',
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="card p-8 md:p-12 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-4">
              <Code2 className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Create New Session
            </h1>
            <p className="text-slate-600 text-lg">
              Set up a coding practice session and wait for others to join
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6">
              <ErrorMessage message={error} onClose={() => setError(null)} />
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Problem Description */}
            <div>
              <label htmlFor="problem" className="block text-sm font-semibold text-slate-700 mb-2">
                Problem Description *
              </label>
              <textarea
                id="problem"
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                rows={4}
                className="input-field resize-none"
                placeholder="e.g., Implement a function to reverse a linked list..."
                required
              />
              <p className="mt-2 text-sm text-slate-500">
                Describe the coding problem you want to practice
              </p>
            </div>

            {/* Problem Suggestions */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">
                Quick Suggestions:
              </p>
              <div className="flex flex-wrap gap-2">
                {problemSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setFormData({ ...formData, problem: suggestion })}
                    className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Level */}
            <div>
              <label htmlFor="difficulty" className="block text-sm font-semibold text-slate-700 mb-2">
                Difficulty Level *
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['easy', 'medium', 'hard'].map((level) => (
                  <label
                    key={level}
                    className={`
                      relative flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                      ${formData.difficulty === level
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="difficulty"
                      value={level}
                      checked={formData.difficulty === level}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className={`
                      font-semibold capitalize
                      ${formData.difficulty === level ? 'text-blue-700' : 'text-slate-600'}
                    `}>
                      {level}
                    </span>
                    {formData.difficulty === level && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Creating Session...</span>
                  </>
                ) : (
                  <>
                    <Code2 className="h-5 w-5" />
                    <span>Create Session</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="text-slate-600 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 card p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tips for a Great Session</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Be clear and specific about the problem</li>
            <li>• Choose an appropriate difficulty level</li>
            <li>• Have test cases ready to discuss</li>
            <li>• Be respectful and collaborative</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateSession;

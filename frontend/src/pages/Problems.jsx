import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { problemAPI } from '../config/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Search, Filter, Code, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';

const Problems = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProblems();
  }, [searchTerm, selectedDifficulty, selectedCategory, currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await problemAPI.getCategories();
      setCategories(response.data.categories || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchProblems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: currentPage,
        limit: 12,
      };
      
      if (searchTerm) params.search = searchTerm;
      if (selectedDifficulty) params.difficulty = selectedDifficulty;
      if (selectedCategory) params.category = selectedCategory;

      const response = await problemAPI.getProblems(params);
      setProblems(response.data.problems || []);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch problems');
    } finally {
      setLoading(false);
    }
  };

  const handleRandomProblem = async () => {
    try {
      const params = {};
      if (selectedDifficulty) params.difficulty = selectedDifficulty;
      if (selectedCategory) params.category = selectedCategory;

      const response = await problemAPI.getRandomProblem(params);
      if (response.data.problem) {
        navigate(`/problems/${response.data.problem.slug}`);
      }
    } catch (err) {
      console.error('Error fetching random problem:', err);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Problem Bank
            </h1>
            <p className="text-slate-600">
              Practice data structures and algorithms
            </p>
          </div>
          
          <button
            onClick={handleRandomProblem}
            className="btn-primary flex items-center space-x-2"
          >
            <Shuffle className="h-5 w-5" />
            <span>Random Problem</span>
          </button>
        </div>

        {/* Filters */}
        <div className="card p-6">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="input-field pl-10"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select
                value={selectedDifficulty}
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value);
                  setCurrentPage(1);
                }}
                className="input-field pl-10 appearance-none cursor-pointer"
              >
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="input-field pl-10 appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label} ({cat.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && <ErrorMessage message={error} />}

        {/* Problems Grid */}
        {loading ? (
          <LoadingSpinner text="Loading problems..." />
        ) : problems.length === 0 ? (
          <div className="card p-12 text-center">
            <Code className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              No problems found
            </h3>
            <p className="text-slate-500">
              Try adjusting your filters or search term
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problems.map((problem) => (
                <div
                  key={problem._id}
                  onClick={() => navigate(`/problems/${problem.slug}`)}
                  className="card p-6 cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-800 flex-1">
                      {problem.title}
                    </h3>
                    <span className={`badge ${
                      problem.difficulty === 'easy' ? 'badge-easy' :
                      problem.difficulty === 'medium' ? 'badge-medium' :
                      'badge-hard'
                    }`}>
                      {problem.difficulty.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {problem.description.substring(0, 100)}...
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="capitalize">{problem.category.replace(/-/g, ' ')}</span>
                    {problem.stats.acceptanceRate > 0 && (
                      <span>{problem.stats.acceptanceRate}% acceptance</span>
                    )}
                  </div>

                  {problem.companies && problem.companies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {problem.companies.slice(0, 3).map((company, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {company}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg font-semibold text-slate-700 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <span className="text-slate-600">
                  Page {currentPage} of {pagination.totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={currentPage === pagination.totalPages}
                  className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg font-semibold text-slate-700 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Problems;

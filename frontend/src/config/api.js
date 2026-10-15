import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    // Get Clerk token if available
    if (window.Clerk?.session) {
      const token = await window.Clerk.session.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Session endpoints
export const sessionAPI = {
  createSession: (data) => api.post('/sessions', data),
  getActiveSessions: () => api.get('/sessions/active'),
  getMyRecentSessions: () => api.get('/sessions/my-recent'),
  getSessionById: (id) => api.get(`/sessions/${id}`),
  joinSession: (id) => api.post(`/sessions/${id}/join`),
  endSession: (id) => api.post(`/sessions/${id}/end`),
};

// Chat endpoints
export const chatAPI = {
  getStreamToken: () => api.get('/chat/token'),
};

// Execution endpoints
export const executionAPI = {
  runCode: (data) => api.post('/execute/run', data),
  submitCode: (data) => api.post('/execute/submit', data),
  getSessionSubmissions: (sessionId) => api.get(`/execute/submissions/${sessionId}`),
  getMySubmissions: () => api.get('/execute/my-submissions'),
};

// Problem endpoints
export const problemAPI = {
  getProblems: (params) => api.get('/problems', { params }),
  getProblemBySlug: (slug) => api.get(`/problems/slug/${slug}`),
  getProblemById: (id) => api.get(`/problems/${id}`),
  getCategories: () => api.get('/problems/categories'),
  getRandomProblem: (params) => api.get('/problems/random', { params }),
};

export default api;

import { createContext, useContext, useState, useCallback } from 'react';
import { sessionAPI } from '../config/api';

const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [activeSessions, setActiveSessions] = useState([]);
  const [myRecentSessions, setMyRecentSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActiveSessions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await sessionAPI.getActiveSessions();
      setActiveSessions(response.data.sessions || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch active sessions');
      console.error('Error fetching active sessions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyRecentSessions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await sessionAPI.getMyRecentSessions();
      setMyRecentSessions(response.data.sessions || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch recent sessions');
      console.error('Error fetching recent sessions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createSession = useCallback(async (sessionData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await sessionAPI.createSession(sessionData);
      setCurrentSession(response.data.session);
      await fetchActiveSessions();
      return response.data.session;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create session');
      console.error('Error creating session:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchActiveSessions]);

  const joinSession = useCallback(async (sessionId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await sessionAPI.joinSession(sessionId);
      setCurrentSession(response.data.session);
      await fetchActiveSessions();
      return response.data.session;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join session');
      console.error('Error joining session:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchActiveSessions]);

  const endSession = useCallback(async (sessionId) => {
    try {
      setLoading(true);
      setError(null);
      await sessionAPI.endSession(sessionId);
      setCurrentSession(null);
      await fetchActiveSessions();
      await fetchMyRecentSessions();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to end session');
      console.error('Error ending session:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchActiveSessions, fetchMyRecentSessions]);

  const value = {
    activeSessions,
    myRecentSessions,
    currentSession,
    loading,
    error,
    fetchActiveSessions,
    fetchMyRecentSessions,
    createSession,
    joinSession,
    endSession,
    setCurrentSession,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

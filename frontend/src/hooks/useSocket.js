import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

export const useSocket = (sessionId, user) => {
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!sessionId || !user) return;

    // Create socket connection
    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      setIsConnected(true);

      // Join the session room
      socket.emit('join-session', {
        sessionId,
        userId: user._id,
        userName: user.name,
      });
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
    });

    // Handle participants
    socket.on('current-participants', (participantList) => {
      setParticipants(participantList);
    });

    socket.on('user-joined', ({ userId, userName }) => {
      console.log(`User ${userName} joined`);
      setParticipants((prev) => [...prev, { userId, userName }]);
    });

    socket.on('user-left', ({ userId }) => {
      console.log(`User ${userId} left`);
      setParticipants((prev) => prev.filter((p) => p.userId !== userId));
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.emit('leave-session', { sessionId, userId: user._id });
        socket.disconnect();
      }
    };
  }, [sessionId, user]);

  return {
    socket: socketRef.current,
    isConnected,
    participants,
  };
};

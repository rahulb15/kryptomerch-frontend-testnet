import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL?.replace('/api/v1/', '');

const useSocketIO = (userId) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  const connectSocket = useCallback(() => {
    console.log('Attempting to connect to socket server:', SOCKET_SERVER_URL);
    const newSocket = io(SOCKET_SERVER_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('Socket connected successfully');
      setIsConnected(true);
      newSocket.emit('authenticate', { userId });
    });

    newSocket.on('authentication_successful', (data) => {
      console.log('Authentication successful:', data);
    });

    newSocket.on('authentication_error', (error) => {
      console.error('Authentication failed:', error);
    });

    newSocket.on('notification', (notification) => {
      console.log('Received notification:', notification);
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    newSocket.on('chat_message', (message) => {
      console.log('Received chat message:', message);
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
      setIsConnected(false);
    });

    setSocket(newSocket);

    return newSocket;
  }, [userId]);

  useEffect(() => {
    const newSocket = connectSocket();

    return () => {
      console.log('Cleaning up socket connection');
      newSocket.disconnect();
    };
  }, [userId, connectSocket]);

  const sendMessage = useCallback((eventName, data) => {
    if (socket) {
      console.log('Sending message:', eventName, data);
      socket.emit(eventName, data);
    } else {
      console.error('Socket not connected. Unable to send message:', eventName);
    }
  }, [socket]);

  return {
    isConnected,
    notifications,
    chatMessages,
    sendMessage
  };
};

export default useSocketIO;
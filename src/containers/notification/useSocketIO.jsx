// Updated useSocketIO hook
import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL?.replace('/api/v1/', '');

const useSocketIO = (collectionId) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [activities, setActivities] = useState([]);

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
        });

        newSocket.on('initialActivities', (initialActivities) => {
            console.log('Received initial activities:', initialActivities);
            setActivities(initialActivities);
        });

        newSocket.on('newActivity', (activity) => {
            console.log('Received new activity:', activity);
            setActivities((prevActivities) => [...prevActivities, activity]);
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
    }, []);

    useEffect(() => {
        const newSocket = connectSocket();

        return () => {
            console.log('Cleaning up socket connection');
            newSocket.disconnect();
        };
    }, [connectSocket]);

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
        activities,
        sendMessage
    };
};

export default useSocketIO;
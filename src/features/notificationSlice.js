// src/features/searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [
        {
            id: 1,
            title: "New Order Received",
            message: "You have received a new order.",
        },
        {
            id: 2,
            title: "New Customer",
            message: "You have a new customer.",
        },
        {
            id: 3,
            title: "Server Rebooted",
            message: "Server has been rebooted.",
        },
        {
            id: 4,
            title: "Server Not Responding",
            message: "Server is not responding.",
        },
        {
            id: 5,
            title: "New Order Received",
            message: "You have received a new order.",
        },
    ],
};

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload
            );
        },

    },
});

export const { addNotification, removeNotification } =
    notificationSlice.actions;

export default notificationSlice.reducer;

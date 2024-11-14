/* eslint-disable */

"use client";
import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// CUSTOM COMPONENT
const initialState = {
    user: null,
    isInitialized: false,
    isAuthenticated: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "INIT": {
            const { isAuthenticated, user } = action.payload;
            return { ...state, isAuthenticated, isInitialized: true, user };
        }
        case "LOGIN": {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            };
        }
        case "LOGOUT": {
            return { ...state, isAuthenticated: false, user: null };
        }
        case "REGISTER": {
            const { user } = action.payload;
            return { ...state, isAuthenticated: true, user };
        }
        default:
            return state;
    }
};

const AuthContext = createContext({
    user: null,
    isInitialized: false,
    isAuthenticated: false,
    method: "JWT",
    login: () => {},
    logout: () => {},
    register: () => {},
});

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(state, "state");

    const login = async (email, password) => {
        const response = await axios.post("/api/auth/login", {
            email,
            password,
        });
        const { user } = response.data;
        dispatch({ type: "LOGIN", payload: { user } });
    };

    const register = async (email, username, password) => {
        const response = await axios.post("/api/auth/register", {
            email,
            username,
            password,
        });
        const { user } = response.data;
        dispatch({ type: "REGISTER", payload: { user } });
    };

    const logout = () => {
        dispatch({ type: "LOGOUT" });
    };

    useEffect(() => {
        (async () => {
            try {
                toast.success("Welcome back!");
                console.log("Welcome back!");
                const { data } = await axios.get("/api/auth/profile");
                dispatch({
                    type: "INIT",
                    payload: { isAuthenticated: true, user: data.user },
                });
            } catch (err) {
                console.error(err);
                dispatch({
                    type: "INIT",
                    payload: { isAuthenticated: false, user: null },
                });
            }
        })();
    }, []);

    const contextValue = { ...state, method: "JWT", login, logout, register };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

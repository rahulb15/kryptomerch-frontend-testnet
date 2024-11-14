
// components/error-message/index.jsx
import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => {
    return (
        <div style={styles.container}>
            <div style={styles.error}>
                <svg
                    style={styles.icon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h3 style={styles.title}>Error</h3>
                <p style={styles.message}>{message || "Something went wrong. Please try again later."}</p>
                <button 
                    onClick={() => window.location.reload()}
                    style={styles.button}
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        padding: "20px",
        width: "100%"
    },
    error: {
        textAlign: "center",
        padding: "24px",
        backgroundColor: "#1a1a1a",
        borderRadius: "8px",
        maxWidth: "400px"
    },
    icon: {
        width: "48px",
        height: "48px",
        color: "#ff4d4d",
        margin: "0 auto 16px"
    },
    title: {
        color: "#ff4d4d",
        fontSize: "24px",
        marginBottom: "12px"
    },
    message: {
        color: "#fff",
        fontSize: "16px",
        marginBottom: "20px"
    },
    button: {
        padding: "8px 20px",
        backgroundColor: "#333",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "background-color 0.2s",
    }
};

ErrorMessage.propTypes = {
    message: PropTypes.string
};

export default ErrorMessage;
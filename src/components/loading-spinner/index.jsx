// components/loading-spinner/index.jsx
import React from "react";
import { MutatingDots } from "react-loader-spinner";

const LoadingSpinner = () => {
    return (
        <div style={styles.container}>
            <MutatingDots
                height="100"
                width="100"
                color="#4fa94d"
                secondaryColor="#4fa94d"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            <p style={styles.text}>Loading...</p>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        padding: "20px",
        width: "100%"
    },
    text: {
        marginTop: "20px",
        color: "#fff",
        fontSize: "16px"
    }
};

export default LoadingSpinner;
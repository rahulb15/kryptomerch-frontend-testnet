import React from "react";

const NoDataFound = () => {
    return (
        <div
            className="no-data-found"
            style={{
                width: "100%",
                height: "600px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <p>No data found</p>
        </div>
    );
};

export default NoDataFound;

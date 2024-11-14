// DecimalPriceField.js
import React, { useState } from "react";
import Decimal from "decimal.js";

const DecimalPriceField = ({ name, onChange, disabled, error }) => {
    const [isError, setIsError] = useState(true);

    const setValue = (x) => {
        try {
            const v = new Decimal(x);
            if (v.greaterThan(0)) {
                setIsError(false);
                onChange(v);
            } else {
                setIsError(true);
                onChange(null);
            }
        } catch (error) {
            setIsError(true);
            onChange(null);
        }
    };

    return (
        <div style={{ marginTop: "15px" }}>
            <label style={{ fontSize: "16px" }}>{name + " (KDA)"}</label>
            <input
                type="text"
                disabled={disabled}
                placeholder={name}
                onChange={(e) => setValue(e.target.value)}
                style={{
                    border: isError || error ? "1px solid red" : "1px solid green",
                    width: "100%",
                    margin: "5px 0",
                    borderRadius: "5px",
                    height: "40px",
                    padding: "5px",
                }}
            />
        </div>
    );
};

export default DecimalPriceField;
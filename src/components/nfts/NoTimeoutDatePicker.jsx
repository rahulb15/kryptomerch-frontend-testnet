// NoTimeoutDatePicker.js
import React, { useState } from "react";
import { Box, FormControlLabel, Switch, Tooltip, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NoTimeoutDatePicker = ({ value, onChange, disabled }) => {
    const [isNoTimeout, setIsNoTimeout] = useState(value == null);
    const [lastDate, setLastDate] = useState(new Date());

    const handleNoTimeoutChange = (event) => {
        setIsNoTimeout(event.target.checked);
        if (event.target.checked) {
            setLastDate(value);
            onChange(null);
        } else {
            onChange(lastDate);
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            <FormControlLabel
                control={
                    <Switch
                        checked={isNoTimeout}
                        onChange={handleNoTimeoutChange}
                        disabled={disabled}
                        color="primary"
                    />
                }
                label="Unlimited sale"
            />
            <Tooltip
                title="When choosing an Unlimited sale, timeout will be disabled. Seller can close the sale at any time."
                arrow
            >
                <HelpOutlineIcon
                    fontSize="small"
                    sx={{ ml: 1, color: "text.secondary", cursor: "pointer" }}
                />
            </Tooltip>
            <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                    End date
                </Typography>
                <DatePicker
                    showTimeSelect
                    selected={value}
                    onChange={onChange}
                    disabled={isNoTimeout || disabled}
                    dateFormat="Pp"
                />
            </Box>
        </Box>
    );
};

export default NoTimeoutDatePicker;
// // DateWarningMessage.js
// import React from "react";
// import { Typography } from "@mui/material";

// const warning_date = () => new Date(Date.now() + 30 * 86400 * 1000);

// const DateWarningMessage = ({ date }) => {
//     if (!date || date <= warning_date()) {
//         return null;
//     }

//     return (
//         <Typography color="warning" sx={{ mt: 2 }}>
//             Warning: The chosen time is far in the future. Your token will be locked until that date.
//         </Typography>
//     );
// };

// export default DateWarningMessage;


import React from "react";
import { Box, Typography } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';

const warning_date = () => new Date(Date.now() + 30 * 86400 * 1000);

const DateWarningMessage = ({ date }) => {
    if (!date || date <= warning_date()) {
        return null;
    }

    return (
        <Box className="date-warning-message">
            <WarningIcon className="date-warning-icon" />
            <Typography className="date-warning-text">
                Warning: The chosen time is far in the future. Your token will be locked until that date.
            </Typography>
        </Box>
    );
};

export default DateWarningMessage;

// CSS to be added to your stylesheets
const styles = `
.date-warning-message {
    display: flex;
    align-items: center;
    background-color: rgba(255, 152, 0, 0.1);
    border: 1px solid #ff9800;
    border-radius: 4px;
    padding: 12px 16px;
    margin-top: 16px;
    transition: all 0.3s ease;
}

.date-warning-message:hover {
    background-color: rgba(255, 152, 0, 0.2);
}

.date-warning-icon {
    color: #ff9800;
    margin-right: 12px;
    font-size: 24px;
}

.date-warning-text {
    color: #e65100;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
}

@media (max-width: 600px) {
    .date-warning-message {
        flex-direction: column;
        align-items: flex-start;
    }

    .date-warning-icon {
        margin-bottom: 8px;
    }
}
`;
import React from "react";

const CalendarLogo = ({ className, width = 24, height = 24 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 25"
            fill="none"
            className={className}
        >
            <path
                d="M8 13.5C8.55228 13.5 9 13.0523 9 12.5C9 11.9477 8.55228 11.5 8 11.5C7.44772 11.5 7 11.9477 7 12.5C7 13.0523 7.44772 13.5 8 13.5Z"
                fill="white"
            />
            <path
                d="M13 12.5C13 13.0523 12.5523 13.5 12 13.5C11.4477 13.5 11 13.0523 11 12.5C11 11.9477 11.4477 11.5 12 11.5C12.5523 11.5 13 11.9477 13 12.5Z"
                fill="white"
            />
            <path
                d="M16 13.5C16.5523 13.5 17 13.0523 17 12.5C17 11.9477 16.5523 11.5 16 11.5C15.4477 11.5 15 11.9477 15 12.5C15 13.0523 15.4477 13.5 16 13.5Z"
                fill="white"
            />
            <path
                d="M9 16.5C9 17.0523 8.55228 17.5 8 17.5C7.44772 17.5 7 17.0523 7 16.5C7 15.9477 7.44772 15.5 8 15.5C8.55228 15.5 9 15.9477 9 16.5Z"
                fill="white"
            />
            <path
                d="M12 17.5C12.5523 17.5 13 17.0523 13 16.5C13 15.9477 12.5523 15.5 12 15.5C11.4477 15.5 11 15.9477 11 16.5C11 17.0523 11.4477 17.5 12 17.5Z"
                fill="white"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 3.5C8 2.94772 7.55228 2.5 7 2.5C6.44772 2.5 6 2.94772 6 3.5H4C2.89543 3.5 2 4.39543 2 5.5V19.5C2 20.6046 2.89543 21.5 4 21.5H20C21.1046 21.5 22 20.6046 22 19.5V5.5C22 4.39543 21.1046 3.5 20 3.5H18C18 2.94772 17.5523 2.5 17 2.5C16.4477 2.5 16 2.94772 16 3.5H8ZM4 7.5V5.5H20V7.5H4ZM4 9.5V19.5H14.1716L20 13.6716V9.5H4ZM20 16.5L17 19.5H20V16.5Z"
                fill="white"
            />
        </svg>
    );
};

export default CalendarLogo;
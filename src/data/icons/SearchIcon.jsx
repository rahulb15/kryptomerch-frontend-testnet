
import React from 'react';
// import './SearchIcon.css';

const SearchIcon = ({ size = 'md' }) => (
    <div className="search-icon-wrapper">
        <svg
            className={`search-icon ${size === 'sm' ? 'search-icon-sm' : size === 'lg' ? 'search-icon-lg' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    </div>
);

export default SearchIcon;
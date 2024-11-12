// components/Dashboard/MoodFilter.js
import React from 'react';

const MoodFilter = ({ setMood }) => {
    return (
        <div className="mood-filter">
            <label htmlFor="mood-select" className="mood-label">Filter by Mood:</label>
            <select id="mood-select" onChange={(e) => setMood(e.target.value)} className="mood-dropdown">
                <option value="">Select Mood</option>
                <option value="relaxed">Relaxed</option>
                <option value="focused">Focused</option>
                <option value="curious">Curious</option>
            </select>
        </div>
    );
};

export default MoodFilter;
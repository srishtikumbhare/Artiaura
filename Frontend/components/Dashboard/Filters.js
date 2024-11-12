'use client';

import React from 'react';
import './Dashboard.module.css';

const Filters = ({ filterByMood }) => {
    const moods = ['All', 'Happy', 'Sad', 'Relaxed', 'Curious', 'Excited', 'Focused'];

    return (
        <div className="mood-filter">
            <label htmlFor="mood-select">Mood of the Day:</label>
            <select id="mood-select" onChange={(e) => filterByMood(e.target.value)}>
                {moods.map((mood) => (
                    <option key={mood} value={mood}>
                        {mood}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filters;
// components/Dashboard/MoodFilter.js
import React from 'react';
import styles from './Dashboard.module.css';

const MoodFilter = ({ setMood }) => {
    return (
        <div className={styles.moodFilter}>
            <label htmlFor="mood-select" className={styles.moodLabel}>Filter by Mood:</label>
            <select id="mood-select" onChange={(e) => setMood(e.target.value)} className={styles.moodDropdown}>
                <option value="">Select Mood</option>
                <option value="relaxed">Relaxed</option>
                <option value="focused">Focused</option>
                <option value="curious">Curious</option>
            </select>
        </div>
    );
};

export default MoodFilter;

import React from 'react';
import styles from './Settings.module.css';

const ContentFilter = ({ contentType, setContentType }) => {
    const options = ['All', 'News', 'Technology', 'Health', 'Entertainment'];

    return (
        <div>
            <h2 className={styles.sectionTitle}>Content Filter</h2>
            <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className={styles.dropdown}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ContentFilter;
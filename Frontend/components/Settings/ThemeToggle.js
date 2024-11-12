//components / Settings / ThemeToggle.js
'use client';

import React from 'react';
import { useTheme } from '../../app/context/ThemeContext';
import styles from './Settings.module.css'; // Import the CSS module correctly

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={styles.themeToggle}>
            <label>
                <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                />
                {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </label>
        </div>
    );
};

export default ThemeToggle;
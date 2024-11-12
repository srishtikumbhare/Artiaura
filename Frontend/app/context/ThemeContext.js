// app/context/ThemeContext.js
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        applyTheme(savedTheme);
    }, []);

    const applyTheme = (theme) => {
        // Check if document.documentElement exists
        if (typeof document !== 'undefined' && document.documentElement) {
            // Set the theme attribute on the document
            document.documentElement.setAttribute('data-theme', theme);

            // Define color variables based on the theme
            const colors = theme === 'dark'
                ? {
                    '--background-color': '#333',
                    '--text-color': '#f4f4f4',
                    '--container-bg': '#444',
                    '--container-border': '#666'
                }
                : {
                    '--background-color': '#f4f4f9',
                    '--text-color': '#333',
                    '--container-bg': '#fff',
                    '--container-border': '#e0e0e0'
                };

            // Apply each color variable to document.documentElement
            Object.keys(colors).forEach((key) => {
                document.documentElement.style.setProperty(key, colors[key]);
            });
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
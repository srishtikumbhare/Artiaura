// app/settings/page.js

"use client";

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext'; // Import the theme context
import styles from './Settings.module.css';

const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const [notifications, setNotifications] = useState(true);
    const [saveMessage, setSaveMessage] = useState('');

    const handleSave = () => {
        setSaveMessage("Settings saved!");
        setTimeout(() => setSaveMessage(''), 3000);
    };

    return (
        <div className={styles.settingsContainer}>
            <h1 className={styles.settingsTitle}>Settings</h1>

            <section className={styles.settingsSection}>
                <h2 className={styles.sectionTitle}>Theme</h2>
                <label className={styles.switchLabel}>
                    Dark Mode
                    <input
                        type="checkbox"
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                    />
                </label>
            </section>

            <section className={styles.settingsSection}>
                <h2 className={styles.sectionTitle}>Notifications</h2>
                <label className={styles.switchLabel}>
                    Enable Notifications
                    <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
                </label>
            </section>

            <button className={styles.saveButton} onClick={handleSave}>Save Settings</button>
            {saveMessage && <p className={styles.saveMessage}>{saveMessage}</p>}
        </div>
    );
};

export default Settings;
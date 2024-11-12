//components/Settings/NotificationSettings.js
import React from 'react';
import styles from './Settings.module.css';

const NotificationSettings = ({ notificationFrequency, setNotificationFrequency }) => {
    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Notification Preferences</h2>
            <select
                value={notificationFrequency}
                onChange={(e) => setNotificationFrequency(e.target.value)}
                className={styles.select}
            >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
            </select>
        </div>
    );
};

export default NotificationSettings;
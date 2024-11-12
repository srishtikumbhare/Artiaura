// app/dashboard/page.js
"use client";

import React, { useEffect, useState } from 'react';
import MoodFilter from '../../components/Dashboard/MoodFilter';
import ArticleList from '../../components/Dashboard/ArticleList';
import styles from '../../components/Dashboard/Dashboard.module.css';
import { useUser } from '@clerk/nextjs';

export default function Dashboard() {
    const { user } = useUser();
    const userName = user ? user.firstName : "User";
    const userId = user ? user.id : null;  // Ensure user ID is available

    const [articles, setArticles] = useState([]);
    const [mood, setMood] = useState('focused');  // Default mood

    // Function to fetch articles based on mood and userId
    const fetchArticles = async () => {
        try {
            if (!userId || !mood) return;  // Ensure userId and mood are defined

            const response = await fetch(`http://127.0.0.1:5000/api/personalized_articles?user_id=${userId}&mood=${mood}`);
            if (!response.ok) throw new Error("Failed to fetch articles");

            const data = await response.json();
            setArticles(data.articles || []);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    // Fetch articles when the mood changes or on initial load
    useEffect(() => {
        fetchArticles();
    }, [mood, userId]);

    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.dashboardHeader}>
                <h1 className={styles.headerTitle}>Welcome, {userName}!</h1>
                <MoodFilter setMood={setMood} />
            </header>
            <div className={styles.dashboardContent}>
                <section className={styles.generalArticles}>
                    <h2 className={styles.sectionTitle}>Your Articles</h2>
                    <ArticleList articles={articles} userId={userId} mood={mood} />
                </section>
            </div>
        </div>
    );
}

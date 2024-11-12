"use client";

import React, { useEffect, useState } from 'react';
import MoodFilter from '../../components/Dashboard/MoodFilter';
import ArticleList from '../../components/Dashboard/ArticleList';
import styles from '../../components/Dashboard/Dashboard.module.css';
import { useUser } from '@clerk/nextjs';

export default function Dashboard() {
    const { user } = useUser();
    const userName = user ? user.firstName : "User";

    const [articles, setArticles] = useState([]);
    const [mood, setMood] = useState('');

    useEffect(() => {
        const fetchArticles = async () => {
            const query = mood || 'focused';
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/mood_articles?mood=${query}`);
                if (!response.ok) throw new Error("Network response was not ok");

                const data = await response.json();
                console.log("Fetched data:", data); // Debugging output
                setArticles(data.articles || []); // Set articles if data is returned
            } catch (error) {
                console.error("Error fetching articles:", error);
                setArticles([]); // Set articles to empty array if there's an error
            }
        };

        if (mood) {
            fetchArticles();
        }
    }, [mood]);

    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.dashboardHeader}>
                <h1 className={styles.headerTitle}>Welcome, {userName}!</h1>
                <MoodFilter setMood={setMood} />
            </header>
            <div className={styles.dashboardContent}>
                <section className={styles.generalArticles}>
                    <h2 className={styles.sectionTitle}>Your Articles</h2>
                    <ArticleList articles={articles} />
                </section>
            </div>
        </div>
    );
}
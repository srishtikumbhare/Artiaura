// components/Dashboard/ArticleList.js
import React from 'react';
import styles from './Dashboard.module.css';

const ArticleList = ({ articles = [], userId, mood }) => {
    const updateUserPreferences = async (userId, mood, keywords) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/update_preferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: userId, mood: mood, keywords: keywords })
            });
    
            const data = await response.json();
            if (response.ok) {
                console.log("Preferences updated:", data.message);
            } else {
                console.error("Error updating preferences:", data.error);
            }
        } catch (error) {
            console.error("Error updating preferences:", error);
        }
    };

    const handleInteraction = (article) => {
        // Extract keywords or topics related to the article
        const keywords = extractKeywordsFromArticle(article);

        // Update user preferences in the backend
        updateUserPreferences(userId, mood, keywords);
    };

    return (
        <div className={styles.articleList}>
            {articles.length > 0 ? (
                articles.map((article, index) => (
                    <div key={index} className={styles.articleItem}>
                        {article.image ? (
                            <img src={article.image} alt={article.title} className={styles.articleImage} />
                        ) : (
                            <div className={styles.imagePlaceholder}>No Image Available</div>
                        )}
                        <div className={styles.articleContent}>
                            <h3 className={styles.articleTitle}>{article.title}</h3>
                            <p className={styles.articleSource}>Source: {article.source}</p>
                            <p className={styles.articleSentiment}>Sentiment: {article.sentiment}</p>
                            <button onClick={() => handleInteraction(article)} className={styles.interactButton}>
                                Like
                            </button>
                            <a href={article.link} target="_blank" rel="noopener noreferrer" className={styles.articleLink}>
                                Read More
                            </a>
                        </div>
                    </div>
                ))
            ) : (
                <p className={styles.placeholder}>No articles available. Try adjusting your mood filter!</p>
            )}
        </div>
    );
};

export default ArticleList;

// Example helper function to extract keywords from the article
function extractKeywordsFromArticle(article) {
    // In a real application, you would analyze the article content and extract relevant keywords
    // Here we use a placeholder list for demonstration purposes
    return ["example", "keyword", "topic"];
}

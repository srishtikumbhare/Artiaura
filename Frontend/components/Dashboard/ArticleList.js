import React from 'react';
import styles from './Dashboard.module.css';

const ArticleList = ({ articles = [] }) => {
    return (
        <div className={styles.articleList}>
            {articles.length > 0 ? (
                articles.map((article, index) => (
                    <div key={index} className={styles.articleItem}>
                        {/* Display Article Image if Available */}
                        {article.image ? (
                            <img src={article.image} alt={article.title} className={styles.articleImage} />
                        ) : (
                            <div className={styles.imagePlaceholder}>No Image Available</div>
                        )}
                        <div className={styles.articleContent}>
                            <h3 className={styles.articleTitle}>{article.title}</h3>
                            <p className={styles.articleSource}>Source: {article.source}</p>
                            <p className={styles.articleDate}>Published: {article.published}</p>
                            <p className={styles.articleSentiment}>Sentiment: {article.sentiment}</p>
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
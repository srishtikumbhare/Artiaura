// app/about/page.js
import React from 'react';
import { FaLightbulb, FaRocket, FaBookReader } from 'react-icons/fa';
import './about.css'; // Make sure the path is correct

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h2>About Artiura</h2>
                <p>Your Personalized News and Article Aggregator</p>
            </div>
            <div className="about-content">
                <p>
                    Artiura is a smart, personalized news aggregator designed to enhance your content consumption experience. We deliver customized news and articles that align with your interests, reading habits, and learning goals. By leveraging advanced Natural Language Processing (NLP) techniques, Artiura analyzes various attributes of content—such as keywords, topics, and sentiment—to provide tailored recommendations suited to your preferences and comprehension level.
                </p>

                <div className="features">
                    <div className="feature-item">
                        <FaLightbulb className="feature-icon" />
                        <h3>Intelligent Recommendations</h3>
                        <p>Discover articles that match your interests and reading level, and explore new topics to expand your knowledge base.</p>
                    </div>
                    <div className="feature-item">
                        <FaRocket className="feature-icon" />
                        <h3>Sentiment-Based Filtering</h3>
                        <p>Filter content by mood or tone using our sentiment analysis feature, allowing you to find articles that match your mindset.</p>
                    </div>
                    <div className="feature-item">
                        <FaBookReader className="feature-icon" />
                        <h3>Engage and Learn</h3>
                        <p>Use our interactive vocabulary-building tools to expand your language skills while enjoying meaningful content.</p>
                    </div>
                </div>

                <p>
                    At Artiura, our goal is to foster meaningful engagement with digital content by promoting deeper reading habits, expanding vocabulary, and improving comprehension skills. We aim to make learning enjoyable by combining personalized recommendations with educational tools that help you grow intellectually.
                </p>
            </div>
        </div>
    );
};

export default About;
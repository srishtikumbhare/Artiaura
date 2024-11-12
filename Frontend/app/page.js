// app/page.js
import React from 'react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import './home/styles.css';

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Feed Your Mind with Content that Matters</h1>
                <p className="home-subtitle">
                    Long reads, personalized recommendations, and smarter learning--all in one place
                </p>
                <div className="home-buttons">
                    <SignUpButton mode="modal">
                        <button className="get-started-btn">Get Started</button>
                    </SignUpButton>
                    <SignInButton mode="modal">
                        <button className="login-btn">Log in Existing Account</button>
                    </SignInButton>
                </div>
                {/* Rotating banner with platform names */}
                <div className="news-ticker">
                    <div className="ticker-content">
                        BBC &nbsp; | &nbsp; Wired &nbsp; | &nbsp; The Verge &nbsp; | &nbsp; Time &nbsp; | &nbsp;
                        The Times of India &nbsp; | &nbsp; The Guardian &nbsp; | &nbsp; New York Times &nbsp; | &nbsp;
                        The Washington Post &nbsp; | &nbsp; Forbes &nbsp; | &nbsp; Reuters
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section">
                <h2>Features</h2>
                <div className="features">
                    <div className="feature-item">
                        <div className="feature-icon">🔍</div>
                        <p>Personalized content based on your interests</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">📰</div>
                        <p>Curated articles from top publishers and platforms</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">📚</div>
                        <p>Smarter learning tools and long reads at your fingertips</p>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="testimonials-section">
                <h2>What Our Users Say</h2>
                <div className="testimonial-item">
                    <p>"Artiura has changed the way I consume content. It's smart and intuitive!"</p>
                    <p>- Alex, Content Enthusiast</p>
                </div>
                <div className="testimonial-item">
                    <p>"I love how it personalizes my feed based on my reading habits."</p>
                    <p>- Jordan, Avid Reader</p>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>© 2024 Artiura. All rights reserved.</p>
                <div className="footer-links">
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                    <a href="/contact">Contact Us</a>
                </div>
            </footer>
        </div>
    );
}
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from transformers import pipeline
from newsapi import NewsApiClient
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


NEWSAPI_KEY = os.getenv('NEWSAPI_KEY')
if not NEWSAPI_KEY:
    raise ValueError("Missing NewsAPI key. Make sure NEWSAPI_KEY is set in the environment.")

# Initialize external services
newsapi = NewsApiClient(api_key=NEWSAPI_KEY)
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

# Keywords for each mood
keywords = {
    "focused": ["research", "analysis", "business"],
    "relaxed": ["lifestyle", "entertainment", "vacation"],
    "curious": ["discovery", "science", "history"],
}

# Database setup to store user preferences
def setup_database():
    conn = sqlite3.connect("user_preferences.db")
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS user_preferences (
            user_id TEXT PRIMARY KEY,
            preferences TEXT  -- Store as JSON string for simplicity
        )
    """)
    conn.commit()
    conn.close()

# Analyze sentiment of the article text
def analyze_sentiment(text):
    try:
        result = sentiment_analyzer(text[:512])
        return result[0]['label'].lower()
    except Exception as e:
        print(f"Error analyzing sentiment: {e}")
        return "neutral"

# Fetch personalized articles based on user preferences and mood
def fetch_personalized_articles(user_id, mood):
    # Get user-specific keywords or default mood keywords if no preference is found
    user_preferences = get_user_preferences(user_id)
    mood_keywords = user_preferences.get(mood, keywords[mood])  # Use user-specific keywords or default

    articles = []
    for chunk in [mood_keywords[i:i+5] for i in range(0, len(mood_keywords), 5)]:  # Limit query length
        query = " OR ".join(chunk)
        response = newsapi.get_everything(q=query, language='en', sort_by='relevancy')
        
        for article in response.get('articles', []):
            # Filter out articles with missing essential fields
            if not article.get('title') or not article.get('source', {}).get('name') or not article.get('url') or not article.get('urlToImage'):
                continue  # Skip this article if title, source, or link is missing
            
            # Check if the article's description/content is available for sentiment analysis
            sentiment_text = article.get('description') or article.get('content')
            if not sentiment_text:
                continue  # Skip this article if no text is available for sentiment analysis

            # Analyze sentiment and append article if it meets all criteria
            sentiment = analyze_sentiment(sentiment_text)
            articles.append({
                "title": article["title"],
                "source": article["source"]["name"],
                "sentiment": sentiment,
                "link": article["url"],
                "image": article.get("urlToImage", ""),  # Allow empty image, but it can be handled in frontend
            })

    return articles

# Root route for testing if the server is running
@app.route('/')
def home():
    return "Backend is running!", 200

# Endpoint to fetch personalized articles
@app.route('/api/personalized_articles', methods=['GET'])
def get_personalized_articles():
    user_id = request.args.get("user_id")
    mood = request.args.get("mood", "focused")
    
    if not user_id or mood not in keywords:
        return jsonify({"error": "Invalid user_id or mood parameter"}), 400

    articles = fetch_personalized_articles(user_id, mood)
    return jsonify({"articles": articles})

# Endpoint to update user preferences
@app.route('/api/update_preferences', methods=['POST'])
def update_preferences():
    data = request.json
    user_id = data.get("user_id")
    mood = data.get("mood")
    keywords = data.get("keywords")  # List of keywords/topics related to the article

    if not user_id or not keywords:
        return jsonify({"error": "Invalid data"}), 400

    # Fetch existing preferences or create a new one
    user_preferences = get_user_preferences(user_id)
    if mood in user_preferences:
        user_preferences[mood].extend(keywords)  # Add keywords to existing mood category
    else:
        user_preferences[mood] = keywords  # Initialize mood with keywords if not present

    # Save updated preferences in the database
    update_user_preferences(user_id, user_preferences)
    return jsonify({"message": "Preferences updated successfully"})

# Utility function to get user preferences from the database
def get_user_preferences(user_id):
    conn = sqlite3.connect("user_preferences.db")
    c = conn.cursor()
    c.execute("SELECT preferences FROM user_preferences WHERE user_id = ?", (user_id,))
    row = c.fetchone()
    conn.close()
    return json.loads(row[0]) if row else {}

# Utility function to update user preferences in the database
def update_user_preferences(user_id, preferences):
    conn = sqlite3.connect("user_preferences.db")
    c = conn.cursor()
    c.execute("REPLACE INTO user_preferences (user_id, preferences) VALUES (?, ?)", (user_id, json.dumps(preferences)))
    conn.commit()
    conn.close()

# Run the application
if __name__ == '__main__':
    setup_database()  # Initialize the database when the app starts
    print("Defined routes:")
    for rule in app.url_map.iter_rules():
        print(rule)
    app.run(debug=True)

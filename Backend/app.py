#app.py
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from newsapi import NewsApiClient
from dotenv import load_dotenv
import torch

# Load environment variables
load_dotenv()
api_key = os.getenv('NEWSAPI_KEY')
if not api_key:
    raise ValueError("API key not found. Please set the NEWSAPI_KEY environment variable.")

# Initialize app and CORS
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Initialize NewsApiClient and Sentiment Analyzer
newsapi = NewsApiClient(api_key=api_key)
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

# Keywords for each mood
keywords = {
    "focused": ["research", "analysis", "report", "study", "business", "economics"],
    "relaxed": ["lifestyle", "entertainment", "vacation", "food", "wellness"],
    "curious": ["discovery", "mystery", "science", "history", "space"],
}

def analyze_sentiment(text):
    device = "mps" if torch.backends.mps.is_available() else "cpu"
    sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english", device=0 if device == "mps" else -1)
    try:
        result = sentiment_analyzer(text[:512])
        sentiment = result[0]['label'].lower()
        return sentiment
    except Exception:
        return "neutral"

def fetch_articles(mood):
    mood_keywords = keywords.get(mood, [])
    articles = []
    query = " OR ".join(mood_keywords[:10])  # Fetch based on keywords
    try:
        response = newsapi.get_everything(q=query, language='en', sort_by='relevancy')
        for article in response['articles']:
            sentiment = analyze_sentiment(article.get('description', '') or article.get('content', ''))
            articles.append({
                "title": article["title"],
                "source": article["source"]["name"],
                "published": article["publishedAt"],
                "link": article["url"],
                "image": article.get("urlToImage", ""),
                "sentiment": sentiment
            })
    except Exception as e:
        print(f"Error fetching articles: {e}")
    
    return articles

@app.route('/api/mood_articles', methods=['GET'])
def get_mood_articles():
    mood = request.args.get("mood", "focused")
    if mood not in keywords:
        return jsonify({"error": "Invalid mood parameter"}), 400

    articles = fetch_articles(mood)
    return jsonify({"articles": articles if articles else []})

if __name__ == '__main__':
    app.run(debug=False)
# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from datetime import datetime
import feedparser
from dateutil import parser
from dotenv import load_dotenv
from newsapi import NewsApiClient
import os

# Load environment variables
load_dotenv()
api_key = os.getenv('NEWSAPI_KEY')
if not api_key:
    raise ValueError("API key not found. Please set the NEWSAPI_KEY environment variable.")

# Initialize NewsApiClient
newsapi = NewsApiClient(api_key=api_key)
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def format_date(date_str):
    try:
        date_obj = parser.parse(date_str)
        return date_obj.strftime("%d/%m/%y %H:%M")
    except (ValueError, TypeError):
        return "Invalid date format"

def fetch_news_from_newsapi(user_query):
    all_articles = newsapi.get_everything(q=user_query, language='en', sort_by='relevancy')
    return all_articles['articles'][:10]

def fetch_news_from_rss(rss_urls, user_query):
    rss_articles = []
    for url in rss_urls:
        feed = feedparser.parse(url)
        for entry in feed.entries[:30]:  
            if user_query.lower() in entry.title.lower() or (hasattr(entry, 'summary') and user_query.lower() in entry.summary.lower()):
                published = entry.published if 'published' in entry else 'No date available'
                formatted_date = format_date(published) if published != 'No date available' else published
                rss_articles.append({
                    'title': entry.title,
                    'source': feed.feed.title if 'title' in feed.feed else 'Unknown Source',
                    'published': formatted_date,
                    'link': entry.link,
                })
    return rss_articles

@app.route('/api/news', methods=['GET'])
def get_news():
    user_query = request.args.get('query', default='latest news', type=str)  # Default to 'latest news' if empty
    rss_urls = ['https://www.indiatoday.in/rss/1206578']
    all_articles = fetch_news_from_newsapi(user_query)
    rss_articles = fetch_news_from_rss(rss_urls, user_query)

    # Format articles to include only necessary data
    formatted_articles = {
        "newsapi": [
            {
                "title": article["title"],
                "source": article["source"]["name"],
                "published": format_date(article["publishedAt"]),
                "link": article["url"]
            }
            for article in all_articles
        ],
        "rss": rss_articles
    }
    return jsonify(formatted_articles)

if __name__ == '__main__':
    app.run(debug=True)
from flask import Blueprint, request, jsonify
import praw
from flask_cors import CORS
import os
import dotenv as load_dotenv
import traceback

# 🔐 Load env variables
load_dotenv(dotenv_path=r"C:\\Users\\jains\\OneDrive\\Desktop\\reactproject\\reactproject\\aiml\\.env")
reddit_api = Blueprint("reddit_api", __name__)
CORS(reddit_api)
# ✅ Setup PRAW with your credentials
reddit = praw.Reddit(
    client_id=os.getenv("reddit_client_id"),
    client_secret=os.getenv("reddit_client_secret"),
    user_agent=os.getenv("reddit_user_agent")
)

DEFAULT_SUBREDDITS = [
    "MachineLearning", "Artificial", "OpenAI",
    "DeepLearning", "Futurology", "Computervision", "LanguageTechnology"
]

@reddit_api.route("/news", methods=["GET"])
def fetch_reddit_news():
    subreddits = request.args.getlist("subreddits") or DEFAULT_SUBREDDITS
    limit = int(request.args.get("limit", 10))

    result = {}

    try:
        for subreddit_name in subreddits:
            subreddit = reddit.subreddit(subreddit_name)
            posts = []
            for post in subreddit.hot(limit=limit):
                posts.append({
                    "title": post.title,
                    "score": post.score,
                    "url": f"https://www.reddit.com{post.permalink}",
                    "comments": post.num_comments
                })
            result[subreddit_name] = posts
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

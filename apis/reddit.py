from flask import Blueprint, request, jsonify
from flask_cors import CORS
import praw
import traceback

reddit_api = Blueprint("reddit_api", __name__)  # ✅ Fix here
CORS(reddit_api)

reddit = praw.Reddit(
    client_id='2LEniuGaTItKLf1B-Vn4Hw',
    client_secret='Nl0SaOLVDbxaICjafgUse8hXbdPEIw',
    user_agent='AI News Fetcher by /u/Proper_Macaron2807'
)

DEFAULT_SUBREDDITS = [
    "MachineLearning", "Artificial", "OpenAI",
    "DeepLearning", "Futurology", "Computervision", "LanguageTechnology"
]

@reddit_api.route("/news", methods=["GET"])
def fetch_reddit_news():
    subreddits = request.args.get("subreddits", "")
    if subreddits:
        subreddits = subreddits.split(",")
    else:
        subreddits = DEFAULT_SUBREDDITS

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
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

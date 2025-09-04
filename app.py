from flask import Flask
from flask_cors import CORS
from apis.bert import bert_api
from apis.summ import summ_api
from apis.transcribe import transcribe_api
from apis.mindmap import mindmap_api
from apis.reddit import reddit_api
from apis.youtubetrans import gemini_api
from apis.caption import caption_api
import os
from dotenv import load_dotenv
import os

load_dotenv()  # This loads all the variables from your .env file

HF_TOKEN = os.getenv("HF_TOKEN")
HF_API_URL = os.getenv("HF_API_URL")

app = Flask(__name__)
CORS(app)

# Register individual APIs
app.register_blueprint(bert_api, url_prefix='/bert')
app.register_blueprint(summ_api, url_prefix='/summ')
app.register_blueprint(transcribe_api, url_prefix='/transcribe')
app.register_blueprint(mindmap_api, url_prefix='/mindmap')
app.register_blueprint(reddit_api, url_prefix='/reddit')
app.register_blueprint(gemini_api, url_prefix='/youtubetrans')
app.register_blueprint(caption_api, url_prefix='/caption')
@app.route('/')
def home():
    return "✅ Unified Flask API is running with BERT and T5!"

if __name__ == '__main__':
    app.run(debug=False, use_reloader=False)

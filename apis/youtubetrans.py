# from flask import Blueprint, request, jsonify
# from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound
# import google.generativeai as genai
# from flask_cors import CORS



# # 🔐 Secure your API key in production using environment variables
# genai.configure(api_key="AIzaSyDBL6vNtfnrjVfrZZRZLooo_YfjyH4k4kk")

# model = genai.GenerativeModel("models/gemini-1.5-flash")
# gemini_api = Blueprint("gemini_api", __name__)
# CORS(gemini_api)

# def extract_video_id(url):
#     if "v=" in url:
#         return url.split("v=")[1][:11]
#     elif "youtu.be/" in url:
#         return url.split("youtu.be/")[1][:11]
#     return None

# def get_transcript(video_id):
#     try:
#         transcript = YouTubeTranscriptApi.get_transcript(video_id)
#         return " ".join([x['text'] for x in transcript])
#     except (TranscriptsDisabled, NoTranscriptFound):
#         return None

# def generate_notes(text):
#     prompt = (
#         "You are a helpful note-taking assistant. Convert this transcript into clean, structured bullet-point notes:\n\n"
#         + text
#     )
#     response = model.generate_content(prompt)
#     return response.text

# @gemini_api.route('/generate-notes', methods=['POST'])
# def generate_notes_api():
#     data = request.get_json()
#     url = data.get("url")

#     if not url:
#         return jsonify({"error": "Missing 'url' in request"}), 400

#     video_id = extract_video_id(url)
#     if not video_id:
#         return jsonify({"error": "Invalid YouTube URL"}), 400

#     transcript = get_transcript(video_id)
#     if not transcript:
#         return jsonify({"error": "Transcript not found"}), 404

#     notes = generate_notes(transcript)
#     return jsonify({"notes": notes})




from flask import Blueprint, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound
import google.generativeai as genai
from flask_cors import CORS
import os
from dotenv import load_dotenv

# 🔐 Load environment variables from .env
load_dotenv(dotenv_path=r"C:\\Users\\jains\\OneDrive\\Desktop\\reactproject\\reactproject\\aiml\\.env")
api_key = os.getenv("api_key_for_youtube")

# 🔐 Configure Gemini API
genai.configure(api_key=api_key)
model = genai.GenerativeModel("models/gemini-1.5-flash")

gemini_api = Blueprint("gemini_api", __name__)
CORS(gemini_api)

# 🔎 Extract video ID from URL
def extract_video_id(url):
    if "v=" in url:
        return url.split("v=")[1][:11]
    elif "youtu.be/" in url:
        return url.split("youtu.be/")[1][:11]
    return None

# 📜 Get transcript from YouTube
def get_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return transcript
    except (TranscriptsDisabled, NoTranscriptFound):
        return None

# 🕐 Format transcript with timestamps
def format_transcript_with_timestamps(transcript):
    formatted = []
    for entry in transcript:
        mins = int(entry['start'] // 60)
        secs = int(entry['start'] % 60)
        timestamp = f"{mins:02}:{secs:02}"
        formatted.append(f"[{timestamp}] {entry['text']}")
    return "\n".join(formatted)

# 📝 Generate notes from raw transcript
def generate_notes(text):
    prompt = (
        "You are a helpful note-taking assistant. Convert this transcript into clean, structured bullet-point notes:\n\n"
        + text
    )
    response = model.generate_content(prompt)
    return response.text

# 🚀 Flask route for note generation
@gemini_api.route('/generate-notes', methods=['POST'])
def generate_notes_api():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "Missing 'url' in request"}), 400

    video_id = extract_video_id(url)
    if not video_id:
        return jsonify({"error": "Invalid YouTube URL"}), 400

    transcript = get_transcript(video_id)
    if not transcript:
        return jsonify({"error": "Transcript not found"}), 404

    raw_text = " ".join([x["text"] for x in transcript])
    formatted_transcript = format_transcript_with_timestamps(transcript)
    notes = generate_notes(raw_text)

    return jsonify({
        "transcript": formatted_transcript,
        "notes": notes
    })





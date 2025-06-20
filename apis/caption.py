from flask import Blueprint, request, jsonify
from PIL import Image,UnidentifiedImageError
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration
import google.generativeai as genai
from flask_cors import CORS
import tempfile
import os
from dotenv import load_dotenv
import random
import time 

# 📥 Load .env file
load_dotenv(dotenv_path=r"C:\\Users\\jains\\OneDrive\\Desktop\\reactproject\\reactproject\\aiml\\.env")

# 🔐 Setup Gemini using API key from .env
api_key = os.getenv("api_key_for_captioning")
genai.configure(api_key=api_key)
gemini_flash = genai.GenerativeModel("models/gemini-1.5-flash")

# 🧠 Load BLIP model
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
blip_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

PLATFORMS = ["instagram","facebook", "twitter", "linkedin"]
STYLES = ["witty", "emotional", "informative", "trending", "professional", "casual", "funny", "motivational", "romantic"]

caption_api = Blueprint("caption_api", __name__)
CORS(caption_api)

# 📸 Caption Generator using BLIP
def get_blip_caption(image_path):
    try:
        image = Image.open(image_path).convert("RGB")
        inputs = processor(images=image, return_tensors="pt")
        output = blip_model.generate(**inputs)
        return processor.decode(output[0], skip_special_tokens=True)
    except (FileNotFoundError, UnidentifiedImageError):
        return None



# ✨ Style Transformer using Gemini
def style_caption(raw_caption, style, platform):
    # Add a random "noise" hint to prevent deterministic responses
    hint = random.choice([
        "Include a fun fact.", 
        "Make it rhyme.",
        "Use a Gen Z tone.", 
        "Add a playful twist.", 
        f"Use a {random.choice(['positive', 'bold', 'motivational'])} tone."
    ])

    prompt = (
        f"You are a social media content expert.\n"
        f"Rewrite the following caption in a {style} style for {platform}.\n"
        f"Caption: \"{raw_caption}\"\n"
        f"Add relevant hashtags and emojis. Keep it under 300 characters.\n"
        f"{hint}"
    )

    try:
        response = gemini_flash.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"⚠ Gemini failed: {e}")
        return raw_caption


# 📡 API Route
@caption_api.route('/generate_caption', methods=['POST'])
def generate_caption():
    image_file = request.files.get('image')
    style = request.form.get('style', '').lower()
    platform = request.form.get('platform', '').lower()

    if not image_file or style not in STYLES or platform not in PLATFORMS:
        return jsonify({
            "error": "Invalid input. Upload image and choose valid platform/style.",
            "supported_platforms": PLATFORMS,
            "supported_styles": STYLES
        }), 400

    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as temp:
        image_file.save(temp.name)
        image_path = temp.name

    raw_caption = get_blip_caption(image_path)
    os.remove(image_path)

    if not raw_caption:
        return jsonify({"error": "Failed to generate caption from image."}), 500

    styled_caption = style_caption(raw_caption, style, platform)

    return jsonify({
        "platform": platform,
        "style": style,
        "raw_caption": raw_caption,
        "styled_caption": styled_caption
    })

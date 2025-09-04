# from flask import Flask, request, jsonify
# import torch
# from transformers import T5Tokenizer, T5ForConditionalGeneration

# app = Flask(__name__)

# # Load tokenizer and model architecture
# tokenizer = T5Tokenizer.from_pretrained("t5-small")
# model = T5ForConditionalGeneration.from_pretrained("t5-small")

# # Load fine-tuned weights
# model.load_state_dict(torch.load("t5_finetuned_model.pt", map_location=torch.device("cpu")))
# model.eval()

# @app.route("/generate", methods=["POST"])
# def generate():
#     data = request.get_json()
#     input_text = data.get("text", "")

#     if not input_text:
#         return jsonify({"error": "Missing 'text' in request."}), 400

#     # Encode input and generate response
#     input_ids = tokenizer.encode(input_text, return_tensors="pt", truncation=True)
#     outputs = model.generate(input_ids, max_length=128, num_beams=4, early_stopping=True)
#     result = tokenizer.decode(outputs[0], skip_special_tokens=True)

#     return jsonify({"output": result})

# if __name__ == "__main__":
#     print("✅ Server is running at http://localhost:5000")
#     app.run(host="0.0.0.0", port=5000, debug=True)




# from flask import Flask, request, jsonify
# import torch
# from transformers import T5Tokenizer, T5ForConditionalGeneration

# app = Flask(__name__)

# try:
#     tokenizer = T5Tokenizer.from_pretrained("t5-small")
#     model = T5ForConditionalGeneration.from_pretrained("t5-small")
#     model.load_state_dict(torch.load("t5_finetuned_model.pt", map_location=torch.device("cpu")))
#     model.eval()
#     print("✅ Model loaded successfully.")
# except Exception as e:
#     print(f"❌ Failed to load model: {e}")
#     exit(1)

# @app.route("/generate", methods=["POST"])
# def generate():
#     data = request.get_json()

#     if not data or "text" not in data:
#         return jsonify({"error": "Missing 'text' in request"}), 400

#     text = data["text"]

#     # Tokenize input
#     input_ids = tokenizer(text, return_tensors="pt", padding=True, truncation=True)

#     with torch.no_grad():
#         outputs = model.generate(
#             input_ids,
#             max_length=128,
#             num_beams=4,
#             early_stopping=True,
#             no_repeat_ngram_size=2,  # optional, avoid repeating phrases
#             length_penalty=1.0
#         )
#     result = tokenizer.decode(outputs[0], skip_special_tokens=True)

#     return jsonify({"output": result})

# if __name__ == "__main__":
#     app.run(debug=True)





# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import torch
# from transformers import T5Tokenizer, T5ForConditionalGeneration

# app = Flask(__name__)
# CORS(app)  # 🔥 Allow React frontend or other clients to access this API

# # Load tokenizer and model
# model_path = "model/t5_finetuned_model.pt"
# tokenizer = T5Tokenizer.from_pretrained("t5-small")
# model = T5ForConditionalGeneration.from_pretrained("t5-small")

# # Load fine-tuned weights
# try:
#     model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
#     model.eval()
#     print("✅ T5 model loaded successfully.")
# except Exception as e:
#     print(f"❌ Failed to load T5 model: {e}")
#     exit(1)

# @app.route("/", methods=["GET"])
# def home():
#     return "✅ T5 Text Generation API is running!"

# @app.route("/generate", methods=["POST"])
# def generate():
#     data = request.get_json()

#     if not data or "text" not in data:
#         return jsonify({"error": "Missing 'text' in request"}), 400

#     text = data["text"]

#     # Tokenize input text
#     input_ids = tokenizer(text, return_tensors="pt", padding=True, truncation=True)

#     with torch.no_grad():
#         outputs = model.generate(
#             input_ids.input_ids,
#             max_length=128,
#             num_beams=4,
#             early_stopping=True,
#             no_repeat_ngram_size=2,
#             length_penalty=1.0
#         )

#     result = tokenizer.decode(outputs[0], skip_special_tokens=True)

#     return jsonify({
#         "input": text,
#         "output": result
#     })

# if __name__ == "__main__":
#     app.run(debug=True)

# from flask import Blueprint, request, jsonify
# from flask_cors import CORS
# import torch
# from transformers import T5Tokenizer, T5ForConditionalGeneration

# import nltk
# from nltk.tokenize import sent_tokenize

# summ_api = Blueprint('summ_api', __name__)
# CORS(summ_api)

# model_path = "C:\\Users\\jains\\OneDrive\\Desktop\\reactproject\\reactproject\\aiml\\model\\t5_finetuned_model.pt"
# tokenizer = T5Tokenizer.from_pretrained("t5-small")
# model = T5ForConditionalGeneration.from_pretrained("t5-small")

# try:
#     model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
#     model.eval()
#     print("✅ T5 model loaded successfully.")
# except Exception as e:
#     print(f"❌ Failed to load T5 model: {e}")
#     exit(1)

# @summ_api.route("/", methods=["GET"])
# def home_summ():
#     return "✅ T5 Text Generation API is running!"

# # @summ_api.route("/generate", methods=["POST"])
# # def generate():
# #     data = request.get_json()
# #     if not data or "text" not in data:
# #         return jsonify({"error": "Missing 'text' in request"}), 400

# #     text = data["text"]
# #     input_ids = tokenizer(text, return_tensors="pt", padding=True, truncation=True)

# #     with torch.no_grad():
# #         outputs = model.generate(
# #             input_ids.input_ids,
# #             max_length=128,
# #             num_beams=4,
# #             early_stopping=True,
# #             no_repeat_ngram_size=2,
# #             length_penalty=1.0
# #         )

#     # result = tokenizer.decode(outputs[0], skip_special_tokens=True)

#     # return jsonify({
#     #     "input": text,
#     #     "output": result
#     # })


# @summ_api.route("/generate", methods=["POST"])
# def generate():
#     data = request.get_json()
#     if not data or "text" not in data:
#         return jsonify({"error": "Missing 'text' in request"}), 400

#     text = data["text"]
#     input_ids = tokenizer(text, return_tensors="pt", padding=True, truncation=True)

#     with torch.no_grad():
#         outputs = model.generate(
#             input_ids.input_ids,
#             max_length=512,
#             min_length=100,
#             num_beams=4,
#             early_stopping=False,
#             no_repeat_ngram_size=2,
#             length_penalty=1.0
#         )

#     raw_output = tokenizer.decode(outputs[0], skip_special_tokens=True)

#     # 🧠 Use nltk to extract only complete sentences
#     sentences = sent_tokenize(raw_output)
#     completed_output = " ".join(sentences)

#     return jsonify({
#         "input": text,
#         "output": completed_output
#     })
from flask import Blueprint, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()  # Load .env variables

summ_api = Blueprint('summ_api', __name__)
CORS(summ_api)

# Hugging Face Space URL and token
HF_API_URL = os.getenv("HF_API_URL_T5")  # e.g., https://samyak38-st5.hf.space/predict
HF_TOKEN = os.getenv("HF_TOKEN")

if not HF_API_URL or not HF_TOKEN:
    raise ValueError("Please set HF_API_URL_T5 and HF_TOKEN in your environment variables!")

@summ_api.route("/", methods=["GET"])
def home_summ():
    return "✅ T5 Text Generation API is running via Hugging Face Space!"

@summ_api.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "Missing 'text' in request"}), 400

    text = data["text"]

    # HF Spaces API payload
    payload = {"data": [text]}
    headers = {"Authorization": f"Bearer {HF_TOKEN}"}

    try:
        response = requests.post(HF_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        result = response.json()
        
        # HF Spaces usually returns a list under "data"
        output_text = result.get("data", [""])[0]

        return jsonify({
            "input": text,
            "output": output_text
        })

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Failed to get response from HF Space: {e}"}), 500


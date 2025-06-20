# from flask import Flask, request, jsonify
# import torch
# from transformers import BertTokenizer, BertForSequenceClassification

# app = Flask(__name__)

# # Load tokenizer
# tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# # Load the fine-tuned model
# model_path = "model/bert_model.pt"
# model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)

# # Load only if .pt is a state_dict
# state_dict = torch.load(model_path, map_location=torch.device('cpu'))
# model.load_state_dict(state_dict)
# model.eval()

# @app.route("/", methods=["GET"])
# def home():
#     return "BERT Flask API is running! Use the `/predict` endpoint with a POST request."

# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.get_json()

#     if "text" not in data:
#         return jsonify({"error": "Missing 'text' in request"}), 400

#     text = data["text"]
#     inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
#     with torch.no_grad():
#         outputs = model(**inputs)
#         logits = outputs.logits
#         predicted_class = torch.argmax(logits, dim=1).item()

#     return jsonify({"prediction": predicted_class})



# if __name__ == "__main__":
#     app.run(debug=True)




# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import torch
# from transformers import BertTokenizer, BertForSequenceClassification

# app = Flask(__name__)
# CORS(app)  # 🔥 Allow React frontend to access this API

# # Load tokenizer and model
# tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
# model_path = "model/bert_model.pt"

# # Load model architecture
# model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)

# # Load model weights
# state_dict = torch.load(model_path, map_location=torch.device('cpu'))
# model.load_state_dict(state_dict)
# model.eval()

# @app.route("/", methods=["GET"])
# def home():
#     return "✅ BERT Fake News API is running!"

# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.get_json()

#     if not data or "text" not in data:
#         return jsonify({"error": "Missing 'text' in request"}), 400

#     text = data["text"]

#     # Tokenize input
#     inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)

#     with torch.no_grad():
#         outputs = model(**inputs)
#         logits = outputs.logits
#         probabilities = torch.softmax(logits, dim=1).squeeze().tolist()
#         predicted_class = torch.argmax(logits, dim=1).item()

#     # Convert class to label
#     label = "REAL" if predicted_class == 1 else "FAKE"

#     return jsonify({
#         "label": label,
#         "probability": probabilities[predicted_class]
#     })

# if __name__ == "__main__":
#     app.run(debug=True)









from flask import Blueprint, request, jsonify
from flask_cors import CORS
import torch
from transformers import BertTokenizer, BertForSequenceClassification

bert_api = Blueprint('bert_api', __name__)
CORS(bert_api)

# Load tokenizer and model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model_path = "C:\\Users\\jains\\OneDrive\\Desktop\\reactproject\\reactproject\\aiml\\model\\bert_model.pt"

model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)
state_dict = torch.load(model_path, map_location=torch.device('cpu'))
model.load_state_dict(state_dict)
model.eval()

@bert_api.route("/", methods=["GET"])
def home_bert():
    return "✅ BERT Fake News API is running!"

@bert_api.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "Missing 'text' in request"}), 400

    text = data["text"]
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probabilities = torch.softmax(logits, dim=1).squeeze().tolist()
        predicted_class = torch.argmax(logits, dim=1).item()

    label = "REAL" if predicted_class == 1 else "FAKE"

    return jsonify({
        "label": label,
        "probability": probabilities[predicted_class]
    })

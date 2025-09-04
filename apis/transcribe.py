# # from flask import Blueprint, request, jsonify
# # from flask_cors import CORS
# # from faster_whisper import WhisperModel
# # from transformers import MarianMTModel, MarianTokenizer
# # import torch
# # import tempfile
# # import os

# # transcribe_api = Blueprint("transcribe_api", __name__)
# # CORS(transcribe_api)

# # language_options = {
# #     "ar": "Arabic", "zh": "Chinese", "nl": "Dutch", "en": "English", "fr": "French", "de": "German",
# #     "hi": "Hindi", "id": "Indonesian", "it": "Italian", "ja": "Japanese", "ko": "Korean", "pl": "Polish",
# #     "pt": "Portuguese", "ru": "Russian", "es": "Spanish", "tr": "Turkish", "uk": "Ukrainian", "vi": "Vietnamese"
# # }

# # device = "cuda" if torch.cuda.is_available() else "cpu"
# # compute_type = "float16" if device == "cuda" else "float32"
# # whisper_model = WhisperModel("medium", device=device, compute_type=compute_type)

# # def load_translation_model(src, tgt):
# #     model_name = f"Helsinki-NLP/opus-mt-{src}-{tgt}"
# #     tokenizer = MarianTokenizer.from_pretrained(model_name)
# #     model = MarianMTModel.from_pretrained(model_name).to(device)
# #     return tokenizer, model

# # def translate_text(text, tokenizer, model):
# #     inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True).to(model.device)
# #     translated = model.generate(**inputs)
# #     return tokenizer.decode(translated[0], skip_special_tokens=True)

# # @transcribe_api.route("/transcribe_translate", methods=["POST"])
# # def transcribe_translate():
# #     if "audio" not in request.files or "target_lang" not in request.form:
# #         return jsonify({"error": "Missing audio file or target_lang"}), 400

# #     audio = request.files["audio"]
# #     target_lang = request.form["target_lang"].strip().lower()

# #     if not audio or not audio.filename:
# #         return jsonify({"error": "No audio file uploaded"}), 400

# #     # Allow only mp3 and wav files
# #     allowed_extensions = {".mp3", ".wav"}
# #     ext = os.path.splitext(audio.filename)[1].lower()
# #     if ext not in allowed_extensions:
# #         return jsonify({"error": f"Unsupported file format '{ext}'. Only MP3 and WAV are allowed."}), 400

# #     if target_lang not in language_options:
# #         return jsonify({"error": "Invalid target language code"}), 400

# #     tmp_path = None
# #     try:
# #         with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
# #             tmp.write(audio.read())
# #             tmp.flush()
# #             tmp_path = tmp.name

# #         segments, info = whisper_model.transcribe(tmp_path, beam_size=5)
# #         spoken_lang_code = info.language

# #         text_segments = [(seg.start, seg.end, seg.text) for seg in segments]
# #         results = []

# #         if spoken_lang_code == target_lang:
# #             results = [{"start": round(s, 2), "end": round(e, 2), "text": t} for s, e, t in text_segments]
# #         else:
# #             if spoken_lang_code != "en":
# #                 tokenizer1, model1 = load_translation_model(spoken_lang_code, "en")
# #                 translated_en = [(s, e, translate_text(t, tokenizer1, model1)) for s, e, t in text_segments]
# #             else:
# #                 translated_en = text_segments

# #             if target_lang != "en":
# #                 tokenizer2, model2 = load_translation_model("en", target_lang)
# #                 for s, e, t in translated_en:
# #                     results.append({
# #                         "start": round(s, 2),
# #                         "end": round(e, 2),
# #                         "text": translate_text(t, tokenizer2, model2)
# #                     })
# #             else:
# #                 results = [{"start": round(s, 2), "end": round(e, 2), "text": t} for s, e, t in translated_en]

# #         return jsonify({
# #             "spoken_language": spoken_lang_code,
# #             "target_language": target_lang,
# #             "segments": results
# #         })

# #     except Exception as e:
# #         return jsonify({"error": f"Server error: {str(e)}"}), 500

# #     finally:
# #         if tmp_path and os.path.exists(tmp_path):
# #             os.remove(tmp_path)




# from flask import Blueprint, request, jsonify
# import torch
# import os
# import tempfile
# import soundfile as sf
# from transformers import AutoProcessor, AutoModelForSpeechSeq2Seq
# from flask_cors import CORS

# transcribe_api = Blueprint("transcribe_api", __name__)
# CORS(transcribe_api)

# # Set device
# device = "cuda" if torch.cuda.is_available() else "cpu"

# # Load processor and model from saved directory
# processor = AutoProcessor.from_pretrained("./model/distil-whisper-distil-small.en")
# model = AutoModelForSpeechSeq2Seq.from_pretrained("distil-whisper/distil-small.en")
# model.load_state_dict(torch.load("./model/distil_whisper_small_en.pt", map_location=device))
# model.to(device)
# model.eval()

# @transcribe_api.route("/transcribe_fast", methods=["POST"])
# def transcribe_fast():
#     if "audio" not in request.files:
#         return jsonify({"error": "Missing audio file"}), 400

#     audio = request.files["audio"]
#     ext = os.path.splitext(audio.filename)[1].lower()

#     # Allow only WAV files for simplicity
#     if ext != ".wav":
#         return jsonify({"error": f"Only WAV files are supported. You uploaded: {ext}"}), 400

#     tmp_path = None
#     try:
#         # Save the uploaded file to a temp path
#         with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
#             tmp.write(audio.read())
#             tmp.flush()
#             tmp_path = tmp.name

#         # Load audio using soundfile
#         waveform, sr = sf.read(tmp_path)
#         waveform = torch.tensor(waveform, dtype=torch.float32)

#         # Convert to mono if stereo
#         if waveform.ndim > 1:
#             waveform = waveform.mean(dim=1)
#         waveform = waveform.unsqueeze(0)  # shape: [1, samples]

#         # Resample if needed
#         if sr != 16000:
#             resampler = torch.nn.functional.interpolate
#             waveform = torch.nn.functional.interpolate(waveform.unsqueeze(1), scale_factor=16000/sr, mode="linear", align_corners=False).squeeze(1)

#         # Process input
#         input_features = processor(
#             waveform.squeeze(0),
#             sampling_rate=16000,
#             return_tensors="pt"
#         ).input_features.to(device)

#         # Generate transcription
#         with torch.no_grad():
#             predicted_ids = model.generate(input_features)

#         transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]

#         return jsonify({
#             "note": "Only English WAV files are supported.",
#             "transcription": transcription
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     finally:
#         if tmp_path and os.path.exists(tmp_path):
#             os.remove(tmp_path)

from flask import Blueprint, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

transcribe_api = Blueprint("transcribe_api", __name__)
CORS(transcribe_api)

# Retrieve Hugging Face API URL and token from environment variables
HF_API_URL = os.getenv("HF_API_URL_WHISPER")
HF_TOKEN = os.getenv("HF_TOKEN")

if not HF_API_URL or not HF_TOKEN:
    raise ValueError("Please set HF_API_URL_WHISPER and HF_TOKEN in your environment variables!")

@transcribe_api.route("/transcribe_fast", methods=["POST"])
def transcribe_fast():
    if "audio" not in request.files:
        return jsonify({"error": "Missing audio file"}), 400

    audio = request.files["audio"]
    ext = os.path.splitext(audio.filename)[1].lower()

    if ext != ".wav":
        return jsonify({"error": f"Only WAV files are supported. You uploaded: {ext}"}), 400

    try:
        # Prepare the audio file for upload
        audio_data = audio.read()

        # Prepare the payload for the Hugging Face Space API
        payload = {"data": [audio_data]}
        headers = {"Authorization": f"Bearer {HF_TOKEN}"}

        # Send the audio file to the Hugging Face Space for transcription
        response = requests.post(HF_API_URL, files={"file": audio_data}, headers=headers)
        response.raise_for_status()

        # Extract the transcription from the response
        result = response.json()
        transcription = result.get("data", [""])[0]

        return jsonify({
            "note": "Only English WAV files are supported.",
            "transcription": transcription.strip()
        })

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Failed to get response from HF Space: {e}"}), 500

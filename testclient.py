# import requests

# # URL of your running Flask app
# API_URL = "http://127.0.0.1:5000/generate"

# # Input text to send
# payload = {
#     "text": "summarize: Machine learning is a method of data analysis that automates analytical model building."
# }

# # Make the POST request
# try:
#     response = requests.post(API_URL, json=payload)
#     response.raise_for_status()  # Raise an error for bad status codes

#     result = response.json()
#     print("✅ Response from API:")
#     print("Input:", result.get("input"))
#     print("Output:", result.get("output"))

# except requests.exceptions.RequestException as e:
#     print(f"❌ Request failed: {e}")

import requests

# Path to your test audio file (make sure it's in the same folder or provide full path)
audio_path = "Mujhse Mohabbat Ka Izhaar Karta(KoshalWorld.Com).mp3"  # Replace with your actual audio filename

# API endpoint (change if your backend is hosted differently)
url = "http://127.0.0.1:5000/transcribe"

# Language for translation (optional - default is English)
target_lang = "Hindi"

# Prepare multipart/form-data
with open(audio_path, "rb") as f:
    files = {"file": f}
    data = {"target_lang": target_lang}
    response = requests.post(url, files=files, data=data)

# Display response
if response.status_code == 200:
    print("✅ API Call Successful")
    result = response.json()
    for segment in result.get("transcript", []):
        print(f"[{segment['start']:.2f}s - {segment['end']:.2f}s] {segment['text']}")
else:
    print("❌ API Call Failed")
    print("Status Code:", response.status_code)
    print("Response:", response.text)

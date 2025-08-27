# Skelix – AI Toolbox Dashboard

Skelix is a full-stack AI productivity platform that integrates powerful NLP and vision models to streamline tasks like summarization, transcription, mind mapping, video note extraction, and more.

## 🚀 Live Preview
🌐 **Frontend (Preview Only):** [https://skai-nine.vercel.app](https://skai-nine.vercel.app)  
🎥 **Full Demo Video:** ([https://www.youtube.com/watch?v=pLV5bHFV72M])

> 💡 Note: Due to model size and backend constraints, some features are demonstrated in the video but not live on the frontend deployment.

---

## ✨ Key Features

- 📄 **Document Summarization** – using BERT and T5
- 🎙️ **Speech-to-Text Transcription** – via OpenAI Whisper
- 🧠 **Mind Map Generation** – from extracted text
- 📹 **YouTube Note Extraction** – converts video content to notes
- 🖼️ **Image Captioning** – automatic caption generation from image input
- 🗞️ **AI-Powered News Feed** – curated summaries from trending sources
- 🔐 **Authentication** – secure login via Supabase OAuth

---

## 🛠 Tech Stack

### Frontend:
- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🔐 Supabase (Auth & DB)
- 📦 Zustand (or Redux, depending on version)
- 📄 React Router

### Backend (in separate repo / local):
- 🐍 Python Flask (REST API)
- 🤖 Transformers: BERT, T5, Whisper, etc.
- 📥 Hugging Face, OpenAI APIs
- 🧠 Custom NLP Pipelines

---

## 🔐 .env Configuration

Create a `.env` file in your project root with the following variables:

```env
api_key_for_youtube=your_youtube_api_key
reddit_client_id=your_reddit_client_id
reddit_client_secret=your_reddit_client_secret
reddit_user_agent=your_reddit_user_agent
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
api_key_for_captioning=your_image_captioning_api_key

```

# Clone the repository
```
git clone https://github.com/Samyakjain808/skai.git
cd skai
```
# Install dependencies
```
npm install
```
# Start local dev server
```
npm run dev
```

// import React, { useState } from "react";

// const AudioTranscriber = () => {
//   const [audioFile, setAudioFile] = useState(null);
//   const [transcript, setTranscript] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileChange = (e) => {
//     setAudioFile(e.target.files[0]);
//     setTranscript(""); // reset transcript
//     setError(""); // reset error
//   };

//   const handleUpload = async () => {
//     if (!audioFile) {
//       setError("Please select an audio file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("audio", audioFile);
//     formData.append("target_lang", "en"); // or dynamically select from UI

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:5000/transcribe/transcribe_translate", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       setLoading(false);

//       if (response.ok) {
//         const fullText = data.segments.map(seg => seg.text).join(" ");
//         setTranscript(fullText);
//       } else {
//         setError(data.error || "An error occurred during transcription.");
//       }
//     } catch (err) {
//       console.error("Upload failed:", err);
//       setError("Failed to connect to the server.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//       <h2>🎧 Upload Audio for Transcription</h2>

//       <input
//         type="file"
//         accept="audio/*"
//         onChange={handleFileChange}
//         style={{ marginBottom: "10px" }}
//       />

//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? "Transcribing..." : "Upload & Transcribe"}
//       </button>

//       {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

//       <textarea
//         value={transcript}
//         readOnly
//         rows={10}
//         placeholder="Transcribed text will appear here..."
//         style={{ width: "100%", marginTop: "15px", padding: "10px" }}
//       />
//     </div>
//   );
// };

// export default AudioTranscriber;





import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AudioTranscriber = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [displayedTranscript, setDisplayedTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [copied, setCopied] = useState(false);

  // Typewriter effect for transcript
  useEffect(() => {
    if (transcript) {
      let i = 0;
      const typing = setInterval(() => {
        if (i < transcript.length) {
          setDisplayedTranscript(transcript.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
        }
      }, 5); // Adjust speed here (lower = faster)

      return () => clearInterval(typing);
    }
  }, [transcript]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    setFileName(file ? file.name : "");
    setTranscript("");
    setDisplayedTranscript("");
    setError("");
  };

  const handleUpload = async () => {
    if (!audioFile) {
      setError("Please select a WAV audio file first.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    setLoading(true);
    setError("");
    setTranscript("");
    setDisplayedTranscript("");

    try {
      const response = await fetch("http://localhost:5000/transcribe/transcribe_fast", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        if (data.segments && Array.isArray(data.segments)) {
          const plainText = data.segments.map((seg) => seg.text).join(" ");
          setTranscript(plainText);
        } else if (data.transcription) {
          setTranscript(data.transcription);
        } else {
          setTranscript("No transcription returned.");
        }
      } else {
        setError(data.error || "An error occurred during transcription.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to connect to the server.");
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/80 to-blue-900/50 backdrop-blur-md  overflow-auto pt-28 p-4">
      <motion.div 
        className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-8 bg-gradient-to-r from-emerald-600/90 to-teal-700/90 text-white">
          <motion.h2 
            className="text-2xl font-bold flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
            </svg>
            Audio Transcription
          </motion.h2>
          <motion.p 
            className="text-blue-100 mt-1 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Upload your WAV audio file to get a text transcription
          </motion.p>
        </div>

        <div className="p-6">
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-white/80 mb-2">
              Select Audio File (WAV format)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="flex items-center justify-center px-6 py-10 border-2 border-dashed border-white/30 rounded-lg hover:border-blue-400/50 transition-colors">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mt-1 text-sm text-white/80">
                      {fileName || "Click to select audio file"}
                    </p>
                    <p className="text-xs text-white/50 mt-2">
                      WAV format only • English language
                    </p>
                  </div>
                  <input 
                    type="file" 
                    accept="audio/wav" 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                </div>
              </label>
            </div>
          </motion.div>

          {fileName && (
            <motion.div 
              className="mb-6 bg-white/10 rounded-lg p-3 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-sm font-medium text-white/90 truncate max-w-md">
                  {fileName}
                </span>
              </div>
              <button 
                onClick={() => {
                  setAudioFile(null);
                  setFileName("");
                }}
                className="text-red-400 hover:text-red-300 text-sm font-medium"
              >
                Remove
              </button>
            </motion.div>
          )}

          <motion.button
            onClick={handleUpload}
            disabled={loading || !audioFile}
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${
              loading || !audioFile 
                ? 'bg-gray-600/50 text-gray-300 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            } transition-colors`}
            whileHover={!loading && audioFile ? { scale: 1.02 } : {}}
            whileTap={!loading && audioFile ? { scale: 0.98 } : {}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Transcribing...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                Upload & Transcribe
              </>
            )}
          </motion.button>

          {error && (
            <motion.div 
              className="mt-4 p-3 bg-red-900/30 border border-red-700/50 text-red-100 rounded-lg flex items-start gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <svg className="h-5 w-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <div>
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {displayedTranscript && (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium text-white/90">Transcription Result</h3>
                <motion.button
                  onClick={copyToClipboard}
                  className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md flex items-center gap-1 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                      </svg>
                      Copy
                    </>
                  )}
                </motion.button>
              </div>
              <div className="bg-black/20 rounded-lg border border-white/20 p-4">
                <pre className="whitespace-pre-wrap font-sans text-white overflow-auto max-h-96">
                  {displayedTranscript}
                  {transcript.length > displayedTranscript.length && (
                    <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse"></span>
                  )}
                </pre>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AudioTranscriber;
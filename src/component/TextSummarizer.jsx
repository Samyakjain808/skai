// import React, { useState } from "react";

// const TextSummarizer = () => {
//   const [text, setText] = useState("");
//   const [summary, setSummary] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSummarize = async () => {
//     if (!text.trim()) return;
//     setLoading(true);
//     setSummary("");
//     setError("");

//     try {
//       const response = await fetch("http://localhost:5000/summ/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSummary(data.output);  // <-- Display this!
//       } else {
//         setError(data.error || "Failed to summarize text.");
//       }
//     } catch (e) {
//       setError("Network error, please try again.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
//       <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Text Summarization</h2>
//       <textarea
//         rows="6"
//         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Paste your article or paragraph here..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <button
//         onClick={handleSummarize}
//         disabled={loading || !text.trim()}
//         className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50"
//       >
//         {loading ? "Summarizing..." : "Summarize Text"}
//       </button>

//       {error && (
//         <p className="mt-4 text-red-600 font-semibold text-center">{error}</p>
//       )}

//       {summary && (
//         <div className="mt-6 p-4 rounded-md bg-gray-100 border border-gray-300 whitespace-pre-wrap">
//           {summary}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TextSummarizer;







import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TextSummarizer = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [displayedSummary, setDisplayedSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Typewriter effect for summary
  useEffect(() => {
    if (summary) {
      let i = 0;
      const typing = setInterval(() => {
        if (i < summary.length) {
          setDisplayedSummary(summary.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
        }
      }, 20);

      return () => clearInterval(typing);
    }
  }, [summary]);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setSummary("");
    setDisplayedSummary("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/summ/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.output);
      } else {
        setError(data.error || "Failed to summarize text.");
      }
    } catch (e) {
      setError("Network error, please try again.");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/80 to-blue-900/50 backdrop-blur-md  overflow-hidden pt-20 pb-4 px-4">
      <motion.div 
        className="h-full w-full flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl font-bold text-center text-white mb-4"
          animate={{ 
            textShadow: ["0 0 8px rgba(255,255,255,0.3)", "0 0 12px rgba(100,200,255,0.5)", "0 0 8px rgba(255,255,255,0.3)"]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ marginTop: '1rem' }}
        >
          ✨ AI Text Summarizer
        </motion.h1>

        <div className="flex-1 flex flex-col lg:flex-row gap-4 w-full" style={{ height: 'calc(100vh - 180px)' }}>
          {/* Input Card (Left) */}
          <motion.div 
            className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg flex flex-col"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ maxHeight: '95%' }}
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Your Text
            </h2>
            <textarea
              className="flex-1 w-full p-4 bg-black/20 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 resize-none"
              placeholder="Paste your article or text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <motion.button
              onClick={handleSummarize}
              disabled={loading || !text.trim()}
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                    </motion.span>
                    Processing...
                  </span>
                ) : (
                  "Generate Summary"
                )}
              </span>
              <motion.span
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </motion.button>
          </motion.div>

          {/* Output Card (Right) */}
          <motion.div 
            className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg flex flex-col"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ maxHeight: '95%' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                AI Summary
              </h2>
              {displayedSummary && (
                <motion.button
                  onClick={copyToClipboard}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center gap-1"
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
              )}
            </div>
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <AnimatePresence>
                {error ? (
                  <motion.div
                    className="p-4 rounded-lg bg-red-900/30 border border-red-400/50 text-red-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                      {error}
                    </div>
                  </motion.div>
                ) : displayedSummary ? (
                  <motion.div
                    className="flex-1 p-4 bg-black/20 rounded-lg border border-white/20 overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-white whitespace-pre-wrap">
                      {displayedSummary}
                      {summary.length > displayedSummary.length && (
                        <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse"></span>
                      )}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    className="flex-1 flex items-center justify-center bg-black/20 rounded-lg border border-white/20 border-dashed"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <p className="text-white/50 text-center px-4">
                      Your AI-generated summary will appear here after processing
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {displayedSummary && (
                <motion.div 
                  className="w-full bg-gray-700 rounded-full h-1.5 mt-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                >
                  <motion.div
                    className="h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(displayedSummary.length / summary.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TextSummarizer;
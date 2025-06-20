// import React, { useState } from "react";

// const NewsInput = () => {
//   const [text, setText] = useState("");
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://127.0.0.1:5000/bert/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text }),
//       });

//       const data = await response.json();
//       setPrediction(data);
//     } catch (error) {
//       console.error("Error:", error);
//       setPrediction({ error: "Failed to get response from server." });
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
//       <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Fake News Detection</h2>
//       <textarea
//         rows="6"
//         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Paste the news article here..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <button
//         onClick={handleSubmit}
//         disabled={loading || !text.trim()}
//         className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50"
//       >
//         {loading ? "Analyzing..." : "Check if Fake"}
//       </button>

//       {prediction && (
//         <div className="mt-6 p-4 rounded-md bg-gray-100 border border-gray-300">
//           {prediction.error ? (
//             <p className="text-red-600">{prediction.error}</p>
//           ) : (
//             <>
//               <p className="text-lg">
//                 <strong>Prediction:</strong>{" "}
//                 <span className={prediction.label === "FAKE" ? "text-red-500 font-bold" : "text-green-600 font-bold"}>
//                   {prediction.label}
//                 </span>
//               </p>
//               {prediction.probability && (
//                 <p>
//                   <strong>Confidence:</strong> {(prediction.probability * 100).toFixed(2)}%
//                 </p>
//               )}
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewsInput;



import React, { useState } from "react";
import CountUp from "./ui/CountUp";
import { motion, AnimatePresence } from "framer-motion";

const NewsInput = () => {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setPrediction(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/bert/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error("Error:", error);
      setPrediction({ error: "Failed to get response from server." });
    }
    setLoading(false);
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto mt-6 p-4 rounded-3xl shadow-2xl border border-white/20 bg-gradient-to-br from-gray-900/80 to-blue-900/50 backdrop-blur-md text-white space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div className="text-center" whileHover={{ scale: 1.02 }}>
        <motion.h2 
          className="text-2xl font-bold flex items-center justify-center gap-2"
          animate={{ textShadow: ["0 0 8px rgba(255,255,255,0.3)", "0 0 12px rgba(100,200,255,0.5)", "0 0 8px rgba(255,255,255,0.3)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>🔍</motion.span>
          Fake News Detector
        </motion.h2>
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent mt-2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      {/* Textarea */}
      <div className="space-y-2 relative">
        <motion.div className="relative" whileHover={{ scale: 1.005 }}>
          <textarea
            rows="4"
            className="w-full p-4 rounded-xl border border-white/20 bg-black/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Paste the news article here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <AnimatePresence>
            {isFocused && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Enhanced Button with New Color Scheme */}
      <motion.button
        onClick={handleSubmit}
        disabled={loading || !text.trim()}
        className="w-full relative overflow-hidden rounded-xl group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className={`py-3 px-6 rounded-xl ${
            loading 
              ? "bg-gradient-to-r from-cyan-500 to-blue-600" 
              : "bg-gradient-to-r from-emerald-500 to-teal-600"
          }`}
          animate={{
            backgroundPosition: loading ? ["0% 0%", "100% 100%"] : "0% 0%"
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </motion.span>
                Analyzing...
              </>
            ) : (
              <>
                <motion.span 
                  animate={{ x: [0, 2, 0] }} 
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🔍
                </motion.span>
                Verify News
              </>
            )}
          </span>
          <motion.div
            className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </motion.button>

      {/* Loading Animation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col items-center py-4">
              <motion.div
                className="w-16 h-16 relative"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 rounded-full border-4 border-blue-400 border-t-transparent" />
                <div className="absolute inset-0 rounded-full border-4 border-purple-400 border-b-transparent opacity-70" style={{ transform: "rotate(45deg)" }} />
              </motion.div>
              <motion.p
                className="mt-4 text-sm text-gray-300"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Scanning for inconsistencies...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {prediction && !loading && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`p-4 rounded-xl border backdrop-blur-sm ${
              prediction.error 
                ? "bg-red-900/20 border-red-400/30" 
                : prediction.label === "FAKE" 
                  ? "bg-red-900/20 border-red-400/30" 
                  : "bg-green-900/20 border-green-400/30"
            }`}
          >
            {prediction.error ? (
              <div className="text-center">
                <motion.div
                  animate={{ x: [-2, 2, -2] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <svg className="w-12 h-12 mx-auto text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </motion.div>
                <p className="mt-2 text-red-300">{prediction.error}</p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <motion.div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${
                    prediction.label === "FAKE" ? "bg-red-500/20" : "bg-green-500/20"
                  }`}
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: prediction.label === "FAKE" 
                      ? ["0 0 0 rgba(239, 68, 68, 0)", "0 0 20px rgba(239, 68, 68, 0.3)", "0 0 0 rgba(239, 68, 68, 0)"] 
                      : ["0 0 0 rgba(16, 185, 129, 0)", "0 0 20px rgba(16, 185, 129, 0.3)", "0 0 0 rgba(16, 185, 129, 0)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-3xl">
                    {prediction.label === "FAKE" ? "❌" : "✅"}
                  </span>
                </motion.div>

                <motion.h3 
                  className={`text-lg font-semibold ${
                    prediction.label === "FAKE" ? "text-red-400" : "text-green-400"
                  }`}
                  animate={{
                    textShadow: prediction.label === "FAKE" 
                      ? ["0 0 8px rgba(239, 68, 68, 0.3)", "0 0 12px rgba(239, 68, 68, 0.5)", "0 0 8px rgba(239, 68, 68, 0.3)"] 
                      : ["0 0 8px rgba(16, 185, 129, 0.3)", "0 0 12px rgba(16, 185, 129, 0.5)", "0 0 8px rgba(16, 185, 129, 0.3)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {prediction.label === "FAKE" ? "Fake News Detected" : "Real News"}
                </motion.h3>

                {prediction.probability && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>Confidence Level</span>
                      <span>
                        <CountUp from={0} to={Math.round(prediction.probability * 100)} duration={2} className="font-bold" />%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <motion.div
                        className={`h-1.5 rounded-full ${
                          prediction.label === "FAKE" 
                            ? "bg-gradient-to-r from-red-500 to-pink-500" 
                            : "bg-gradient-to-r from-green-400 to-teal-400"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${prediction.probability * 100}%` }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      />
                    </div>
                  </div>
                )}

                {prediction.label === "FAKE" && (
                  <motion.div
                    className="mt-4 p-3 rounded-lg bg-red-900/30 border border-red-500/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-sm text-red-200">
                      <span className="font-semibold">Warning:</span> This content shows signs of misinformation
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NewsInput;

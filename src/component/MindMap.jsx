// import React, { useState } from "react";

// const MindMap = () => {
//   const [text, setText] = useState("");
//   const [mindmapData, setMindmapData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleGenerate = async () => {
//     setLoading(true);
//     setError("");
//     setMindmapData(null);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/mindmap/generate_mindmap", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text }),
//       });

//       const data = await response.json();

//       if (!response.ok || data.error) {
//         throw new Error(data.error || "Failed to generate mind map.");
//       }

//       setMindmapData(data);
//     } catch (err) {
//       console.error("Mind Map Error:", err);
//       setError(err.message || "An error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
//       <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">🧠 Mind Map Generator</h2>

//       <textarea
//         rows="6"
//         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Enter your topic or content here..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />

//       <button
//         onClick={handleGenerate}
//         disabled={loading || !text.trim()}
//         className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50"
//       >
//         {loading ? "Generating..." : "Generate Mind Map"}
//       </button>

//       {error && (
//         <div className="mt-4 p-4 rounded-md bg-red-100 text-red-700 border border-red-300">
//           {error}
//         </div>
//       )}

//       {mindmapData && (
//         <div className="mt-6 p-4 rounded-md bg-gray-100 border border-gray-300">
//           <h3 className="text-lg font-semibold mb-2">Mind Map Output:</h3>
//           <pre className="whitespace-pre-wrap break-words text-sm">{JSON.stringify(mindmapData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MindMap;



// import React, { useState } from "react";

// const MindMap = () => {
//   const [text, setText] = useState("");
//   const [imageUrl, setImageUrl] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     if (!text.trim()) return;

//     setLoading(true);
//     setError("");
//     setImageUrl(null);

//     try {
//       const response = await fetch("http://localhost:5000/mindmap/generate_mindmap?format=svg&auto=true", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text }),
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         setError(err.error || "Failed to generate mind map");
//         return;
//       }

//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setImageUrl(url);
//     } catch (err) {
//       setError("Failed to connect to the server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
//       <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">🧠 Mind Map Generator</h2>
//       <textarea
//         rows="6"
//         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Enter your text or your topic to generate a mind map..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <button
//         onClick={handleGenerate}
//         disabled={loading || !text.trim()}
//         className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
//       >
//         {loading ? "Generating..." : "Generate Mind Map"}
//       </button>

//       {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

//       {imageUrl && (
//         <div className="mt-6 text-center">
//           <h3 className="font-semibold mb-2">🖼 Result:</h3>
//           <img
//             src={imageUrl}
//             alt="Mind Map"
//             className="mx-auto border rounded-md shadow-lg max-w-full"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default MindMap;




import React, { useState, useRef } from "react";
import { ReactSVGPanZoom } from "react-svg-pan-zoom";

const MindMap = () => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerValue, setViewerValue] = useState(null);
  const viewerRef = useRef(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setImageUrl(null);

    try {
      const response = await fetch("http://localhost:5000/mindmap/generate_mindmap?format=svg&auto=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.error || "Failed to generate mind map");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (err) {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-3">
      <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-600 p-4 text-white rounded-t-2xl">
          <h1 className="text-2xl font-bold">MindMapper</h1>
          <p className="text-sm opacity-80">Visualize your thoughts in the dark</p>
        </div>

        {/* Body */}
        <div className="p-4">
          <label htmlFor="mindmap-input" className="text-sm text-gray-300 block mb-2">
            Enter your topic or text
          </label>
          <textarea
            id="mindmap-input"
            rows="4"
            className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            placeholder="e.g. Artificial Intelligence in healthcare"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={handleGenerate}
            disabled={loading || !text.trim()}
            className={`w-full mt-4 py-2 px-4 rounded-xl font-semibold text-gray-100 transition-all ${
              loading || !text.trim()
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 shadow-md"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Mind Map"
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-2 bg-red-900 bg-opacity-30 border-l-4 border-red-500 rounded text-sm text-red-200">
              {error}
            </div>
          )}

          {/* Result Actions */}
          {imageUrl && (
            <div className="mt-6 space-y-2">
              <p className="text-green-400 text-sm">✅ Mind map generated successfully.</p>
              <div className="flex gap-4">
                <a
                  href={imageUrl}
                  download="mindmap.svg"
                  className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
                <button
                  onClick={() => setViewerVisible(true)}
                  className="text-sm text-purple-300 hover:text-purple-200"
                >
                  🔍 Preview Fullscreen
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-900 px-4 py-3 text-center text-xs text-gray-400 border-t border-gray-700 rounded-b-2xl">
          Tip: Be specific with your input for better results.
        </div>
      </div>

      {/* Fullscreen Viewer Modal */}
      {viewerVisible && imageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="absolute top-4 right-4 z-50">
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => setViewerVisible(false)}
            >
              ✖ Close
            </button>
          </div>
          <div className="w-full h-full flex items-center justify-center rounded-xl border border-gray-700 bg-black">
            <ReactSVGPanZoom
              width={window.innerWidth * 0.9}
              height={window.innerHeight * 0.9}
              tool="none"
              detectAutoPan={false}
              miniaturePosition="none"
              toolbarPosition="none"
              ref={viewerRef}
              value={viewerValue}
              onChangeValue={setViewerValue}
              background="#000"
            >
              <svg width="100%" height="100%">
                <image
                  xlinkHref={imageUrl}
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid meet"
                />
              </svg>
            </ReactSVGPanZoom>
          </div>
        </div>
      )}
    </div>
  );
};

export default MindMap;
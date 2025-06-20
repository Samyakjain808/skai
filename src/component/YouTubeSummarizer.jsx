import React, { useState } from "react";
import {
  FaBook, FaRegCopy
} from "react-icons/fa";
import {
  FiChevronDown, FiChevronUp
} from "react-icons/fi";

const YouTubeNoteGenerator = () => {
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTranscript, setShowTranscript] = useState(false);
  const [copied, setCopied] = useState(false);
  const [videoId, setVideoId] = useState("");

  const extractVideoId = (url) => {
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  const handleGenerateNotes = async () => {
    if (!url.trim()) {
      setError("Please enter a YouTube video URL.");
      return;
    }

    const id = extractVideoId(url);
    if (!id) {
      setError("Invalid YouTube URL");
      return;
    }

    setLoading(true);
    setNotes("");
    setTranscript([]);
    setError("");
    setVideoId(id);

    try {
      const response = await fetch("http://localhost:5000/youtubetrans/generate-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setNotes(data.notes);
        setTranscript(formatTranscript(data.transcript));
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setLoading(false);
      setError("Server is not reachable.");
    }
  };

  const formatTranscript = (raw) => {
    const grouped = {};

    raw
      .split("\n")
      .filter(Boolean)
      .forEach((line) => {
        const match = line.match(/^\[(\d{2}):(\d{2})\]\s(.+)$/);
        if (!match) return;

        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const text = match[3];

        const totalSeconds = minutes * 60 + seconds;
        const blockStart = Math.floor(totalSeconds / 30) * 30;

        if (!grouped[blockStart]) grouped[blockStart] = [];
        grouped[blockStart].push(text);
      });

    return Object.keys(grouped)
      .sort((a, b) => Number(a) - Number(b))
      .map((startSec) => {
        const mins = Math.floor(startSec / 60);
        const secs = startSec % 60;
        const timestamp = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        return {
          time: timestamp,
          text: grouped[startSec].join(" "),
        };
      });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-gradient-to-br from-gray-900/80 to-blue-900/50 backdrop-blur-md text-gray-100 font-['Inter'] pt-20">
      <div className="min-h-screen w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">YouTube Notes Generator</h1>

        {/* URL input and generate button */}
        <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg w-full mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Paste YouTube video URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 p-3 text-sm rounded-lg bg-[#2a2a2a] border border-[#444] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleGenerateNotes}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Notes"}
            </button>
          </div>
          {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
        </div>

        {videoId && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Video Section */}
            <div className="w-full">
              <div className="relative pt-[56.25%] bg-black rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video player"
                />
              </div>

              <div className="mt-6 bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg">
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="w-full flex items-center justify-between p-4 hover:bg-[#252525] transition"
                >
                  <div className="flex items-center">
                    <FaBook className="mr-3 text-blue-400" />
                    <span className="font-medium">Video Transcript</span>
                  </div>
                  {showTranscript ? <FiChevronUp /> : <FiChevronDown />}
                </button>

                {showTranscript && (
                  <div className="border-t border-[#2d2d2d] p-4 max-h-[50vh] overflow-y-auto">
                    {loading ? (
                      <div className="text-gray-400 text-sm">Loading transcript...</div>
                    ) : transcript.length > 0 ? (
                      transcript.map((item, index) => (
                        <div key={index} className="mb-3 last:mb-0">
                          <div className="flex">
                            <span className="text-blue-400 text-sm w-12 flex-shrink-0">{item.time}</span>
                            <p className="text-gray-300 text-sm">{item.text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-sm">Transcript not available.</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Notes Section */}
            <div className="w-full flex flex-col">
              <div className="bg-[#1e1e1e] rounded-xl shadow-lg flex flex-col h-full">
                <div className="border-b border-[#2d2d2d] p-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <span className="bg-blue-500 w-2 h-5 rounded-full mr-3"></span>
                    Generated Notes
                  </h2>
                </div>

                <div className="p-4 flex-1 overflow-y-auto max-h-[70vh]">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-pulse text-gray-400">Generating notes...</div>
                    </div>
                  ) : notes ? (
                    <pre className="whitespace-pre-wrap font-sans text-gray-300 text-sm leading-relaxed">
                      {notes}
                    </pre>
                  ) : (
                    <div className="text-gray-400 text-center py-8">
                      Notes will appear here after generation
                    </div>
                  )}
                </div>

                {notes && (
                  <div className="border-t border-[#2d2d2d] p-4 flex justify-end">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center px-4 py-2 bg-[#2d2d2d] hover:bg-[#3d3d3d] rounded-lg text-sm transition"
                    >
                      <FaRegCopy className="mr-2" />
                      {copied ? "Copied!" : "Copy Notes"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeNoteGenerator;

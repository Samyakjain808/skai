import React, { useState, useCallback } from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import axios from "axios";
import InstagramPost from "./InstagramPost";
import FacebookPost from "./FacebookPost";
import TwitterPost from "./TwitterPost";
import LinkedInPost from "./LinkedInPost";

const ImageCaptioner = () => {
    const [image, setImage] = useState(null);
    const [platform, setPlatform] = useState("instagram");
    const [style, setStyle] = useState("witty");
    const [captions, setCaptions] = useState([]);
    const [rawCaptions, setRawCaptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [regenerating, setRegenerating] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [copied, setCopied] = useState(false);

    const platforms = [
    {
      value: "instagram",
      label: "Instagram",
      icon: <FaInstagram className="w-4 h-4" />,
      color: "bg-gradient-to-br from-pink-500 to-purple-600"
    },
    {
      value: "facebook",
      label: "Facebook",
      icon: <FaFacebookF className="w-4 h-4" />,
      color: "bg-gradient-to-br from-blue-600 to-blue-800"
    },
    {
      value: "twitter",
      label: "Twitter",
      icon: <FaTwitter className="w-4 h-4" />,
      color: "bg-gradient-to-br from-sky-400 to-sky-600"
    },
    {
      value: "linkedin",
      label: "LinkedIn",
      icon: <FaLinkedinIn className="w-4 h-4" />,
      color: "bg-gradient-to-br from-blue-700 to-blue-900"
    }
  ];


  const styles = [
    { value: "witty", label: "Witty", emoji: "😏", color: "bg-cyan-400" },
    { value: "emotional", label: "Emotional", emoji: "🥲", color: "bg-cyan-600" },
    { value: "informative", label: "Informative", emoji: "ℹ️", color: "bg-cyan-400" },
    { value: "trending", label: "Trending", emoji: "🔥", color: "bg-cyan-600" },
    { value: "professional", label: "Professional", emoji: "👔", color: "bg-cyan-400" },
    { value: "casual", label: "Casual", emoji: "😊", color: "bg-cyan-600" },
    { value: "funny", label: "Funny", emoji: "😂", color: "bg-cyan-400" },
    { value: "motivational", label: "Motivational", emoji: "💪", color: "bg-cyan-600" },
    { value: "romantic", label: "Romantic", emoji: "💖", color: "bg-cyan-400" }
  ];

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0 && files[0].type.match('image.*')) {
      setImage(files[0]);
      setCaptions([]);
      setRawCaptions([]);
      setShowModal(false);
    }
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file && file.type.match('image.*')) {
      setImage(file);
      setCaptions([]);
      setRawCaptions([]);
      setShowModal(false);
    }
  }, []);

  const generateCaption = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("platform", platform);
    formData.append("style", style);

    try {
      const res = await axios.post("http://localhost:5000/caption/generate_caption", formData);
      setCaptions(Array.isArray(res.data.styled_captions) ? res.data.styled_captions : [res.data.styled_caption]);
      setRawCaptions(Array.isArray(res.data.raw_captions) ? res.data.raw_captions : [res.data.raw_caption]);
    } catch (error) {
      console.error("Error generating caption:", error);
      setCaptions(["Failed to generate caption. Try again later."]);
      setRawCaptions([""]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image before generating a caption.");
      return;
    }
    setLoading(true);
    await generateCaption();
    setLoading(false);
    setShowModal(true);
  };


  const handleRegenerate = async () => {
    setRegenerating(true);
    await generateCaption();
    setRegenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(captions[0] || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const previewURL = image ? URL.createObjectURL(image) : null;

  const PostComponent = () => {
    const props = {
      image: previewURL,
      caption: captions[0] || "",
      raw: rawCaptions[0] || ""
    };

    switch (platform) {
      case "instagram":
        return <InstagramPost {...props} />;
      case "facebook":
        return <FacebookPost {...props} />;
      case "twitter":
        return <TwitterPost {...props} />;
      case "linkedin":
        return <LinkedInPost {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-gradient-to-br from-gray-900/80 to-blue-900/50 backdrop-blur-md text-gray-100 font-['Inter'] pt-28">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Smart Caption Generator
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Upload your image and get perfectly styled captions for any social media platform.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Upload your image
                </label>
                <label
                  htmlFor="file-upload"
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700'} border-dashed rounded-xl transition-colors cursor-pointer`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-300 justify-center">
                      <span className="relative rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none">
                        Upload a file
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                    // required
                  />
                </label>
                {previewURL && !showModal && (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={previewURL}
                      alt="Preview"
                      className="h-32 rounded-lg object-cover shadow-sm border-2 border-gray-700"
                    />
                  </div>
                )}
              </div>

              {/* Platform and Style Selection */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Social Platform
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {platforms.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setPlatform(p.value)}
                        className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all ${p.color} ${
                          platform === p.value
                            ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900 text-white"
                            : "text-white/80 hover:text-white hover:opacity-90"
                        }`}
                      >
                        <span className="mr-2 text-lg">{p.icon}</span>
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Caption Style
                  </label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-gray-800 text-white"
                  >
                    {styles.map((s) => (
                      <option 
                        key={s.value} 
                        value={s.value} 
                        className={`${s.color} text-white`}
                      >
                        {s.emoji} {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !image}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                    loading || !image
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    "Generate Caption"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Full Screen Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto pt-20">
            <div className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl border border-gray-700 p-6">
                <div className="mb-6">
                  <PostComponent />
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={handleRegenerate}
                    disabled={regenerating}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-lg transition-all disabled:opacity-50"
                  >
                    {regenerating ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Regenerating...
                      </>
                    ) : (
                      "Generate Another"
                    )}
                  </button>
                  
                  <button
                    onClick={handleCopy}
                    className={`flex-1 px-4 py-2 ${copied ? 'bg-green-500' : 'bg-gray-700 hover:bg-gray-600'} text-white rounded-lg transition-colors flex items-center justify-center`}
                  >
                    {copied ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        Copy Caption
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>
            Powered by AI magic ✨ | Captions are generated automatically and may
            require human review
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCaptioner;
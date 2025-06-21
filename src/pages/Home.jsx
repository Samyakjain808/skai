// // // src/pages/Home.jsx
// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // const Home = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <div className="text-center space-y-4">
// //       <h1 className="text-4xl font-bold">AI Toolbox Dashboard</h1>
// //       <p className="text-lg">Select a tool to get started:</p>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-6">
// //         <button
// //           onClick={() => navigate("/fakenews")}
// //           className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
// //         >
// //           📰 Fake News Detection
// //         </button>
// //         <button
// //           onClick={() => navigate("/summarize")}
// //           className="bg-green-500 text-white p-4 rounded hover:bg-green-600"
// //         >
// //           📄 Text Summarizer
// //         </button>
// //         <button
// //           onClick={() => navigate("/transcribe")}
// //           className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600"
// //         >
// //           🎙️ Audio Transcription
// //         </button>
// //         <button
// //           onClick={() => navigate("/mindmap")}
// //           className="bg-pink-500 text-white p-4 rounded hover:bg-pink-600"
// //         >
// //           🧠 Mind Map Generator
// //         </button>

// //         <button
// //           onClick={() => navigate("/youtubetrans")}
// //           className="bg-yellow-500 text-white p-4 rounded hover:bg-yellow-600"
// //         >
// //           📺 YouTube Video Notes Generator
// //         </button>

// //         <button
// //           onClick={() => navigate("/captiongenerator")}
// //           className="bg-indigo-500 text-white p-4 rounded hover:bg-indigo-600"
// //         >
// //           🖼️ Image Caption Generator
// //         </button>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;




// // src/pages/Home.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../stars.css"; // Make sure this file exists and is in the correct path

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* Background Star Layers */}
//       <div id="stars"></div>
//       <div id="stars2"></div>
//       <div id="stars3"></div>

//       {/* Content Overlay */}
//       <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white px-4 text-center">
//         <h1 className="text-4xl font-bold mb-4">AI Toolbox Dashboard</h1>
//         <p className="text-lg mb-6">Select a tool to get started:</p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
//           <button
//             onClick={() => navigate("/fakenews")}
//             className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
//           >
//             📰 Fake News Detection
//           </button>
//           <button
//             onClick={() => navigate("/summarize")}
//             className="bg-green-500 text-white p-4 rounded hover:bg-green-600"
//           >
//             📄 Text Summarizer
//           </button>
//           <button
//             onClick={() => navigate("/transcribe")}
//             className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600"
//           >
//             🎙️ Audio Transcription
//           </button>
//           <button
//             onClick={() => navigate("/mindmap")}
//             className="bg-pink-500 text-white p-4 rounded hover:bg-pink-600"
//           >
//             🧠 Mind Map Generator
//           </button>
//           <button
//             onClick={() => navigate("/youtubetrans")}
//             className="bg-yellow-500 text-white p-4 rounded hover:bg-yellow-600"
//           >
//             📺 YouTube Video Notes Generator
//           </button>
//           <button
//             onClick={() => navigate("/captiongenerator")}
//             className="bg-indigo-500 text-white p-4 rounded hover:bg-indigo-600"
//           >
//             🖼️ Image Caption Generator
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;




// import React, { useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../stars.css";
// import { BackgroundGradient } from "../component/ui/BackgroundGradient";
// import { LampDemo } from "../component/ui/Lamp";


// const Home = () => {
//   const navigate = useNavigate();
//   const containerRef = useRef(null);
//   const isDragging = useRef(false);
//   const startY = useRef(0);
//   const scrollTop = useRef(0);

//   // Tool data array
//   const tools = [
//     {
//       title: "Fake News Detection",
//       icon: "📰",
//       route: "/fakenews",
//       color: "bg-blue-600",
//       description: "Analyze text to detect potential misinformation."
//     },
//     {
//       title: "Text Summarizer",
//       icon: "📄",
//       route: "/summarize",
//       color: "bg-green-600",
//       description: "Summarize long content into brief insights."
//     },
//     {
//       title: "Audio Transcription",
//       icon: "🎙",
//       route: "/transcribe",
//       color: "bg-purple-600",
//       description: "Convert speech into text using AI transcription."
//     },
//     {
//       title: "Mind Map Generator",
//       icon: "🧠",
//       route: "/mindmap",
//       color: "bg-pink-600",
//       description: "Create visual mind maps from structured data."
//     },
//     {
//       title: "YouTube Notes Generator",
//       icon: "📺",
//       route: "/youtubetrans",
//       color: "bg-yellow-500",
//       description: "Extract key points and notes from YouTube videos."
//     },
//     {
//       title: "Image Caption Generator",
//       icon: "🖼",
//       route: "/captiongenerator",
//       color: "bg-indigo-600",
//       description: "Generate captions and alt text from images."
//     },
//   ];

//   useEffect(() => {
//     const container = containerRef.current;

//     const handleStart = (clientY) => {
//       isDragging.current = true;
//       startY.current = clientY;
//       scrollTop.current = container.scrollTop;
//       container.style.cursor = 'grabbing';
//       container.style.userSelect = 'none';
//     };

//     const handleMove = (clientY) => {
//       if (!isDragging.current) return;
//       const y = clientY;
//       const walk = (y - startY.current) * 1.5;
//       container.scrollTop = scrollTop.current - walk;
//     };

//     const handleEnd = () => {
//       isDragging.current = false;
//       container.style.cursor = 'grab';
//       container.style.userSelect = '';
//     };

//     const onMouseDown = (e) => {
//       handleStart(e.clientY);
//     };

//     const onMouseMove = (e) => {
//       handleMove(e.clientY);
//     };

//     const onMouseUp = () => {
//       handleEnd();
//     };

//     const onTouchStart = (e) => {
//       handleStart(e.touches[0].clientY);
//     };

//     const onTouchMove = (e) => {
//       e.preventDefault();
//       handleMove(e.touches[0].clientY);
//     };

//     const onTouchEnd = () => {
//       handleEnd();
//     };

//     container.addEventListener('mousedown', onMouseDown);
//     container.addEventListener('mousemove', onMouseMove);
//     container.addEventListener('mouseup', onMouseUp);
//     container.addEventListener('mouseleave', handleEnd);
//     container.addEventListener('touchstart', onTouchStart, { passive: false });
//     container.addEventListener('touchmove', onTouchMove, { passive: false });
//     container.addEventListener('touchend', onTouchEnd);

//     return () => {
//       container.removeEventListener('mousedown', onMouseDown);
//       container.removeEventListener('mousemove', onMouseMove);
//       container.removeEventListener('mouseup', onMouseUp);
//       container.removeEventListener('mouseleave', handleEnd);
//       container.removeEventListener('touchstart', onTouchStart);
//       container.removeEventListener('touchmove', onTouchMove);
//       container.removeEventListener('touchend', onTouchEnd);
//     };
//   }, []);

//   return (
//     <>
//       {/* Starry Background */}
//       <div id="stars"></div>
//       <div id="stars2"></div>
//       <div id="stars3"></div>

//      {/* Scrollable Content */}
//       <div 
//         ref={containerRef}
//         className="fixed top-0 left-0 w-full h-full overflow-y-auto cursor-grab bg-[#040712] text-white" // ← Dark background here
//         style={{
//           scrollbarWidth: 'none',
//           msOverflowStyle: 'none',
//           backgroundColor: '#040712' // Ensure fallback background color
//         }}
//       >
//         {/* ✅ Lamp Hero Section */}
//         <div className="min-h-screen w-full relative z-10">
//           <LampDemo />
//         </div>
//         <div className="relative z-10 min-h-screen px-4 py-20 flex flex-col items-center text-white">
//           <div className="w-full max-w-6xl">
//             <h1 className="text-4xl font-bold mb-2 text-center">AI Toolbox Dashboard</h1>
//             <p className="text-lg mb-10 text-center">Select a tool to get started:</p>

//             {/* Card Grid - Perfectly balanced sizing */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4">
//               {tools.map((tool, index) => (
//                 <div key={index} className="w-full">
//                   <BackgroundGradient className="rounded-3xl w-full h-full p-0.2"> {/* 1.5px glow border */}
//                     <div className="rounded-[20px] w-[calc(100%-1px)] h-[calc(100%-1px)] p-8 bg-white dark:bg-zinc-900 flex flex-col justify-between mx-auto my-auto">
//                       <div>
//                         <div className="text-5xl mb-4">{tool.icon}</div>
//                         <h3 className="text-3xl font-bold mb-4 text-black dark:text-white">{tool.title}</h3>
//                         <p className="text-lg text-gray-800 dark:text-white/90">{tool.description}</p>
//                       </div>
//                       <button
//                         onClick={() => navigate(tool.route)}
//                         className="mt-8 py-3 px-6 bg-black bg-opacity-20 hover:bg-opacity-40 text-white rounded-lg transition text-lg"
//                       >
//                         Open Tool
//                       </button>
//                     </div>
//                   </BackgroundGradient>
//                 </div>
//               ))}
//             </div>

//             <div className="h-screen flex items-center justify-center">
//               <p className="text-xl">Scroll up to return to tools</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;






import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../stars.css";
import { BackgroundGradient } from "../components/ui/BackgroundGradient";
import { LampDemo } from "../components/ui/Lamp";
import fakeNewsImg from '../assets/fakenews.png';
import summmarizerImg from '../assets/summarizer.png';
import mindmapImg from '../assets/mindmap.jpg';
import audioImg from '../assets/audio.jpg'; // Assuming you have an audio image
import youtubeImg from '../assets/youtube.jpg'; // Assuming you have a YouTube image
import imagecaptionImg from '../assets/image.jpg'; // Assuming you have an image caption image
const AnimatedCard = ({ children, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: index * 0.1
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};
const Home = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  // Updated Tool data array (with image paths)
  const tools = [
    {
      title: "Fake News Detection",
      route: "/fakenews",
      description: "Detect false or misleading content using AI-powered NLP analysis. The tool checks for semantic patterns and inconsistencies to verify the credibility of news, posts, or user-submitted content.",
      image: fakeNewsImg,
    },
    {
      title: "Text Summarizer",
      route: "/summarize",
      description: "Quickly generate concise summaries from lengthy text using advanced transformer models like T5 or BART. Ideal for getting key insights from articles, reports, or essays in just a few seconds.",
      image: summmarizerImg,
    },
    {
      title: "Audio Transcription",
      route: "/transcribe",
      description: "Convert audio to accurate text with Whisper, supporting multiple languages, accents, and real-time translation. Great for transcribing meetings, interviews, podcasts, or voice memos efficiently.",
      image: audioImg,
    },
    {
      title: "Mind Map Generator",
      route: "/mindmap",
      description: "Turn raw or structured text into interactive mind maps. It extracts and visualizes key concepts, relationships, and subtopics to help with brainstorming, planning, or studying.",
      image: mindmapImg,
    },
    {
      title: "YouTube Notes Generator",
      route: "/youtubetrans",
      description: "Get clean and structured notes from any YouTube video. It transcribes, summarizes, and extracts key highlights to save time and improve content understanding.",
      image: youtubeImg,
    },
    {
      title: "Image Caption Generator",
      route: "/captiongenerator",
      description: "Automatically generate meaningful, context-aware captions for uploaded images. Ideal for alt text, social media posts, metadata creation, or improving content accessibility.",
      image: imagecaptionImg,
    },
  ];

  useEffect(() => {
    const container = containerRef.current;

    const handleStart = (clientY) => {
      isDragging.current = true;
      startY.current = clientY;
      scrollTop.current = container.scrollTop;
      container.style.cursor = 'grabbing';
      container.style.userSelect = 'none';
    };

    const handleMove = (clientY) => {
      if (!isDragging.current) return;
      const walk = (clientY - startY.current) * 1.5;
      container.scrollTop = scrollTop.current - walk;
    };

    const handleEnd = () => {
      isDragging.current = false;
      container.style.cursor = 'grab';
      container.style.userSelect = '';
    };

    const onMouseDown = (e) => handleStart(e.clientY);
    const onMouseMove = (e) => handleMove(e.clientY);
    const onMouseUp = () => handleEnd();
    const onTouchStart = (e) => handleStart(e.touches[0].clientY);
    const onTouchMove = (e) => {
      e.preventDefault();
      handleMove(e.touches[0].clientY);
    };
    const onTouchEnd = () => handleEnd();

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mouseleave', handleEnd);
    container.addEventListener('touchstart', onTouchStart, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mouseleave', handleEnd);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <>
      {/* Starry Background */}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      {/* Scrollable Content */}
      <div 
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-full overflow-y-auto cursor-grab bg-[#040712] text-white"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Lamp Hero Section */}
        <div className="min-h-screen w-full relative z-10">
          <LampDemo />
        </div>

        {/* Neural Network Gateway Transition */}
        <motion.div 
          className="relative h-[50vh] w-full overflow-hidden flex flex-col items-center justify-center"
          style={{
            marginTop: '-12vh', // Only this value changed to shift up
            marginBottom: '0' // Removed negative margin
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Floating Neurons */}
          {[...Array(15)].map((_, i) => {
            const size = 4 + Math.random() * 8;
            const delay = Math.random() * 2;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${10 + Math.random() * 80}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -50, 0, 50, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut"
                }}
              />
            );
          })}

          {/* Pulsing Core */}
          <motion.div 
            className="relative w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 10px 2px rgba(100, 200, 255, 0.2)',
                '0 0 30px 10px rgba(100, 150, 255, 0.4)',
                '0 0 10px 2px rgba(100, 200, 255, 0.2)'
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Inner Core */}
            <motion.div 
              className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-inner"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Neural Connections */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            preserveAspectRatio="none"
          >
            {[...Array(25)].map((_, i) => {
              const startX = 10 + Math.random() * 80;
              const startY = 10 + Math.random() * 80;
              const endX = 10 + Math.random() * 80;
              const endY = 10 + Math.random() * 80;
              const delay = Math.random() * 2;
              
              return (
                <motion.path
                  key={i}
                  d={`M${startX},${startY} Q${(startX+endX)/2},${(startY+endY)/2 + 20} ${endX},${endY}`}
                  stroke="url(#neuralGradient)"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{
                    duration: 3,
                    delay,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              );
            })}
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Interface Text */}
          <motion.div 
            className="absolute bottom-20 text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-2">
              All In One Toolkit
            </h2>
            <p className="text-sm text-blue-300/80">
              Sroll down to explore the world of AI tools
            </p>
          </motion.div>
        </motion.div>


        {/* Tools Section */}
        <div className="relative z-10 min-h-screen px-4 py-20 flex flex-col items-center text-white">
          <div className="w-full max-w-5xl">
            {/* <h1 className="text-4xl font-bold mb-2 text-center">AI Toolbox Dashboard</h1>
            <p className="text-lg mb-10 text-center">Select a tool to get started:</p> */}

            <div className="flex flex-col gap-6">
              {tools.map((tool, index) => (
                <AnimatedCard key={index} index={index}>
                  <BackgroundGradient className="rounded-2xl p-[2px]">
                    <div className="rounded-[18px] bg-white dark:bg-zinc-900 p-0 flex flex-col md:flex-row overflow-hidden h-full">
                      <div className="md:w-[250px] md:h-[250px] h-[200px] w-full flex-shrink-0">
                        <img
                          src={tool.image}
                          alt={`${tool.title} Thumbnail`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex flex-col justify-center w-full md:w-[calc(100%-250px)]">
                        <h3 className="text-3xl font-bold mb-3 text-black dark:text-white">
                          {tool.title}
                        </h3>
                        <div className="h-[80px] overflow-hidden">
                          <p className="text-lg text-gray-800 dark:text-white/90 line-clamp-3">
                            {tool.description}
                          </p>
                        </div>
                        <button
                          onClick={() => navigate(tool.route)}
                          className="mt-4 py-2 px-6 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-lg transition text-lg w-fit"
                        >
                          Open Tool
                        </button>
                      </div>
                    </div>
                  </BackgroundGradient>
                </AnimatedCard>
              ))}
            </div>

            {/* <div className="h-screen flex items-center justify-center mt-20">
              <p className="text-xl">Scroll up to return to tools</p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
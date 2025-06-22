import React from "react";
import { useEffect } from "react";
const developers = [
  {
    name: "Samyak Jain",
    role: "Frontend & AI Integration",
    image: "https://i.postimg.cc/QxMq321V/sj.jpg", // Replace with real image or link
    github: "https://github.com/Samyakjain808",
    linkedin: "https://www.linkedin.com/in/samyak-jain-5bb888252/",
  },
  {
    name: "Keshav Yadav",
    role: "Backend & API Development",
    image: "https://i.postimg.cc/bYFMXwbZ/Whats-App-Image-2025-06-20-at-22-46-43-66b9e0e1.jpg",
    github: "https://github.com/keshavyadav0103",
    linkedin: "https://www.linkedin.com/in/keshav-yadav-562797254/",
  },
];

const About = () => {
  useEffect(() => {
    const faLink = document.createElement("link");
    faLink.rel = "stylesheet";
    faLink.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
    faLink.crossOrigin = "anonymous";
    document.head.appendChild(faLink);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(faLink);
    };
  }, []);
  return (
    <div className="fixed inset-0 overflow-y-auto bg-gradient-to-br from-gray-900/80 to-blue-900/50 backdrop-blur-md text-gray-100 font-['Inter'] pt-28">
      <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
      <p className="text-lg max-w-3xl mx-auto mb-10 text-center text-gray-300">
        Welcome to the <span className="font-semibold text-blue-400">AI Toolbox</span> — your smart companion for modern AI-powered tools.
        Our mission is to empower users with simple yet powerful utilities such as fake news detection,
        content summarization, speech-to-text transcription, AI-generated mind maps, and more.
      </p>

      <h2 className="text-2xl font-bold text-center mb-6">Meet the Developers</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {developers.map((dev, index) => (
          <div key={index} className="bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <img
              src={dev.image}
              alt={dev.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 mb-4"
            />
            <h3 className="text-xl font-semibold text-white">{dev.name}</h3>
            <p className="text-blue-400 mb-3">{dev.role}</p>
            <div className="flex space-x-4">
              <a
                href={dev.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a
                href={dev.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

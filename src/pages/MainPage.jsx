// // // // // src/pages/MainPage.jsx
// // // // import React from "react";
// // // // import { Routes, Route } from "react-router-dom";
// // // // import Navbar from "../component/Navbar";
// // // // import FakeNewsPage from "../component/NewsInput";
// // // // import SummarizationPage from "./SummarizationPage";
// // // // import AudioTranscriptionPage from "./AudioTranscriptionPage";
// // // // import MindMapPage from "../component/MindMap";
// // // // import { useAuth } from "../context/AuthContext";
// // // // import { Navigate } from "react-router-dom";

// // // // const MainPage = () => {
// // // //   const { user } = useAuth();

// // // //   // If not logged in, redirect to login screen
// // // //   if (!user) return <Navigate to="/login" replace />;

// // // //   return (
// // // //     <div className="min-h-screen bg-background text-foreground">
// // // //       <Navbar />
// // // //       <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
// // // //         <Routes>
// // // //           <Route path="/" element={<FakeNewsPage />} />
// // // //           <Route path="/summarize" element={<SummarizationPage />} />
// // // //           <Route path="/transcribe" element={<AudioTranscriptionPage />} />
// // // //           <Route path="/mindmap" element={<MindMapPage />} />
// // // //         </Routes>
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default MainPage;



// // // // src/pages/MainPage.jsx
// // // import React from "react";
// // // import { Routes, Route, Navigate } from "react-router-dom";
// // // import Navbar from "../component/Navbar";
// // // import FakeNewsPage from "../component/NewsInput";
// // // import SummarizationPage from "./SummarizationPage";
// // // import AudioTranscriptionPage from "./AudioTranscriptionPage";
// // // import MindMapPage from "../component/MindMap";
// // // import { useAuth } from "../context/AuthContext";
// // // import { useEffect, useState } from "react";

// // // const MainPage = () => {
// // //   const { user } = useAuth();
// // //   const [checking, setChecking] = useState(true);

// // //   useEffect(() => {
// // //     setTimeout(() => setChecking(false), 500); // give time for session to load
// // //   }, []);

// // //   if (checking) return <div>Loading...</div>;
// // //   if (!user) return <Navigate to="/login" replace />;

// // //   return (
// // //     <div className="min-h-screen bg-background text-foreground">
// // //       <Navbar />
// // //       <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
// // //         <Routes>
// // //           <Route path="/" element={<Navigate to="/fakenews" replace />} />
// // //           <Route path="/fakenews" element={<FakeNewsPage />} />
// // //           <Route path="/summarize" element={<SummarizationPage />} />
// // //           <Route path="/transcribe" element={<AudioTranscriptionPage />} />
// // //           <Route path="/mindmap" element={<MindMapPage />} />
// // //         </Routes>
// // //       </main>
// // //     </div>
// // //   );
// // // };

// // // export default MainPage;




// // // src/pages/MainPage.jsx
// // import React, { useState, useEffect } from "react";
// // import { Routes, Route, Navigate } from "react-router-dom";
// // import Navbar from "../component/Navbar";
// // import Home from "./Home";
// // import About from "./About";
// // import Feedback from "./Feedback";
// // // import Profile from "./Profile";
// // import FakeNewsPage from "../component/NewsInput";
// // import SummarizationPage from "./SummarizationPage";
// // import AudioTranscriptionPage from "./AudioTranscriptionPage";
// // import MindMapPage from "../component/MindMap";
// // import { useAuth } from "../context/AuthContext";

// // const MainPage = () => {
// //   const { user } = useAuth();
// //   const [checking, setChecking] = useState(true);

// //   useEffect(() => {
// //     const timer = setTimeout(() => setChecking(false), 500); // Allow session to load
// //     return () => clearTimeout(timer);
// //   }, []);

// //   if (checking) return <div>Loading...</div>;
// //   if (!user) return <Navigate to="/login" replace />;

// //   return (
// //     <div className="min-h-screen bg-background text-foreground">
// //       <Navbar />
// //       <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/about" element={<About />} />
// //           <Route path="/feedback" element={<Feedback />} />
// //           <Route path="/fakenews" element={<FakeNewsPage />} />
// //           <Route path="/summarize" element={<SummarizationPage />} />
// //           <Route path="/transcribe" element={<AudioTranscriptionPage />} />
// //           <Route path="/mindmap" element={<MindMapPage />} />
// //         </Routes>
// //       </main>
// //     </div>
// //   );
// // };

// // export default MainPage;





// import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Navbar from "../component/Navbar";
// import Home from "./Home";
// import About from "./about";
// import Feedback from "./feedback";
// import FakeNewsPage from "../component/NewsInput";
// import SummarizationPage from "./SummarizationPage";
// import AudioTranscriptionPage from "./AudioTranscriptionPage";
// import MindMapPage from "../component/MindMap";
// import AINewsPage from "./AINewsPage";
// import Youtubenotes from "./youtubenotes";
// import Captionpage from "./Captionpage";

// const MainPage = () => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setLoading(false);
//     }, 500); // wait for auth to sync

//     return () => clearTimeout(timeout);
//   }, []);

//   if (loading) return <div>Loading session...</div>;

//   // ⛔ prevent redirect loop — only redirect if user is not logged in AND you're not already on login page
//   if (!user && location.pathname !== "/login") {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <Navbar />
//       <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
//         <Routes>
//           <Route path="/home" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path ="/ainews" element={<AINewsPage />} />
//           <Route path="/feedback" element={<Feedback />} />
//           <Route path="/fakenews" element={<FakeNewsPage />} />
//           <Route path="/summarize" element={<SummarizationPage />} />
//           <Route path="/transcribe" element={<AudioTranscriptionPage />} />
//           <Route path="/youtubetrans" element ={<Youtubenotes />} />
//           <Route path="/mindmap" element={<MindMapPage />} />
//           <Route path="/captiongenerator" element={<Captionpage />} />
//         </Routes>
//       </main>
//     </div>
//   );
// };

// export default MainPage;




import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Layout from "../layout/Layout"; // ⬅️ import layout
import Home from "./Home";
import About from "./About";
import Feedback from "./Feedback";
import FakeNewsPage from "../components/NewsInput";
import SummarizationPage from "./SummarizationPage";
import AudioTranscriptionPage from "./AudioTranscriptionPage";
import MindMapPage from "../components/MindMap";
import AINewsPage from "./AINewsPage";
import Youtubenotes from "./Youtubenotes";
import Captionpage from "./Captionpage";

const MainPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <div>Loading session...</div>;

  if (!user && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground  ">
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ainews" element={<AINewsPage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/fakenews" element={<FakeNewsPage />} />
          <Route path="/summarize" element={<SummarizationPage />} />
          <Route path="/transcribe" element={<AudioTranscriptionPage />} />
          <Route path="/youtubetrans" element={<Youtubenotes />} />
          <Route path="/mindmap" element={<MindMapPage />} />
          <Route path="/captiongenerator" element={<Captionpage />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default MainPage;


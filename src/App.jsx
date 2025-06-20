// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./component/Navbar";
// import FakeNewsPage from "./pages/FakeNewsPage";
// import SummarizationPage from "./pages/SummarizationPage";
// import AudioTranscriptionPage from "./pages/AudioTranscriptionPage";
// import MindMapPage from "./pages/MindMapPage";
// import Register from "./component/Register";
// import Login from "./component/Login";

// import { AuthProvider } from "./context/AuthContext"; // ✅ Corrected import path

// const App = () => {
//   return (
//     <AuthProvider> {/* ✅ Wrap the entire app with AuthProvider */}
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<FakeNewsPage />} />
//           <Route path="/summarize" element={<SummarizationPage />} />
//           <Route path="/transcribe" element={<AudioTranscriptionPage />} />
//           <Route path="/mindmap" element={<MindMapPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;



// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import FakeNewsPage from "./pages/FakeNewsPage";
import SummarizationPage from "./pages/SummarizationPage";
import AudioTranscriptionPage from "./pages/AudioTranscriptionPage";
import MindMapPage from "./pages/MindMapPage";
import Register from "./component/Register";
import Login from "./component/Login";
import { AuthProvider } from "./context/AuthContext";
import MainPage from "./pages/MainPage"; // Import the MainPage component
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected routes */}
          <Route path="/*" element={<MainPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};
export default App;

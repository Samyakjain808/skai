
// // // // import React from "react";
// // // // import { Link, useLocation } from "react-router-dom";

// // // // const Navbar = () => {
// // // //   const location = useLocation();

// // // //   const navLinkClasses = (path) =>
// // // //     `px-4 py-2 font-semibold rounded ${
// // // //       location.pathname === path
// // // //         ? "bg-blue-600 text-white"
// // // //         : "text-blue-600 hover:text-blue-800"
// // // //     }`;

// // // //   return (
// // // //     <nav className="bg-white shadow-md py-4 mb-6">
// // // //       <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
// // // //         <h1 className="text-xl font-bold text-blue-800">AI News Tools</h1>
// // // //         <div className="space-x-4">
// // // //           <Link to="/" className={navLinkClasses("/")}>
// // // //             Fake News Detection
// // // //           </Link>
// // // //           <Link to="/summarize" className={navLinkClasses("/summarize")}>
// // // //             Text Summarization
// // // //           </Link>
// // // //           <Link to="/transcribe" className={navLinkClasses("/transcribe")}>
// // // //             Audio Transcription
// // // //           </Link>
// // // //           <Link to="/mindmap" className={navLinkClasses("/mindmap")}>
// // // //             Mind Map
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     </nav>
// // // //   );
// // // // };

// // // // export default Navbar;




// // // // component/Navbar.jsx
// // // import React from "react";
// // // import { Link, useLocation } from "react-router-dom";
// // // import { useAuth } from "../context/AuthContext";
// // // import LogoutButton from "./LogoutButton";

// // // const Navbar = () => {
// // //   const location = useLocation();
// // //   const { user } = useAuth();

// // //   const navLinkClasses = (path) =>
// // //     `px-4 py-2 font-semibold rounded ${
// // //       location.pathname === path
// // //         ? "bg-blue-600 text-white"
// // //         : "text-blue-600 hover:text-blue-800"
// // //     }`;

// // //   return (
// // //     <nav className="bg-white shadow-md py-4 mb-6">
// // //       <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
// // //         <div className="space-x-4 flex items-center">
// // //           <Link to="/" className={navLinkClasses("/")}>
// // //             Fake News Detection
// // //           </Link>
// // //           <Link to="/summarize" className={navLinkClasses("/summarize")}>
// // //             Text Summarization
// // //           </Link>
// // //           <Link to="/transcribe" className={navLinkClasses("/transcribe")}>
// // //             Audio Transcription
// // //           </Link>
// // //           <Link to="/mindmap" className={navLinkClasses("/mindmap")}>
// // //             Mind Map
// // //           </Link>

// // //           {user ? (
// // //             <>
// // //               <span className="text-sm text-gray-700 px-3">
// // //                 👋 {user.email}
// // //               </span>
// // //               <LogoutButton />
// // //             </>
// // //           ) : (
// // //             <>
// // //               <Link to="/login" className={navLinkClasses("/login")}>
// // //                 Login
// // //               </Link>
// // //               <Link to="/register" className={navLinkClasses("/register")}>
// // //                 Register
// // //               </Link>
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;



// // // src/component/Navbar.jsx
// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// // const Navbar = () => {
// //   const { user, logout } = useAuth();

// //   return (
// //     <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
// //       <div className="flex gap-4">
// //         <Link to="/home" className="hover:underline">Home</Link>
// //         <Link to="/about" className="hover:underline">About</Link>
// //         <Link to="/ainews" className="hover:underline">AI NEWS</Link>
// //         <Link to="/feedback" className="hover:underline">Feedback</Link>
// //       </div>
// //       {user && (
// //         <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
// //           Logout
// //         </button>
// //       )}
// //     </nav>
// //   );
// // };

// // // export default Navbar;
// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// // const Navbar = () => {
// //   const { user, logout } = useAuth();

// //   return (
// //     <nav className="fixed top-0 left-0 w-full z-50 bg-transparent p-4 text-white flex justify-between items-center backdrop-blur-md">
// //       <div className="flex gap-6 ml-4 text-lg font-medium">
// //         <Link to="/home" className="hover:underline">Home</Link>
// //         <Link to="/about" className="hover:underline">About</Link>
// //         <Link to="/ainews" className="hover:underline">AI NEWS</Link>
// //         <Link to="/feedback" className="hover:underline">Feedback</Link>
// //       </div>
// //       {user && (
// //         <button
// //           onClick={logout}
// //           className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 mr-4"
// //         >
// //           Logout
// //         </button>
// //       )}
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import logo from "../assets/Screenshot_2025-06-16_222939-removebg-preview.png";

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-transparent p-4 text-white backdrop-blur-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center">
//           <img src={logo} alt="Logo" className="h-10 w-auto" />
//         </div>

//         {/* Center Links */}
//         <div className="flex-1 flex justify-center">
//           <div className="flex gap-10 text-lg font-medium">
//             <Link to="/home" className="hover:underline">Home</Link>
//             <Link to="/about" className="hover:underline">About</Link>
//             <Link to="/ainews" className="hover:underline">AI NEWS</Link>
//             <Link to="/feedback" className="hover:underline">Feedback</Link>
//           </div>
//         </div>

//         {/* Logout button */}
//         <div className="flex items-center">
//           {user && (
//             <button
//               onClick={logout}
//               className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import logo from "../assets/Screenshot_2025-06-16_222939-removebg-preview.png";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent p-4 text-white backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </div>

        {/* Center Links */}
        <div className="flex-1 flex justify-center">
          <div className="flex gap-10 text-lg font-medium">
            <Link to="/home" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/ainews" className="hover:underline">ByteFeed</Link>
            <Link to="/feedback" className="hover:underline">Feedback</Link>
          </div>
        </div>

        {/* Enhanced Logout button */}
        <div className="flex items-center">
          {user && (
            <motion.button
              onClick={logout}
              className="relative overflow-hidden px-4 py-2 rounded-3xl bg-gradient-to-r from-cyan-400 to-cyan-600"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"]
              }}
              transition={{
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }
              }}
            >
              <span className="relative z-10">Logout</span>
              <motion.span
                className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
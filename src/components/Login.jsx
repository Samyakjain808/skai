// // import React, { useState } from "react";
// // import { supabase } from "../supabase/supabaseClient";
// // import { useNavigate } from "react-router-dom";

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [message, setMessage] = useState("");
// //   const navigate = useNavigate();
// // // 
// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     const { error } = await supabase.auth.signInWithPassword({ email, password });

// //     if (error) setMessage(error.message);
// //     else navigate("/");
// //   };

// //   return (
// //     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
// //       <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
// //       <form onSubmit={handleLogin} className="space-y-4">
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           className="w-full border p-2 rounded"
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           className="w-full border p-2 rounded"
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //         <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
// //       </form>
// //       {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
// //     </div>
// //   );
// // };

// // export default Login;


// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const { loginWithEmail, loginWithGoogle, loginWithGithub } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { error } = await loginWithEmail(email, password);
//     if (error) {
//       setMessage(`❌ ${error.message}`);
//     } else {
//       setMessage("✅ Logged in successfully!");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
//       <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Login</h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
//         >
//           Login with Email
//         </button>
//       </form>

//       <button
//         onClick={loginWithGoogle}
//         className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-4"
//       >
//         Login with Google
//       </button>

//       <button
//         onClick={loginWithGithub}
//         className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
//       >
//         Login with GitHub
//       </button>

//       {message && <p className="mt-4 text-center text-sm">{message}</p>}
//     </div>
//   );
// };

// export default Login;





import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { user, loginWithEmail, loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Redirect to /fakenews after successful login
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const { error } = await loginWithEmail(email, password);
    if (error) setErrorMsg(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-blue-100 to-pink-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">or continue with</div>

        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={loginWithGoogle}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-28"
          >
            Google
          </button>
          <button
            onClick={loginWithGithub}
            className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md w-28"
          >
            GitHub
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

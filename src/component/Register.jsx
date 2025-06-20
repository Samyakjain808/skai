// import React, { useState } from "react";
// import { supabase } from "../supabase/supabaseClient";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const { data, error } = await supabase.auth.signUp({ email, password });

//     if (error) setMessage(error.message);
//     else setMessage("Check your email to confirm registration.");
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
//       <form onSubmit={handleRegister} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-2 rounded"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 rounded"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button className="w-full bg-blue-600 text-white p-2 rounded">Register</button>
//       </form>
//       {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
//     </div>
//   );
// };

// export default Register;






import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { signUpWithEmail, loginWithGoogle, loginWithGithub } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await signUpWithEmail(email, password);
    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setMessage("✅ Registration successful! Please check your email to confirm.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Register with Email
        </button>
      </form>

      <button
        onClick={loginWithGoogle}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Sign up with Google
      </button>

      <button
        onClick={loginWithGithub}
        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
      >
        Sign up with GitHub
      </button>

      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
};

export default Register;

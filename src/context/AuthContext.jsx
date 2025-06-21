// // src/context/AuthContext.js
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../supabase/supabaseClient";



// import React, { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../supabase/supabaseClient";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check current session
//     supabase.auth.getSession().then(({ data }) => {
//       setUser(data?.session?.user || null);
//     });

//     // Listen to auth state changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user || null);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const loginWithEmail = async (email, password) => {
//     const { error } = await supabase.auth.signInWithPassword({ email, password });
//     if (error) console.error("Email login error:", error.message);
//   };

//   const signUpWithEmail = async (email, password) => {
//     return await supabase.auth.signUp({ email, password });
//   };

//   const loginWithGoogle = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: "http://localhost:5173/", // 👈 Must match Supabase dashboard config
//       },
//     });
//     if (error) console.error("Google login error:", error.message);
//   };

//   const loginWithGithub = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "github",
//       options: {
//         redirectTo: "http://localhost:5173/", // 👈 Must match Supabase dashboard config
//       },
//     });
//     if (error) console.error("GitHub login error:", error.message);
//   };

//   const logout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, loginWithEmail, signUpWithEmail, loginWithGoogle, loginWithGithub, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);




// import React, { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../supabase/supabaseClient";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const getSession = async () => {
//       const { data, error } = await supabase.auth.getSession();
//       if (error) {
//         console.error("Error fetching session:", error.message);
//         return;
//       }
//       setUser(data?.session?.user || null);
//     };

//     getSession();

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user || null);
//     });

//     return () => listener.subscription.unsubscribe();
//   }, []);

//   // const loginWithEmail = async (email, password) => {
//   //   const { error } = await supabase.auth.signInWithPassword({ email, password });
//   //   if (error) console.error("Email login error:", error.message);
//   // };
//   const loginWithEmail = async (email, password) => {
//     return await supabase.auth.signInWithPassword({ email, password }); // ✅ return result
//   };


//   const signUpWithEmail = async (email, password) => {
//     return await supabase.auth.signUp({ email, password });
//   };

//   const loginWithGoogle = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: "http://localhost:5173/", // <-- Make sure this matches your Supabase config
//       },
//     });
//     if (error) console.error("Google login error:", error.message);
//   };

//   const loginWithGithub = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "github",
//       options: {
//         redirectTo: "http://localhost:5173/",
//       },
//     });
//     if (error) console.error("GitHub login error:", error.message);
//   };

//   const logout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loginWithEmail,
//         signUpWithEmail,
//         loginWithGoogle,
//         loginWithGithub,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);




// src/context/AuthContext.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../supabase/supabaseClient";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getSession = async () => {
//       const { data, error } = await supabase.auth.getSession();
//       console.log("OAuth session on page load:", data);
//       if (error) {
//         console.error("Error fetching session:", error.message);
//         return;
//       }

//       const loggedInUser = data?.session?.user || null;
//       setUser(loggedInUser);

//       // ✅ Redirect here after OAuth login is completed (page refresh)
//       if (loggedInUser) {
//         navigate("/fakenews", { replace: true });
//       }
//     };

//     getSession();

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       const sessionUser = session?.user || null;
//       setUser(sessionUser);

//       // ✅ Redirect immediately after auth state changes (email, Google, GitHub)
//       if (sessionUser) {
//         navigate("/fakenews", { replace: true });
//       }
//     });

//     return () => listener.subscription.unsubscribe();
//   }, [navigate]);

//   const loginWithEmail = async (email, password) => {
//     const { error } = await supabase.auth.signInWithPassword({ email, password });
//     if (error) console.error("Email login error:", error.message);
//   };

//   const signUpWithEmail = async (email, password) => {
//     return await supabase.auth.signUp({ email, password });
//   };

//   const loginWithGoogle = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: "http://localhost:5173/fakenews", // 👈 This must match Supabase Auth settings
//       },
//     });
//     if (error) console.error("Google login error:", error.message);
//   };

//   const loginWithGithub = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "github",
//       options: {
//         redirectTo: "http://localhost:5173/fakenews", // 👈 Match Supabase Auth settings
//       },
//     });
//     if (error) console.error("GitHub login error:", error.message);
//   };

//   const logout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loginWithEmail,
//         signUpWithEmail,
//         loginWithGoogle,
//         loginWithGithub,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);




import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🚨 wait for session check
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setChecking(false); // ✅ Only stop checking after this
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);


  const loginWithEmail = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) console.error("Email login error:", error.message);
  };

  const signUpWithEmail = async (email, password) => {
    return await supabase.auth.signUp({ email, password });
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://skai-nine.vercel.app/home", // ✅ redirect back to root — don't use /fakenews
      },
    });
    if (error) console.error("Google login error:", error.message);
  };

  const loginWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "https://skai-nine.vercel.app/home", // ✅ redirect back to root — not to a protected page
      },
    });
    if (error) console.error("GitHub login error:", error.message);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithEmail,
        signUpWithEmail,
        loginWithGoogle,
        loginWithGithub,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

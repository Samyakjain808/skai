// src/layout/Layout.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  // Define routes that should NOT have top padding (like Home)
  const noPaddingRoutes = ["/home"];

  const shouldAddPadding = !noPaddingRoutes.includes(location.pathname);

  return (
    <main className={`max-w-6xl mx-auto px-4 ${shouldAddPadding ? "pt-28" : ""} space-y-6`}>
      {children}
    </main>
  );
};

export default Layout;

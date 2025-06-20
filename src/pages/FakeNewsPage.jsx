// import React from "react";
// import NewsInput from "../component/NewsInput";

// const FakeNewsPage = () => (
//   <div className="max-w-3xl mx-auto p-4">
//     <NewsInput />
//   </div>
// );

// export default FakeNewsPage;



import React from "react";
import NewsInput from "../component/NewsInput";

const FakeNewsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1c2c] to-[#928dab] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md text-white rounded-2xl p-8 shadow-lg mb-8 border border-white/20">
          <h1 className="text-4xl font-extrabold text-center tracking-tight">
            🧠 Fake News Detection AI
          </h1>
          <p className="mt-2 text-center text-gray-200">
            Enter a news article below and our AI will determine its authenticity.
          </p>
        </div>
        <NewsInput />
      </div>
    </div>
  );
};

export default FakeNewsPage;



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SUBREDDITS = [
//   "MachineLearning",
//   "Artificial",
//   "OpenAI",
//   "DeepLearning",
//   "Futurology",
//   "Computervision",
//   "LanguageTechnology",
// ];

// const AINewsPage = () => {
//   const [selectedSubreddit, setSelectedSubreddit] = useState("MachineLearning");
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPosts = async (subreddit) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/reddit/news?subreddits=${subreddit}&limit=10`);
//       const data = res.data[subreddit] || [];
//       setPosts(data);
//     } catch (err) {
//       console.error("Error fetching Reddit posts:", err);
//       setPosts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(selectedSubreddit);
//   }, [selectedSubreddit]);

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-blue-800">AI News from Reddit</h2>

//       {/* Category buttons */}
//       <div className="flex flex-wrap gap-3">
//         {SUBREDDITS.map((sub) => (
//           <button
//             key={sub}
//             onClick={() => setSelectedSubreddit(sub)}
//             className={`px-4 py-2 rounded font-semibold ${
//               selectedSubreddit === sub
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-blue-700 hover:bg-gray-300"
//             }`}
//           >
//             r/{sub}
//           </button>
//         ))}
//       </div>

//       {/* Posts */}
//       {loading ? (
//         <div>Loading posts from r/{selectedSubreddit}...</div>
//       ) : posts.length === 0 ? (
//         <div>No posts found.</div>
//       ) : (
//         <div className="space-y-4">
//           {posts.map((post, idx) => (
//             <a
//               key={idx}
//               href={post.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block bg-white shadow p-4 rounded hover:bg-gray-50"
//             >
//               <div className="flex justify-between">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     {post.title}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     💬 {post.comments} comments
//                   </p>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-blue-600 font-bold">⬆️</div>
//                   <div>{post.score}</div>
//                   <div className="text-blue-600 font-bold">⬇️</div>
//                 </div>
//               </div>
//             </a>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AINewsPage;



import React, { useEffect, useState } from "react";
import axios from "axios";

const SUBREDDITS = [
  "MachineLearning", "Artificial", "OpenAI",
  "DeepLearning", "Futurology", "Computervision", "LanguageTechnology"
];

const RedditNews = () => {
  const [selectedSubreddit, setSelectedSubreddit] = useState("MachineLearning");
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/reddit/news`, {
        params: { subreddits: selectedSubreddit.split(" ").join(","), limit }
      });
      setPosts(res.data[selectedSubreddit] || []);
    } catch (error) {
      console.error("Error fetching Reddit posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedSubreddit, limit]);

  const handleLoadMore = () => {
    setLimit((prev) => prev + 5);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-gradient-to-br from-gray-900/80 to-blue-900/50 backdrop-blur-md text-gray-100 font-['Inter'] pt-28">
      <h2 className="text-3xl font-bold mb-6 text-center">AI News</h2>

      {/* Subreddit Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {SUBREDDITS.map((sub) => (
          <button
            key={sub}
            onClick={() => {
              setSelectedSubreddit(sub);
              setLimit(5);
            }}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-200 ${
              selectedSubreddit === sub
                ? "bg-blue-600 text-white ring-2 ring-blue-400"
                : "bg-gray-200 text-blue-800 hover:bg-blue-300"
            }`}
          >
            r/{sub}
          </button>
        ))}
      </div>

      {/* Post List */}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <>
          <div>
            {posts.map((post, index) => (
              <div
                key={index}
                className="flex gap-4 items-start bg-white p-4 mb-4 rounded-md shadow-sm"
              >
                <div className="flex flex-col items-center pt-1">
                  <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300">
                    ▲
                  </button>
                  <span className="text-sm font-medium">{post.score}</span>
                  <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300">
                    ▼
                  </button>
                </div>
                <div>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-blue-700 hover:underline"
                  >
                    {post.title}
                  </a>
                  <p className="text-sm text-gray-500">{post.comments} comments</p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 text-lg rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Load More
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RedditNews;

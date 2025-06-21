import { FaThumbsUp, FaCommentAlt, FaShare } from "react-icons/fa";

// 🔹 Avatar URL constant (default profile picture)
const avatarUrl = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // default user icon

const FacebookPost = ({ image, caption, raw, onNextCaption }) => (
  <div className="w-full max-w-md mx-auto bg-white border rounded-lg font-sans shadow-sm">
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <img src={avatarUrl} alt="avatar" className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-sm font-semibold text-black">your_username</p>
          <p className="text-xs text-gray-400">2 hrs · 🌍</p>
        </div>
      </div>
      <span className="text-gray-500 text-lg font-bold">⋯</span>
    </div>

    <p className="px-4 pb-2 text-sm text-black">{caption}</p>
    <img src={image} alt="post" className="w-full object-cover max-h-96" />

    <div className="flex justify-between px-4 py-2 text-xs text-gray-500 border-t">
      <span>👍 127</span>
      <span>52 Comments · 14 Shares</span>
    </div>

    <div className="flex justify-around border-t text-gray-600 text-sm font-semibold py-2">
      <button className="flex items-center gap-1"><FaThumbsUp /> Like</button>
      <button className="flex items-center gap-1"><FaCommentAlt /> Comment</button>
      <button className="flex items-center gap-1"><FaShare /> Share</button>
    </div>
  </div>
);

export default FacebookPost;

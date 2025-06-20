import { FaEllipsisH, FaRegHeart, FaRegComment, FaPaperPlane, FaBookmark } from "react-icons/fa";
const avatarUrl = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; 
const InstagramPost = ({ image, caption, raw, onNextCaption }) => (
  <div className="w-full max-w-md mx-auto bg-white border rounded-lg font-sans shadow-sm">
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center space-x-3">
        <img src={avatarUrl} alt="avatar" className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-sm font-semibold text-black">your_username</p>
          <p className="text-xs text-gray-400">📍 Location</p>
        </div>
      </div>
      <FaEllipsisH className="text-gray-500" />
    </div>

    {/* Image */}
    <img src={image} alt="post" className="w-full object-cover max-h-96" />

    {/* Action buttons */}
    <div className="flex justify-between items-center px-4 py-2">
      <div className="flex space-x-4 text-xl text-gray-700">
        <FaRegHeart />
        <FaRegComment />
        <FaPaperPlane />
      </div>
      <FaBookmark />
    </div>

    {/* Caption */}
    <div className="px-4 pb-2 text-sm space-y-1">
      <p className="text-black">
        <span className="font-semibold text-black">your_username</span> {caption}
      </p>
      {/* <p className="text-gray-500">💬 Raw: {raw}</p> */}
      <p className="text-xs text-gray-400">2 hours ago</p>
    </div>

    
  </div>
);

export default InstagramPost;

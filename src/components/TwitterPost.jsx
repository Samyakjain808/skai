import { FaRegComment, FaRetweet, FaHeart, FaShareSquare } from "react-icons/fa";


const avatarUrl = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; 
const TwitterPost = ({ image, caption, raw, onNextCaption }) => (
  <div className="w-full max-w-md mx-auto bg-white border rounded-lg shadow-sm">
    <div className="flex gap-3 p-4">
      <img src={avatarUrl} alt="avatar" className="w-10 h-10 rounded-full" />
      <div className="w-full">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-black">your_username<span className="text-gray-500 font-normal">@your_username · 1h</span></p>
          <span className="text-gray-500">⋯</span>
        </div>
        <p className="text-sm text-black">{caption}</p>
        {image && <img src={image} alt="tweet" className="mt-2 rounded-lg w-full max-h-96 object-cover" />}
        {/* <p className="text-xs text-gray-400 mt-1">Raw: {raw}</p> */}
        <div className="flex justify-between text-gray-500 text-sm mt-3">
          <button className="flex items-center gap-1"><FaRegComment /> 12</button>
          <button className="flex items-center gap-1"><FaRetweet /> 8</button>
          <button className="flex items-center gap-1"><FaHeart /> 96</button>
          <button className="flex items-center gap-1"><FaShareSquare /></button>
        </div>
      </div>
    </div>
  </div>
);

export default TwitterPost;

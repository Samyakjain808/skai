import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";
const avatarUrl = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; 
const LinkedInPost = ({ image, caption, raw, onNextCaption }) => (
  <div className="w-full max-w-md mx-auto bg-white border rounded-lg shadow-sm">
    <div className="flex items-center gap-3 p-4">
      <img src={avatarUrl} alt="avatar" className="w-10 h-10 rounded-full" />
      <div>
        <p className="text-sm font-semibold text-black">your_username</p>
        <p className="text-xs text-gray-500">Product Manager at Google</p>
        <p className="text-xs text-gray-400">3h · 🌐</p>
      </div>
    </div>

    <div className="px-4 pb-2 text-sm text-black">
      <p>{caption}</p>
    </div>

    {image && <img src={image} alt="linkedin" className="w-full object-cover max-h-96" />}

    {/* <p className="px-4 pt-1 text-xs text-gray-400">Raw: {raw}</p> */}

    <div className="flex justify-around text-gray-600 text-sm border-t mt-2 py-2">
      <button className="flex items-center gap-1"><FaThumbsUp /> Like</button>
      <button className="flex items-center gap-1"><FaComment /> Comment</button>
      <button className="flex items-center gap-1"><FaShare /> Share</button>
    </div>
  </div>
);

export default LinkedInPost;

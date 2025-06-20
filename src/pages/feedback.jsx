import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const FeedbackModal = () => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();

    // Replace these entry IDs with your actual Google Form field entry IDs
    formData.append("entry.1063948839", rating); // rating field
    formData.append("entry.439226695", comment); // comment field

    await fetch("https://docs.google.com/forms/d/e/1FAIpQLSdkj5_crdIK-4Qkai5ikQl73J9N1wBuyyZxJnRFE9CYO9OP2g/formResponse", {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold">Thanks for your feedback!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Share Your Feedback</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={() => window.location.reload()}>
            ✕
          </button>
        </div>

        <div className="mb-4">
          <p className="mb-2 font-medium">How would you rate your experience?</p>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl ${
                  (hovered || rating) >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Additional Comments</label>
          <textarea
            className="w-full border rounded-md p-2 resize-none text-sm"
            rows="4"
            placeholder="Tell us more about your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md"
          onClick={handleSubmit}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
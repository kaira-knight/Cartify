import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative">

      {/* Breadcrumb */}
      <div className="absolute top-10 left-20 text-sm text-gray-500">
        Home / <span className="text-gray-700">404 Error</span>
      </div>

      {/* 404 Heading */}
      <h1 className="text-8xl md:text-9xl font-bold text-black mb-4">
        404 Not Found
      </h1>

      {/* Message */}
      <p className="text-gray-600 mb-6 text-base">
        Your visited page not found. You may go home page.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-red-500 hover:bg-red-600 text-white px-7 py-3 rounded transition duration-300"
      >
        Back to home page
      </button>

    </div>
  );
};

export default NotFound;
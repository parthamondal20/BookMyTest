import React from "react";

const Loader = ({ isVisible, message }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-95 backdrop-blur-sm">
      {/* Animated Ring */}
      {/* <div className="relative flex items-center justify-center">
        <div className="h-20 w-20 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        <div className="absolute h-12 w-12 rounded-full border-4 border-gray-300 border-t-transparent animate-[spin_1.5s_linear_infinite_reverse]"></div>
      </div> */}

      {/* Pulsing Dot */}
      <div className="mt-6 flex space-x-2">
        <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce"></span>
        <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce [animation-delay:200ms]"></span>
        <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce [animation-delay:400ms]"></span>
      </div>

      {/* Message */}
      <span className="mt-6 text-gray-800 font-semibold text-lg tracking-wide">
        {message || "Loading, please wait..."}
      </span>
    </div>
  );
};

export default Loader;

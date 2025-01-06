import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-primary/60 rounded-full animate-spin"></div>

        {/* Inner ring */}
        <div className="absolute top-0 left-0 w-16 h-16">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

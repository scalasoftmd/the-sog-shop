import React from "react";

const Loader: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
    <div className="animate-spin rounded-full h-24 w-24 border-2 border-gray-300 border-t-black"></div>
  </div>
);

export default Loader;

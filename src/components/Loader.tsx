import React from "react";

const Loader: React.FC = () => (
  <div className="fixed left-0 right-0 bottom-0 md:top-20 top-25 flex items-center justify-center z-50 bg-white bg-opacity-60">
    <div className="animate-spin rounded-full h-24 w-24 border-2 border-gray-300 border-t-black"></div>
  </div>
);

export default Loader;

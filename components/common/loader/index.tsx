import React from "react";

const Loader = () => {
  return (
    <div className="fixed w-screen h-screen bg-black bg-opacity-80 flex items-center justify-center top-0 left-0 z-50">
      <h1 className="text-white">Uploading.....</h1>
    </div>
  );
};

export default Loader;

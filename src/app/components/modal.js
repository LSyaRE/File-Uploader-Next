import React from "react";

function Modal ({ isVisible, message }){
  if (!isVisible) return null;

  return (
    <div className="fixed inset 0 bg-white bg-opacity-25 background-blur-sm flex justify-center items-center">
      Modal
    </div>
  );
};

export default Modal;

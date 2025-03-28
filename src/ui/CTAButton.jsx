import React from "react";

const Button = ({ text, className, onClick }) => {
  return (
    <button
      className={`px-6 py-2 rounded-lg font-semibold cursor-pointer ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

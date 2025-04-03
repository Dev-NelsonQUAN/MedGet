import React from "react";

const Button = ({ text, className, onClick }) => {
  return (
    <button
      className={`lg:px-6 max-[769px]:px-6 max-[576px]:px-4 max-[321px]:px-2 lg:py-2 max-[769px]:py-2 max-[576px]:py-2 max-[321]:py-0.5 rounded-lg font-semibold max-[321px]:text-[14px] cursor-pointer ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

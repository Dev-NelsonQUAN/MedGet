import React from "react";

const FeatureCard = ({ icon: Icon, title, description, image, showimg }) => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center h-[100%]">
        <div className="w-full flex justify-center mb-6">{showimg && (<img src={image} className="h-80" alt=""/>)}</div>
        {Icon && <Icon className="text-blue-600 text-4xl mb-3 mx-auto" />}
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-[15px]  mt-3">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;

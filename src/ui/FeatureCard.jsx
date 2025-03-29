import React from "react";

const FeatureCard = ({ icon: Icon, title, p, px, cardMb, cardH, py, description, image, imgH, showimg, pb, h3Bottom, cardBg, pTextCol, border, borderCol }) => {
  return (
    <div>
      <div className={`${p} ${py} ${pb} ${px} ${cardBg} ${border} ${borderCol} rounded-lg shadow-lg text-center ${cardH}`}>
        <div className={`w-full flex justify-center ${cardMb}`}>{showimg && (<img src={image} className={`${imgH}`} alt=""/>)}</div>
        {Icon && <Icon className="text-blue-600 text-4xl mb-3 mx-auto" />}
        <h3 className={`text-[20px] font-semibold ${h3Bottom}`}>{title}</h3>
        <p className={`text-[15px] font-medium mt-3 ${pTextCol}`}>{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;

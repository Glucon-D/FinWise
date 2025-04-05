// src/components/CalculatorCard.jsx
import React from 'react';

const CalculatorCard = ({ title, description, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl border border-emerald-500 bg-gradient-to-br from-white to-emerald-100 hover:shadow-lg opacity-70 hover:opacity-100 transition-shadow duration-300 p-6 flex flex-col justify-between w-full h-48"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Bottom-right aligned image with hover animation */}
      <div className="mt-4 flex justify-end">
        <img
          src={image}
          alt={title}
          className="h-12 w-auto object-contain opacity-60 hover:opacity-100 hover:scale-125 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default CalculatorCard;

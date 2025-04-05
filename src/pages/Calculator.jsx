import React from "react";
import { useNavigate } from "react-router-dom";
import CalculatorCard from "../components/CalculatorCard";

import SIPLogo from "../assets/SIP.png";
import FDLogo from "../assets/FD.png";
import EMILogo from "../assets/EMI.png";
import SWPLogo from "../assets/SWP.png";
import MFLogo from "../assets/MF.png";

const calculators = [
  {
    title: "SIP",
    description: "Calculate how much you will accumulate with your SIP",
    image: SIPLogo,
    route: "/calculator/sip", // ✅ full path
  },
  {
    title: "FD",
    description: "Check returns on your fixed deposits (FDs)",
    image: FDLogo,
    route: "/calculator/fd",
  },
  {
    title: "EMI",
    description: "Calculate EMI for home/car/personal loans",
    image: EMILogo,
    route: "/calculator/emi",
  },
  {
    title: "SWP",
    description: "Calculate your withdrawals with SWP",
    image: SWPLogo,
    route: "/calculator/swp",
  },
  {
    title: "MF",
    description: "Calculate mutual fund returns",
    image: MFLogo,
    route: "/calculator/mf",
  },
];

export const Calculator = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route); // ✅ client-side navigation
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {calculators.map((calc) => (
          <CalculatorCard
            key={calc.title}
            title={calc.title}
            description={calc.description}
            image={calc.image}
            onClick={() => handleNavigation(calc.route)}
          />
        ))}
      </div>
    </div>
  );
};

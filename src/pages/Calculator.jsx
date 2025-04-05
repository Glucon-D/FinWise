// src/pages/Calculator.jsx
import React from 'react';
import CalculatorCard from '../components/CalculatorCard';
import SIPLogo from '/home/raghav/Desktop/FinWise/FinWise/src/assets/SIP.png';
import FDLogo from '/home/raghav/Desktop/FinWise/FinWise/src/assets/FD.png'
import EMILogo from '/home/raghav/Desktop/FinWise/FinWise/src/assets/EMI.png'
import SWPLogo from '/home/raghav/Desktop/FinWise/FinWise/src/assets/SWP.png'
import MFLogo from '/home/raghav/Desktop/FinWise/FinWise/src/assets/MF.png'



// You can use your actual image URLs or local assets
const calculators = [
  {
    title: 'SIP',
    description: 'Calculate how much you will accumulate with your SIP',
    image: SIPLogo,
    route: '/SipCalculator'
  },
  {
    title: 'FD',
    description: 'Check returns on your fixed deposits (FDs) without any hassle',
    image: FDLogo,
    route: '/FDCalculator'
  },
  {
    title: 'EMI',
    description: 'Calculate EMI on your loans - home loan, car loan or personal loan',
    image: EMILogo,
    route: '/EMICalculator'
  },
  {
    title: 'SWP',
    description: 'Calculate your final amount with Systematic Withdrawal Plans(SWP)',
    image: SWPLogo,
    route: '/SWPCalculator'
  },
  {
    title: 'MF',
    description: 'Calculate the returns on your mutual fund investments',
    image: MFLogo,
    route: '/MFCalculator'
  },
];

export const Calculator = () => {
  const handleNavigation = (route) => {
    window.location.href = route; // or use navigate() if using react-router
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



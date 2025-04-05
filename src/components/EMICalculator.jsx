import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTenure, setLoanTenure] = useState(5);
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const principal = loanAmount;
    const annualRate = interestRate / 100;
    const monthlyRate = annualRate / 12;
    const months = loanTenure * 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                (Math.pow(1 + monthlyRate, months) - 1);
    const totalAmt = emi * months;
    const interest = totalAmt - principal;

    setMonthlyEMI(emi);
    setTotalInterest(interest);
  }, [loanAmount, interestRate, loanTenure]);

  const chartData = [
    { name: 'Principal amount', value: loanAmount },
    { name: 'Interest amount', value: totalInterest },
  ];

  const COLORS = ['#E3E8FF', '#4F46E5'];

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Loan amount</label>
          <input
            type="number"
            className="bg-green-50 text-green-600 font-semibold px-3 py-1 rounded"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />
        </div>
        <input
          type="range"
          min="10000"
          max="10000000"
          step="10000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          className="w-full"
        />

        <div className="flex items-center justify-between">
          <label className="text-gray-700">Rate of interest (p.a)</label>
          <input
            type="number"
            step="0.1"
            className="bg-green-50 text-green-600 font-semibold px-3 py-1 rounded"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>
        <input
          type="range"
          min="1"
          max="20"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full"
        />

        <div className="flex items-center justify-between">
          <label className="text-gray-700">Loan tenure (Years)</label>
          <input
            type="number"
            className="bg-green-50 text-green-600 font-semibold px-3 py-1 rounded"
            value={loanTenure}
            onChange={(e) => setLoanTenure(Number(e.target.value))}
          />
        </div>
        <input
          type="range"
          min="1"
          max="30"
          step="1"
          value={loanTenure}
          onChange={(e) => setLoanTenure(Number(e.target.value))}
          className="w-full"
        />

        <div className="pt-4 space-y-1">
          <p className="text-gray-800">Monthly EMI: <span className="font-semibold">₹{Math.round(monthlyEMI).toLocaleString()}</span></p>
          <p className="text-gray-800">Principal amount: <span className="font-semibold">₹{Math.round(loanAmount).toLocaleString()}</span></p>
          <p className="text-gray-800">Total interest: <span className="font-semibold">₹{Math.round(totalInterest).toLocaleString()}</span></p>
          <p className="text-gray-900 font-bold">Total amount: ₹{Math.round(loanAmount + totalInterest).toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50}
                labelLine={false}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `₹${Math.round(value).toLocaleString()}`}
              />
              <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FiInfo, FiTrendingUp, FiDollarSign, FiClock } from 'react-icons/fi';

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

  const formatCurrency = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    return `₹${Math.round(value).toLocaleString()}`;
  };

  const COLORS = ['#059669', '#6366F1'];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-full">
      <div className="p-4 sm:p-6 border-b">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">EMI Calculator</h2>
        <p className="text-sm sm:text-base text-gray-600">Calculate your loan EMI and total interest</p>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-gray-700">
                <FiDollarSign className="text-emerald-500" />
                Loan Amount
              </label>
              <div className="bg-emerald-50 text-emerald-600 font-medium px-3 py-1 rounded-md">
                {formatCurrency(loanAmount)}
              </div>
            </div>
            <input
              type="range"
              min="10000"
              max="10000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>₹10,000</span>
              <span>₹1 Cr</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-gray-700">
                <FiTrendingUp className="text-indigo-500" />
                Interest Rate (p.a)
              </label>
              <div className="bg-indigo-50 text-indigo-600 font-medium px-3 py-1 rounded-md">
                {interestRate}%
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1%</span>
              <span>20%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-gray-700">
                <FiClock className="text-amber-500" />
                Loan Tenure
              </label>
              <div className="bg-amber-50 text-amber-600 font-medium px-3 py-1 rounded-md">
                {loanTenure} years
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 year</span>
              <span>30 years</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Loan amount:</span>
              <span className="font-medium text-emerald-600">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total interest:</span>
              <span className="font-medium text-indigo-600">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-gray-900 font-bold">Total payable:</span>
              <span className="font-bold text-gray-900">{formatCurrency(loanAmount + totalInterest)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4 min-h-[300px]">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Payment Breakdown</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={({ viewBox: { width, height } }) => Math.min(width, height) * 0.35}
                    innerRadius={({ viewBox: { width, height } }) => Math.min(width, height) * 0.25}
                    animationDuration={1000}
                    labelLine={false}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      padding: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    iconSize={10}
                    formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-indigo-50 rounded-lg shadow p-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Summary</h3>
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm text-gray-600">Monthly EMI:</span>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  {formatCurrency(monthlyEMI)}
                </span>
              </div>
              <div className="flex gap-4 sm:gap-8">
                <div className="flex-1">
                  <div className="text-xs sm:text-sm text-gray-600">Total Interest:</div>
                  <div className="text-base sm:text-lg font-semibold text-indigo-600">
                    {formatCurrency(totalInterest)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs sm:text-sm text-gray-600">Total Payment:</div>
                  <div className="text-base sm:text-lg font-semibold text-amber-600">
                    {formatCurrency(monthlyEMI * loanTenure * 12)}
                  </div>
                </div>
              </div>
              <div className="flex items-center text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-4">
                <FiInfo className="mr-1 sm:mr-2 flex-shrink-0" />
                EMI is calculated based on reducing balance method.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
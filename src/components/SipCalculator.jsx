import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const SipCalculator = () => {
  const [activeTab, setActiveTab] = useState('SIP');
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [lumpSumInvestment, setLumpSumInvestment] = useState(250000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);

  useEffect(() => {
    const n = timePeriod * 12;
    const r = expectedReturn / 100 / 12;
    if (activeTab === 'SIP') {
      const futureValue = monthlyInvestment * (((Math.pow(1 + r, n) - 1) * (1 + r)) / r);
      const totalInvested = monthlyInvestment * n;
      const returns = futureValue - totalInvested;
      setInvestedAmount(totalInvested);
      setEstimatedReturns(returns);
    } else {
      const futureValue = lumpSumInvestment * Math.pow(1 + r, n);
      const returns = futureValue - lumpSumInvestment;
      setInvestedAmount(lumpSumInvestment);
      setEstimatedReturns(returns);
    }
  }, [monthlyInvestment, lumpSumInvestment, expectedReturn, timePeriod, activeTab]);

  const chartData = [
    { name: 'Invested amount', value: investedAmount },
    { name: 'Est. returns', value: estimatedReturns },
  ];

  const COLORS = ['#E3E8FF', '#4F46E5'];

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="relative w-fit bg-gray-100 rounded-full p-1 flex items-center gap-1 mb-6">
          <div
            className={`absolute top-1 left-1 w-[92px] h-8 bg-white rounded-full shadow transition-transform duration-300 ease-in-out z-0 ${
              activeTab === 'Lumpsum' ? 'translate-x-full' : 'translate-x-0'
            }`}
          />
          <button
            onClick={() => setActiveTab('SIP')}
            className={`relative z-10 w-[92px] py-1 font-semibold text-sm rounded-full transition-colors duration-300 ${
              activeTab === 'SIP' ? 'text-black' : 'text-gray-500'
            }`}
          >
            SIP
          </button>
          <button
            onClick={() => setActiveTab('Lumpsum')}
            className={`relative z-10 w-[92px] py-1 font-semibold text-sm rounded-full transition-colors duration-300 ${
              activeTab === 'Lumpsum' ? 'text-black' : 'text-gray-500'
            }`}
          >
            Lumpsum
          </button>
        </div>

        {activeTab === 'SIP' ? (
          <>
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Monthly investment</label>
              <input
                type="number"
                className="bg-green-50 text-green-600 font-semibold px-3 py-1 rounded"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              />
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full"
            />
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Lumpsum investment</label>
              <input
                type="number"
                className="bg-green-50 text-green-600 font-semibold px-3 py-1 rounded"
                value={lumpSumInvestment}
                onChange={(e) => setLumpSumInvestment(Number(e.target.value))}
              />
            </div>
            <input
              type="range"
              min="10000"
              max="10000000"
              step="10000"
              value={lumpSumInvestment}
              onChange={(e) => setLumpSumInvestment(Number(e.target.value))}
              className="w-full"
            />
          </>
        )}

        <div className="flex items-center justify-between">
          <label className="text-gray-700">Expected return rate (p.a)</label>
          <input
            type="number"
            className="bg-green-50 text-green-600 font-semibold px-3 py-1 rounded"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
          />
        </div>
        <input
          type="range"
          min="1"
          max="20"
          step="0.5"
          value={expectedReturn}
          onChange={(e) => setExpectedReturn(Number(e.target.value))}
          className="w-full"
        />

        <div className="flex items-center justify-between">
          <label className="text-gray-700">Time period</label>
          <input
            type="number"
            className="bg-green-50 text-green-600 font-semibold px-3 py-1 rounded"
            value={timePeriod}
            onChange={(e) => setTimePeriod(Number(e.target.value))}
          />
        </div>
        <input
          type="range"
          min="1"
          max="30"
          value={timePeriod}
          onChange={(e) => setTimePeriod(Number(e.target.value))}
          className="w-full"
        />

        <div className="pt-4 space-y-1">
          <p className="text-gray-800">Invested amount: <span className="font-semibold">₹{Math.round(investedAmount).toLocaleString()}</span></p>
          <p className="text-gray-800">Est. returns: <span className="font-semibold">₹{Math.round(estimatedReturns).toLocaleString()}</span></p>
          <p className="text-gray-900 font-bold">Total value: ₹{Math.round(investedAmount + estimatedReturns).toLocaleString()}</p>
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
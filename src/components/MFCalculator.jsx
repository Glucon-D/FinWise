import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const MFCalculator = () => {
  const [investment, setInvestment] = useState(25000);
  const [returnRate, setReturnRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [returns, setReturns] = useState(0);

  useEffect(() => {
    const futureValue = investment * Math.pow(1 + returnRate / 100, timePeriod);
    const estReturns = futureValue - investment;
    setReturns(estReturns);
  }, [investment, returnRate, timePeriod]);

  const chartData = [
    { name: 'Invested amount', value: investment },
    { name: 'Est. returns', value: returns },
  ];

  const COLORS = ['#E3E8FF', '#4F46E5'];

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Total investment</label>
          <input
            type="number"
            className="bg-green-50 text-green-600 font-semibold px-3 py-1 rounded"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
          />
        </div>
        <input
          type="range"
          min="1000"
          max="1000000"
          step="1000"
          value={investment}
          onChange={(e) => setInvestment(Number(e.target.value))}
          className="w-full"
        />

        <div className="flex items-center justify-between">
          <label className="text-gray-700">Expected return rate (p.a)</label>
          <input
            type="number"
            className="bg-green-50 text-green-600 font-semibold px-3 py-1 rounded"
            value={returnRate}
            onChange={(e) => setReturnRate(Number(e.target.value))}
          />
        </div>
        <input
          type="range"
          min="1"
          max="20"
          step="0.1"
          value={returnRate}
          onChange={(e) => setReturnRate(Number(e.target.value))}
          className="w-full"
        />

        <div className="flex items-center justify-between">
          <label className="text-gray-700">Time period (Years)</label>
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
          <p className="text-gray-800">Invested amount: <span className="font-semibold">₹{investment.toLocaleString()}</span></p>
          <p className="text-gray-800">Est. returns: <span className="font-semibold">₹{Math.round(returns).toLocaleString()}</span></p>
          <p className="text-gray-900 font-bold">Total value: ₹{Math.round(investment + returns).toLocaleString()}</p>
        </div>

        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold">
          INVEST NOW
        </button>
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

export default MFCalculator;
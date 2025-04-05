import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const FDCalculator = () => {
  const [investment, setInvestment] = useState(5000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [timePeriod, setTimePeriod] = useState(5);
  const [timeUnit, setTimeUnit] = useState('Years');
  const [returns, setReturns] = useState(0);

  useEffect(() => {
    const period = timeUnit === 'Months' ? timePeriod / 12 : timePeriod;
    const maturity = investment * Math.pow(1 + interestRate / 100, period);
    const estimatedReturn = maturity - investment;
    setReturns(estimatedReturn);
  }, [investment, interestRate, timePeriod, timeUnit]);

  const chartData = [
    { name: 'Total investment', value: investment },
    { name: 'Total returns', value: returns },
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
          step="500"
          value={investment}
          onChange={(e) => setInvestment(Number(e.target.value))}
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
          max="15"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full"
        />

        <div className="flex items-center justify-between gap-4">
          <label className="text-gray-700">Time period</label>
          <input
            type="number"
            className="bg-green-50 text-green-600 font-semibold px-3 py-1 rounded w-24"
            value={timePeriod}
            onChange={(e) => setTimePeriod(Number(e.target.value))}
          />
          <select
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
            className="bg-green-50 text-green-600 font-semibold px-3 py-1 rounded"
          >
            <option value="Years">Years</option>
            <option value="Months">Months</option>
          </select>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          value={timePeriod}
          onChange={(e) => setTimePeriod(Number(e.target.value))}
          className="w-full"
        />

        <div className="pt-4 space-y-1">
          <p className="text-gray-800">Invested amount: <span className="font-semibold">₹{Math.round(investment).toLocaleString()}</span></p>
          <p className="text-gray-800">Est. returns: <span className="font-semibold">₹{Math.round(returns).toLocaleString()}</span></p>
          <p className="text-gray-900 font-bold">Total value: ₹{Math.round(investment + returns).toLocaleString()}</p>
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



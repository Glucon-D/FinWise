import React, { useState, useEffect } from 'react';

const SWPCalculator = () => {
  const [totalInvestment, setTotalInvestment] = useState(500000);
  const [withdrawalPerMonth, setWithdrawalPerMonth] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [timePeriod, setTimePeriod] = useState(5);
  const [finalValue, setFinalValue] = useState(0);

  useEffect(() => {
    const r = expectedReturn / 100 / 12;
    const n = timePeriod * 12;

    // Formula for Future Value of SWP
    const futureValue =
      totalInvestment * Math.pow(1 + r, n) -
      withdrawalPerMonth * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

    setFinalValue(futureValue);
  }, [totalInvestment, withdrawalPerMonth, expectedReturn, timePeriod]);

  const totalWithdrawal = withdrawalPerMonth * timePeriod * 12;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="flex items-center justify-between">
        <label className="text-gray-700">Total investment</label>
        <input
          type="number"
          className="bg-green-50 text-green-600 font-semibold px-3 py-1 rounded"
          value={totalInvestment}
          onChange={(e) => setTotalInvestment(Number(e.target.value))}
        />
      </div>
      <input
        type="range"
        min="10000"
        max="10000000"
        step="10000"
        value={totalInvestment}
        onChange={(e) => setTotalInvestment(Number(e.target.value))}
        className="w-full"
      />

      <div className="flex items-center justify-between">
        <label className="text-gray-700">Withdrawal per month</label>
        <input
          type="number"
          className="bg-green-50 text-green-600 font-semibold px-3 py-1 rounded"
          value={withdrawalPerMonth}
          onChange={(e) => setWithdrawalPerMonth(Number(e.target.value))}
        />
      </div>
      <input
        type="range"
        min="500"
        max="100000"
        step="500"
        value={withdrawalPerMonth}
        onChange={(e) => setWithdrawalPerMonth(Number(e.target.value))}
        className="w-full"
      />

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
        step="0.1"
        value={expectedReturn}
        onChange={(e) => setExpectedReturn(Number(e.target.value))}
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
        <p className="text-gray-800">Total investment: <span className="font-semibold">₹{totalInvestment.toLocaleString()}</span></p>
        <p className="text-gray-800">Total withdrawal: <span className="font-semibold">₹{totalWithdrawal.toLocaleString()}</span></p>
        <p className="text-gray-900 font-bold">Final value: ₹{Math.round(finalValue).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default SWPCalculator;

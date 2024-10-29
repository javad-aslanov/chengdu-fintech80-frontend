import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const initialState = {
  deltaLow: '0.5',
  deltaMedium: '0.5',
  deltaHigh: '0.5',
  thresholdLow: '10',
  thresholdMedium: '20',
  thresholdHigh: '30',
};

const Settings = () => {
  // State variables for temporary values (used for live editing)
  const [tempDeltaLow, setTempDeltaLow] = useState(initialState.deltaLow);
  const [tempDeltaMedium, setTempDeltaMedium] = useState(initialState.deltaMedium);
  const [tempDeltaHigh, setTempDeltaHigh] = useState(initialState.deltaHigh);
  const [tempThresholdLow, setTempThresholdLow] = useState(initialState.thresholdLow);
  const [tempThresholdMedium, setTempThresholdMedium] = useState(initialState.thresholdMedium);
  const [tempThresholdHigh, setTempThresholdHigh] = useState(initialState.thresholdHigh);

  // State variables for applied parameters (used for the demo)
  const [deltaLow, setDeltaLow] = useState(parseFloat(initialState.deltaLow));
  const [deltaMedium, setDeltaMedium] = useState(parseFloat(initialState.deltaMedium));
  const [deltaHigh, setDeltaHigh] = useState(parseFloat(initialState.deltaHigh));
  const [thresholdLow, setThresholdLow] = useState(parseInt(initialState.thresholdLow, 10));
  const [thresholdMedium, setThresholdMedium] = useState(parseInt(initialState.thresholdMedium, 10));
  const [thresholdHigh, setThresholdHigh] = useState(parseInt(initialState.thresholdHigh, 10));

  // State variables for the data used in the charts
  const [riskDistributionData, setRiskDistributionData] = useState([]);
  const [financialData, setFinancialData] = useState([]);

  // useEffect to recalculate data when parameters change
  useEffect(() => {
    const newRiskDistributionData = calculateRiskDistribution(
      thresholdLow,
      thresholdMedium,
      thresholdHigh
    );
    const newFinancialData = calculateFinancialData(
      deltaLow,
      deltaMedium,
      deltaHigh
    );

    setRiskDistributionData(newRiskDistributionData);
    setFinancialData(newFinancialData);
  }, [deltaLow, deltaMedium, deltaHigh, thresholdLow, thresholdMedium, thresholdHigh]);

  const calculateRiskDistribution = (thresholdLow, thresholdMedium, thresholdHigh) => {
    const totalThreshold = thresholdLow + thresholdMedium + thresholdHigh;
    const lowRiskValue = (thresholdLow / totalThreshold) * 100;
    const mediumRiskValue = (thresholdMedium / totalThreshold) * 100;
    const highRiskValue = (thresholdHigh / totalThreshold) * 100;

    return [
      { name: 'Low Risk', value: lowRiskValue  },
      { name: 'Medium Risk', value: mediumRiskValue },
      { name: 'High Risk', value: highRiskValue },
    ]
  };

  const calculateFinancialData = (deltaLow, deltaMedium, deltaHigh) => {
    return [
      {
        category: 'Low Risk',
        premium: 500 * deltaLow,
        expenses: 300 * deltaLow,
        profit: 200 * deltaLow,
      },
      {
        category: 'Medium Risk',
        premium: 750 * deltaMedium,
        expenses: 600 * deltaMedium,
        profit: 150 * deltaMedium,
      },
      {
        category: 'High Risk',
        premium: 1000 * deltaHigh,
        expenses: 900 * deltaHigh,
        profit: 100 * deltaHigh,
      },
    ];
  };

  // Apply changes for the current demo (validates and parses the input values)
  const applyChanges = () => {
    // Parse input values
    const parsedDeltaLow = parseFloat(tempDeltaLow);
    const parsedDeltaMedium = parseFloat(tempDeltaMedium);
    const parsedDeltaHigh = parseFloat(tempDeltaHigh);
    const parsedThresholdLow = parseInt(tempThresholdLow, 10);
    const parsedThresholdMedium = parseInt(tempThresholdMedium, 10);
    const parsedThresholdHigh = parseInt(tempThresholdHigh, 10);

    // Validate parsing
    if (
      isNaN(parsedDeltaLow) ||
      isNaN(parsedDeltaMedium) ||
      isNaN(parsedDeltaHigh) ||
      isNaN(parsedThresholdLow) ||
      isNaN(parsedThresholdMedium) ||
      isNaN(parsedThresholdHigh)
    ) {
      alert('Please enter valid numbers for all fields.');
      return;
    }

    // Validate delta values
    if (
      parsedDeltaLow < 0 ||
      parsedDeltaLow > 1 ||
      parsedDeltaMedium < 0 ||
      parsedDeltaMedium > 1 ||
      parsedDeltaHigh < 0 ||
      parsedDeltaHigh > 1
    ) {
      alert('Deltas must be between 0 and 1.');
      return;
    }

    // Validate threshold values
    if (
      parsedThresholdLow >= parsedThresholdMedium ||
      parsedThresholdMedium >= parsedThresholdHigh ||
      parsedThresholdLow < 0 ||
      parsedThresholdHigh > 100
    ) {
      alert('Thresholds must be in ascending order: Low < Medium < High and within valid ranges.');
      return;
    }

    // Apply changes if validation passes
    setDeltaLow(parsedDeltaLow);
    setDeltaMedium(parsedDeltaMedium);
    setDeltaHigh(parsedDeltaHigh);
    setThresholdLow(parsedThresholdLow);
    setThresholdMedium(parsedThresholdMedium);
    setThresholdHigh(parsedThresholdHigh);
  };

  // Reset to initial values
  const handleReset = () => {
    setTempDeltaLow(initialState.deltaLow);
    setTempDeltaMedium(initialState.deltaMedium);
    setTempDeltaHigh(initialState.deltaHigh);
    setTempThresholdLow(initialState.thresholdLow);
    setTempThresholdMedium(initialState.thresholdMedium);
    setTempThresholdHigh(initialState.thresholdHigh);
  };

  // Handle the submit button
  const handleSubmit = () => {
    console.log('Submitted parameters:', {
      deltaLow,
      deltaMedium,
      deltaHigh,
      thresholdLow,
      thresholdMedium,
      thresholdHigh,
    });
    alert('Parameters have been submitted!');
  };

  return (
    <div className="mx-auto max-w-270">
      <h1 className="text-2xl font-semibold mb-6">Model Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Adjust Parameters</h2>
          <form>
            <h3 className="text-lg font-semibold mb-2">Deltas</h3>
            {/* Delta inputs */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Delta Low</label>
              <input
                type="text"
                className="w-full rounded border border-stroke py-2 px-3"
                value={tempDeltaLow}
                onChange={(e) => setTempDeltaLow(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Delta Medium</label>
              <input
                type="text"
                className="w-full rounded border border-stroke py-2 px-3"
                value={tempDeltaMedium}
                onChange={(e) => setTempDeltaMedium(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Delta High</label>
              <input
                type="text"
                className="w-full rounded border border-stroke py-2 px-3"
                value={tempDeltaHigh}
                onChange={(e) => setTempDeltaHigh(e.target.value)}
              />
            </div>

            <h3 className="text-lg font-semibold mb-2">Thresholds</h3>
            {/* Threshold inputs */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Threshold Low</label>
              <input
                type="text"
                className="w-full rounded border border-stroke py-2 px-3"
                value={tempThresholdLow}
                onChange={(e) => setTempThresholdLow(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Threshold Medium</label>
              <input
                type="text"
                className="w-full rounded border border-stroke py-2 px-3"
                value={tempThresholdMedium}
                onChange={(e) => setTempThresholdMedium(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Threshold High</label>
              <input
                type="text"
                className="w-full rounded border border-stroke py-2 px-3"
                value={tempThresholdHigh}
                onChange={(e) => setTempThresholdHigh(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                className="mt-4 bg-gray-400 text-white py-2 px-4 rounded"
                onClick={handleReset}
              >
                Reset to Default
              </button>
              <button
                type="button"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={applyChanges}
              >
                Apply Changes
              </button>
              <button
                type="button"
                className="mt-4 bg-primary text-white py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Graphs */}
        <div className="grid grid-cols-1 gap-6">
          {/* Pie Chart */}
          <div className="bg-white shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Risk Distribution (in %)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Bar Chart */}
          <div className="bg-white shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Premium, Expenses, and Profit per Risk Category
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={financialData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="premium" fill="#82ca9d" name="Average Premium" />
                <Bar dataKey="expenses" fill="#8884d8" name="Average Expenses" />
                <Bar dataKey="profit" fill="#ffc658" name="Average Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

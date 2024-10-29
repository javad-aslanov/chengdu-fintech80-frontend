import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for risk distribution
const riskDistributionData = [
  { name: 'Low Risk', value: 60 },
  { name: 'Medium Risk', value: 25 },
  { name: 'High Risk', value: 15 },
];

// Sample data for premium, expenses, and profit
const financialData = [
  { category: 'Low Risk', premium: 500, expenses: 300, profit: 200 },
  { category: 'Medium Risk', premium: 750, expenses: 600, profit: 150 },
  { category: 'High Risk', premium: 1000, expenses: 900, profit: 100 },
];

// Colors for pie chart segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const RiskAndFinancialStats = () => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2 2xl:gap-8">
      {/* Pie Chart Container */}
      <div className="bg-white shadow-lg  p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Customer Risk Distribution</h2>
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

      {/* Bar Chart Container */}
      <div className="bg-white shadow-lg  p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Premium, Expenses, and Profit per Risk Category</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={financialData}
            margin={{
              top: 20, right: 30, left: 0, bottom: 5,
            }}
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
  );
};

export default RiskAndFinancialStats;

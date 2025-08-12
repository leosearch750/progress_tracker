/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../services/store';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const AnnualProgress: React.FC = () => {
  const { currentGoal } = useSelector((state: RootState) => state.goals);
  
  // Données simulées pour le graphique
  const data = [
    { name: 'RD', value: 45, color: '#4F46E5' },
    { name: 'LB', value: 30, color: '#10B981' },
    { name: 'LC', value: 60, color: '#F59E0B' },
    { name: 'PS', value: 25, color: '#3B82F6' },
  ];
  
  const COLORS = data.map(item => item.color);
  
  return (
    <div className="card p-4">
      <h2 className="text-xl font-semibold mb-4">Progression annuelle</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnnualProgress;

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DailyProgress: React.FC = () => {
  // Données simulées pour le graphique
  const data = [
    { name: 'Lun', RD: 2, LB: 5, LC: 10, PS: 1 },
    { name: 'Mar', RD: 1, LB: 3, LC: 15, PS: 0.5 },
    { name: 'Mer', RD: 2, LB: 4, LC: 0, PS: 1 },
    { name: 'Jeu', RD: 0, LB: 0, LC: 5, PS: 0 },
    { name: 'Ven', RD: 2, LB: 6, LC: 8, PS: 1.5 },
    { name: 'Sam', RD: 1, LB: 2, LC: 12, PS: 1 },
    { name: 'Dim', RD: 2, LB: 7, LC: 20, PS: 2 },
  ];

  return (
    <div className="card p-4">
      <h2 className="text-xl font-semibold mb-4">Progression hebdomadaire</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="RD" fill="#4F46E5" name="RD" />
            <Bar dataKey="LB" fill="#10B981" name="LB (chapitres)" />
            <Bar dataKey="LC" fill="#F59E0B" name="LC (pages)" />
            <Bar dataKey="PS" fill="#3B82F6" name="PS (heures)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyProgress;

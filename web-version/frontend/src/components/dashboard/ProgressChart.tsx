import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressChart: React.FC = () => {
  // Données simulées pour le graphique
  const data = [
    { name: 'Jan', RD: 60, LB: 50, LC: 40, PS: 30 },
    { name: 'Fév', RD: 120, LB: 110, LC: 95, PS: 65 },
    { name: 'Mar', RD: 190, LB: 180, LC: 150, PS: 95 },
    { name: 'Avr', RD: 240, LB: 240, LC: 210, PS: 125 },
    { name: 'Mai', RD: 310, LB: 300, LC: 270, PS: 160 },
    { name: 'Juin', RD: 370, LB: 350, LC: 330, PS: 190 },
    { name: 'Juil', RD: 430, LB: 410, LC: 380, PS: 220 },
    { name: 'Août', RD: 490, LB: 470, LC: 440, PS: 250 },
    { name: 'Sep', RD: 550, LB: 530, LC: 500, PS: 280 },
    { name: 'Oct', RD: 610, LB: 590, LC: 560, PS: 310 },
    { name: 'Nov', RD: 670, LB: 650, LC: 620, PS: 340 },
    { name: 'Déc', RD: 730, LB: 710, LC: 680, PS: 370 },
  ];

  return (
    <div className="card p-4">
      <h2 className="text-xl font-semibold mb-4">Progression annuelle</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="RD" stroke="#4F46E5" activeDot={{ r: 8 }} name="RD" />
            <Line type="monotone" dataKey="LB" stroke="#10B981" name="LB (chapitres)" />
            <Line type="monotone" dataKey="LC" stroke="#F59E0B" name="LC (pages)" />
            <Line type="monotone" dataKey="PS" stroke="#3B82F6" name="PS (heures)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;

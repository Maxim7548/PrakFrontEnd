import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const data = [
  { name: 'Пн', registrations: 12 },
  { name: 'Вт', registrations: 19 },
  { name: 'Ср', registrations: 8 },
  { name: 'Чт', registrations: 24 },
  { name: 'Пт', registrations: 15 },
  { name: 'Сб', registrations: 30 },
  { name: 'Нд', registrations: 10 },
];

const AnalyticsPage = () => {
  return (
    <div className="container analytics-page">
      <Link to="/" className="back-link">← На головну</Link>
      
      <h2 className="analytics-title">Аналітика реєстрацій</h2>
      <p className="analytics-desc">Графік активності користувачів за останній тиждень:</p>
      <div className="chart-card">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: '#f1f2f6' }} />
            <Legend verticalAlign="top" height={36}/>
            <Bar 
              dataKey="registrations" 
              name="Кількість реєстрацій" 
              fill="#10ac84" 
              radius={[4, 4, 0, 0]} 
              barSize={40} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const AnalyticsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://event-gallery-backend.onrender.com/analytics')
      .then(res => res.json())
      .then(fetchedData => {
        if (fetchedData.length === 0) {
          setData([{ name: 'Немає даних', registrations: 0 }]);
        } else {
          setData(fetchedData);
        }
      })
      .catch(err => console.error("Помилка завантаження графіка:", err));
  }, []);

  return (
    <div className="container analytics-page">
      <Link to="/" className="back-link">← На головну</Link>
      
      <h2 className="analytics-title">Аналітика реєстрацій</h2>
      <p className="analytics-desc">Графік активності користувачів (Реальні дані з MongoDB):</p>
      <div className="chart-card">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
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
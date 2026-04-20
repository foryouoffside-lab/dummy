'use client';

import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function ActivityChart({ data, title, type = 'line' }) {
  const chartData = data || [
    { date: 'Mon', score: 0 }, { date: 'Tue', score: 0 },
    { date: 'Wed', score: 0 }, { date: 'Thu', score: 0 },
    { date: 'Fri', score: 0 }, { date: 'Sat', score: 0 }, { date: 'Sun', score: 0 }
  ];

  const ChartComponent = type === 'area' ? AreaChart : LineChart;
  const DataComponent = type === 'area' ? Area : Line;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={chartData}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} domain={[0, 100]} />
          <Tooltip />
          <DataComponent
            type="monotone"
            dataKey="score"
            stroke="#3B82F6"
            strokeWidth={2}
            fill="url(#colorGradient)"
          />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}

'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function SkillRadar({ data }) {
  const radarData = data || [
    { subject: 'Memory', score: 0, fullMark: 100 },
    { subject: 'Attention', score: 0, fullMark: 100 },
    { subject: 'Processing', score: 0, fullMark: 100 },
    { subject: 'Coordination', score: 0, fullMark: 100 },
    { subject: 'Reaction', score: 0, fullMark: 100 },
    { subject: 'Focus', score: 0, fullMark: 100 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Skill Assessment</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis dataKey="subject" stroke="#6B7280" fontSize={12} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9CA3AF" />
          <Radar
            name="Your Score"
            dataKey="score"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

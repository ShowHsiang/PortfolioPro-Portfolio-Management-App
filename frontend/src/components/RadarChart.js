// src/components/RadarChart.js
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

const CustomRadarChart = ({ data }) => (
  <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={400} data={data}>
    <PolarGrid />
    <PolarAngleAxis dataKey="subject" />
    <PolarRadiusAxis />
    <Radar name="Portfolio" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    <Tooltip />
  </RadarChart>
);

export default CustomRadarChart;
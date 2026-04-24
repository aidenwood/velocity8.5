import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface ChartDataPoint {
  label: string;
  value: number;
  [key: string]: string | number;
}

interface ChartProps {
  data: ChartDataPoint[];
  dataKey?: string;
  title?: string;
  color?: string;
  height?: number;
}

export function Chart({
  data,
  dataKey = 'value',
  title,
  color = '#8b5cf6',
  height = 300,
}: ChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-primary-500/10 bg-primary-950/40 p-6 backdrop-blur-sm" style={{ height }}>
        <p className="text-sm text-primary-400/50">No data available</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-primary-500/10 bg-primary-950/40 p-5 backdrop-blur-sm">
      {title && <h3 className="mb-4 text-sm font-medium text-primary-200">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.08)" />
          <XAxis
            dataKey="label"
            tick={{ fill: 'rgba(139, 92, 246, 0.4)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(139, 92, 246, 0.1)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'rgba(139, 92, 246, 0.4)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '13px',
            }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${color})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: { value: number; label: string };
  icon?: React.ReactNode;
}

export function StatCard({ label, value, trend, icon }: StatCardProps) {
  const isPositive = trend && trend.value >= 0;

  return (
    <div className="rounded-2xl border border-primary-500/10 bg-primary-950/40 p-5 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-primary-300/70">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center text-xs font-medium ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            <svg
              className={`mr-0.5 h-3 w-3 ${isPositive ? '' : 'rotate-180'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-primary-400/50">{trend.label}</span>
        </div>
      )}
    </div>
  );
}

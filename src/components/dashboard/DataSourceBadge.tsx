import React from 'react';
import type { AnalyticsSource } from '../../lib/types';

interface DataSourceBadgeProps {
  source: AnalyticsSource;
  connected?: boolean;
}

const sourceConfig: Record<AnalyticsSource, { label: string; color: string }> = {
  google_analytics: { label: 'Google Analytics', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
  search_console: { label: 'Search Console', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
  facebook: { label: 'Facebook', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  instagram: { label: 'Instagram', color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
  crm: { label: 'CRM', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
};

export function DataSourceBadge({ source, connected = true }: DataSourceBadgeProps) {
  const config = sourceConfig[source] || { label: source, color: 'text-primary-400 bg-primary-500/10 border-primary-500/20' };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${config.color}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${connected ? 'bg-current' : 'bg-primary-600/40'}`}
      />
      {config.label}
    </span>
  );
}

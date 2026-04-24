import React, { useState, useMemo } from 'react';
import type { AnalyticsSnapshot, AnalyticsSource } from '../../lib/types';
import { Chart } from './Chart';
import { DataSourceBadge } from './DataSourceBadge';
import { Skeleton, ChartSkeleton } from './Skeleton';

interface AnalyticsPanelProps {
  snapshots: AnalyticsSnapshot[];
  loading?: boolean;
}

const sourceTabs: { key: AnalyticsSource; label: string }[] = [
  { key: 'google_analytics', label: 'GA' },
  { key: 'search_console', label: 'Search' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'crm', label: 'CRM' },
];

const metricsForSource: Record<AnalyticsSource, string[]> = {
  google_analytics: ['visitors', 'page_views', 'conversions', 'bounce_rate'],
  search_console: ['impressions', 'clicks', 'ctr', 'position'],
  facebook: ['reach', 'engagement', 'followers'],
  instagram: ['reach', 'engagement', 'followers'],
  crm: ['leads', 'deals', 'revenue'],
};

function formatMetricName(key: string): string {
  return key
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function AnalyticsPanel({ snapshots, loading }: AnalyticsPanelProps) {
  const availableSources = useMemo(() => {
    const sources = new Set(snapshots.map((s) => s.source));
    return sourceTabs.filter((t) => sources.has(t.key));
  }, [snapshots]);

  const [activeSource, setActiveSource] = useState<AnalyticsSource>(
    availableSources[0]?.key || 'google_analytics'
  );

  const filteredSnapshots = useMemo(
    () =>
      snapshots
        .filter((s) => s.source === activeSource)
        .sort((a, b) => new Date(a.period_start).getTime() - new Date(b.period_start).getTime()),
    [snapshots, activeSource]
  );

  const activeMetrics = metricsForSource[activeSource] || [];

  const chartData = useMemo(() => {
    return filteredSnapshots.map((s) => ({
      label: new Date(s.period_start).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' }),
      ...Object.fromEntries(activeMetrics.map((m) => [m, s.metrics[m] ?? 0])),
      value: s.metrics[activeMetrics[0]] ?? 0,
    }));
  }, [filteredSnapshots, activeMetrics]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-xl" />
          <Skeleton className="h-8 w-20 rounded-xl" />
          <Skeleton className="h-8 w-20 rounded-xl" />
        </div>
        <ChartSkeleton />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-primary-500/10 bg-primary-950/40 p-3 backdrop-blur-sm">
              <Skeleton className="mb-1 h-3 w-16" />
              <Skeleton className="h-6 w-12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Source Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {availableSources.length > 0 ? (
          availableSources.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSource(tab.key)}
              className={`rounded-xl px-3.5 py-1.5 text-sm font-medium transition ${
                activeSource === tab.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-500/10 text-primary-300/60 hover:bg-primary-500/20 hover:text-primary-200'
              }`}
            >
              {tab.label}
            </button>
          ))
        ) : (
          <p className="text-sm text-primary-400/50">No analytics data sources connected.</p>
        )}
      </div>

      {/* Connected Sources */}
      <div className="flex flex-wrap gap-2">
        {availableSources.map((tab) => (
          <DataSourceBadge key={tab.key} source={tab.key} connected />
        ))}
      </div>

      {/* Chart */}
      {chartData.length > 0 ? (
        <Chart
          data={chartData}
          dataKey={activeMetrics[0] || 'value'}
          title={formatMetricName(activeMetrics[0] || 'value')}
        />
      ) : (
        <div className="flex items-center justify-center rounded-2xl border border-primary-500/10 bg-primary-950/40 p-12 backdrop-blur-sm">
          <p className="text-sm text-primary-400/50">No data for this source yet.</p>
        </div>
      )}

      {/* Summary Grid */}
      {filteredSnapshots.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {activeMetrics.map((metric) => {
            const latest = filteredSnapshots[filteredSnapshots.length - 1];
            const val = latest?.metrics[metric];
            return (
              <div
                key={metric}
                className="rounded-xl border border-primary-500/10 bg-primary-950/40 p-3 backdrop-blur-sm"
              >
                <p className="text-xs text-primary-400/50">{formatMetricName(metric)}</p>
                <p className="mt-0.5 text-lg font-semibold text-white">
                  {val != null ? val.toLocaleString() : '-'}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

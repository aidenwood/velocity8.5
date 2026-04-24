import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { AnalyticsSnapshot } from '../../lib/types';
import { AuthProvider } from './AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardShell } from './DashboardShell';
import { AnalyticsPanel } from './AnalyticsPanel';

function AnalyticsContent() {
  const [snapshots, setSnapshots] = useState<AnalyticsSnapshot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('analytics_snapshots')
        .select('*')
        .order('period_start', { ascending: true });
      setSnapshots(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <DashboardShell currentPath="/dashboard/analytics">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-primary-400/60">
          Aggregated performance data across all your projects.
        </p>
      </div>

      <AnalyticsPanel snapshots={snapshots} loading={loading} />
    </DashboardShell>
  );
}

export default function AnalyticsPage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AnalyticsContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}

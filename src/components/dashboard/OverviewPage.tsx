import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Project, AnalyticsSnapshot, Invoice, DashboardSummary } from '../../lib/types';
import { AuthProvider } from './AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardShell } from './DashboardShell';
import { StatCard } from './StatCard';
import { Chart } from './Chart';
import { ProjectCard } from './ProjectCard';

function OverviewContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [snapshots, setSnapshots] = useState<AnalyticsSnapshot[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [projectsRes, snapshotsRes, invoicesRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('analytics_snapshots').select('*').order('period_start', { ascending: true }),
        supabase.from('invoices').select('*').order('created_at', { ascending: false }),
      ]);

      setProjects(projectsRes.data ?? []);
      setSnapshots(snapshotsRes.data ?? []);
      setInvoices(invoicesRes.data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const summary: DashboardSummary = {
    activeProjects: projects.filter((p) => p.status === 'active').length,
    totalVisitorsThisMonth: snapshots
      .filter((s) => {
        const now = new Date();
        const start = new Date(s.period_start);
        return start.getMonth() === now.getMonth() && start.getFullYear() === now.getFullYear();
      })
      .reduce((sum, s) => sum + (s.metrics.visitors ?? 0), 0),
    pendingInvoices: invoices.filter((i) => i.status === 'pending').length,
    pendingAmount: invoices
      .filter((i) => i.status === 'pending')
      .reduce((sum, i) => sum + i.amount_cents, 0),
  };

  const visitorChartData = snapshots
    .filter((s) => s.source === 'google_analytics')
    .slice(-12)
    .map((s) => ({
      label: new Date(s.period_start).toLocaleDateString('en-AU', { month: 'short' }),
      value: s.metrics.visitors ?? 0,
    }));

  if (loading) {
    return (
      <DashboardShell currentPath="/dashboard">
        <div className="flex items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell currentPath="/dashboard">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Overview</h1>
        <p className="mt-1 text-sm text-primary-400/60">Welcome back. Here is a summary of your projects.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active Projects"
          value={summary.activeProjects}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75" />
            </svg>
          }
        />
        <StatCard
          label="Visitors This Month"
          value={summary.totalVisitorsThisMonth.toLocaleString()}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
        />
        <StatCard
          label="Pending Invoices"
          value={summary.pendingInvoices}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Amount Due"
          value={new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(summary.pendingAmount / 100)}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Chart */}
      {visitorChartData.length > 0 && (
        <div className="mt-6">
          <Chart data={visitorChartData} title="Website Visitors" />
        </div>
      )}

      {/* Recent Projects */}
      {projects.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-3 text-lg font-medium text-white">Your Projects</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

export default function OverviewPage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <OverviewContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Invoice } from '../../lib/types';
import { AuthProvider } from './AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardShell } from './DashboardShell';
import { InvoiceTable } from './InvoiceTable';
import { StatCard } from './StatCard';

function InvoicesContent() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });
      setInvoices(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const totalInvoiced = invoices.reduce((s, i) => s + i.amount_cents, 0);
  const totalPaid = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount_cents, 0);
  const totalPending = invoices.filter((i) => i.status === 'pending').reduce((s, i) => s + i.amount_cents, 0);
  const totalOverdue = invoices.filter((i) => i.status === 'overdue').reduce((s, i) => s + i.amount_cents, 0);

  const fmt = (cents: number) =>
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(cents / 100);

  return (
    <DashboardShell currentPath="/dashboard/invoices">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Invoices</h1>
        <p className="mt-1 text-sm text-primary-400/60">
          {invoices.length} invoice{invoices.length !== 1 ? 's' : ''} total
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Invoiced" value={fmt(totalInvoiced)} />
        <StatCard label="Paid" value={fmt(totalPaid)} />
        <StatCard label="Pending" value={fmt(totalPending)} />
        <StatCard label="Overdue" value={fmt(totalOverdue)} />
      </div>

      <InvoiceTable invoices={invoices} loading={loading} />
    </DashboardShell>
  );
}

export default function InvoicesPage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <InvoicesContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}

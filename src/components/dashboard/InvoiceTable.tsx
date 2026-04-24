import React from 'react';
import type { Invoice } from '../../lib/types';

interface InvoiceTableProps {
  invoices: Invoice[];
  loading?: boolean;
}

const statusStyles: Record<string, string> = {
  paid: 'bg-green-500/10 text-green-400 border-green-500/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  overdue: 'bg-red-500/10 text-red-400 border-red-500/20',
};

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(cents / 100);
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function InvoiceTable({ invoices, loading }: InvoiceTableProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-primary-500/10 bg-primary-950/40 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="rounded-2xl border border-primary-500/10 bg-primary-950/40 p-6 backdrop-blur-sm">
        <p className="text-center text-sm text-primary-400/50">No invoices found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-primary-500/10 bg-primary-950/40 backdrop-blur-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary-500/10">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-400/50">
                Amount
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-400/50">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-400/50">
                Due Date
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-400/50">
                Paid
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-500/5">
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="transition hover:bg-primary-500/5"
              >
                <td className="whitespace-nowrap px-5 py-3.5 text-sm font-medium text-white">
                  {formatCurrency(invoice.amount_cents)}
                </td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <span
                    className={`inline-flex rounded-lg border px-2.5 py-0.5 text-xs font-medium capitalize ${
                      statusStyles[invoice.status] || statusStyles.pending
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-primary-300/60">
                  {formatDate(invoice.due_date)}
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-primary-300/60">
                  {formatDate(invoice.paid_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

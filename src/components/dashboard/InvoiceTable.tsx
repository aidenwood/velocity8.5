import React from 'react';
import type { Invoice } from '../../lib/types';
import { TableRowSkeleton } from './Skeleton';

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
      <div className="rounded-2xl border border-primary-500/10 bg-primary-950/40 backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary-500/10">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-400/50">Amount</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-400/50">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-400/50">Due Date</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-400/50">Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-500/5">
              <TableRowSkeleton cols={4} />
              <TableRowSkeleton cols={4} />
              <TableRowSkeleton cols={4} />
              <TableRowSkeleton cols={4} />
              <TableRowSkeleton cols={4} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-primary-500/10 bg-primary-950/40 py-12 backdrop-blur-sm">
        <svg className="mb-3 h-8 w-8 text-primary-500/30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
        <p className="text-sm text-primary-400/50">No invoices yet.</p>
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

/** Database row types matching the Supabase schema */

export interface Profile {
  id: string;
  full_name: string | null;
  company_name: string | null;
  avatar_url: string | null;
  role: 'reader' | 'client' | 'admin';
  created_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  name: string;
  domain: string | null;
  status: 'active' | 'completed' | 'paused';
  services: string[] | null;
  start_date: string | null;
  created_at: string;
}

export type AnalyticsSource =
  | 'google_analytics'
  | 'search_console'
  | 'facebook'
  | 'instagram'
  | 'crm';

export interface AnalyticsMetrics {
  visitors?: number;
  page_views?: number;
  conversions?: number;
  bounce_rate?: number;
  avg_session_duration?: number;
  impressions?: number;
  clicks?: number;
  ctr?: number;
  position?: number;
  reach?: number;
  engagement?: number;
  followers?: number;
  leads?: number;
  deals?: number;
  revenue?: number;
  [key: string]: number | undefined;
}

export interface AnalyticsSnapshot {
  id: string;
  project_id: string;
  source: AnalyticsSource;
  period_start: string;
  period_end: string;
  metrics: AnalyticsMetrics;
  created_at: string;
}

export type InvoiceStatus = 'paid' | 'pending' | 'overdue';

export interface Invoice {
  id: string;
  project_id: string;
  stripe_invoice_id: string | null;
  amount_cents: number;
  status: InvoiceStatus;
  due_date: string | null;
  paid_at: string | null;
  created_at: string;
}

/** Joined types for convenience */
export interface ProjectWithAnalytics extends Project {
  analytics_snapshots: AnalyticsSnapshot[];
}

export interface ProjectWithInvoices extends Project {
  invoices: Invoice[];
}

/** Dashboard summary stats */
export interface DashboardSummary {
  activeProjects: number;
  totalVisitorsThisMonth: number;
  pendingInvoices: number;
  pendingAmount: number;
}

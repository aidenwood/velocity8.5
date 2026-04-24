import { useState, useEffect, useCallback, useMemo } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import { supabase } from '../../lib/supabase';
import type { Session } from '@supabase/supabase-js';

/* ─── Navigation Data ─── */

const services = {
  'Web Design': {
    href: '/web-design',
    color: 'bg-violet-500',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25h-13.5A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25h-13.5A2.25 2.25 0 0 1 3 12V5.25" />
      </svg>
    ),
    items: [
      { name: 'Velocity Framework', href: '/web-design/velocity', desc: 'Lightning-fast custom sites' },
      { name: 'WordPress', href: '/web-design/wordpress', desc: 'Managed WP solutions' },
      { name: 'Shopify', href: '/web-design/shopify', desc: 'E-commerce stores' },
      { name: 'UX Design', href: '/web-design/ux-design', desc: 'User experience optimization' },
      { name: 'SEO Optimisation', href: '/web-design/seo-optimisation', desc: 'Search-first architecture' },
      { name: 'Page Speed', href: '/web-design/pageload-optimisation', desc: 'Core Web Vitals' },
      { name: 'CRO', href: '/web-design/conversion-optimisation', desc: 'Conversion rate optimization' },
    ],
  },
  Development: {
    href: '/web-development',
    color: 'bg-orange-500',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    items: [
      { name: 'SaaS Platforms', href: '/web-development#projects', desc: 'Multi-tenant apps & dashboards' },
      { name: 'API Integrations', href: '/web-development#projects', desc: 'Stripe, CRM, Maps & more' },
      { name: 'Data Pipelines', href: '/web-development#projects', desc: 'BigQuery, ETL, analytics' },
      { name: '3D & Creative', href: '/web-development#projects', desc: 'Three.js, WebGL, MIDI' },
      { name: 'Full Stack', href: '/web-development#projects', desc: 'Supabase, React, TypeScript' },
    ],
  },
  Branding: {
    href: '/graphic-design',
    color: 'bg-cyan-500',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.764m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    items: [
      { name: 'Brand Identity', href: '/graphic-design/brand-identity', desc: 'Complete visual identity' },
      { name: 'Logo Design', href: '/graphic-design/brand-identity', desc: 'Mark & wordmark design' },
      { name: 'Brand Strategy', href: '/graphic-design/brand-strategy', desc: 'Positioning & messaging' },
      { name: 'Packaging', href: '/graphic-design/packaging-design', desc: 'Product packaging' },
      { name: 'Interactive Design', href: '/graphic-design/interactive-design', desc: 'Motion & interactive' },
      { name: 'Ad Campaigns', href: '/graphic-design/ad-campaign-design', desc: 'Campaign creative' },
    ],
  },
  Marketing: {
    href: '/digital-marketing',
    color: 'bg-green-500',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    items: [
      { name: 'SEO', href: '/digital-marketing/seo', desc: 'Organic search growth' },
      { name: 'Local SEO', href: '/digital-marketing/local-seo', desc: 'Maps & local pack' },
      { name: 'Google Ads', href: '/digital-marketing/google-search-management', desc: 'Search campaign mgmt' },
      { name: 'Facebook Ads', href: '/digital-marketing/facebook-ad-management', desc: 'Meta ad management' },
      { name: 'Video Ads', href: '/digital-marketing/video-ads', desc: 'Video production & ads' },
      { name: 'Interactive Ads', href: '/digital-marketing/interactive-ads', desc: 'HTML5 display ads' },
      { name: 'Keyword Research', href: '/digital-marketing/keyword-research', desc: 'Search intent mapping' },
    ],
  },
};

const works = [
  { name: 'All Case Studies', href: '/case-studies', tag: 'Portfolio' },
  { name: 'Ball Realty', href: '/case-studies#ball-realty', tag: 'Ads + Web' },
  { name: 'Rebuild Relief', href: '/case-studies#rebuild-relief', tag: 'SaaS + Data' },
  { name: 'Esteem Clinics', href: '/web-design/previous-work/esteem-clinics', tag: 'WordPress' },
  { name: 'Boogie Collective', href: '/web-design/previous-work/the-boogie-collective', tag: 'Velocity' },
];

const searchIndex = [
  { name: 'Home', href: '/', category: 'Pages' },
  { name: 'About', href: '/about', category: 'Pages' },
  { name: 'Pricing', href: '/pricing', category: 'Pages' },
  { name: 'Contact', href: '/contact', category: 'Pages' },
  { name: 'Book a Discovery Call', href: '/book', category: 'Pages' },
  { name: 'Web Design', href: '/web-design', category: 'Services' },
  { name: 'Web Development', href: '/web-development', category: 'Services' },
  { name: 'Graphic Design', href: '/graphic-design', category: 'Services' },
  { name: 'Digital Marketing', href: '/digital-marketing', category: 'Services' },
  { name: 'Velocity Framework', href: '/web-design/velocity', category: 'Services' },
  { name: 'SEO', href: '/digital-marketing/seo', category: 'Services' },
  { name: 'Google Ads', href: '/digital-marketing/google-search-management', category: 'Services' },
  { name: 'Brand Identity', href: '/graphic-design/brand-identity', category: 'Services' },
  { name: 'Case Studies', href: '/case-studies', category: 'Work' },
  { name: 'Blog', href: '/blog/velocity-7-4', category: 'Blog' },
  { name: 'Documentation', href: '/docs', category: 'Docs' },
  { name: 'Client Dashboard', href: '/dashboard', category: 'Dashboard' },
];

/* ─── Breadcrumb / subpage data for Row 2 ─── */

interface SubpageMap {
  [prefix: string]: { label: string; items: { name: string; href: string }[] };
}

const subpageMap: SubpageMap = {
  '/web-design': {
    label: 'Web Design',
    items: services['Web Design'].items,
  },
  '/web-development': {
    label: 'Development',
    items: services.Development.items,
  },
  '/graphic-design': {
    label: 'Branding',
    items: services.Branding.items,
  },
  '/digital-marketing': {
    label: 'Marketing',
    items: services.Marketing.items,
  },
  '/case-studies': {
    label: 'Work',
    items: works.map((w) => ({ name: w.name, href: w.href })),
  },
  '/dashboard': {
    label: 'Dashboard',
    items: [
      { name: 'Overview', href: '/dashboard' },
      { name: 'Projects', href: '/dashboard/projects' },
      { name: 'Analytics', href: '/dashboard/analytics' },
      { name: 'Invoices', href: '/dashboard/invoices' },
      { name: 'Settings', href: '/dashboard/settings' },
    ],
  },
  '/docs': {
    label: 'Docs',
    items: [
      { name: 'Getting Started', href: '/docs/getting-started' },
      { name: 'Services', href: '/docs/services/web-design' },
      { name: 'Velocity', href: '/docs/velocity' },
      { name: 'For Clients', href: '/docs/for-clients/dashboard' },
    ],
  },
};

/* ─── Service Dropdown (used in top row) ─── */

function ServiceDropdown({
  label,
  data,
}: {
  label: string;
  data: (typeof services)['Web Design'];
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[13px] font-medium text-neutral-300 outline-none transition hover:bg-white/[0.07] hover:text-white data-[state=open]:bg-white/[0.07] data-[state=open]:text-white">
          {data.icon}
          <span className="hidden sm:inline">{label}</span>
          <svg className="h-3 w-3 opacity-40" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 8.825a.7.7 0 01-.5-.2L2.2 5.3a.7.7 0 01.1-1 .68.68 0 01.9.1L6 7.225l2.8-2.8a.68.68 0 01.9-.1.7.7 0 01.1 1L6.5 8.625a.7.7 0 01-.5.2z" />
          </svg>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-[100] min-w-[260px] rounded-xl border border-neutral-800 bg-neutral-900/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl will-change-[opacity,transform] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2"
          sideOffset={8}
          align="start"
        >
          <DropdownMenu.Item asChild>
            <a href={data.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white outline-none transition hover:bg-white/10 focus:bg-white/10">
              <span className={`h-2 w-2 rounded-full ${data.color}`} />
              All {label}
              <svg className="ml-auto h-3.5 w-3.5 opacity-40" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </a>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="mx-2 my-1 h-px bg-white/10" />
          {data.items.map((item) => (
            <DropdownMenu.Item key={item.href} asChild>
              <a href={item.href} className="group flex flex-col gap-0.5 rounded-lg px-3 py-2 outline-none transition hover:bg-white/10 focus:bg-white/10">
                <span className="text-[13px] font-medium text-neutral-200 group-hover:text-white">{item.name}</span>
                <span className="text-[11px] text-neutral-500">{item.desc}</span>
              </a>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

/* ─── Work Dropdown ─── */

function WorkDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[13px] font-medium text-neutral-300 outline-none transition hover:bg-white/[0.07] hover:text-white data-[state=open]:bg-white/[0.07] data-[state=open]:text-white">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
          </svg>
          <span className="hidden sm:inline">Work</span>
          <svg className="h-3 w-3 opacity-40" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 8.825a.7.7 0 01-.5-.2L2.2 5.3a.7.7 0 01.1-1 .68.68 0 01.9.1L6 7.225l2.8-2.8a.68.68 0 01.9-.1.7.7 0 01.1 1L6.5 8.625a.7.7 0 01-.5.2z" />
          </svg>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-[100] min-w-[220px] rounded-xl border border-neutral-800 bg-neutral-900/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl will-change-[opacity,transform] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2"
          sideOffset={8}
          align="start"
        >
          {works.map((w) => (
            <DropdownMenu.Item key={w.href} asChild>
              <a href={w.href} className="flex items-center justify-between rounded-lg px-3 py-2 outline-none transition hover:bg-white/10 focus:bg-white/10">
                <span className="text-[13px] font-medium text-neutral-200">{w.name}</span>
                <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-neutral-400">{w.tag}</span>
              </a>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

/* ─── Command Palette (Cmd+K) ─── */

function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-search' as any, handler);
    return () => window.removeEventListener('open-search' as any, handler);
  }, []);

  const filtered = query.length > 0
    ? searchIndex.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchIndex.slice(0, 8);

  const grouped = filtered.reduce<Record<string, typeof searchIndex>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed left-1/2 top-[15%] z-[201] w-[90vw] max-w-[540px] -translate-x-1/2 rounded-2xl border border-neutral-800 bg-neutral-900/95 shadow-2xl shadow-black/60 backdrop-blur-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <svg className="h-4 w-4 shrink-0 text-neutral-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
              placeholder="Search pages, services, work..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <kbd className="rounded border border-neutral-700 bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">ESC</kbd>
          </div>
          <div className="max-h-[50vh] overflow-y-auto p-2">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="mb-2">
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">{category}</div>
                {items.map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-neutral-300 outline-none transition hover:bg-white/10 hover:text-white focus:bg-white/10">
                    <svg className="h-3.5 w-3.5 shrink-0 opacity-40" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                    {item.name}
                  </a>
                ))}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-8 text-center text-sm text-neutral-500">No results found</div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ─── Mobile Menu ─── */

function MobileMenu({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 transition hover:bg-white/10 hover:text-white md:hidden" aria-label="Menu">
          <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" />
          </svg>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-x-0 top-0 z-[151] h-full overflow-y-auto bg-neutral-950 p-6">
          <div className="mb-8 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img src="/ax-logo-white.svg" alt="Aidxn" className="h-8" />
            </a>
            <Dialog.Close asChild>
              <button className="rounded-md p-2 text-neutral-400 hover:text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z" />
                </svg>
              </button>
            </Dialog.Close>
          </div>
          <nav className="flex flex-col gap-1">
            {session ? (
              <a href="/dashboard" className="mb-4 flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">
                Go to Dashboard
              </a>
            ) : (
              <a href="/book" className="mb-4 flex items-center justify-center rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">
                Book a Discovery Call
              </a>
            )}
            {Object.entries(services).map(([label, data]) => (
              <div key={label} className="mb-4">
                <a href={data.href} className="flex items-center gap-2 px-3 py-2 text-base font-semibold text-white">
                  <span className={`h-2 w-2 rounded-full ${data.color}`} />
                  {label}
                </a>
                <div className="ml-6 flex flex-col gap-0.5">
                  {data.items.map((item) => (
                    <a key={item.href} href={item.href} className="rounded-lg px-3 py-1.5 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-white">
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div className="my-2 h-px bg-white/10" />
            <a href="/about" className="rounded-lg px-3 py-2 text-sm text-neutral-300 hover:bg-white/5 hover:text-white">About</a>
            <a href="/pricing" className="rounded-lg px-3 py-2 text-sm text-neutral-300 hover:bg-white/5 hover:text-white">Pricing</a>
            <a href="/contact" className="rounded-lg px-3 py-2 text-sm text-neutral-300 hover:bg-white/5 hover:text-white">Contact</a>
            <a href="/docs" className="rounded-lg px-3 py-2 text-sm text-neutral-300 hover:bg-white/5 hover:text-white">Docs</a>
            <a href="/dashboard" className="rounded-lg px-3 py-2 text-sm text-neutral-300 hover:bg-white/5 hover:text-white">Dashboard</a>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ─── Dynamic Breadcrumb Row ─── */

function BreadcrumbRow() {
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const { breadcrumbs, suggestions } = useMemo(() => {
    if (!path || path === '/') {
      return {
        breadcrumbs: [] as { label: string; href: string }[],
        suggestions: [
          { name: 'About', href: '/about' },
          { name: 'Pricing', href: '/pricing' },
          { name: 'Case Studies', href: '/case-studies' },
          { name: 'Contact', href: '/contact' },
          { name: 'Blog', href: '/blog/velocity-7-4' },
          { name: 'Get Started', href: '/get-started' },
        ],
      };
    }

    // Build breadcrumbs from path
    const crumbs: { label: string; href: string }[] = [{ label: 'Home', href: '/' }];
    const segments = path.split('/').filter(Boolean);

    // Find matching section
    let matchedSection: (typeof subpageMap)[string] | null = null;
    let sectionPrefix = '';

    for (const prefix of Object.keys(subpageMap)) {
      if (path.startsWith(prefix)) {
        matchedSection = subpageMap[prefix];
        sectionPrefix = prefix;
        break;
      }
    }

    if (matchedSection) {
      crumbs.push({ label: matchedSection.label, href: sectionPrefix });

      // If we're deeper than the section root, add the current page
      if (path !== sectionPrefix && path !== sectionPrefix + '/') {
        const lastSegment = segments[segments.length - 1];
        const prettyName = lastSegment
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
        crumbs.push({ label: prettyName, href: path });
      }
    } else {
      // Generic breadcrumb
      const lastSegment = segments[segments.length - 1];
      const prettyName = lastSegment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      crumbs.push({ label: prettyName, href: path });
    }

    // Suggestions: sibling pages from the matched section
    const subs = matchedSection?.items.filter((i) => i.href !== path) ?? [];

    return { breadcrumbs: crumbs, suggestions: subs };
  }, [path]);

  return (
    <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' as any }}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="flex shrink-0 items-center gap-0.5 text-[12px]">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-0.5">
              {i > 0 && (
                <svg className="h-3 w-3 text-neutral-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              )}
              {i === breadcrumbs.length - 1 ? (
                <span className="text-neutral-300">{crumb.label}</span>
              ) : (
                <a href={crumb.href} className="text-neutral-500 transition hover:text-neutral-300">
                  {i === 0 ? (
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  ) : (
                    crumb.label
                  )}
                </a>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Separator */}
      {breadcrumbs.length > 0 && suggestions.length > 0 && (
        <span className="mx-1.5 h-3 w-px shrink-0 bg-neutral-800" />
      )}

      {/* Subpage suggestions */}
      {suggestions.slice(0, 6).map((s) => (
        <a
          key={s.href}
          href={s.href}
          className="shrink-0 rounded-md px-2 py-1 text-[11px] font-medium text-neutral-500 transition hover:bg-white/[0.05] hover:text-neutral-300"
        >
          {s.name}
        </a>
      ))}
    </div>
  );
}

/* ─── Main Header ─── */

export default function HeaderApp() {
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setAuthLoading(false);
    }).catch(() => setAuthLoading(false));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* ── Row 1: Solid background ── */}
        <div
          className={`transition-colors duration-200 ${
            scrolled
              ? 'bg-neutral-950/95 backdrop-blur-xl'
              : 'bg-neutral-950'
          }`}
        >
          <div className="mx-auto flex h-12 w-full max-w-[1920px] items-center justify-between px-3 sm:px-5 lg:px-8">
            {/* LEFT: Logo + Category nav */}
            <div className="flex items-center gap-0.5">
              <a href="/" className="mr-2 flex shrink-0 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 sm:mr-4">
                <img src="/ax-logo-white.svg" alt="Aidxn Design" className="h-6 w-auto sm:h-7" />
              </a>

              {/* Category dropdowns — hidden on mobile, visible md+ */}
              <nav className="hidden items-center gap-0 md:flex">
                {Object.entries(services).map(([label, data]) => (
                  <ServiceDropdown key={label} label={label} data={data} />
                ))}
                <WorkDropdown />
              </nav>
            </div>

            {/* RIGHT: Search, Docs, Notifications, Auth */}
            <div className="flex items-center gap-1">
              {/* Search — pill on sm+, icon on mobile */}
              <button
                onClick={() => window.dispatchEvent(new Event('open-search'))}
                className="hidden items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/50 px-2.5 py-1 text-[12px] text-neutral-500 transition hover:border-neutral-700 hover:text-neutral-300 sm:inline-flex"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                Search
                <kbd className="rounded border border-neutral-700 px-1 py-0.5 font-mono text-[9px]">⌘K</kbd>
              </button>
              <button
                onClick={() => window.dispatchEvent(new Event('open-search'))}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 transition hover:bg-white/10 hover:text-white sm:hidden"
                aria-label="Search"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>

              {/* Docs link */}
              <a
                href="/docs"
                className="hidden h-8 w-8 items-center justify-center rounded-md text-neutral-400 transition hover:bg-white/10 hover:text-white sm:inline-flex"
                aria-label="Documentation"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </a>

              {/* Notifications */}
              {session && (
                <a
                  href="/dashboard"
                  className="relative inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Notifications"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                  {/* Notification dot */}
                  <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                </a>
              )}

              {/* Auth CTA */}
              {authLoading ? (
                <div className="h-8 w-24 animate-pulse rounded-lg bg-white/5" />
              ) : session ? (
                <a
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm shadow-violet-600/25 transition hover:bg-violet-500"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                  </svg>
                  Dashboard
                </a>
              ) : (
                <a
                  href="/book"
                  className="inline-flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm shadow-violet-600/25 transition hover:bg-violet-500"
                >
                  Book a Call
                </a>
              )}

              <MobileMenu session={session} />
            </div>
          </div>
        </div>

        {/* ── Row 2: Clear/transparent with blur, bottom border only ── */}
        <div className="border-b border-neutral-800/60 backdrop-blur-[7px]">
          <div className="mx-auto flex h-9 w-full max-w-[1920px] items-center justify-between px-3 sm:px-5 lg:px-8">
            {/* LEFT: Breadcrumbs + subpage suggestions */}
            <BreadcrumbRow />

            {/* RIGHT: Reserved — empty for now */}
            <div />
          </div>
        </div>
      </header>

      <CommandPalette />
    </>
  );
}

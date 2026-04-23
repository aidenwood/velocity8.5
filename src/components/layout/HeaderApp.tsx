import { useState, useEffect, useCallback } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';

/* ─── Navigation Data ─── */

const services = {
  'Web Design': {
    href: '/web-design',
    color: 'bg-violet-500',
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
  'Branding': {
    href: '/graphic-design',
    color: 'bg-cyan-500',
    items: [
      { name: 'Brand Identity', href: '/graphic-design/brand-identity', desc: 'Complete visual identity' },
      { name: 'Logo Design', href: '/graphic-design/brand-identity', desc: 'Mark & wordmark design' },
      { name: 'Brand Strategy', href: '/graphic-design/brand-strategy', desc: 'Positioning & messaging' },
      { name: 'Packaging', href: '/graphic-design/packaging-design', desc: 'Product packaging' },
      { name: 'Interactive Design', href: '/graphic-design/interactive-design', desc: 'Motion & interactive' },
      { name: 'Ad Campaigns', href: '/graphic-design/ad-campaign-design', desc: 'Campaign creative' },
    ],
  },
  'Marketing': {
    href: '/digital-marketing',
    color: 'bg-green-500',
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

const searchIndex = [
  { name: 'Home', href: '/', category: 'Pages' },
  { name: 'About', href: '/about', category: 'Pages' },
  { name: 'Pricing', href: '/pricing', category: 'Pages' },
  { name: 'Contact', href: '/contact', category: 'Pages' },
  { name: 'Book a Discovery Call', href: '/book', category: 'Pages' },
  { name: 'Moonshot Plan', href: '/moonshot-plan', category: 'Pages' },
  { name: 'Web Design', href: '/web-design', category: 'Services' },
  { name: 'Graphic Design', href: '/graphic-design', category: 'Services' },
  { name: 'Digital Marketing', href: '/digital-marketing', category: 'Services' },
  { name: 'Velocity Framework', href: '/web-design/velocity', category: 'Services' },
  { name: 'WordPress', href: '/web-design/wordpress', category: 'Services' },
  { name: 'SEO', href: '/digital-marketing/seo', category: 'Services' },
  { name: 'Google Ads', href: '/digital-marketing/google-search-management', category: 'Services' },
  { name: 'Facebook Ads', href: '/digital-marketing/facebook-ad-management', category: 'Services' },
  { name: 'Brand Identity', href: '/graphic-design/brand-identity', category: 'Services' },
  { name: 'Ball Realty', href: '/web-design/previous-work/ball-realty', category: 'Work' },
  { name: 'Esteem Clinics', href: '/web-design/previous-work/esteem-clinics', category: 'Work' },
  { name: 'The Boogie Collective', href: '/web-design/previous-work/the-boogie-collective', category: 'Work' },
  { name: 'Blog', href: '/blog/velocity-7-4', category: 'Blog' },
  { name: 'Documentation', href: '/docs', category: 'Docs' },
  { name: 'Client Dashboard', href: '/dashboard', category: 'Dashboard' },
];

/* ─── Service Dropdown ─── */

function ServiceDropdown({ label, data }: { label: string; data: typeof services['Web Design'] }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[13px] font-medium text-neutral-300 outline-none transition hover:bg-white/10 hover:text-white focus-visible:ring-1 focus-visible:ring-violet-500 data-[state=open]:bg-white/10 data-[state=open]:text-white">
          <span className={`mr-1.5 h-2 w-2 rounded-full ${data.color}`} />
          {label}
          <svg className="ml-0.5 h-3 w-3 opacity-50" viewBox="0 0 12 12" fill="currentColor">
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
            <a
              href={data.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white outline-none transition hover:bg-white/10 focus:bg-white/10"
            >
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
              <a
                href={item.href}
                className="group flex flex-col gap-0.5 rounded-lg px-3 py-2 outline-none transition hover:bg-white/10 focus:bg-white/10"
              >
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
  const works = [
    { name: 'Ball Realty', href: '/web-design/previous-work/ball-realty', tag: 'Velocity' },
    { name: 'Esteem Clinics', href: '/web-design/previous-work/esteem-clinics', tag: 'WordPress' },
    { name: 'Boogie Collective', href: '/web-design/previous-work/the-boogie-collective', tag: 'Velocity' },
  ];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[13px] font-medium text-neutral-300 outline-none transition hover:bg-white/10 hover:text-white focus-visible:ring-1 focus-visible:ring-violet-500 data-[state=open]:bg-white/10 data-[state=open]:text-white">
          Work
          <svg className="ml-0.5 h-3 w-3 opacity-50" viewBox="0 0 12 12" fill="currentColor">
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
              <a
                href={w.href}
                className="flex items-center justify-between rounded-lg px-3 py-2 outline-none transition hover:bg-white/10 focus:bg-white/10"
              >
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

  // Listen for custom event from other components
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
            <svg className="h-4 w-4 shrink-0 text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
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
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-neutral-300 outline-none transition hover:bg-white/10 hover:text-white focus:bg-white/10"
                  >
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

/* ─── More Dropdown (About, Pricing, Blog, Docs) ─── */

function MoreDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[13px] font-medium text-neutral-300 outline-none transition hover:bg-white/10 hover:text-white focus-visible:ring-1 focus-visible:ring-violet-500 data-[state=open]:bg-white/10 data-[state=open]:text-white">
          More
          <svg className="ml-0.5 h-3 w-3 opacity-50" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 8.825a.7.7 0 01-.5-.2L2.2 5.3a.7.7 0 01.1-1 .68.68 0 01.9.1L6 7.225l2.8-2.8a.68.68 0 01.9-.1.7.7 0 01.1 1L6.5 8.625a.7.7 0 01-.5.2z" />
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-[100] min-w-[180px] rounded-xl border border-neutral-800 bg-neutral-900/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl will-change-[opacity,transform] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2"
          sideOffset={8}
          align="start"
        >
          <DropdownMenu.Item asChild>
            <a href="/about" className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-neutral-200 outline-none transition hover:bg-white/10 focus:bg-white/10">About</a>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <a href="/pricing" className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-neutral-200 outline-none transition hover:bg-white/10 focus:bg-white/10">Pricing</a>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <a href="/blog/velocity-7-4" className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-neutral-200 outline-none transition hover:bg-white/10 focus:bg-white/10">Blog</a>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="mx-2 my-1 h-px bg-white/10" />
          <DropdownMenu.Item asChild>
            <a href="/docs" className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-neutral-200 outline-none transition hover:bg-white/10 focus:bg-white/10">
              Docs
              <span className="ml-auto rounded-md bg-violet-500/20 px-1.5 py-0.5 text-[10px] font-medium text-violet-300">New</span>
            </a>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <a href="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-neutral-200 outline-none transition hover:bg-white/10 focus:bg-white/10">
              Dashboard
              <span className="ml-auto rounded-md bg-green-500/20 px-1.5 py-0.5 text-[10px] font-medium text-green-300">Login</span>
            </a>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

/* ─── Mobile Menu ─── */

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 transition hover:bg-white/10 hover:text-white md:hidden" aria-label="Menu">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" />
          </svg>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-x-0 top-0 z-[151] h-full overflow-y-auto bg-neutral-950 p-6">
          <div className="flex items-center justify-between mb-8">
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
            <a href="/book" className="mb-4 flex items-center justify-center rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">
              Book a Discovery Call
            </a>

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

/* ─── Theme Toggle ─── */

function ThemeToggle() {
  const toggle = useCallback(() => {
    const alpine = (window as any).Alpine;
    if (alpine?.store('theme')) {
      alpine.store('theme').toggle();
    }
  }, []);

  return (
    <button
      onClick={toggle}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 transition hover:bg-white/10 hover:text-white"
      aria-label="Toggle theme"
    >
      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z" />
      </svg>
    </button>
  );
}

/* ─── Main Header ─── */

export default function HeaderApp() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'border-b border-white/5 bg-neutral-950/95 backdrop-blur-xl'
            : 'bg-neutral-950'
        }`}
      >
        <div className="mx-auto flex h-12 w-full max-w-[1920px] items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Left: Logo */}
          <div className="flex shrink-0 items-center">
            <a href="/" className="flex items-center gap-2.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500">
              <img
                src="/ax-logo-white.svg"
                alt="Aidxn Design"
                className="h-6 w-auto sm:h-7"
              />
            </a>
          </div>

          {/* Center: Navigation (desktop) */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {Object.entries(services).map(([label, data]) => (
              <ServiceDropdown key={label} label={label} data={data} />
            ))}
            <WorkDropdown />
            <MoreDropdown />
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            {/* Search trigger */}
            <button
              onClick={() => window.dispatchEvent(new Event('open-search'))}
              className="hidden items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/50 px-2.5 py-1 text-[12px] text-neutral-500 transition hover:border-neutral-700 hover:text-neutral-300 sm:inline-flex"
            >
              <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              Search
              <kbd className="rounded border border-neutral-700 px-1 py-0.5 font-mono text-[9px]">⌘K</kbd>
            </button>

            {/* Mobile search icon */}
            <button
              onClick={() => window.dispatchEvent(new Event('open-search'))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 transition hover:bg-white/10 hover:text-white sm:hidden"
              aria-label="Search"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            <ThemeToggle />

            {/* Book CTA (desktop) */}
            <a
              href="/book"
              className="hidden items-center gap-1 rounded-lg bg-violet-600 px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm shadow-violet-600/25 transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 sm:inline-flex"
            >
              Book a Call
            </a>

            <MobileMenu />
          </div>
        </div>
      </header>

      <CommandPalette />
    </>
  );
}

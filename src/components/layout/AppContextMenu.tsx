import * as ContextMenu from '@radix-ui/react-context-menu';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function AppContextMenu({ children }: Props) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <div className="contents">
          {children}
        </div>
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content className="z-[300] min-w-[200px] rounded-xl border border-neutral-800 bg-neutral-900/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl will-change-[opacity,transform] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">

          <ContextMenu.Label className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
            Navigate
          </ContextMenu.Label>

          <ContextMenu.Item asChild>
            <a href="/" className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] text-neutral-200 outline-none transition hover:bg-white/10 focus:bg-white/10">
              <svg className="h-3.5 w-3.5 opacity-40" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
              </svg>
              Home
            </a>
          </ContextMenu.Item>
          <ContextMenu.Item asChild>
            <a href="/web-design" className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] text-neutral-200 outline-none transition hover:bg-white/10 focus:bg-white/10">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              Web Design
            </a>
          </ContextMenu.Item>
          <ContextMenu.Item asChild>
            <a href="/graphic-design" className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] text-neutral-200 outline-none transition hover:bg-white/10 focus:bg-white/10">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              Branding
            </a>
          </ContextMenu.Item>
          <ContextMenu.Item asChild>
            <a href="/digital-marketing" className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] text-neutral-200 outline-none transition hover:bg-white/10 focus:bg-white/10">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Marketing
            </a>
          </ContextMenu.Item>

          <ContextMenu.Separator className="mx-2 my-1 h-px bg-white/10" />

          <ContextMenu.Label className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
            Quick Actions
          </ContextMenu.Label>

          <ContextMenu.Item
            onSelect={() => window.dispatchEvent(new Event('open-search'))}
            className="flex items-center justify-between rounded-lg px-3 py-1.5 text-[13px] text-neutral-200 outline-none transition hover:bg-white/10 focus:bg-white/10 cursor-default"
          >
            Search
            <kbd className="rounded border border-neutral-700 bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">⌘K</kbd>
          </ContextMenu.Item>

          <ContextMenu.Item asChild>
            <a href="/book" className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] text-neutral-200 outline-none transition hover:bg-white/10 focus:bg-white/10">
              <svg className="h-3.5 w-3.5 opacity-40" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
              </svg>
              Book a Call
            </a>
          </ContextMenu.Item>

          <ContextMenu.Item asChild>
            <a href="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] text-neutral-200 outline-none transition hover:bg-white/10 focus:bg-white/10">
              <svg className="h-3.5 w-3.5 opacity-40" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
              </svg>
              Client Dashboard
            </a>
          </ContextMenu.Item>

          <ContextMenu.Separator className="mx-2 my-1 h-px bg-white/10" />

          <ContextMenu.Item
            onSelect={() => {
              const alpine = (window as any).Alpine;
              if (alpine?.store('theme')) alpine.store('theme').toggle();
            }}
            className="flex items-center justify-between rounded-lg px-3 py-1.5 text-[13px] text-neutral-200 outline-none transition hover:bg-white/10 focus:bg-white/10 cursor-default"
          >
            Toggle Theme
            <svg className="h-3.5 w-3.5 opacity-40" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM11 1H13V4H11V1ZM11 20H13V23H11V20Z" />
            </svg>
          </ContextMenu.Item>

        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

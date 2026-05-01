"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  Code2,
  Briefcase,
  BookOpen,
  ExternalLink,
  Menu,
  X,
  Target,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/1', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/2', label: 'Weekly Plan', icon: CalendarDays },
  { href: '/3', label: 'DSA Tracker', icon: Code2 },
  { href: '/4', label: 'Job Log & Journal', icon: Briefcase },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-[220px]
          bg-[var(--color-surface-1)] border-r border-[var(--color-border)]
          flex flex-col
          transition-transform duration-200 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo area */}
        <div className="px-5 pt-6 pb-4 border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[var(--color-accent)] flex items-center justify-center">
              <Target size={14} className="text-white" />
            </div>
            <div>
              <h1 className="text-[13px] font-bold text-[var(--color-text-primary)] leading-tight font-[var(--font-display)]">
                War Room
              </h1>
              <p className="text-[10px] text-[var(--color-text-tertiary)] leading-tight">
                30-Day Sprint
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pt-4 space-y-0.5">
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium
                  transition-all duration-150 ease-out no-underline
                  ${isActive
                    ? 'bg-[var(--color-accent-surface)] text-[var(--color-accent)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]'
                  }
                `}
              >
                <item.icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Quick Links */}
        <div className="px-3 pb-3 space-y-1.5">
          <p className="px-3 text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] font-medium mb-1">
            Quick Links
          </p>
          {[
            { label: 'LinkedIn Jobs', url: 'https://linkedin.com/jobs' },
            { label: 'Wellfound', url: 'https://wellfound.com/jobs' },
            { label: 'YC Jobs', url: 'https://www.ycombinator.com/jobs' },
            { label: 'Naukri', url: 'https://naukri.com' },
          ].map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] no-underline transition-colors"
            >
              <ExternalLink size={12} />
              {link.label}
            </a>
          ))}
        </div>

        {/* The One Rule */}
        <div className="mx-3 mb-4 px-3 py-2.5 rounded-md bg-[var(--color-amber-surface)] border border-[var(--color-amber-dim)]/20">
          <p className="text-[10px] uppercase tracking-wider text-[var(--color-amber)] font-bold mb-1">
            The One Rule
          </p>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            No AI writes your code. Think. Struggle. Learn.
          </p>
        </div>
      </aside>
    </>
  );
}

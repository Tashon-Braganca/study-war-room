"use client";

import React, { useState } from 'react';
import { useStore, getCurrentDay, formatDate, getDateForDay } from '@/store/StoreProvider';
import type { JobApplication } from '@/store/StoreProvider';
import { JOB_SITES, INTERVIEW_AMMO, getJobLogMessage } from '@/store/data';
import {
  Plus,
  Trash2,
  ExternalLink,
  BookOpen,
  Briefcase,
  PenLine,
  ChevronDown,
  ChevronUp,
  Zap,
} from 'lucide-react';

const STATUS_COLORS: Record<string, { text: string; bg: string }> = {
  Applied: { text: 'var(--color-blue)', bg: 'var(--color-blue-surface)' },
  Callback: { text: 'var(--color-amber)', bg: 'var(--color-amber-surface)' },
  Interview: { text: 'var(--color-accent)', bg: 'var(--color-accent-surface)' },
  Rejected: { text: 'var(--color-red)', bg: 'var(--color-red-surface)' },
  Offer: { text: 'var(--color-green)', bg: 'var(--color-green-surface)' },
};

const STATUSES: JobApplication['status'][] = ['Applied', 'Callback', 'Interview', 'Rejected', 'Offer'];

export default function JobLogJournalPage() {
  const {
    state,
    addJobApplication,
    updateJobStatus,
    deleteJobApplication,
    updateJournal,
    getWeeklyAppCount,
  } = useStore();

  const today = getCurrentDay();
  const weeklyApps = getWeeklyAppCount();
  const totalApps = state.jobApplications.length;

  // Form state
  const [formOpen, setFormOpen] = useState(false);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [platform, setPlatform] = useState('LinkedIn');
  const [formStatus, setFormStatus] = useState<JobApplication['status']>('Applied');

  // Sections toggle
  const [activeSection, setActiveSection] = useState<'jobs' | 'journal' | 'ammo'>('jobs');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;
    addJobApplication({
      company: company.trim(),
      role: role.trim(),
      date: new Date().toISOString().split('T')[0],
      platform,
      status: formStatus,
    });
    setCompany('');
    setRole('');
    setPlatform('LinkedIn');
    setFormStatus('Applied');
    setFormOpen(false);
  };

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:py-10">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[12px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-medium mb-1">
          Track Everything
        </p>
        <h1 className="text-[28px] sm:text-[32px] font-bold text-[var(--color-text-primary)] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Job Log & Journal
        </h1>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-1.5 mb-6">
        {([
          { key: 'jobs' as const, label: 'Job Applications', icon: Briefcase },
          { key: 'journal' as const, label: 'Daily Journal', icon: PenLine },
          { key: 'ammo' as const, label: 'Interview Ammo', icon: Zap },
        ]).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={`
              flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[13px] font-medium transition-all duration-150
              ${activeSection === tab.key
                ? 'bg-[var(--color-accent-surface)] text-[var(--color-accent)] border border-[var(--color-accent)]/20'
                : 'bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-3)]'
              }
            `}
          >
            <tab.icon size={14} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ─── JOB APPLICATION LOG ─── */}
      {activeSection === 'jobs' && (
        <div>
          {/* Stats */}
          <div className="flex items-center gap-4 mb-4">
            <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] px-3.5 py-2.5 flex-1">
              <p className="text-[11px] text-[var(--color-text-tertiary)] font-medium">This Week</p>
              <p className="text-[18px] font-bold text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-display)' }}>
                {weeklyApps}
              </p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] px-3.5 py-2.5 flex-1">
              <p className="text-[11px] text-[var(--color-text-tertiary)] font-medium">Total</p>
              <p className="text-[18px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                {totalApps}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-[12px] text-[var(--color-text-tertiary)] leading-relaxed">
                {getJobLogMessage(totalApps)}
              </p>
            </div>
          </div>

          {/* Add button / form */}
          {!formOpen ? (
            <button
              onClick={() => setFormOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md text-[13px] font-medium text-[var(--color-accent)] bg-[var(--color-accent-surface)] border border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/10 transition-colors mb-4"
            >
              <Plus size={14} />
              Log Application
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] p-4 mb-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="px-3 py-2 rounded-md bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[13px] text-[var(--color-text-primary)]"
                  autoFocus
                />
                <input
                  type="text"
                  placeholder="Role (e.g. AI Engineer)"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="px-3 py-2 rounded-md bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[13px] text-[var(--color-text-primary)]"
                />
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="px-3 py-2 rounded-md bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[13px] text-[var(--color-text-primary)]"
                >
                  {['LinkedIn', 'Wellfound', 'YC Jobs', 'HackerNews', 'Internshala', 'Naukri', 'Cutshort', 'Cold Email', 'Other'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as JobApplication['status'])}
                  className="px-3 py-2 rounded-md bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[13px] text-[var(--color-text-primary)]"
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-md text-[13px] font-medium text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] transition-colors"
                >
                  Add Entry
                </button>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-3 py-1.5 rounded-md text-[13px] font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface-3)] hover:bg-[var(--color-surface-4)] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Applications Table */}
          <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] overflow-hidden">
            {state.jobApplications.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <p className="text-[13px] text-[var(--color-text-tertiary)]">Nothing logged yet. Get to work.</p>
              </div>
            ) : (
              <>
                <div className="hidden sm:grid grid-cols-[1fr_1fr_90px_90px_90px_40px] px-4 py-2.5 border-b border-[var(--color-border)] text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-medium">
                  <span>Company</span>
                  <span>Role</span>
                  <span>Date</span>
                  <span>Platform</span>
                  <span>Status</span>
                  <span></span>
                </div>
                <div className="divide-y divide-[var(--color-border-subtle)]">
                  {state.jobApplications.map(app => (
                    <div key={app.id} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_90px_90px_90px_40px] px-4 py-2.5 items-center gap-1 sm:gap-0 hover:bg-[var(--color-surface-2)] transition-colors">
                      <span className="text-[13px] font-medium text-[var(--color-text-primary)]">{app.company}</span>
                      <span className="text-[13px] text-[var(--color-text-secondary)]">{app.role}</span>
                      <span className="text-[12px] text-[var(--color-text-tertiary)]">{app.date}</span>
                      <span className="text-[12px] text-[var(--color-text-tertiary)]">{app.platform}</span>
                      <span>
                        <select
                          value={app.status}
                          onChange={(e) => updateJobStatus(app.id, e.target.value as JobApplication['status'])}
                          className="text-[11px] font-medium px-1.5 py-0.5 rounded border-0 cursor-pointer"
                          style={{
                            color: STATUS_COLORS[app.status]?.text,
                            backgroundColor: STATUS_COLORS[app.status]?.bg,
                          }}
                        >
                          {STATUSES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </span>
                      <button
                        onClick={() => deleteJobApplication(app.id)}
                        className="text-[var(--color-text-tertiary)] hover:text-[var(--color-red)] transition-colors p-1"
                        aria-label="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Quick Links to Job Sites */}
          <div className="mt-6">
            <h3 className="text-[12px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-medium mb-3">
              Job Platforms
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {JOB_SITES.map(site => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-md bg-[var(--color-surface-1)] border border-[var(--color-border)] text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-tertiary)] transition-all no-underline group"
                >
                  <ExternalLink size={12} className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors" />
                  <span className="truncate">{site.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── DAILY JOURNAL ─── */}
      {activeSection === 'journal' && (
        <div>
          {/* Today's entry */}
          <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <PenLine size={14} className="text-[var(--color-accent)]" />
              <h2 className="text-[14px] font-semibold text-[var(--color-text-primary)]">
                Day {today} — {formatDate(getDateForDay(today))}
              </h2>
            </div>
            <textarea
              className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-md px-4 py-3 text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] resize-none leading-relaxed"
              rows={6}
              placeholder="What did you accomplish today? What was hard? What's the plan for tomorrow?"
              value={state.journal[today] || ''}
              onChange={(e) => updateJournal(today, e.target.value)}
            />
          </div>

          {/* Previous entries */}
          <h3 className="text-[12px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-medium mb-3">
            Previous Entries
          </h3>
          <div className="space-y-3">
            {Array.from({ length: Math.min(today - 1, 7) }, (_, i) => today - 1 - i)
              .filter(d => d >= 1)
              .map(d => (
                <div key={d} className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[12px] font-semibold text-[var(--color-text-secondary)]">
                      Day {d} — {formatDate(getDateForDay(d))}
                    </p>
                  </div>
                  {state.journal[d] ? (
                    <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-wrap">
                      {state.journal[d]}
                    </p>
                  ) : (
                    <p className="text-[13px] text-[var(--color-text-tertiary)] italic">No entry for this day.</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ─── INTERVIEW AMMO ─── */}
      {activeSection === 'ammo' && (
        <div>
          <p className="text-[13px] text-[var(--color-text-secondary)] mb-5 leading-relaxed">
            Quick reference bullets on the most likely interview topics based on your resume. Review these before every mock interview.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INTERVIEW_AMMO.map(topic => (
              <AmmoCard key={topic.title} topic={topic} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ───

function AmmoCard({ topic }: { topic: { title: string; bullets: string[] } }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--color-surface-2)] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Zap size={13} className="text-[var(--color-accent)]" />
          <h3 className="text-[14px] font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            {topic.title}
          </h3>
        </div>
        {open ? <ChevronUp size={14} className="text-[var(--color-text-tertiary)]" /> : <ChevronDown size={14} className="text-[var(--color-text-tertiary)]" />}
      </button>
      {open && (
        <div className="px-4 pb-3 space-y-1.5">
          {topic.bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] mt-1.5 flex-shrink-0" />
              <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed">{bullet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

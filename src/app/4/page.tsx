"use client";

import React, { useState } from 'react';
import { useStore, getCurrentDay, formatDate, getDateForDay } from '@/store/StoreProvider';
import type { JobApplication } from '@/store/StoreProvider';
import { JOB_SITES, getJobLogMessage } from '@/store/data';
import { FLASHCARDS } from '@/store/flashcards';
import {
  Plus,
  Trash2,
  ExternalLink,
  Briefcase,
  PenLine,
  Zap,
  Eye,
  RefreshCcw,
  Download,
  CheckCircle2,
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
    toggleFlashcard,
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
      notes: '', // Fixed missing property error
    });
    setCompany('');
    setRole('');
    setPlatform('LinkedIn');
    setFormStatus('Applied');
    setFormOpen(false);
  };

  const exportJobs = () => {
    const lines = state.jobApplications.map(app => 
      `- **${app.company}** (${app.role}) via ${app.platform} on ${app.date} | Status: *${app.status}*`
    );
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-applications-export.md`;
    a.click();
    URL.revokeObjectURL(url);
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
            <div className="flex-[2]">
              <p className="text-[12px] text-[var(--color-text-tertiary)] leading-relaxed">
                {getJobLogMessage(totalApps)}
              </p>
            </div>
          </div>

          {/* Add button / form */}
          <div className="flex items-center justify-between mb-4">
            {!formOpen ? (
              <button
                onClick={() => setFormOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-md text-[13px] font-medium text-[var(--color-accent)] bg-[var(--color-accent-surface)] border border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/10 transition-colors"
              >
                <Plus size={14} /> Log Application
              </button>
            ) : <div/>}

            {totalApps > 0 && (
              <button onClick={exportJobs} className="flex items-center gap-1.5 px-3 py-2 rounded-md text-[12px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                <Download size={13} /> Export MD
              </button>
            )}
          </div>

          {formOpen && (
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
                      <span className="text-[13px] text-[var(--color-text-secondary)] truncate pr-2">{app.role}</span>
                      <span className="text-[12px] text-[var(--color-text-tertiary)]">{app.date}</span>
                      <span className="text-[12px] text-[var(--color-text-tertiary)]">{app.platform}</span>
                      <span>
                        <select
                          value={app.status}
                          onChange={(e) => updateJobStatus(app.id, e.target.value as JobApplication['status'])}
                          className="text-[11px] font-medium px-1.5 py-0.5 rounded border-0 cursor-pointer outline-none"
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
                        className="text-[var(--color-text-tertiary)] hover:text-[var(--color-red)] transition-colors p-1 flex justify-end"
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

      {/* ─── INTERVIEW AMMO (Flashcards) ─── */}
      {activeSection === 'ammo' && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
              Spaced repetition for your interview talking points. Read the question out loud, formulate your answer, and check against the reference.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[var(--color-text-tertiary)]"><CheckCircle2 size={12} className="inline mr-1 text-[var(--color-green)]"/>Mastered: {Object.values(state.flashcardMastery).filter(v => v).length}/{FLASHCARDS.length}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FLASHCARDS.map(fc => {
              const mastered = state.flashcardMastery[fc.id] || false;
              return (
                <Flashcard key={fc.id} flashcard={fc} mastered={mastered} onToggleMastery={() => toggleFlashcard(fc.id)} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ───

function Flashcard({ flashcard, mastered, onToggleMastery }: { flashcard: typeof FLASHCARDS[0], mastered: boolean, onToggleMastery: () => void }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className={`rounded-lg border transition-colors flex flex-col ${mastered ? 'bg-[var(--color-surface-2)] border-[var(--color-border-subtle)] opacity-75' : 'bg-[var(--color-surface-1)] border-[var(--color-border)]'}`}>
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--color-accent)] px-2 py-0.5 rounded-full bg-[var(--color-accent-surface)]">
            {flashcard.topic}
          </span>
          <button onClick={onToggleMastery} className={`p-1 rounded-full transition-colors ${mastered ? 'text-[var(--color-green)] hover:bg-[var(--color-green-surface)]' : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text-primary)]'}`} title={mastered ? 'Mark unmastered' : 'Mark mastered'}>
            <CheckCircle2 size={14} />
          </button>
        </div>
        <p className="text-[14px] font-medium text-[var(--color-text-primary)] leading-snug mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          {flashcard.question}
        </p>
        
        {revealed ? (
          <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)] animate-in fade-in slide-in-from-top-1">
            <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed">
              {flashcard.answer}
            </p>
          </div>
        ) : (
          <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)] flex justify-center">
            <button onClick={() => setRevealed(true)} className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors">
              <Eye size={13} /> Reveal Answer
            </button>
          </div>
        )}
      </div>
      {revealed && (
        <div className="px-4 py-2 bg-[var(--color-surface-2)] border-t border-[var(--color-border)] flex justify-end">
          <button onClick={() => setRevealed(false)} className="flex items-center gap-1.5 text-[10px] font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors">
            <RefreshCcw size={11} /> Hide
          </button>
        </div>
      )}
    </div>
  );
}

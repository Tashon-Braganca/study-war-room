"use client";

import React, { useState } from 'react';
import { useStore } from '@/store/StoreProvider';
import { DSA_PROBLEMS, getDsaMessage } from '@/store/data';
import { Search, Filter, ExternalLink } from 'lucide-react';

type FilterStatus = 'all' | 'not-started' | 'in-progress' | 'mastered';

export default function DSATrackerPage() {
  const { state, setDsaAttempt, getDsaStats, getWeekDsaStats } = useStore();
  const dsaStats = getDsaStats();
  const [filterWeek, setFilterWeek] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  let filtered = DSA_PROBLEMS.slice();
  if (filterWeek > 0) filtered = filtered.filter(p => p.week === filterWeek);
  if (filterStatus === 'mastered') filtered = filtered.filter(p => state.dsaAttempts[p.id]?.third);
  else if (filterStatus === 'in-progress') filtered = filtered.filter(p => { const a = state.dsaAttempts[p.id]; return (a?.first || a?.second) && !a?.third; });
  else if (filterStatus === 'not-started') filtered = filtered.filter(p => { const a = state.dsaAttempts[p.id]; return !a?.first && !a?.second && !a?.third; });
  if (searchQuery) { const q = searchQuery.toLowerCase(); filtered = filtered.filter(p => p.name.toLowerCase().includes(q)); }

  const weekNums = [1, 2, 3, 4, 5] as const;
  const weekStats = weekNums.map(w => getWeekDsaStats(w));

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:py-10">
      <div className="mb-6">
        <p className="text-[12px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-medium mb-1">Neetcode 100</p>
        <h1 className="text-[28px] sm:text-[32px] font-bold text-[var(--color-text-primary)] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>DSA Tracker</h1>
        <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">{getDsaMessage(dsaStats.mastered)}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] px-3.5 py-3">
          <p className="text-[11px] text-[var(--color-text-tertiary)] font-medium mb-1">Mastered</p>
          <span className="text-[22px] font-bold text-[var(--color-green)]" style={{ fontFamily: 'var(--font-display)' }}>{dsaStats.mastered}</span>
          <span className="text-[13px] text-[var(--color-text-tertiary)]"> / {dsaStats.total}</span>
        </div>
        <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] px-3.5 py-3">
          <p className="text-[11px] text-[var(--color-text-tertiary)] font-medium mb-1">In Progress</p>
          <span className="text-[22px] font-bold text-[var(--color-amber)]" style={{ fontFamily: 'var(--font-display)' }}>{dsaStats.inProgress}</span>
        </div>
        <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] px-3.5 py-3">
          <p className="text-[11px] text-[var(--color-text-tertiary)] font-medium mb-1">Not Started</p>
          <span className="text-[22px] font-bold text-[var(--color-text-tertiary)]" style={{ fontFamily: 'var(--font-display)' }}>{dsaStats.notStarted}</span>
        </div>
        <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] px-3.5 py-3">
          <p className="text-[11px] text-[var(--color-text-tertiary)] font-medium mb-1">Overall</p>
          <div className="h-1.5 rounded-full bg-[var(--color-surface-3)] overflow-hidden mt-2">
            <div className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-500" style={{ width: `${(dsaStats.mastered / dsaStats.total) * 100}%` }} />
          </div>
          <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1">{Math.round((dsaStats.mastered / dsaStats.total) * 100)}%</p>
        </div>
      </div>

      {/* Week mini-stats */}
      <div className="grid grid-cols-5 gap-2 mb-5">
        {weekStats.map((ws, i) => (
          <div key={i} className="rounded-md bg-[var(--color-surface-1)] border border-[var(--color-border)] px-2.5 py-2 text-center">
            <p className="text-[10px] text-[var(--color-text-tertiary)] font-medium">W{i + 1}</p>
            <p className="text-[14px] font-bold text-[var(--color-text-primary)]">{ws.mastered}<span className="text-[11px] text-[var(--color-text-tertiary)]">/{ws.total}</span></p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
          <input type="text" placeholder="Search problems..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-md bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[13px] text-[var(--color-text-primary)]" />
        </div>
        <div className="flex items-center gap-1">
          <Filter size={13} className="text-[var(--color-text-tertiary)]" />
          {[0, 1, 2, 3, 4, 5].map(w => (
            <button key={w} onClick={() => setFilterWeek(w as 0 | 1 | 2 | 3 | 4 | 5)}
              className={`px-2.5 py-1.5 rounded text-[12px] font-medium transition-all duration-150 ${filterWeek === w ? 'bg-[var(--color-accent-surface)] text-[var(--color-accent)] border border-[var(--color-accent)]/20' : 'bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)]'}`}>
              {w === 0 ? 'All' : `W${w}`}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {(['all', 'not-started', 'in-progress', 'mastered'] as const).map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-2.5 py-1.5 rounded text-[12px] font-medium transition-all duration-150 ${filterStatus === s ? 'bg-[var(--color-accent-surface)] text-[var(--color-accent)] border border-[var(--color-accent)]/20' : 'bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)]'}`}>
              {s === 'all' ? 'All' : s === 'not-started' ? 'New' : s === 'in-progress' ? 'WIP' : '✓'}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[12px] text-[var(--color-text-tertiary)] mb-3">Showing {filtered.length} problem{filtered.length !== 1 ? 's' : ''}</p>

      {/* Problem List */}
      <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] overflow-hidden">
        <div className="hidden sm:grid grid-cols-[40px_1fr_70px_130px_70px] px-4 py-2.5 border-b border-[var(--color-border)] text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-medium">
          <span>#</span><span>Problem</span><span className="text-center">Diff</span><span className="text-center">Attempts</span><span className="text-center">Links</span>
        </div>
        <div className="divide-y divide-[var(--color-border-subtle)]">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center"><p className="text-[13px] text-[var(--color-text-tertiary)]">No problems match your filter.</p></div>
          ) : filtered.map(problem => {
            const a = state.dsaAttempts[problem.id] || { first: false, second: false, third: false };
            const isMastered = a.third;
            return (
              <div key={problem.id} className={`grid grid-cols-1 sm:grid-cols-[40px_1fr_70px_130px_70px] px-4 py-2.5 items-center gap-2 sm:gap-0 transition-colors ${isMastered ? 'opacity-50' : 'hover:bg-[var(--color-surface-2)]'}`}>
                <span className="text-[12px] text-[var(--color-text-tertiary)] font-mono">{problem.id}</span>
                <span className={`text-[13px] font-medium ${isMastered ? 'line-through text-[var(--color-text-tertiary)]' : 'text-[var(--color-text-primary)]'}`}>{problem.name}</span>
                <span className="text-center">
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded inline-block" style={{
                    color: problem.difficulty === 'Easy' ? 'var(--color-green)' : problem.difficulty === 'Hard' ? 'var(--color-red)' : 'var(--color-amber)',
                    backgroundColor: problem.difficulty === 'Easy' ? 'var(--color-green-surface)' : problem.difficulty === 'Hard' ? 'var(--color-red-surface)' : 'var(--color-amber-surface)',
                  }}>{problem.difficulty}</span>
                </span>
                <div className="flex items-center justify-center gap-1.5">
                  {(['first', 'second', 'third'] as const).map((att, idx) => (
                    <button key={att} onClick={() => setDsaAttempt(problem.id, att)} title={`Attempt ${idx + 1}`}
                      className={`w-7 h-7 rounded-full text-[10px] font-bold transition-all duration-150 border ${
                        a[att]
                          ? idx === 0 ? 'bg-[var(--color-blue)] border-[var(--color-blue)] text-white'
                            : idx === 1 ? 'bg-[var(--color-amber)] border-[var(--color-amber)] text-white'
                            : 'bg-[var(--color-green)] border-[var(--color-green)] text-white'
                          : 'bg-[var(--color-surface-3)] border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:border-[var(--color-text-tertiary)]'
                      }`}>
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-1">
                  <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-tertiary)] hover:text-[var(--color-amber)] transition-colors p-1" title="LeetCode">
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

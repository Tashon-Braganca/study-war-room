"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useStore, getCurrentDay, getCurrentWeek, getDateForDay, formatDate } from '@/store/StoreProvider';
import { DAILY_BLOCKS, WEEKLY_GOALS, GITHUB_REPOS, getStreakMessage, getDsaMessage, getGitHubMessage, getFocusHours } from '@/store/data';
import { downloadICSFile } from '@/store/calendar';
import { CheckCircle2, Flame, TrendingUp, Code2, Briefcase, Clock, BookOpen, Play, Lock, RefreshCw, ExternalLink, GitCommit, CalendarPlus } from 'lucide-react';

const CAT_COLORS: Record<string, string> = {
  genai: 'var(--color-accent)', code: 'var(--color-accent)', dsa: 'var(--color-amber)',
  break: 'var(--color-text-tertiary)', jobs: 'var(--color-green)', resume: 'var(--color-blue)',
  interview: 'var(--color-accent)', drill: 'var(--color-amber)', review: 'var(--color-text-secondary)',
  personal: 'var(--color-text-tertiary)', mindset: 'var(--color-purple)',
};
const CAT_LABELS: Record<string, string> = {
  genai: 'GenAI', code: 'Coding', dsa: 'DSA', break: 'Break', jobs: 'Jobs', resume: 'Resume',
  interview: 'Interview', drill: 'Drill', review: 'Review', personal: 'Personal', mindset: 'Mindset',
};

function getBlockTimeStatus(block: typeof DAILY_BLOCKS[0]): 'past' | 'current' | 'future' {
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes();
  const nowMins = h * 60 + m;
  const startMins = block.startHour * 60 + block.startMinute;
  let endMins = block.endHour * 60 + block.endMinute;
  if (endMins < startMins) endMins += 24 * 60;
  if (nowMins >= endMins) return 'past';
  if (nowMins >= startMins) return 'current';
  return 'future';
}

// GitHub types
interface GitHubCommit { sha: string; message: string; url: string; time: string; }
interface RepoData { name: string; color: string; commits: GitHubCommit[]; loading: boolean; error: string | null; }

export default function DashboardPage() {
  const { state, toggleDailyBlock, getDayCompletion, getOverallProgress, getDsaStats, getStreakCount, getWeeklyAppCount, updateJournal, setSelectedDay } = useStore();
  const today = getCurrentDay();
  const viewDay = state.selectedDay ?? today;
  const week = getCurrentWeek();
  const dateStr = formatDate(getDateForDay(viewDay));
  const { done, total, percent } = getDayCompletion(viewDay);
  const overall = getOverallProgress();
  const dsaStats = getDsaStats();
  const streak = getStreakCount();
  const weeklyApps = getWeeklyAppCount();
  const weekGoal = WEEKLY_GOALS[week - 1];
  const dayChecks = state.dailyChecks[viewDay] || {};
  const prevDayChecks = state.dailyChecks[viewDay - 1] || {};
  const focusHrs = getFocusHours();

  // Carry-over tasks
  const carryOverTasks = viewDay > 1 && viewDay === today 
    ? DAILY_BLOCKS.filter(b => !b.locked && b.category !== 'break' && b.category !== 'personal' && b.category !== 'mindset' && !prevDayChecks[b.id])
    : [];

  // GitHub activity
  const [repos, setRepos] = useState<RepoData[]>(GITHUB_REPOS.map(r => ({ name: r.name, color: r.color, commits: [], loading: true, error: null })));

  const fetchGitHub = useCallback(async () => {
    const todayISO = new Date().toISOString().split('T')[0] + 'T00:00:00Z';
    const results = await Promise.all(GITHUB_REPOS.map(async (r) => {
      try {
        const res = await fetch(`https://api.github.com/repos/Tashon-Braganca/${r.repo}/commits?since=${todayISO}&author=Tashon-Braganca&per_page=10`);
        if (res.status === 403 || res.status === 429) return { name: r.name, color: r.color, commits: [], loading: false, error: 'GitHub API rate limited — check back in an hour.' };
        if (!res.ok) return { name: r.name, color: r.color, commits: [], loading: false, error: null };
        const data = await res.json();
        const commits = (Array.isArray(data) ? data : []).map((c: Record<string, unknown>) => ({
          sha: (c.sha as string || '').slice(0, 7),
          message: ((c.commit as Record<string, unknown>)?.message as string || '').split('\n')[0],
          url: c.html_url as string || '',
          time: (c.commit as Record<string, unknown>)?.author ? ((c.commit as Record<string, unknown>).author as Record<string, unknown>)?.date as string || '' : '',
        }));
        return { name: r.name, color: r.color, commits, loading: false, error: null };
      } catch { return { name: r.name, color: r.color, commits: [], loading: false, error: null }; }
    }));
    setRepos(results);
  }, []);

  useEffect(() => { fetchGitHub(); const iv = setInterval(fetchGitHub, 600000); return () => clearInterval(iv); }, [fetchGitHub]);

  const totalCommits = repos.reduce((s, r) => s + r.commits.length, 0);

  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const dayNum = i + 1;
    const comp = getDayCompletion(dayNum);
    const isFuture = dayNum > today;
    let status: 'empty' | 'partial' | 'complete' | 'future' = 'empty';
    if (isFuture) status = 'future';
    else if (comp.percent === 100) status = 'complete';
    else if (comp.done > 0) status = 'partial';
    return { dayNum, status };
  });

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:py-10">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[12px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-medium mb-1">{dateStr}</p>
        <div className="flex items-center gap-3">
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[var(--color-text-primary)] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Day {viewDay} of 30
          </h1>
          {viewDay !== today && (
            <button onClick={() => setSelectedDay(null)} className="text-[12px] text-[var(--color-accent)] hover:underline">← Back to today</button>
          )}
        </div>
        <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">
          {streak > 0 && '🔥 '}{getStreakMessage(streak, today >= 30 && percent === 100 ? 30 : 0)}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard icon={<TrendingUp size={15} />} label="Overall" value={`${overall}%`} color="var(--color-accent)" />
        <StatCard icon={<Flame size={15} />} label="Streak" value={`${streak}d`} color="var(--color-amber)" />
        <StatCard icon={<Code2 size={15} />} label="DSA Mastered" value={`${dsaStats.mastered}/${dsaStats.total}`} color="var(--color-accent)" />
        <StatCard icon={<Briefcase size={15} />} label="Apps/Week" value={`${weeklyApps}`} color="var(--color-green)" />
      </div>

      {/* Progress Bar + Calendar Export */}
      <div className="mb-5 p-4 rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] text-[var(--color-text-secondary)] font-medium">30-Day Progress</p>
          <div className="flex items-center gap-2">
            <button onClick={downloadICSFile} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-[var(--color-accent)] bg-[var(--color-accent-surface)] border border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/10 transition-colors" title="Download .ics file — import into Google Calendar">
              <CalendarPlus size={12} /> Add to Google Calendar
            </button>
            <p className="text-[12px] text-[var(--color-text-tertiary)]">{overall}%</p>
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-[var(--color-surface-3)] overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500 ease-out bg-[var(--color-accent)]" style={{ width: `${overall}%` }} />
        </div>
      </div>

      {/* GitHub Activity */}
      <div className="mb-5 rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GitCommit size={14} className="text-[var(--color-text-tertiary)]" />
            <h2 className="text-[13px] font-semibold text-[var(--color-text-primary)]">GitHub Activity</h2>
          </div>
          <button onClick={fetchGitHub} className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors p-1" title="Refresh"><RefreshCw size={13} /></button>
        </div>
        <p className={`text-[12px] mb-3 font-medium ${totalCommits === 0 ? 'text-[var(--color-amber)]' : totalCommits > 5 ? 'text-[var(--color-accent)] font-bold' : 'text-[var(--color-accent)]'}`}>
          {getGitHubMessage(totalCommits)}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {repos.map(r => (
            <div key={r.name} className="rounded-md bg-[var(--color-surface-2)] border border-[var(--color-border-subtle)] p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                <span className="text-[12px] font-semibold text-[var(--color-text-primary)]">{r.name}</span>
              </div>
              {r.loading ? (
                <div className="h-4 w-20 rounded bg-[var(--color-surface-3)] animate-pulse" />
              ) : r.error ? (
                <p className="text-[11px] text-[var(--color-amber)]">{r.error}</p>
              ) : (
                <>
                  <p className="text-[18px] font-bold mb-1" style={{ color: r.color, fontFamily: 'var(--font-display)' }}>
                    {r.commits.length} commit{r.commits.length !== 1 ? 's' : ''}
                  </p>
                  {r.commits.length === 0 ? (
                    <p className="text-[11px] text-[var(--color-text-tertiary)]">No pushes yet today.</p>
                  ) : (
                    <div className="space-y-1">
                      {r.commits.slice(0, 3).map(c => (
                        <a key={c.sha} href={c.url} target="_blank" rel="noopener noreferrer" className="block text-[11px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] truncate no-underline transition-colors">
                          <span className="text-[var(--color-text-tertiary)] font-mono">{c.sha}</span> {c.message}
                        </a>
                      ))}
                      {r.commits.length > 0 && r.commits[0].time && (
                        <p className="text-[10px] text-[var(--color-text-tertiary)] mt-1">Last push: {new Date(r.commits[0].time).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[var(--color-text-tertiary)]" />
                <h2 className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                  {viewDay === today ? "Today's Schedule" : `Day ${viewDay} Schedule`}
                </h2>
              </div>
              <span className="text-[12px] text-[var(--color-text-tertiary)]">{done}/{total} done · ~{focusHrs}h focus</span>
            </div>
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {carryOverTasks.length > 0 && (
                <div className="px-4 py-2 bg-[var(--color-amber-surface)] border-b border-[var(--color-amber-dim)]/20">
                  <p className="text-[11px] font-bold text-[var(--color-amber)] uppercase tracking-wider">Carry-Over from Yesterday</p>
                </div>
              )}
              {carryOverTasks.map(block => {
                const isChecked = !!dayChecks[`carry-${block.id}`];
                return (
                  <label key={`carry-${block.id}`} className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--color-surface-2)] transition-colors duration-150 bg-[var(--color-amber-surface)]/30`}>
                    <input type="checkbox" checked={isChecked} onChange={() => toggleDailyBlock(viewDay, `carry-${block.id}`)} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-[13px] font-medium leading-tight ${isChecked ? 'line-through text-[var(--color-text-tertiary)]' : 'text-[var(--color-amber)]'}`}>
                        {block.label}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ color: CAT_COLORS[block.category], backgroundColor: `${CAT_COLORS[block.category]}15` }}>
                          {CAT_LABELS[block.category]}
                        </span>
                      </div>
                    </div>
                    {isChecked && <CheckCircle2 size={16} className="text-[var(--color-amber)] flex-shrink-0" />}
                  </label>
                );
              })}
              {DAILY_BLOCKS.map(block => {
                const isChecked = !!dayChecks[block.id];
                const isLocked = block.locked;
                const isBreak = block.category === 'break';
                const timeStatus = viewDay === today ? getBlockTimeStatus(block) : 'future';
                return (
                  <label key={block.id} className={`flex items-center gap-3 px-4 py-3 transition-colors duration-150 ${isLocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-[var(--color-surface-2)]'} ${timeStatus === 'current' ? 'bg-[var(--color-accent-surface)]' : ''} ${timeStatus === 'past' && !isChecked ? 'opacity-60' : ''}`}>
                    {isLocked ? (
                      <Lock size={16} className="text-[var(--color-text-tertiary)] flex-shrink-0" />
                    ) : (
                      <input type="checkbox" checked={isChecked} onChange={() => toggleDailyBlock(viewDay, block.id)} />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-[13px] font-medium leading-tight ${isChecked && !isBreak ? 'line-through text-[var(--color-text-tertiary)]' : 'text-[var(--color-text-primary)]'}`}>
                        {block.label}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[11px] ${timeStatus === 'current' ? 'text-[var(--color-accent)] font-medium' : 'text-[var(--color-text-tertiary)]'}`}>
                          {block.time}{timeStatus === 'current' ? ' · NOW' : ''}
                        </span>
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ color: CAT_COLORS[block.category], backgroundColor: `${CAT_COLORS[block.category]}15` }}>
                          {CAT_LABELS[block.category]}
                        </span>
                      </div>
                      {block.note && <p className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5 italic">{block.note}</p>}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {block.externalUrl && (
                        <a href={block.externalUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-[var(--color-purple)] hover:text-[var(--color-text-primary)] transition-colors p-1" title="Play meditation">
                          <Play size={14} />
                        </a>
                      )}
                      {isChecked && !isBreak && !isLocked && <CheckCircle2 size={16} className="text-[var(--color-accent)] flex-shrink-0" />}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Streak Calendar */}
          <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[13px] font-semibold text-[var(--color-text-primary)]">Streak Calendar</h2>
              <div className="flex items-center gap-3">
                <LegendDot color="var(--color-accent)" label="Complete" />
                <LegendDot color="var(--color-amber)" label="Partial" />
                <LegendDot color="var(--color-surface-3)" label="Empty" />
              </div>
            </div>
            <div className="grid grid-cols-7 sm:grid-cols-10 gap-1.5">
              {calendarDays.map(({ dayNum, status }) => (
                <button key={dayNum} onClick={() => setSelectedDay(dayNum)}
                  className={`aspect-square rounded-md flex items-center justify-center text-[11px] font-medium transition-all duration-150
                    ${status === 'complete' ? 'bg-[var(--color-accent)] text-white' : ''}
                    ${status === 'partial' ? 'bg-[var(--color-amber)] text-white' : ''}
                    ${status === 'empty' ? 'bg-[var(--color-surface-3)] text-[var(--color-text-tertiary)]' : ''}
                    ${status === 'future' ? 'bg-[var(--color-surface-2)] text-[var(--color-text-tertiary)] opacity-40 cursor-pointer hover:ring-1 hover:ring-[var(--color-accent)]' : 'cursor-pointer hover:ring-1 hover:ring-[var(--color-accent)]'}
                    ${dayNum === viewDay ? 'ring-2 ring-[var(--color-accent)] ring-offset-1 ring-offset-[var(--color-surface-1)]' : ''}
                  `}>
                  {dayNum}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={14} className="text-[var(--color-accent)]" />
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-accent)] font-bold">Week {week} Goal</p>
            </div>
            <h3 className="text-[15px] font-bold text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'var(--font-display)' }}>&ldquo;{weekGoal.title}&rdquo;</h3>
            <p className="text-[12px] text-[var(--color-text-secondary)] mb-3 leading-relaxed">{weekGoal.subtitle}</p>
            <div className="space-y-2.5">
              <MiniSection title="GenAI Focus" items={weekGoal.genai} />
              <MiniSection title="DSA" items={[weekGoal.dsa]} />
              <MiniSection title="Resume Defense" items={weekGoal.resumeDefense} />
            </div>
            <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)]">
              <p className="text-[11px] text-[var(--color-amber)] font-medium leading-relaxed">Rule: {weekGoal.rule}</p>
            </div>
          </div>

          <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] p-4">
            <h3 className="text-[13px] font-semibold text-[var(--color-text-primary)] mb-2">DSA Progress</h3>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-[24px] font-bold text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-display)' }}>{dsaStats.mastered}</span>
              <span className="text-[14px] text-[var(--color-text-tertiary)] mb-1">/ {dsaStats.total} mastered</span>
            </div>
            <div className="flex gap-3 text-[11px] text-[var(--color-text-tertiary)] mb-2">
              <span>{dsaStats.inProgress} in progress</span>
              <span>{dsaStats.notStarted} not started</span>
            </div>
            <div className="h-1.5 rounded-full bg-[var(--color-surface-3)] overflow-hidden mb-2">
              <div className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-500 ease-out" style={{ width: `${(dsaStats.mastered / dsaStats.total) * 100}%` }} />
            </div>
            <p className="text-[11px] text-[var(--color-text-tertiary)]">{getDsaMessage(dsaStats.mastered)}</p>
          </div>

          <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] p-4">
            <h3 className="text-[13px] font-semibold text-[var(--color-text-primary)] mb-2">Today&apos;s Journal</h3>
            <textarea className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-md px-3 py-2 text-[13px] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] resize-none" rows={4}
              placeholder="What did you learn today? What's tomorrow's priority?"
              value={state.journal[viewDay] || ''} onChange={(e) => updateJournal(viewDay, e.target.value)} />
            {[viewDay - 1, viewDay - 2, viewDay - 3].filter(d => d >= 1 && state.journal[d]).map(d => (
              <div key={d} className="mt-2 pt-2 border-t border-[var(--color-border-subtle)]">
                <p className="text-[10px] text-[var(--color-text-tertiary)] font-medium mb-0.5">Day {d}</p>
                <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-wrap">{state.journal[d]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] px-3.5 py-3">
      <div className="flex items-center gap-1.5 mb-1.5" style={{ color }}>{icon}<span className="text-[11px] font-medium text-[var(--color-text-tertiary)]">{label}</span></div>
      <p className="text-[20px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>{value}</p>
    </div>
  );
}

function MiniSection({ title, items }: { title: string; items: string[] }) {
  return (<div><p className="text-[11px] font-semibold text-[var(--color-text-secondary)] mb-0.5">{title}</p><ul className="space-y-0.5">{items.map((item, i) => (<li key={i} className="text-[11px] text-[var(--color-text-tertiary)] flex items-start gap-1.5"><span className="mt-0.5 flex-shrink-0">·</span>{item}</li>))}</ul></div>);
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (<div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm" style={{ backgroundColor: color }} /><span className="text-[10px] text-[var(--color-text-tertiary)]">{label}</span></div>);
}

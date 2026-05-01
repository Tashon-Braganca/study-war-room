"use client";

import React, { useState } from 'react';
import { useStore, getCurrentWeek } from '@/store/StoreProvider';
import { WEEKLY_GOALS, DSA_PROBLEMS } from '@/store/data';
import { ChevronRight, Target, BookOpen, Code2, Briefcase, Shield, ExternalLink } from 'lucide-react';

export default function WeeklyPlanPage() {
  const { state, setDsaAttempt, getWeekDsaStats } = useStore();
  const currentWeek = getCurrentWeek();
  const [activeWeek, setActiveWeek] = useState<1 | 2 | 3 | 4>(currentWeek);

  const weekGoal = WEEKLY_GOALS[activeWeek - 1];
  const weekProblems = DSA_PROBLEMS.filter(p => p.week === activeWeek);
  const weekDsa = getWeekDsaStats(activeWeek);

  const [genaiChecks, setGenaiChecks] = useState<Record<string, boolean>>({});
  const toggleGenai = (key: string) => setGenaiChecks(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:py-10">
      <div className="mb-6">
        <p className="text-[12px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-medium mb-1">Weekly Plan</p>
        <h1 className="text-[28px] sm:text-[32px] font-bold text-[var(--color-text-primary)] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Week {activeWeek}: &ldquo;{weekGoal.title}&rdquo;
        </h1>
        <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">{weekGoal.days}</p>
      </div>

      {/* Week Tabs */}
      <div className="flex gap-1.5 mb-6">
        {([1, 2, 3, 4] as const).map(w => (
          <button key={w} onClick={() => setActiveWeek(w)}
            className={`px-3.5 py-2 rounded-md text-[13px] font-medium transition-all duration-150 ${activeWeek === w ? 'bg-[var(--color-accent-surface)] text-[var(--color-accent)] border border-[var(--color-accent)]/20' : 'bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)]'} ${w === currentWeek ? 'ring-1 ring-[var(--color-accent)]/20' : ''}`}>
            Week {w}{w === currentWeek && <span className="ml-1.5 text-[10px] opacity-60">current</span>}
          </button>
        ))}
      </div>

      {/* Goal Card */}
      <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] p-5 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-md bg-[var(--color-accent-surface)] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Target size={16} className="text-[var(--color-accent)]" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--color-accent)] font-bold mb-0.5">Week {activeWeek} Goal</p>
            <h2 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'var(--font-display)' }}>{weekGoal.subtitle}</h2>
            <p className="text-[12px] text-[var(--color-amber)] font-medium">{weekGoal.rule}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* GenAI Topics */}
        <SectionCard icon={<BookOpen size={14} />} title="GenAI Focus" accent="var(--color-accent)"
          count={weekGoal.genai.filter((_, i) => genaiChecks[`${activeWeek}-genai-${i}`]).length} total={weekGoal.genai.length}>
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {weekGoal.genai.map((topic, i) => {
              const key = `${activeWeek}-genai-${i}`;
              const checked = !!genaiChecks[key];
              return (
                <label key={key} className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-[var(--color-surface-2)] transition-colors">
                  <input type="checkbox" checked={checked} onChange={() => toggleGenai(key)} />
                  <span className={`text-[13px] ${checked ? 'line-through text-[var(--color-text-tertiary)]' : 'text-[var(--color-text-primary)]'}`}>{topic}</span>
                </label>
              );
            })}
          </div>
        </SectionCard>

        {/* DSA Problems with 3 attempts */}
        <SectionCard icon={<Code2 size={14} />} title="DSA Problems" accent="var(--color-amber)"
          count={weekDsa.mastered} total={weekDsa.total}>
          <div className="divide-y divide-[var(--color-border-subtle)] max-h-[360px] overflow-y-auto">
            {weekProblems.map(problem => {
              const a = state.dsaAttempts[problem.id] || { first: false, second: false, third: false };
              const isMastered = a.third;
              return (
                <div key={problem.id} className={`flex items-center gap-2 px-4 py-2 hover:bg-[var(--color-surface-2)] transition-colors ${isMastered ? 'opacity-50' : ''}`}>
                  <span className={`flex-1 text-[13px] min-w-0 ${isMastered ? 'line-through text-[var(--color-text-tertiary)]' : 'text-[var(--color-text-primary)]'}`}>
                    {problem.id}. {problem.name}
                  </span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {(['first', 'second', 'third'] as const).map((att, idx) => (
                      <button key={att} onClick={() => setDsaAttempt(problem.id, att)}
                        className={`w-6 h-6 rounded-full text-[9px] font-bold transition-all border ${a[att]
                          ? idx === 0 ? 'bg-[var(--color-blue)] border-[var(--color-blue)] text-white'
                          : idx === 1 ? 'bg-[var(--color-amber)] border-[var(--color-amber)] text-white'
                          : 'bg-[var(--color-green)] border-[var(--color-green)] text-white'
                          : 'bg-[var(--color-surface-3)] border-[var(--color-border)] text-[var(--color-text-tertiary)]'}`}>
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                  <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-tertiary)] hover:text-[var(--color-amber)] transition-colors p-0.5" title="LeetCode">
                    <ExternalLink size={11} />
                  </a>
                  <span className="text-[10px] font-medium px-1 py-0.5 rounded" style={{
                    color: problem.difficulty === 'Easy' ? 'var(--color-green)' : problem.difficulty === 'Hard' ? 'var(--color-red)' : 'var(--color-amber)',
                    backgroundColor: problem.difficulty === 'Easy' ? 'var(--color-green-surface)' : problem.difficulty === 'Hard' ? 'var(--color-red-surface)' : 'var(--color-amber-surface)',
                  }}>{problem.difficulty[0]}</span>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* Resume Defense */}
        <SectionCard icon={<Shield size={14} />} title="Resume Defense" accent="var(--color-blue)" count={0} total={weekGoal.resumeDefense.length}>
          <div className="px-4 py-3 space-y-2">
            {weekGoal.resumeDefense.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <ChevronRight size={12} className="text-[var(--color-blue)] mt-0.5 flex-shrink-0" />
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Job Targets */}
        <SectionCard icon={<Briefcase size={14} />} title="Job Targets" accent="var(--color-green)" count={0} total={weekGoal.jobTargets.length}>
          <div className="px-4 py-3 space-y-2">
            {weekGoal.jobTargets.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <ChevronRight size={12} className="text-[var(--color-green)] mt-0.5 flex-shrink-0" />
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function SectionCard({ icon, title, accent, count, total, children }: {
  icon: React.ReactNode; title: string; accent: string; count: number; total: number; children: React.ReactNode;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2" style={{ color: accent }}>
          {icon}<h3 className="text-[13px] font-semibold text-[var(--color-text-primary)]">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[var(--color-text-tertiary)]">{count}/{total}</span>
          <div className="w-16 h-1 rounded-full bg-[var(--color-surface-3)] overflow-hidden">
            <div className="h-full rounded-full transition-all duration-400" style={{ width: `${pct}%`, backgroundColor: accent }} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

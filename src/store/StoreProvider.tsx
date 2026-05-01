"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { PLAN_START, PLAN_DAYS, DAILY_BLOCKS, DSA_PROBLEMS } from './data';

// ─── Types ───
export interface JobApplication {
  id: string;
  company: string;
  role: string;
  date: string;
  platform: string;
  status: 'Applied' | 'Callback' | 'Interview' | 'Rejected' | 'Offer';
}

export interface JournalEntry {
  day: number;
  date: string;
  text: string;
}

export interface AppState {
  // Daily task checks: { [dayNumber]: { [blockId]: boolean } }
  dailyChecks: Record<number, Record<string, boolean>>;
  // DSA solved: { [problemId]: boolean }
  dsaSolved: Record<number, boolean>;
  // Job applications
  jobApplications: JobApplication[];
  // Journal entries: { [dayNumber]: text }
  journal: Record<number, string>;
  // Streak
  streakDays: number;
  // Last check-in date
  lastCheckIn: string | null;
}

// ─── Helpers ───
export function getCurrentDay(): number {
  const now = new Date();
  const diff = now.getTime() - PLAN_START.getTime();
  const day = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, Math.min(day, PLAN_DAYS));
}

export function getCurrentWeek(): 1 | 2 | 3 | 4 {
  const day = getCurrentDay();
  if (day <= 7) return 1;
  if (day <= 14) return 2;
  if (day <= 21) return 3;
  return 4;
}

export function getDateForDay(day: number): Date {
  const d = new Date(PLAN_START);
  d.setDate(d.getDate() + day - 1);
  return d;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// ─── Default State ───
function createDefaultState(): AppState {
  return {
    dailyChecks: {},
    dsaSolved: {},
    jobApplications: [],
    journal: {},
    streakDays: 0,
    lastCheckIn: null,
  };
}

// ─── Context ───
interface StoreContextValue {
  state: AppState;
  toggleDailyBlock: (day: number, blockId: string) => void;
  toggleDsaProblem: (problemId: number) => void;
  addJobApplication: (app: Omit<JobApplication, 'id'>) => void;
  updateJobStatus: (id: string, status: JobApplication['status']) => void;
  deleteJobApplication: (id: string) => void;
  updateJournal: (day: number, text: string) => void;
  getDayCompletion: (day: number) => { done: number; total: number; percent: number };
  getOverallProgress: () => number;
  getDsaStats: () => { solved: number; total: number };
  getWeekDsaStats: (week: 1 | 2 | 3 | 4) => { solved: number; total: number };
  getStreakCount: () => number;
  getWeeklyAppCount: () => number;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(createDefaultState);

  const toggleDailyBlock = useCallback((day: number, blockId: string) => {
    setState(prev => {
      const dayChecks = { ...(prev.dailyChecks[day] || {}) };
      dayChecks[blockId] = !dayChecks[blockId];
      const newDailyChecks = { ...prev.dailyChecks, [day]: dayChecks };

      // Recalculate streak
      let streak = 0;
      const today = getCurrentDay();
      for (let d = today; d >= 1; d--) {
        const checks = newDailyChecks[d] || {};
        const taskBlocks = DAILY_BLOCKS.filter(b => b.category !== 'break' && b.category !== 'personal');
        const doneCount = taskBlocks.filter(b => checks[b.id]).length;
        if (doneCount > 0) {
          streak++;
        } else {
          break;
        }
      }

      return {
        ...prev,
        dailyChecks: newDailyChecks,
        streakDays: streak,
        lastCheckIn: new Date().toISOString(),
      };
    });
  }, []);

  const toggleDsaProblem = useCallback((problemId: number) => {
    setState(prev => ({
      ...prev,
      dsaSolved: { ...prev.dsaSolved, [problemId]: !prev.dsaSolved[problemId] },
    }));
  }, []);

  const addJobApplication = useCallback((app: Omit<JobApplication, 'id'>) => {
    setState(prev => ({
      ...prev,
      jobApplications: [
        { ...app, id: `job-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` },
        ...prev.jobApplications,
      ],
    }));
  }, []);

  const updateJobStatus = useCallback((id: string, status: JobApplication['status']) => {
    setState(prev => ({
      ...prev,
      jobApplications: prev.jobApplications.map(j =>
        j.id === id ? { ...j, status } : j
      ),
    }));
  }, []);

  const deleteJobApplication = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      jobApplications: prev.jobApplications.filter(j => j.id !== id),
    }));
  }, []);

  const updateJournal = useCallback((day: number, text: string) => {
    setState(prev => ({
      ...prev,
      journal: { ...prev.journal, [day]: text },
    }));
  }, []);

  const getDayCompletion = useCallback((day: number) => {
    const checks = state.dailyChecks[day] || {};
    const taskBlocks = DAILY_BLOCKS.filter(b => b.category !== 'break' && b.category !== 'personal');
    const done = taskBlocks.filter(b => checks[b.id]).length;
    const total = taskBlocks.length;
    return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
  }, [state.dailyChecks]);

  const getOverallProgress = useCallback(() => {
    const today = getCurrentDay();
    let totalDone = 0;
    let totalPossible = 0;
    const taskBlocks = DAILY_BLOCKS.filter(b => b.category !== 'break' && b.category !== 'personal');
    for (let d = 1; d <= today; d++) {
      const checks = state.dailyChecks[d] || {};
      totalDone += taskBlocks.filter(b => checks[b.id]).length;
      totalPossible += taskBlocks.length;
    }
    return totalPossible > 0 ? Math.round((totalDone / totalPossible) * 100) : 0;
  }, [state.dailyChecks]);

  const getDsaStats = useCallback(() => {
    const solved = Object.values(state.dsaSolved).filter(Boolean).length;
    return { solved, total: DSA_PROBLEMS.length };
  }, [state.dsaSolved]);

  const getWeekDsaStats = useCallback((week: 1 | 2 | 3 | 4) => {
    const weekProblems = DSA_PROBLEMS.filter(p => p.week === week);
    const solved = weekProblems.filter(p => state.dsaSolved[p.id]).length;
    return { solved, total: weekProblems.length };
  }, [state.dsaSolved]);

  const getStreakCount = useCallback(() => {
    let streak = 0;
    const today = getCurrentDay();
    const taskBlocks = DAILY_BLOCKS.filter(b => b.category !== 'break' && b.category !== 'personal');
    for (let d = today; d >= 1; d--) {
      const checks = state.dailyChecks[d] || {};
      const doneCount = taskBlocks.filter(b => checks[b.id]).length;
      if (doneCount > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }, [state.dailyChecks]);

  const getWeeklyAppCount = useCallback(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return state.jobApplications.filter(j => new Date(j.date) >= weekAgo).length;
  }, [state.jobApplications]);

  const value: StoreContextValue = {
    state,
    toggleDailyBlock,
    toggleDsaProblem,
    addJobApplication,
    updateJobStatus,
    deleteJobApplication,
    updateJournal,
    getDayCompletion,
    getOverallProgress,
    getDsaStats,
    getWeekDsaStats,
    getStreakCount,
    getWeeklyAppCount,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

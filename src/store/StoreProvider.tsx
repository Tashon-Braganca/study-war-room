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
  notes: string;
}

export interface DsaAttempts {
  first: boolean;
  second: boolean;
  third: boolean;
}

export interface AppState {
  dailyChecks: Record<number, Record<string, boolean>>;
  // DSA: { [problemId]: { first, second, third } }
  dsaAttempts: Record<number, DsaAttempts>;
  jobApplications: JobApplication[];
  journal: Record<number, string>;
  // Playlist: { [videoId]: { watched: boolean, practiced: boolean } }
  playlistProgress: Record<string, { watched: boolean; practiced: boolean }>;
  // Flashcard mastery: { [flashcardId]: boolean }
  flashcardMastery: Record<string, boolean>;
  // Selected day for dashboard
  selectedDay: number | null;
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
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function createDefaultState(): AppState {
  return {
    dailyChecks: {},
    dsaAttempts: {},
    jobApplications: [],
    journal: {},
    playlistProgress: {},
    flashcardMastery: {},
    selectedDay: null,
  };
}

// ─── Context ───
interface StoreContextValue {
  state: AppState;
  toggleDailyBlock: (day: number, blockId: string) => void;
  setDsaAttempt: (problemId: number, attempt: 'first' | 'second' | 'third') => void;
  getDsaAttemptState: (problemId: number) => DsaAttempts;
  addJobApplication: (app: Omit<JobApplication, 'id'>) => void;
  updateJobStatus: (id: string, status: JobApplication['status']) => void;
  updateJobNotes: (id: string, notes: string) => void;
  deleteJobApplication: (id: string) => void;
  updateJournal: (day: number, text: string) => void;
  togglePlaylistVideo: (videoId: string, field: 'watched' | 'practiced') => void;
  toggleFlashcard: (id: string) => void;
  setSelectedDay: (day: number | null) => void;
  getDayCompletion: (day: number) => { done: number; total: number; percent: number };
  getOverallProgress: () => number;
  getDsaStats: () => { mastered: number; inProgress: number; notStarted: number; total: number };
  getWeekDsaStats: (week: 1 | 2 | 3 | 4 | 5) => { mastered: number; inProgress: number; total: number };
  getStreakCount: () => number;
  getWeeklyAppCount: () => number;
  getPlaylistStats: () => { watched: number; practiced: number; total: number };
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
      return { ...prev, dailyChecks: { ...prev.dailyChecks, [day]: dayChecks } };
    });
  }, []);

  const setDsaAttempt = useCallback((problemId: number, attempt: 'first' | 'second' | 'third') => {
    setState(prev => {
      const current = prev.dsaAttempts[problemId] || { first: false, second: false, third: false };
      return {
        ...prev,
        dsaAttempts: { ...prev.dsaAttempts, [problemId]: { ...current, [attempt]: !current[attempt] } },
      };
    });
  }, []);

  const getDsaAttemptState = useCallback((problemId: number): DsaAttempts => {
    return state.dsaAttempts[problemId] || { first: false, second: false, third: false };
  }, [state.dsaAttempts]);

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
      jobApplications: prev.jobApplications.map(j => j.id === id ? { ...j, status } : j),
    }));
  }, []);

  const updateJobNotes = useCallback((id: string, notes: string) => {
    setState(prev => ({
      ...prev,
      jobApplications: prev.jobApplications.map(j => j.id === id ? { ...j, notes } : j),
    }));
  }, []);

  const deleteJobApplication = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      jobApplications: prev.jobApplications.filter(j => j.id !== id),
    }));
  }, []);

  const updateJournal = useCallback((day: number, text: string) => {
    setState(prev => ({ ...prev, journal: { ...prev.journal, [day]: text } }));
  }, []);

  const togglePlaylistVideo = useCallback((videoId: string, field: 'watched' | 'practiced') => {
    setState(prev => {
      const current = prev.playlistProgress[videoId] || { watched: false, practiced: false };
      return {
        ...prev,
        playlistProgress: { ...prev.playlistProgress, [videoId]: { ...current, [field]: !current[field] } },
      };
    });
  }, []);

  const toggleFlashcard = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      flashcardMastery: { ...prev.flashcardMastery, [id]: !prev.flashcardMastery[id] },
    }));
  }, []);

  const setSelectedDay = useCallback((day: number | null) => {
    setState(prev => ({ ...prev, selectedDay: day }));
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
    let totalDone = 0, totalPossible = 0;
    const taskBlocks = DAILY_BLOCKS.filter(b => b.category !== 'break' && b.category !== 'personal');
    for (let d = 1; d <= today; d++) {
      const checks = state.dailyChecks[d] || {};
      totalDone += taskBlocks.filter(b => checks[b.id]).length;
      totalPossible += taskBlocks.length;
    }
    return totalPossible > 0 ? Math.round((totalDone / totalPossible) * 100) : 0;
  }, [state.dailyChecks]);

  const getDsaStats = useCallback(() => {
    let mastered = 0, inProgress = 0;
    for (const p of DSA_PROBLEMS) {
      const a = state.dsaAttempts[p.id];
      if (a?.third) mastered++;
      else if (a?.first || a?.second) inProgress++;
    }
    return { mastered, inProgress, notStarted: DSA_PROBLEMS.length - mastered - inProgress, total: DSA_PROBLEMS.length };
  }, [state.dsaAttempts]);

  const getWeekDsaStats = useCallback((week: 1 | 2 | 3 | 4 | 5) => {
    const weekProblems = DSA_PROBLEMS.filter(p => p.week === week);
    let mastered = 0, inProgress = 0;
    for (const p of weekProblems) {
      const a = state.dsaAttempts[p.id];
      if (a?.third) mastered++;
      else if (a?.first || a?.second) inProgress++;
    }
    return { mastered, inProgress, total: weekProblems.length };
  }, [state.dsaAttempts]);

  const getStreakCount = useCallback(() => {
    let streak = 0;
    const today = getCurrentDay();
    const taskBlocks = DAILY_BLOCKS.filter(b => b.category !== 'break' && b.category !== 'personal');
    for (let d = today; d >= 1; d--) {
      const checks = state.dailyChecks[d] || {};
      if (taskBlocks.some(b => checks[b.id])) streak++;
      else break;
    }
    return streak;
  }, [state.dailyChecks]);

  const getWeeklyAppCount = useCallback(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return state.jobApplications.filter(j => new Date(j.date) >= weekAgo).length;
  }, [state.jobApplications]);

  const getPlaylistStats = useCallback(() => {
    const { PLAYLISTS } = require('./playlists');
    let total = 0, watched = 0, practiced = 0;
    for (const pl of PLAYLISTS) {
      for (const v of pl.videos) {
        total++;
        const p = state.playlistProgress[v.id];
        if (p?.watched) watched++;
        if (p?.practiced) practiced++;
      }
    }
    return { watched, practiced, total };
  }, [state.playlistProgress]);

  return (
    <StoreContext.Provider value={{
      state, toggleDailyBlock, setDsaAttempt, getDsaAttemptState,
      addJobApplication, updateJobStatus, updateJobNotes, deleteJobApplication,
      updateJournal, togglePlaylistVideo, toggleFlashcard, setSelectedDay,
      getDayCompletion, getOverallProgress, getDsaStats, getWeekDsaStats,
      getStreakCount, getWeeklyAppCount, getPlaylistStats,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

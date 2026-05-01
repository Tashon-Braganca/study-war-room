"use client";

import React, { useState } from 'react';
import { useStore } from '@/store/StoreProvider';
import { PLAYLISTS } from '@/store/playlists';
import { ExternalLink, Eye, Code2, ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';

const CAT_COLORS: Record<string, string> = {
  genai: 'var(--color-accent)',
  agentic: 'var(--color-amber)',
  langchain: 'var(--color-accent)',
  dsa: 'var(--color-blue)',
  ml: 'var(--color-green)',
};

export default function PlaylistsPage() {
  const { state, togglePlaylistVideo, getPlaylistStats } = useStore();
  const stats = getPlaylistStats();
  const [expandedPlaylist, setExpandedPlaylist] = useState<string | null>(PLAYLISTS[0]?.id || null);

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:py-10">
      <div className="mb-6">
        <p className="text-[12px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-medium mb-1">Learning Resources</p>
        <h1 className="text-[28px] sm:text-[32px] font-bold text-[var(--color-text-primary)] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Video Playlists
        </h1>
      </div>

      {/* Overall stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] px-3.5 py-3">
          <p className="text-[11px] text-[var(--color-text-tertiary)] font-medium mb-1">Total Videos</p>
          <p className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>{stats.total}</p>
        </div>
        <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] px-3.5 py-3">
          <p className="text-[11px] text-[var(--color-text-tertiary)] font-medium mb-1">Watched</p>
          <p className="text-[22px] font-bold text-[var(--color-amber)]" style={{ fontFamily: 'var(--font-display)' }}>{stats.watched}</p>
        </div>
        <div className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] px-3.5 py-3">
          <p className="text-[11px] text-[var(--color-text-tertiary)] font-medium mb-1">Practiced</p>
          <p className="text-[22px] font-bold text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-display)' }}>{stats.practiced}</p>
        </div>
      </div>

      {/* 80/20 reminder */}
      <div className="mb-5 px-4 py-2.5 rounded-md bg-[var(--color-amber-surface)] border border-[var(--color-amber-dim)]/20">
        <p className="text-[12px] text-[var(--color-amber)] font-medium">Watched ≠ Done. Practice it or it doesn&apos;t count.</p>
      </div>

      {/* Playlists */}
      <div className="space-y-3">
        {PLAYLISTS.map(pl => {
          const isExpanded = expandedPlaylist === pl.id;
          let watched = 0, practiced = 0;
          for (const v of pl.videos) {
            const p = state.playlistProgress[v.id];
            if (p?.watched) watched++;
            if (p?.practiced) practiced++;
          }
          const total = pl.videos.length;
          const pctPracticed = total > 0 ? Math.round((practiced / total) * 100) : 0;

          return (
            <div key={pl.id} className="rounded-lg bg-[var(--color-surface-1)] border border-[var(--color-border)] overflow-hidden">
              {/* Header */}
              <button
                onClick={() => setExpandedPlaylist(isExpanded ? null : pl.id)}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-[var(--color-surface-2)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: `${CAT_COLORS[pl.category]}15` }}>
                    <PlayCircle size={16} style={{ color: CAT_COLORS[pl.category] }} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[14px] font-semibold text-[var(--color-text-primary)]">{pl.name}</h3>
                    <p className="text-[11px] text-[var(--color-text-tertiary)]">{pl.source} · {total} videos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 text-[11px]">
                    <span className="text-[var(--color-amber)]">{watched} watched</span>
                    <span className="text-[var(--color-text-tertiary)]">·</span>
                    <span className="text-[var(--color-accent)]">{practiced} practiced</span>
                  </div>
                  <div className="w-20 h-1.5 rounded-full bg-[var(--color-surface-3)] overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-400" style={{ width: `${pctPracticed}%`, backgroundColor: CAT_COLORS[pl.category] }} />
                  </div>
                  {isExpanded ? <ChevronUp size={14} className="text-[var(--color-text-tertiary)]" /> : <ChevronDown size={14} className="text-[var(--color-text-tertiary)]" />}
                </div>
              </button>

              {/* Video list */}
              {isExpanded && (
                <div className="border-t border-[var(--color-border-subtle)]">
                  <div className="px-4 py-2 flex items-center justify-between border-b border-[var(--color-border-subtle)]">
                    <a href={pl.playlistUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[var(--color-accent)] hover:underline flex items-center gap-1 no-underline">
                      <ExternalLink size={10} /> Open full playlist on YouTube
                    </a>
                  </div>
                  <div className="divide-y divide-[var(--color-border-subtle)] max-h-[400px] overflow-y-auto">
                    {pl.videos.map((video, idx) => {
                      const prog = state.playlistProgress[video.id] || { watched: false, practiced: false };
                      const isComplete = prog.watched && prog.practiced;
                      const isWatchedOnly = prog.watched && !prog.practiced;
                      return (
                        <div key={video.id} className={`flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-[var(--color-surface-2)] ${isComplete ? 'opacity-50' : ''}`}>
                          <span className="text-[11px] text-[var(--color-text-tertiary)] font-mono w-5 text-right flex-shrink-0">{idx + 1}</span>
                          <span className={`flex-1 text-[13px] min-w-0 truncate ${isComplete ? 'line-through text-[var(--color-text-tertiary)]' : isWatchedOnly ? 'text-[var(--color-amber)]' : 'text-[var(--color-text-primary)]'}`}>
                            {video.title}
                          </span>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => togglePlaylistVideo(video.id, 'watched')}
                              title="Mark as watched"
                              className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-all border ${prog.watched ? 'bg-[var(--color-amber)] border-[var(--color-amber)] text-white' : 'bg-[var(--color-surface-3)] border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:border-[var(--color-amber)]'}`}
                            >
                              <Eye size={10} /> W
                            </button>
                            <button
                              onClick={() => togglePlaylistVideo(video.id, 'practiced')}
                              title="Mark as practiced"
                              className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-all border ${prog.practiced ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white' : 'bg-[var(--color-surface-3)] border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:border-[var(--color-accent)]'}`}
                            >
                              <Code2 size={10} /> P
                            </button>
                            <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors p-1" title="Watch on YouTube">
                              <ExternalLink size={11} />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

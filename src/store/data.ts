// Re-export from split files
export { DSA_PROBLEMS } from './dsa-problems';
export type { DSAProblem } from './dsa-problems';
export { PLAYLISTS, MEDITATION_URL } from './playlists';
export type { Playlist, PlaylistVideo } from './playlists';
export { FLASHCARDS } from './flashcards';
export type { Flashcard } from './flashcards';

// ─── Plan Start Date ───
export const PLAN_START = new Date('2026-05-01T00:00:00+05:30');
export const PLAN_DAYS = 30;

// ─── Daily Time Blocks ───
export interface TimeBlock {
  id: string;
  time: string;
  label: string;
  category: 'genai' | 'code' | 'dsa' | 'break' | 'jobs' | 'resume' | 'interview' | 'drill' | 'review' | 'personal' | 'mindset';
  locked?: boolean;
  note?: string;
  externalUrl?: string;
  startHour: number; // 24h format for time tracking
  startMinute: number;
  endHour: number;
  endMinute: number;
}

export const DAILY_BLOCKS: TimeBlock[] = [
  { id: 'b0', time: '8:45 – 9:00 AM', label: 'Morning Meditation', category: 'mindset', note: 'No phone. No music. Just breathe.', startHour: 8, startMinute: 45, endHour: 9, endMinute: 0 },
  { id: 'b1', time: '9:00 – 10:00 AM', label: 'GenAI Theory (CampusX / Krish Naik)', category: 'genai', startHour: 9, startMinute: 0, endHour: 10, endMinute: 0 },
  { id: 'b2', time: '10:00 – 11:30 AM', label: 'Build/Code GenAI concept (no AI assistance)', category: 'code', startHour: 10, startMinute: 0, endHour: 11, endMinute: 30 },
  { id: 'b3', time: '11:30 AM – 1:00 PM', label: 'DSA Practice (Neetcode, pen+paper first)', category: 'dsa', startHour: 11, startMinute: 30, endHour: 13, endMinute: 0 },
  { id: 'b4', time: '1:00 – 2:00 PM', label: 'Lunch break', category: 'break', startHour: 13, startMinute: 0, endHour: 14, endMinute: 0 },
  { id: 'b5', time: '2:00 – 3:00 PM', label: 'Job Applications (LinkedIn, Wellfound, YC Jobs)', category: 'jobs', startHour: 14, startMinute: 0, endHour: 15, endMinute: 0 },
  { id: 'b6', time: '3:00 – 4:30 PM', label: 'Resume Defense Practice (record yourself)', category: 'resume', startHour: 15, startMinute: 0, endHour: 16, endMinute: 30 },
  { id: 'b7', time: '4:30 – 6:00 PM', label: 'Project Deep-Dive / Interview Prep', category: 'interview', startHour: 16, startMinute: 30, endHour: 18, endMinute: 0 },
  { id: 'b8', time: '6:00 – 7:00 PM', label: 'Free / Break', category: 'break', startHour: 18, startMinute: 0, endHour: 19, endMinute: 0 },
  { id: 'b9', time: '7:00 – 9:00 PM', label: 'Weak Area Drills (Python, FastAPI, debugging)', category: 'drill', startHour: 19, startMinute: 0, endHour: 21, endMinute: 0 },
  { id: 'b10', time: '9:00 – 11:00 PM', label: 'Review + Plan next day + GitHub commit + journal', category: 'review', startHour: 21, startMinute: 0, endHour: 23, endMinute: 0 },
  { id: 'b11', time: '10:45 – 11:00 PM', label: 'Night Meditation', category: 'mindset', note: 'No phone. No music. Just breathe.', startHour: 22, startMinute: 45, endHour: 23, endMinute: 0 },
  { id: 'b12', time: '11:00 PM – 1:00 AM', label: 'Personal time (locked, no work)', category: 'personal', locked: true, startHour: 23, startMinute: 0, endHour: 1, endMinute: 0 },
];

// Calculate focus hours (exclude break, personal, mindset)
export function getFocusHours(): number {
  let mins = 0;
  for (const b of DAILY_BLOCKS) {
    if (b.category === 'break' || b.category === 'personal' || b.category === 'mindset') continue;
    let endM = b.endHour * 60 + b.endMinute;
    const startM = b.startHour * 60 + b.startMinute;
    if (endM < startM) endM += 24 * 60;
    mins += endM - startM;
  }
  return Math.round(mins / 60 * 10) / 10;
}

// ─── Weekly Goals ───
export interface WeekGoal {
  week: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  days: string;
  genai: string[];
  dsa: string;
  resumeDefense: string[];
  jobTargets: string[];
  rule: string;
}

export const WEEKLY_GOALS: WeekGoal[] = [
  {
    week: 1, title: 'Know What You Built',
    subtitle: 'Be able to explain every single bullet on your resume with confidence',
    days: 'May 1–7',
    genai: ['RAG Architecture deep dive', 'LlamaIndex ingestion pipeline', 'Chunking strategies', 'Embedding models', 'Pinecone retrieval'],
    dsa: 'Arrays & Strings — problems 1–20',
    resumeDefense: ['LangGraph multi-agent system (Nelo)', 'RAG pipeline (Nelo)', 'Graho cost optimization'],
    jobTargets: ['LinkedIn Easy Apply (AI/ML/LLM Engineer)', 'Wellfound startup listings'],
    rule: 'NO Copilot, NO Claude for code. Think first, try for 20 min, then look at docs.',
  },
  {
    week: 2, title: 'Go Deeper on Agents',
    subtitle: 'Be able to build a basic LangGraph agent from scratch, by yourself',
    days: 'May 8–14',
    genai: ['Agentic AI — ReAct pattern', 'Tool calling & memory systems', 'LangGraph state machines', 'Multi-agent orchestration'],
    dsa: 'HashMaps & Two Pointers — problems 21–40',
    resumeDefense: ['Graho RAG-to-PDF pipeline', 'CandidRank pgvector semantic search', 'Binance trading bot LangGraph state machine'],
    jobTargets: ['Wellfound applications', 'Cold email 5 AI startups per day'],
    rule: 'Rebuild Nelo multi-agent system toy version yourself from scratch.',
  },
  {
    week: 3, title: 'Interview Mode',
    subtitle: 'Survive a 45-minute technical screen on GenAI topics',
    days: 'May 15–21',
    genai: ['Fine-tuning concepts (LoRA, QLoRA, PEFT)', 'Prompt engineering', 'Context window optimization', 'RAGAS eval framework'],
    dsa: 'Sliding Window & Stack & Trees — problems 41–60',
    resumeDefense: ['Forge AI Studio VRAM profiler', 'LoRA fine-tuning pipeline', 'MediLens multimodal pipeline'],
    jobTargets: ['Target Series A/B companies', 'HackerNews "Who is Hiring" thread'],
    rule: 'Do 2 mock interviews per week (use ChatGPT as the interviewer, no prep cheating).',
  },
  {
    week: 4, title: 'Close the Gap',
    subtitle: 'Apply only to well-matched roles, nail the first technical round',
    days: 'May 22–31',
    genai: ['MCP (Model Context Protocol)', 'Structured outputs & guardrails', 'LangSmith tracing', 'Cost engineering'],
    dsa: 'Binary Search, Trees, Graphs — problems 61–100',
    resumeDefense: ['Full mock resume walkthrough', 'Every bullet, 2 minutes each'],
    jobTargets: ['LinkedIn outreach to hiring managers directly', '10 cold emails per day'],
    rule: 'Record yourself doing a full mock interview and watch it back.',
  },
];

// ─── Job Application Sites ───
export interface JobSite { name: string; url: string; tags: string[]; }
export const JOB_SITES: JobSite[] = [
  { name: 'LinkedIn Jobs', url: 'https://linkedin.com/jobs', tags: ['AI Engineer India', 'LLM Engineer', 'Generative AI'] },
  { name: 'Wellfound (AngelList)', url: 'https://wellfound.com/jobs', tags: ['Startups'] },
  { name: 'Y Combinator Jobs', url: 'https://www.ycombinator.com/jobs', tags: ['YC'] },
  { name: 'HackerNews Who\'s Hiring', url: 'https://news.ycombinator.com/ask?q=who+is+hiring', tags: ['Monthly Thread'] },
  { name: 'Internshala', url: 'https://internshala.com', tags: ['India'] },
  { name: 'Naukri', url: 'https://naukri.com', tags: ['India'] },
  { name: 'Cutshort', url: 'https://cutshort.io', tags: ['India', 'Startups'] },
];

// ─── Interview Ammo (old format kept for backward compat) ───
export interface AmmoTopic { title: string; bullets: string[]; }
export const INTERVIEW_AMMO: AmmoTopic[] = [
  { title: 'LangGraph', bullets: ['State machine orchestration for multi-agent workflows', 'Nodes = functions, Edges = conditional routing', 'Supports cycles (unlike DAG-based systems)', 'Built-in persistence for conversation memory', 'Human-in-the-loop with interrupt_before/interrupt_after'] },
  { title: 'RAG', bullets: ['Ingestion: Load → Chunk → Embed → Index', 'Retrieval: Query embedding → Similarity search → Top-K', 'Generation: Context + Query → LLM → Answer', 'Chunking strategies: fixed, recursive, semantic', 'Evaluation: Faithfulness, relevance, context precision (RAGAS)'] },
  { title: 'LlamaIndex', bullets: ['Data framework for LLM applications', 'Ingestion pipeline: Readers → Transformations → Index', 'Query engine abstracts retrieval + synthesis', 'Supports multiple index types: Vector, Summary, Knowledge Graph', 'Built-in evaluation modules for RAG quality'] },
  { title: 'LoRA / QLoRA', bullets: ['Low-Rank Adaptation: freeze base weights, train small rank decomposition', 'Reduces trainable params by 100-1000x', 'QLoRA: 4-bit quantized base + LoRA adapters', 'PEFT library integrates with HuggingFace Transformers', 'Key params: rank (r), alpha, target modules, dropout'] },
  { title: 'Pinecone', bullets: ['Managed vector database for similarity search', 'Serverless or pod-based architecture', 'Metadata filtering on vector queries', 'Namespaces for multi-tenant isolation', 'Supports upsert, query, delete, fetch operations'] },
  { title: 'RAGAS', bullets: ['RAG evaluation framework', 'Metrics: Faithfulness, Answer Relevance, Context Precision, Context Recall', 'Synthetic test data generation for evaluation', 'Works with LangChain and LlamaIndex pipelines', 'Helps identify retrieval vs generation failures'] },
];

// ─── GitHub Repos ───
export const GITHUB_REPOS = [
  { name: 'Agentic AI', repo: 'agentic-ai-', color: 'var(--color-amber)' },
  { name: 'Generative AI', repo: 'generative-ai', color: 'var(--color-accent)' },
  { name: 'DSA', repo: 'dsa', color: 'var(--color-blue)' },
];

// ─── Microcopy ───
export function getStreakMessage(streak: number, totalDays: number): string {
  if (totalDays >= 30) return '30 days. Done. Now go get that job.';
  if (streak === 0) return "Day 0. You haven't started. That ends today.";
  if (streak === 1) return '1 day. Good. Now do it again tomorrow.';
  if (streak === 2) return "2 days. Don't you dare break it.";
  if (streak === 3) return '3 days strong. You\'re building something real.';
  if (streak <= 5) return `${streak} days. Most people quit by now. You didn't.`;
  if (streak === 7) return "One full week. You're not the same person you were on Day 1.";
  if (streak <= 13) return `${streak} days. The momentum is undeniable.`;
  if (streak === 14) return 'Two weeks. Halfway. The job is real now.';
  if (streak <= 20) return `${streak} days. You've earned this streak.`;
  if (streak <= 29) return `${streak} days. The finish line is in sight.`;
  return `${streak} days. Relentless.`;
}

export function getDsaMessage(solved: number): string {
  if (solved === 0) return 'Nothing solved yet. Get to work.';
  if (solved < 20) return `${solved}/100 — Just warming up.`;
  if (solved < 40) return `${solved}/100 — Patterns are forming.`;
  if (solved < 60) return `${solved}/100 — Muscle memory building.`;
  if (solved < 80) return `${solved}/100 — Almost there. Finish strong.`;
  if (solved < 100) return `${solved}/100 — The final stretch.`;
  return "100/100. You're not the same person who started.";
}

export function getJobLogMessage(total: number): string {
  if (total === 0) return 'Nothing logged yet. Get to work.';
  if (total < 10) return `${total} applications. Keep pushing.`;
  if (total < 30) return `${total} applications. Numbers game, keep going.`;
  if (total < 50) return `${total} applications. You're in the grind.`;
  return `${total} applications. Relentless volume.`;
}

export function getGitHubMessage(totalCommits: number): string {
  if (totalCommits === 0) return "You haven't pushed anything today. Code by hand. Then commit.";
  if (totalCommits <= 2) return 'Good start. Keep going.';
  if (totalCommits <= 5) return 'Solid output today.';
  return 'Machine. 🔥';
}

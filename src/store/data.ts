// ─── Plan Start Date ───
export const PLAN_START = new Date('2026-05-01T00:00:00+05:30');
export const PLAN_DAYS = 30;

// ─── Daily Time Blocks ───
export interface TimeBlock {
  id: string;
  time: string;
  label: string;
  category: 'genai' | 'code' | 'dsa' | 'break' | 'jobs' | 'resume' | 'interview' | 'drill' | 'review' | 'personal';
}

export const DAILY_BLOCKS: TimeBlock[] = [
  { id: 'b1', time: '9:00 – 10:00 AM', label: 'GenAI Theory (CampusX / Krish Naik)', category: 'genai' },
  { id: 'b2', time: '10:00 – 11:30 AM', label: 'Build/Code GenAI concept (no AI assistance)', category: 'code' },
  { id: 'b3', time: '11:30 AM – 1:00 PM', label: 'DSA Practice (Neetcode, pen+paper first)', category: 'dsa' },
  { id: 'b4', time: '1:00 – 2:00 PM', label: 'Lunch break', category: 'break' },
  { id: 'b5', time: '2:00 – 3:00 PM', label: 'Job Applications (LinkedIn, Wellfound, YC Jobs)', category: 'jobs' },
  { id: 'b6', time: '3:00 – 4:30 PM', label: 'Resume Defense Practice (record yourself)', category: 'resume' },
  { id: 'b7', time: '4:30 – 6:00 PM', label: 'Project Deep-Dive / Interview Prep (LangGraph, RAG, LangChain)', category: 'interview' },
  { id: 'b8', time: '6:00 – 7:00 PM', label: 'Free / Break', category: 'break' },
  { id: 'b9', time: '7:00 – 9:00 PM', label: 'Weak Area Drills (Python, FastAPI, debugging)', category: 'drill' },
  { id: 'b10', time: '9:00 – 11:00 PM', label: 'Review + Plan next day + GitHub commit + journal', category: 'review' },
  { id: 'b11', time: '11:00 PM – 1:00 AM', label: 'Personal time (locked, no work)', category: 'personal' },
];

// ─── DSA Problems ───
export interface DSAProblem {
  id: number;
  name: string;
  difficulty: 'Easy' | 'Medium';
  week: 1 | 2 | 3 | 4;
}

export const DSA_PROBLEMS: DSAProblem[] = [
  // Week 1 (1–20)
  { id: 1, name: 'Two Sum', difficulty: 'Easy', week: 1 },
  { id: 2, name: 'Valid Anagram', difficulty: 'Easy', week: 1 },
  { id: 3, name: 'Contains Duplicate', difficulty: 'Easy', week: 1 },
  { id: 4, name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', week: 1 },
  { id: 5, name: 'Valid Palindrome', difficulty: 'Easy', week: 1 },
  { id: 6, name: 'Longest Common Prefix', difficulty: 'Easy', week: 1 },
  { id: 7, name: 'Reverse String', difficulty: 'Easy', week: 1 },
  { id: 8, name: 'Valid Parentheses', difficulty: 'Easy', week: 1 },
  { id: 9, name: 'Merge Sorted Array', difficulty: 'Easy', week: 1 },
  { id: 10, name: 'Move Zeroes', difficulty: 'Easy', week: 1 },
  { id: 11, name: 'Plus One', difficulty: 'Easy', week: 1 },
  { id: 12, name: 'Roman to Integer', difficulty: 'Easy', week: 1 },
  { id: 13, name: 'Palindrome Number', difficulty: 'Easy', week: 1 },
  { id: 14, name: 'Find the Index of First Occurrence', difficulty: 'Easy', week: 1 },
  { id: 15, name: 'Length of Last Word', difficulty: 'Easy', week: 1 },
  { id: 16, name: 'Search Insert Position', difficulty: 'Easy', week: 1 },
  { id: 17, name: 'Count and Say', difficulty: 'Medium', week: 1 },
  { id: 18, name: 'Missing Number', difficulty: 'Easy', week: 1 },
  { id: 19, name: 'Single Number', difficulty: 'Easy', week: 1 },
  { id: 20, name: 'Climbing Stairs', difficulty: 'Easy', week: 1 },
  // Week 2 (21–40)
  { id: 21, name: 'Group Anagrams', difficulty: 'Medium', week: 2 },
  { id: 22, name: 'Top K Frequent Elements', difficulty: 'Medium', week: 2 },
  { id: 23, name: 'Product of Array Except Self', difficulty: 'Medium', week: 2 },
  { id: 24, name: 'Valid Sudoku', difficulty: 'Medium', week: 2 },
  { id: 25, name: 'Encode and Decode Strings', difficulty: 'Medium', week: 2 },
  { id: 26, name: 'Longest Consecutive Sequence', difficulty: 'Medium', week: 2 },
  { id: 27, name: 'Two Sum II', difficulty: 'Medium', week: 2 },
  { id: 28, name: '3Sum', difficulty: 'Medium', week: 2 },
  { id: 29, name: 'Container With Most Water', difficulty: 'Medium', week: 2 },
  { id: 30, name: 'Trapping Rain Water', difficulty: 'Medium', week: 2 },
  { id: 31, name: 'Max Number of K-Sum Pairs', difficulty: 'Medium', week: 2 },
  { id: 32, name: 'Subarray Sum Equals K', difficulty: 'Medium', week: 2 },
  { id: 33, name: 'Minimum Size Subarray Sum', difficulty: 'Medium', week: 2 },
  { id: 34, name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', week: 2 },
  { id: 35, name: 'Longest Repeating Character Replacement', difficulty: 'Medium', week: 2 },
  { id: 36, name: 'Permutation in String', difficulty: 'Medium', week: 2 },
  { id: 37, name: 'Find All Anagrams in a String', difficulty: 'Medium', week: 2 },
  { id: 38, name: 'Minimum Window Substring', difficulty: 'Medium', week: 2 },
  { id: 39, name: 'Sliding Window Maximum', difficulty: 'Medium', week: 2 },
  { id: 40, name: 'Best Time to Buy/Sell Stock II', difficulty: 'Medium', week: 2 },
  // Week 3 (41–60)
  { id: 41, name: 'Min Stack', difficulty: 'Medium', week: 3 },
  { id: 42, name: 'Valid Parentheses (Medium)', difficulty: 'Medium', week: 3 },
  { id: 43, name: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', week: 3 },
  { id: 44, name: 'Generate Parentheses', difficulty: 'Medium', week: 3 },
  { id: 45, name: 'Daily Temperatures', difficulty: 'Medium', week: 3 },
  { id: 46, name: 'Car Fleet', difficulty: 'Medium', week: 3 },
  { id: 47, name: 'Largest Rectangle in Histogram', difficulty: 'Medium', week: 3 },
  { id: 48, name: 'Maximum Depth of Binary Tree', difficulty: 'Easy', week: 3 },
  { id: 49, name: 'Same Tree', difficulty: 'Easy', week: 3 },
  { id: 50, name: 'Invert Binary Tree', difficulty: 'Easy', week: 3 },
  { id: 51, name: 'Max Difference Between Node and Ancestor', difficulty: 'Medium', week: 3 },
  { id: 52, name: 'Diameter of Binary Tree', difficulty: 'Easy', week: 3 },
  { id: 53, name: 'Balanced Binary Tree', difficulty: 'Easy', week: 3 },
  { id: 54, name: 'Lowest Common Ancestor of BST', difficulty: 'Medium', week: 3 },
  { id: 55, name: 'Binary Tree Level Order Traversal', difficulty: 'Medium', week: 3 },
  { id: 56, name: 'Binary Tree Right Side View', difficulty: 'Medium', week: 3 },
  { id: 57, name: 'Count Good Nodes in Binary Tree', difficulty: 'Medium', week: 3 },
  { id: 58, name: 'Validate Binary Search Tree', difficulty: 'Medium', week: 3 },
  { id: 59, name: 'Kth Smallest Element in BST', difficulty: 'Medium', week: 3 },
  { id: 60, name: 'Construct Binary Tree from Preorder and Inorder', difficulty: 'Medium', week: 3 },
  // Week 4 (61–75)
  { id: 61, name: 'Binary Search', difficulty: 'Easy', week: 4 },
  { id: 62, name: 'Search 2D Matrix', difficulty: 'Medium', week: 4 },
  { id: 63, name: 'Koko Eating Bananas', difficulty: 'Medium', week: 4 },
  { id: 64, name: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', week: 4 },
  { id: 65, name: 'Search in Rotated Sorted Array', difficulty: 'Medium', week: 4 },
  { id: 66, name: 'Time Based Key-Value Store', difficulty: 'Medium', week: 4 },
  { id: 67, name: 'Find Median from Data Stream', difficulty: 'Medium', week: 4 },
  { id: 68, name: 'Merge K Sorted Lists', difficulty: 'Medium', week: 4 },
  { id: 69, name: 'Top K Frequent Elements (heap)', difficulty: 'Medium', week: 4 },
  { id: 70, name: 'Task Scheduler', difficulty: 'Medium', week: 4 },
  { id: 71, name: 'Design Twitter', difficulty: 'Medium', week: 4 },
  { id: 72, name: 'Word Search', difficulty: 'Medium', week: 4 },
  { id: 73, name: 'Number of Islands', difficulty: 'Medium', week: 4 },
  { id: 74, name: 'Rotting Oranges', difficulty: 'Medium', week: 4 },
  { id: 75, name: 'Clone Graph', difficulty: 'Medium', week: 4 },
];

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
    week: 1,
    title: 'Know What You Built',
    subtitle: 'Be able to explain every single bullet on your resume with confidence',
    days: 'May 1–7',
    genai: [
      'RAG Architecture deep dive',
      'LlamaIndex ingestion pipeline',
      'Chunking strategies',
      'Embedding models',
      'Pinecone retrieval',
    ],
    dsa: 'Arrays & Strings — Neetcode Easy problems 1–20',
    resumeDefense: [
      'LangGraph multi-agent system (Nelo)',
      'RAG pipeline (Nelo)',
      'Graho cost optimization',
    ],
    jobTargets: [
      'LinkedIn Easy Apply (AI/ML/LLM Engineer)',
      'Wellfound startup listings',
    ],
    rule: 'NO Copilot, NO Claude for code. Think first, try for 20 min, then look at docs.',
  },
  {
    week: 2,
    title: 'Go Deeper on Agents',
    subtitle: 'Be able to build a basic LangGraph agent from scratch, by yourself',
    days: 'May 8–14',
    genai: [
      'Agentic AI — ReAct pattern',
      'Tool calling & memory systems',
      'LangGraph state machines',
      'Multi-agent orchestration',
    ],
    dsa: 'HashMaps & Two Pointers — problems 21–40',
    resumeDefense: [
      'Graho RAG-to-PDF pipeline',
      'CandidRank pgvector semantic search',
      'Binance trading bot LangGraph state machine',
    ],
    jobTargets: [
      'Wellfound applications',
      'Cold email 5 AI startups per day',
    ],
    rule: 'Rebuild Nelo multi-agent system toy version yourself from scratch.',
  },
  {
    week: 3,
    title: 'Interview Mode',
    subtitle: 'Survive a 45-minute technical screen on GenAI topics',
    days: 'May 15–21',
    genai: [
      'Fine-tuning concepts (LoRA, QLoRA, PEFT)',
      'Prompt engineering',
      'Context window optimization',
      'RAGAS eval framework',
    ],
    dsa: 'Sliding Window & Stack — problems 41–60',
    resumeDefense: [
      'Forge AI Studio VRAM profiler',
      'LoRA fine-tuning pipeline',
      'MediLens multimodal pipeline',
    ],
    jobTargets: [
      'Target Series A/B companies',
      'HackerNews "Who is Hiring" thread',
    ],
    rule: 'Do 2 mock interviews per week (use ChatGPT as the interviewer, no prep cheating).',
  },
  {
    week: 4,
    title: 'Close the Gap',
    subtitle: 'Apply only to well-matched roles, nail the first technical round',
    days: 'May 22–31',
    genai: [
      'MCP (Model Context Protocol)',
      'Structured outputs & guardrails',
      'LangSmith tracing',
      'Cost engineering',
    ],
    dsa: 'Binary Search & Trees — problems 61–75 (Blind 75)',
    resumeDefense: [
      'Full mock resume walkthrough',
      'Every bullet, 2 minutes each',
    ],
    jobTargets: [
      'LinkedIn outreach to hiring managers directly',
      '10 cold emails per day',
    ],
    rule: 'Record yourself doing a full mock interview and watch it back.',
  },
];

// ─── Job Application Sites ───
export interface JobSite {
  name: string;
  url: string;
  tags: string[];
}

export const JOB_SITES: JobSite[] = [
  { name: 'LinkedIn Jobs', url: 'https://linkedin.com/jobs', tags: ['AI Engineer India', 'LLM Engineer', 'Generative AI'] },
  { name: 'Wellfound (AngelList)', url: 'https://wellfound.com/jobs', tags: ['Startups'] },
  { name: 'Y Combinator Jobs', url: 'https://www.ycombinator.com/jobs', tags: ['YC'] },
  { name: 'HackerNews Who\'s Hiring', url: 'https://news.ycombinator.com/ask?q=who+is+hiring', tags: ['Monthly Thread'] },
  { name: 'Internshala', url: 'https://internshala.com', tags: ['India'] },
  { name: 'Naukri', url: 'https://naukri.com', tags: ['India'] },
  { name: 'Cutshort', url: 'https://cutshort.io', tags: ['India', 'Startups'] },
];

// ─── Interview Ammo ───
export interface AmmoTopic {
  title: string;
  bullets: string[];
}

export const INTERVIEW_AMMO: AmmoTopic[] = [
  {
    title: 'LangGraph',
    bullets: [
      'State machine orchestration for multi-agent workflows',
      'Nodes = functions, Edges = conditional routing',
      'Supports cycles (unlike DAG-based systems)',
      'Built-in persistence for conversation memory',
      'Human-in-the-loop with interrupt_before/interrupt_after',
    ],
  },
  {
    title: 'RAG (Retrieval-Augmented Generation)',
    bullets: [
      'Ingestion: Load → Chunk → Embed → Index',
      'Retrieval: Query embedding → Similarity search → Top-K',
      'Generation: Context + Query → LLM → Answer',
      'Chunking strategies: fixed, recursive, semantic',
      'Evaluation: Faithfulness, relevance, context precision (RAGAS)',
    ],
  },
  {
    title: 'LlamaIndex',
    bullets: [
      'Data framework for LLM applications',
      'Ingestion pipeline: Readers → Transformations → Index',
      'Query engine abstracts retrieval + synthesis',
      'Supports multiple index types: Vector, Summary, Knowledge Graph',
      'Built-in evaluation modules for RAG quality',
    ],
  },
  {
    title: 'LoRA / QLoRA',
    bullets: [
      'Low-Rank Adaptation: freeze base weights, train small rank decomposition',
      'Reduces trainable params by 100-1000x',
      'QLoRA: 4-bit quantized base + LoRA adapters',
      'PEFT library integrates with HuggingFace Transformers',
      'Key params: rank (r), alpha, target modules, dropout',
    ],
  },
  {
    title: 'Pinecone',
    bullets: [
      'Managed vector database for similarity search',
      'Serverless or pod-based architecture',
      'Metadata filtering on vector queries',
      'Namespaces for multi-tenant isolation',
      'Supports upsert, query, delete, fetch operations',
    ],
  },
  {
    title: 'RAGAS',
    bullets: [
      'RAG evaluation framework',
      'Metrics: Faithfulness, Answer Relevance, Context Precision, Context Recall',
      'Synthetic test data generation for evaluation',
      'Works with LangChain and LlamaIndex pipelines',
      'Helps identify retrieval vs generation failures',
    ],
  },
];

// ─── Microcopy ───
export function getStreakMessage(streak: number, totalDays: number): string {
  if (totalDays >= 30) return '30 days. Done. Now go get that job.';
  if (streak === 0) return "Day 0. You haven't started. That ends today.";
  if (streak === 1) return 'Day 1. The hardest step is behind you.';
  if (streak === 2) return '2 days in. Keep the momentum.';
  if (streak <= 5) return `${streak} days strong 🔥`;
  if (streak <= 10) return `${streak} days. You\'re building something real.`;
  if (streak <= 20) return `${streak} days. Most people quit by now. Not you.`;
  if (streak <= 29) return `${streak} days. The finish line is in sight.`;
  return `${streak} days. Relentless.`;
}

export function getDsaMessage(solved: number): string {
  if (solved === 0) return 'Nothing solved yet. Get to work.';
  if (solved < 20) return `${solved}/75 — Just warming up.`;
  if (solved < 40) return `${solved}/75 — Patterns are forming.`;
  if (solved < 60) return `${solved}/75 — Muscle memory building.`;
  if (solved < 75) return `${solved}/75 — Almost there. Finish strong.`;
  return "75/75. You're not the same person who started.";
}

export function getJobLogMessage(total: number): string {
  if (total === 0) return 'Nothing logged yet. Get to work.';
  if (total < 10) return `${total} applications. Keep pushing.`;
  if (total < 30) return `${total} applications. Numbers game, keep going.`;
  if (total < 50) return `${total} applications. You\'re in the grind.`;
  return `${total} applications. Relentless volume.`;
}

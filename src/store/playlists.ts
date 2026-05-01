export interface PlaylistVideo {
  id: string;
  title: string;
  url: string;
}

export interface Playlist {
  id: string;
  name: string;
  source: string;
  playlistUrl: string;
  category: 'genai' | 'agentic' | 'langchain' | 'dsa' | 'ml';
  videos: PlaylistVideo[];
}

export const PLAYLISTS: Playlist[] = [
  {
    id: 'campusx-langgraph',
    name: 'Agentic AI using LangGraph',
    source: 'CampusX',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL',
    category: 'agentic',
    videos: [
      { id: 'cx-lg-1', title: 'What is Agentic AI? — Introduction', url: 'https://www.youtube.com/watch?v=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=1' },
      { id: 'cx-lg-2', title: 'AI Agents vs Traditional AI Systems', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=2' },
      { id: 'cx-lg-3', title: 'LangGraph Fundamentals — State, Nodes, Edges', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=3' },
      { id: 'cx-lg-4', title: 'Building Your First LangGraph Agent', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=4' },
      { id: 'cx-lg-5', title: 'StateGraph & MessageState Deep Dive', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=5' },
      { id: 'cx-lg-6', title: 'Tool Calling in LangGraph', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=6' },
      { id: 'cx-lg-7', title: 'Conditional Edges & Routing', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=7' },
      { id: 'cx-lg-8', title: 'ReAct Agent Pattern', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=8' },
      { id: 'cx-lg-9', title: 'Memory & Persistence in LangGraph', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=9' },
      { id: 'cx-lg-10', title: 'Human-in-the-Loop Agents', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=10' },
      { id: 'cx-lg-11', title: 'Multi-Agent Systems — Architecture', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=11' },
      { id: 'cx-lg-12', title: 'Supervisor Agent Pattern', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=12' },
      { id: 'cx-lg-13', title: 'Parallel Agent Execution', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=13' },
      { id: 'cx-lg-14', title: 'Sub-Graphs & Modular Agents', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=14' },
      { id: 'cx-lg-15', title: 'Error Handling & Retries', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=15' },
      { id: 'cx-lg-16', title: 'Streaming in LangGraph', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=16' },
      { id: 'cx-lg-17', title: 'LangGraph Studio & Debugging', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=17' },
      { id: 'cx-lg-18', title: 'Building a RAG Agent with LangGraph', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=18' },
      { id: 'cx-lg-19', title: 'Building a Research Agent', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=19' },
      { id: 'cx-lg-20', title: 'Production Deployment of Agents', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL&index=20' },
    ],
  },
  {
    id: 'campusx-genai',
    name: 'Generative AI using LangChain',
    source: 'CampusX',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0',
    category: 'genai',
    videos: [
      { id: 'cx-gc-1', title: 'Introduction to Generative AI', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=1' },
      { id: 'cx-gc-2', title: 'LLMs — How They Work', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=2' },
      { id: 'cx-gc-3', title: 'Prompt Engineering Fundamentals', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=3' },
      { id: 'cx-gc-4', title: 'LangChain Introduction & Setup', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=4' },
      { id: 'cx-gc-5', title: 'Chains in LangChain', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=5' },
      { id: 'cx-gc-6', title: 'Output Parsers & Structured Output', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=6' },
      { id: 'cx-gc-7', title: 'Document Loaders & Text Splitters', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=7' },
      { id: 'cx-gc-8', title: 'Embeddings & Vector Stores', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=8' },
      { id: 'cx-gc-9', title: 'RAG Pipeline — End to End', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=9' },
      { id: 'cx-gc-10', title: 'Conversational RAG with Memory', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=10' },
      { id: 'cx-gc-11', title: 'Advanced Retrieval Strategies', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=11' },
      { id: 'cx-gc-12', title: 'Agents in LangChain', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=12' },
      { id: 'cx-gc-13', title: 'Custom Tools for Agents', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=13' },
      { id: 'cx-gc-14', title: 'Fine-tuning LLMs — Overview', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=14' },
      { id: 'cx-gc-15', title: 'LoRA & QLoRA Fine-tuning', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=15' },
      { id: 'cx-gc-16', title: 'PEFT — Parameter Efficient Fine-tuning', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=16' },
      { id: 'cx-gc-17', title: 'Evaluation of RAG — RAGAS Framework', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=17' },
      { id: 'cx-gc-18', title: 'LangSmith — Tracing & Debugging', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=18' },
      { id: 'cx-gc-19', title: 'Deploying GenAI Apps with FastAPI', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=19' },
      { id: 'cx-gc-20', title: 'Project: End-to-End RAG App', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=20' },
    ],
  },
  {
    id: 'krish-agentic',
    name: 'Agentic AI with LangGraph',
    source: 'Krish Naik',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO',
    category: 'agentic',
    videos: [
      { id: 'kn-ag-1', title: 'Introduction to Agentic AI', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO&index=1' },
      { id: 'kn-ag-2', title: 'LangGraph — Getting Started', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO&index=2' },
      { id: 'kn-ag-3', title: 'Building Stateful Agents', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO&index=3' },
      { id: 'kn-ag-4', title: 'Tool Calling & Function Calling', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO&index=4' },
      { id: 'kn-ag-5', title: 'ReAct Agent Pattern Explained', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO&index=5' },
      { id: 'kn-ag-6', title: 'Multi-Agent Orchestration', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO&index=6' },
      { id: 'kn-ag-7', title: 'Memory Systems for Agents', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO&index=7' },
      { id: 'kn-ag-8', title: 'Conditional Routing in LangGraph', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO&index=8' },
      { id: 'kn-ag-9', title: 'Building a Customer Support Agent', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO&index=9' },
      { id: 'kn-ag-10', title: 'RAG + Agents — Combining Both', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO&index=10' },
      { id: 'kn-ag-11', title: 'Deploying Agentic AI Apps', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO&index=11' },
      { id: 'kn-ag-12', title: 'Advanced Agent Patterns', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO&index=12' },
    ],
  },
  {
    id: 'campusx-complete-genai',
    name: 'Complete Generative AI & Agentic AI',
    source: 'CampusX',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu',
    category: 'genai',
    videos: [
      { id: 'cx-cg-1', title: 'GenAI Roadmap 2024-25', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=1' },
      { id: 'cx-cg-2', title: 'NLP Fundamentals for GenAI', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=2' },
      { id: 'cx-cg-3', title: 'Transformers Architecture', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=3' },
      { id: 'cx-cg-4', title: 'Attention Mechanism Deep Dive', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=4' },
      { id: 'cx-cg-5', title: 'GPT Architecture Explained', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=5' },
      { id: 'cx-cg-6', title: 'BERT vs GPT — When to Use What', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=6' },
      { id: 'cx-cg-7', title: 'Tokenization — BPE, WordPiece, SentencePiece', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=7' },
      { id: 'cx-cg-8', title: 'Prompt Engineering Advanced', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=8' },
      { id: 'cx-cg-9', title: 'OpenAI API & Function Calling', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=9' },
      { id: 'cx-cg-10', title: 'Vector Databases Explained', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=10' },
      { id: 'cx-cg-11', title: 'Pinecone / ChromaDB / FAISS', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=11' },
      { id: 'cx-cg-12', title: 'RAG Architecture End-to-End', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=12' },
      { id: 'cx-cg-13', title: 'Advanced RAG — Reranking, HyDE, CRAG', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=13' },
      { id: 'cx-cg-14', title: 'LlamaIndex Full Tutorial', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=14' },
      { id: 'cx-cg-15', title: 'Fine-Tuning with LoRA', url: 'https://www.youtube.com/playlist?list=PLTDARY42LDV567lWN_5BtoVGjMFKbthGu&index=15' },
    ],
  },
  {
    id: 'krish-agentic-ai',
    name: 'Agentic AI',
    source: 'Krish Naik',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVMBr14UQ30AFlnlQ7eL5wjl',
    category: 'agentic',
    videos: [
      { id: 'kn-ai-1', title: 'What is Agentic AI? Complete Roadmap', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVMBr14UQ30AFlnlQ7eL5wjl&index=1' },
      { id: 'kn-ai-2', title: 'CrewAI — Multi-Agent Framework', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVMBr14UQ30AFlnlQ7eL5wjl&index=2' },
      { id: 'kn-ai-3', title: 'AutoGen — Microsoft Agent Framework', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVMBr14UQ30AFlnlQ7eL5wjl&index=3' },
      { id: 'kn-ai-4', title: 'Phidata Agents Tutorial', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVMBr14UQ30AFlnlQ7eL5wjl&index=4' },
      { id: 'kn-ai-5', title: 'MCP — Model Context Protocol', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVMBr14UQ30AFlnlQ7eL5wjl&index=5' },
      { id: 'kn-ai-6', title: 'Building Agents with OpenAI', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVMBr14UQ30AFlnlQ7eL5wjl&index=6' },
      { id: 'kn-ai-7', title: 'LangGraph Deep Dive', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVMBr14UQ30AFlnlQ7eL5wjl&index=7' },
      { id: 'kn-ai-8', title: 'Agent Memory & Context Management', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVMBr14UQ30AFlnlQ7eL5wjl&index=8' },
      { id: 'kn-ai-9', title: 'Structured Outputs & Guardrails', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVMBr14UQ30AFlnlQ7eL5wjl&index=9' },
      { id: 'kn-ai-10', title: 'End-to-End Agentic AI Project', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVMBr14UQ30AFlnlQ7eL5wjl&index=10' },
    ],
  },
];

// ─── Meditation Video ───
export const MEDITATION_URL = 'https://www.youtube.com/watch?v=dIb-DujRNEo&t=3s';

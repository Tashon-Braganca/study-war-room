export interface Flashcard {
  id: string;
  topic: string;
  question: string;
  answer: string;
}

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    topic: 'LangGraph',
    question: 'What is the difference between a LangGraph state machine and a simple LangChain chain?',
    answer: 'LangChain chains are linear — input flows through steps sequentially with no branching. LangGraph is a stateful directed graph — nodes are functions, edges define transitions, and you can have conditional routing, loops, and parallel execution. State is passed between nodes as a typed dict (StateGraph). This enables multi-agent orchestration, retries, and complex reasoning flows.',
  },
  {
    id: 'fc-2',
    topic: 'RAG Pipeline',
    question: 'Walk me through a RAG pipeline from document to answer.',
    answer: '1. Ingestion: Load documents, split into chunks (chunk_size, chunk_overlap tuned to content type), embed each chunk with an embedding model (e.g., text-embedding-3-small). 2. Storage: Store vectors in a vector DB (Pinecone, pgvector). 3. Retrieval: On query, embed the question, run similarity search (cosine/MMR), retrieve top-k chunks. 4. Generation: Stuff retrieved chunks into prompt context, call LLM (GPT-4o) with the augmented prompt. Key tuning levers: chunk size, overlap, k, retrieval strategy, prompt template.',
  },
  {
    id: 'fc-3',
    topic: 'LoRA Fine-tuning',
    question: 'Explain LoRA in simple terms. Why use it instead of full fine-tuning?',
    answer: 'LoRA (Low-Rank Adaptation) freezes the original model weights and adds small trainable rank-decomposition matrices (A and B) to attention layers. Instead of updating all N parameters, you only train r×d parameters where r << d. This cuts VRAM from 80GB+ (full fine-tune of 7B) to 6–12GB (LoRA on consumer GPU). QLoRA adds 4-bit quantization on top, making it possible on 8–16GB VRAM. The trained adapters are saved separately and merged at inference.',
  },
  {
    id: 'fc-4',
    topic: 'Tool Calling',
    question: 'How does tool calling work in an LLM agent?',
    answer: 'You pass a list of tool schemas (JSON Schema) to the LLM alongside the user message. The LLM decides whether to call a tool by returning a structured JSON response (tool_name + arguments) instead of a natural language reply. Your code executes the tool, returns the result back to the LLM as a ToolMessage, and the LLM generates the final answer using that result. In LangGraph, this is the ReAct loop: Reason → Act (tool call) → Observe (result) → Reason again.',
  },
  {
    id: 'fc-5',
    topic: 'RAGAS Evaluation',
    question: 'How did you evaluate your RAG pipeline at Nelo? What metrics did you use?',
    answer: 'Used a 40-query eval set with cross-referenced source documents as ground truth. Primary metric: answer accuracy (did the answer match the source doc). Also tracked context precision (were the retrieved chunks relevant?) and context recall (were all relevant chunks retrieved?). Tuned chunk size from 512→256, overlap from 50→75, and retrieval prompt to improve from 58% to 91% accuracy. RAGAS framework automates these metrics using the LLM itself as evaluator.',
  },
  {
    id: 'fc-6',
    topic: 'Cost Optimization',
    question: 'How did you drop per-conversation cost from Rs. 0.18 to Rs. 0.03 at Penzo?',
    answer: 'Three levers: 1. Multi-turn prompt templates — instead of sending full conversation history every turn, maintained a compressed summary + last 3 turns, cutting input tokens ~60%. 2. Token-budget controls — set max_tokens hard limits per response type (short answers capped at 150 tokens, reports at 500). 3. Redis caching — cached identical or near-identical query responses with a 1-hour TTL. Net effect: ~83% cost reduction with zero change in output quality.',
  },
];

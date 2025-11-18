import type { DiagramNode } from "../types";

export const chapter4: DiagramNode = {
  id: "evol-root",
  title: "Evolution of transformers: GPT series, Gemini, DeepSeek",
  description: "How transformer-based LLMs evolved from GPT-1 through GPT-4 to Gemini and DeepSeek’s RL-trained reasoning models.",
  children: [
    {
      id: "B",
      title: "GPT series (GPT-1 to GPT-4)",
      children: [
        {
          id: "B1",
          title: "GPT-1: decoder-only model with unsupervised pretraining",
          children: [
            { id: "B1a", title: "Pretraining on BooksCorpus (unlabeled books) to learn general language patterns" },
            { id: "B1b", title: "Task-aware input transformations unify structured NLP tasks into plain text sequences" },
            { id: "B1c", title: "Early limitations in long-form coherence, multi-turn dialogue, and reasoning" }
          ]
        },
        {
          id: "B2",
          title: "GPT-2: scaled decoder-only language model",
          children: [
            { id: "B2a", title: "10× parameter increase and WebText dataset of high-quality web pages" },
            { id: "B2b", title: "Improved long-range coherence and commonsense text modeling" },
            { id: "B2c", title: "Strong zero-shot transfer and log-linear performance gains with scale" }
          ]
        },
        {
          id: "B3",
          title: "GPT-3 / InstructGPT / GPT-3.5 / GPT-4",
          children: [
            { id: "B3a", title: "GPT-3: 175B parameters enabling strong in-context and few-shot learning" },
            { id: "B3b", title: "InstructGPT: supervised fine-tuning and RLHF for better alignment and safety" },
            { id: "B3c", title: "GPT-3.5: enhanced code understanding, dialogue, and larger context windows" },
            { id: "B3d", title: "GPT-4: multimodal inputs, very large context windows, and advanced cross-domain reasoning" }
          ]
        }
      ]
    },
    {
      id: "C",
      title: "Gemini multimodal family",
      children: [
        {
          id: "C1",
          title: "Architecture and multimodal design",
          children: [
            { id: "C1a", title: "Decoder-only transformer backbone with Mixture-of-Experts layers" },
            { id: "C1b", title: "Multi-query attention and very long context windows for efficient scaling" }
          ]
        },
        {
          id: "C2",
          title: "Training and scaling strategy",
          children: [
            { id: "C2a", title: "Training on text, code, images, audio, and video data" },
            { id: "C2b", title: "Compute-optimal scaling of parameters and tokens (Chinchilla-style)" }
          ]
        },
        {
          id: "C3",
          title: "Gemini 1.x model family",
          children: [
            { id: "C3a", title: "Gemini Ultra: largest model for highly complex tasks and SOTA benchmarks" },
            { id: "C3b", title: "Gemini Pro: general-purpose deployment model for broad applications" },
            { id: "C3c", title: "Gemini Nano and Flash: small, cost-efficient models for on-device and high-volume use" },
            { id: "C3d", title: "Gemini 1.5 Pro: compute-efficient MoE with multi-million-token context and high recall" },
            { id: "C3e", title: "Gemini Flash: ~1M-token context and high throughput for large-scale workloads" }
          ]
        },
        {
          id: "C4",
          title: "Gemini 2.0 model family",
          children: [
            { id: "C4a", title: "Gemini 2.0 Flash: faster, more efficient multimodal understanding and reasoning" },
            { id: "C4b", title: "Gemini 2.0 Pro: balanced capability and efficiency for general tasks" },
            { id: "C4c", title: "Gemini 2.0 Nano: on-device models for constrained hardware" },
            { id: "C4d", title: "Gemini 2.0 Flash Thinking Experimental: high-performance reasoning with visible thought traces" }
          ]
        }
      ]
    },
    {
      id: "D",
      title: "DeepSeek reasoning models",
      children: [
        {
          id: "D1",
          title: "GRPO: Group Relative Policy Optimization",
          children: [
            { id: "D1a", title: "Rule-based scoring of multiple sampled outputs on coherence, completeness, and fluency" },
            { id: "D1b", title: "Uses group-average baselines instead of a learned critic model" },
            { id: "D1c", title: "DeepSeek-R1-Zero: pure-RL training reaches o1-level reasoning but with poor readability" }
          ]
        },
        {
          id: "D2",
          title: "DeepSeek-R1 multi-stage training pipeline",
          children: [
            { id: "D2a", title: "Stage 1: supervised fine-tuning on a small cold-start dataset for language fluency" },
            { id: "D2b", title: "Stage 2: pure RL with GRPO to strengthen reasoning ability" },
            { id: "D2c", title: "Stage 3: rejection sampling to build a high-quality synthetic dataset from RL outputs" },
            { id: "D2d", title: "Stage 4: final SFT and RL on combined supervised and synthetic data to balance reasoning and language quality" }
          ]
        },
        {
          id: "D3",
          title: "Chain-of-thought behavior and openness",
          children: [
            { id: "D3a", title: "RL training explicitly encourages chain-of-thought style intermediate reasoning steps" },
            { id: "D3b", title: "Weights are released, but opaque data and training pipeline make the models effectively closed-source" }
          ]
        }
      ]
    }
  ]
};

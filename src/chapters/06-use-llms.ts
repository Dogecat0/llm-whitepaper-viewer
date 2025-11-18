import type { DiagramNode } from "../types";

export const chapter6: DiagramNode = {
  id: "using-llms-root",
  title: "Using large language models",
  description: "How prompting, decoding, and evaluation shape practical LLM behavior.",
  children: [
    {
      id: "B",
      title: "Prompt engineering",
      children: [
        {
          id: "B1",
          title: "Role & goals of prompting",
          children: [
            {
              id: "B1a",
              title: "Guide LLMs toward factual or creative behavior as needed"
            },
            {
              id: "B1b",
              title: "Use clear instructions, context, examples, and formatting cues"
            }
          ]
        },
        {
          id: "B2",
          title: "Prompting modes",
          children: [
            {
              id: "B2a",
              title: "Zero-shot prompting",
              children: [
                {
                  id: "B2a1",
                  title: "Instruction-only prompts relying on prior knowledge"
                }
              ]
            },
            {
              id: "B2b",
              title: "Few-shot prompting",
              children: [
                {
                  id: "B2b1",
                  title: "Task description plus a small set of labeled examples"
                }
              ]
            },
            {
              id: "B2c",
              title: "Chain-of-thought prompting",
              children: [
                {
                  id: "B2c1",
                  title: "Demonstrate stepwise reasoning on similar problems"
                },
                {
                  id: "B2c2",
                  title: "Encourage explicit intermediate reasoning before answers"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "C",
      title: "Sampling techniques & parameters",
      children: [
        {
          id: "C1",
          title: "Deterministic vs stochastic decoding",
          children: [
            {
              id: "C1a",
              title: "Greedy search",
              children: [
                {
                  id: "C1a1",
                  title: "Always pick the highest-probability token"
                }
              ]
            },
            {
              id: "C1b",
              title: "Random sampling",
              children: [
                {
                  id: "C1b1",
                  title: "Sample from full distribution for higher diversity"
                }
              ]
            },
            {
              id: "C1c",
              title: "Temperature control",
              children: [
                {
                  id: "C1c1",
                  title: "Higher temperature for exploration, lower for focus"
                }
              ]
            }
          ]
        },
        {
          id: "C2",
          title: "Truncation-based sampling",
          children: [
            {
              id: "C2a",
              title: "Top-K sampling",
              children: [
                {
                  id: "C2a1",
                  title: "Restrict sampling to K highest-probability tokens"
                }
              ]
            },
            {
              id: "C2b",
              title: "Top-P (nucleus) sampling",
              children: [
                {
                  id: "C2b1",
                  title: "Sample from smallest set whose cumulative prob ≥ P"
                }
              ]
            }
          ]
        },
        {
          id: "C3",
          title: "Best-of & tuning",
          children: [
            {
              id: "C3a",
              title: "Best-of-N selection",
              children: [
                {
                  id: "C3a1",
                  title: "Generate multiple candidates and pick the best"
                }
              ]
            },
            {
              id: "C3b",
              title: "Hyperparameter calibration",
              children: [
                {
                  id: "C3b1",
                  title: "Jointly tune temperature, top-K/top-P, and Best-of-N"
                },
                {
                  id: "C3b2",
                  title: "Balance correctness, diversity, and stability"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "D",
      title: "Task-based evaluation",
      children: [
        {
          id: "D1",
          title: "Tailored evaluation design",
          children: [
            {
              id: "D1a",
              title: "Evaluation data",
              children: [
                {
                  id: "D1a1",
                  title: "Mirror expected production traffic and edge cases"
                }
              ]
            },
            {
              id: "D1b",
              title: "Development context",
              children: [
                {
                  id: "D1b1",
                  title: "Evaluate full systems including RAG and agent workflows"
                }
              ]
            },
            {
              id: "D1c",
              title: "Definition of 'good'",
              children: [
                {
                  id: "D1c1",
                  title: "Use rubrics and business-level criteria, not only reference similarity"
                }
              ]
            }
          ]
        },
        {
          id: "D2",
          title: "Evaluation methods",
          children: [
            {
              id: "D2a",
              title: "Traditional metrics",
              children: [
                {
                  id: "D2a1",
                  title: "Compute similarity between outputs and references"
                }
              ]
            },
            {
              id: "D2b",
              title: "Human evaluation",
              children: [
                {
                  id: "D2b1",
                  title: "Use human judgments as gold standard for complex outputs"
                }
              ]
            },
            {
              id: "D2c",
              title: "LLM-powered autoraters",
              children: [
                {
                  id: "D2c1",
                  title: "Use models or reward heads to score candidate outputs"
                },
                {
                  id: "D2c2",
                  title: "Generate rationales in addition to scores"
                }
              ]
            }
          ]
        },
        {
          id: "D3",
          title: "Calibration & advanced autoraters",
          children: [
            {
              id: "D3a",
              title: "Meta-evaluation vs humans",
              children: [
                {
                  id: "D3a1",
                  title: "Align autorater preferences with human judgments"
                }
              ]
            },
            {
              id: "D3b",
              title: "Rubrics & multi-step scoring",
              children: [
                {
                  id: "D3b1",
                  title: "Break evaluation into interpretable quality dimensions"
                },
                {
                  id: "D3b2",
                  title: "Aggregate sub-scores into overall metrics"
                }
              ]
            },
            {
              id: "D3c",
              title: "Domain-specialized evaluators",
              children: [
                {
                  id: "D3c1",
                  title: "Plug in specialized models for safety, math, or domain checks"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

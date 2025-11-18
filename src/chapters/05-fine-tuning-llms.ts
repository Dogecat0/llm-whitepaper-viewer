import type { DiagramNode } from "../types";

export const chapter5: DiagramNode = {
  id: "ft-root",
  title: "Fine-tuning large language models",
  description: "Adapting a pre-trained LLM to specific tasks and aligned behaviors using supervised fine-tuning, preference-based RL, and parameter-efficient methods.",
  children: [
    {
      id: "B",
      title: "Role in LLM lifecycle",
      children: [
        {
          id: "B1",
          title: "Pre-training on massive unlabeled data",
          children: [
            { id: "B1a", title: "Next-token prediction objective" },
            { id: "B1b", title: "Very expensive in time and compute" }
          ]
        },
        {
          id: "B2",
          title: "Fine-tuning as cheaper specialization stage",
          children: [
            { id: "B2a", title: "Uses smaller, high-quality datasets" },
            { id: "B2b", title: "Adapts behavior to domains and tasks" }
          ]
        }
      ]
    },
    {
      id: "C",
      title: "Targets of fine-tuning",
      children: [
        {
          id: "C1",
          title: "Instruction-following",
          children: [
            {
              id: "C1a",
              title: "Improved performance on explicit tasks (summarization, translation, coding)"
            }
          ]
        },
        {
          id: "C2",
          title: "Dialogue behavior",
          children: [
            {
              id: "C2a",
              title: "Better multi-turn coherence and context handling"
            }
          ]
        },
        {
          id: "C3",
          title: "Safety and ethics",
          children: [
            { id: "C3a", title: "Reduces toxicity, bias, and unsafe outputs" },
            { id: "C3b", title: "Enforces helpfulness and truthfulness" }
          ]
        }
      ]
    },
    {
      id: "D",
      title: "Supervised Fine-Tuning (SFT)",
      children: [
        {
          id: "D1",
          title: "Prompt–response training pairs",
          children: [
            { id: "D1a", title: "Questions mapped to high-quality answers" },
            { id: "D1b", title: "Text mapped to summaries or translations" }
          ]
        },
        {
          id: "D2",
          title: "Domain-specific labeled data",
          children: [
            {
              id: "D2a",
              title: "Human-curated datasets much smaller than pre-training corpora"
            }
          ]
        },
        {
          id: "D3",
          title: "Behavioral and task improvements",
          children: [
            {
              id: "D3a",
              title: "Better task accuracy and more controlled style/tone"
            }
          ]
        }
      ]
    },
    {
      id: "E",
      title: "Reinforcement Learning from Human Feedback (RLHF)",
      children: [
        {
          id: "E1",
          title: "Reward model (RM) training",
          children: [
            {
              id: "E1a",
              title: "Uses preference data over alternative responses"
            },
            {
              id: "E1b",
              title: "Encodes criteria like helpfulness, safety, fairness, truthfulness"
            }
          ]
        },
        {
          id: "E2",
          title: "Policy optimization with RL",
          children: [
            {
              id: "E2a",
              title: "Policy generates responses for prompts"
            },
            {
              id: "E2b",
              title: "Reward model scores outputs; RL updates the LLM toward preferred behavior"
            }
          ]
        },
        {
          id: "E3",
          title: "Extensions and alternatives",
          children: [
            {
              id: "E3a",
              title: "RLAIF: AI-generated preference labels instead of humans"
            },
            {
              id: "E3b",
              title: "DPO-style methods align models directly from preference data without explicit RL loop"
            }
          ]
        }
      ]
    },
    {
      id: "F",
      title: "Parameter-Efficient Fine-Tuning (PEFT)",
      children: [
        {
          id: "F1",
          title: "Adapters",
          children: [
            {
              id: "F1a",
              title: "Small modules inserted into transformer layers"
            },
            {
              id: "F1b",
              title: "Only adapter weights are trained; base model stays frozen"
            }
          ]
        },
        {
          id: "F2",
          title: "LoRA and QLoRA",
          children: [
            {
              id: "F2a",
              title: "Low-rank matrices approximate weight updates"
            },
            {
              id: "F2b",
              title: "Greatly reduces trainable parameters and memory footprint"
            },
            {
              id: "F2c",
              title: "QLoRA uses quantized base weights for further efficiency"
            }
          ]
        },
        {
          id: "F3",
          title: "Soft prompting",
          children: [
            {
              id: "F3a",
              title: "Learns continuous prompt vectors prepended to inputs"
            },
            {
              id: "F3b",
              title: "Few trainable tokens per task, enabling mixed-task inference"
            }
          ]
        },
        {
          id: "F4",
          title: "Quality–cost trade-offs",
          children: [
            {
              id: "F4a",
              title: "Full fine-tuning usually best quality"
            },
            {
              id: "F4b",
              title: "PEFT methods offer near-full quality with much lower compute and memory"
            }
          ]
        }
      ]
    }
  ]
};

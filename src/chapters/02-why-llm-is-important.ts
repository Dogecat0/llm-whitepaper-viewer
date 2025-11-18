import type { DiagramNode } from "../types";

export const chapter2: DiagramNode = {
  id: "why-llms-root",
  title: "Why large language models are important",
  description: "Explains why LLMs matter: their performance gains, broad applications, emergent abilities, and how they are adapted and steered.",
  children: [
    {
      id: "B",
      title: "Performance gains vs prior NLP",
      children: [
        {
          id: "B1",
          title: "Better accuracy on complex language tasks"
        },
        {
          id: "B2",
          title: "Improved question answering and reasoning"
        }
      ]
    },
    {
      id: "C",
      title: "Broad applications enabled",
      children: [
        {
          id: "C1",
          title: "Language translation"
        },
        {
          id: "C2",
          title: "Code generation and completion"
        },
        {
          id: "C3",
          title: "Text generation and classification"
        },
        {
          id: "C4",
          title: "Question-answering and other NLP tasks"
        }
      ]
    },
    {
      id: "D",
      title: "Foundation models and emergent abilities",
      children: [
        {
          id: "D1",
          title: "Pre-trained on large, diverse multi-task data"
        },
        {
          id: "D2",
          title: "Strong zero-shot and few-shot performance"
        },
        {
          id: "D3",
          title: "Emergent behaviors beyond explicit training"
        }
      ]
    },
    {
      id: "E",
      title: "Task-specific adaptation via fine-tuning",
      children: [
        {
          id: "E1",
          title: "Specialize LLMs for particular domains or tasks"
        },
        {
          id: "E2",
          title: "Requires much less data and compute than pre-training"
        },
        {
          id: "E3",
          title: "Improves performance where base model is insufficient"
        }
      ]
    },
    {
      id: "F",
      title: "Prompt engineering to steer behavior",
      children: [
        {
          id: "F1",
          title: "Design prompts to nudge responses toward desired behavior"
        },
        {
          id: "F2",
          title: "Tune decoding and other parameters to shape outputs"
        }
      ]
    },
    {
      id: "G",
      title: "Motivation for later sections",
      children: [
        {
          id: "G1",
          title: "Poses the question: how do LLMs work internally?"
        },
        {
          id: "G2",
          title: "Introduces upcoming sections on transformers, training, and inference speedups"
        }
      ]
    }
  ]
};

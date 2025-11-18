import type { DiagramNode } from "../types";

export const chapter1: DiagramNode = {
  id: "intro-root",
  title: "Introduction: LLMs and this whitepaper",
  description: "Frames LLMs as a transformative AI technology and outlines what the whitepaper will cover.",
  children: [
    {
      id: "B",
      title: "LLMs as AI shift",
      children: [
        { id: "B1", title: "Seismic shift in artificial intelligence" },
        { id: "B2", title: "Changing how we interact with information and technology" }
      ]
    },
    {
      id: "C",
      title: "What an LLM is",
      children: [
        { id: "C1", title: "Advanced AI system for language processing and generation" },
        { id: "C2", title: "Implemented as a deep neural network" },
        { id: "C3", title: "Trained on massive text corpora to learn language patterns" }
      ]
    },
    {
      id: "D",
      title: "Capabilities and tasks",
      children: [
        { id: "D1", title: "Core language tasks: translation, question answering, summarization" },
        { id: "D2", title: "Creative text generation" },
        { id: "D3", title: "Broader reasoning and language-oriented tasks" }
      ]
    },
    {
      id: "E",
      title: "Scope of the whitepaper",
      children: [
        { id: "E1", title: "Timeline of architectures and approaches leading to modern LLMs" },
        { id: "E2", title: "Description of architectures in use at publication time" },
        { id: "E3", title: "Fine-tuning techniques for domain- or task-specific customization" },
        { id: "E4", title: "Methods to make training more efficient" },
        { id: "E5", title: "Methods to accelerate inference" },
        { id: "E6", title: "Applications and code examples illustrating usage" }
      ]
    },
    {
      id: "F",
      title: "Human impact and aspiration",
      children: [
        { id: "F1", title: "Assist and complement human work" },
        { id: "F2", title: "Empower and inspire people" },
        { id: "F3", title: "Applicable across many fields and contexts" }
      ]
    }
  ]
};

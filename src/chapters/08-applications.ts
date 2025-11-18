import type { DiagramNode } from "../types";

export const chapter8: DiagramNode = {
  id: "applications-root",
  title: "Applications of LLMs",
  description: "How large language models are applied across code, language, analytics, and multimodal domains.",
  children: [
    {
      id: "B",
      title: "Overview & access",
      children: [
        { id: "B1", title: "LLMs transforming information use" },
        { id: "B2", title: "Simple SDK integration for text generation" }
      ]
    },
    {
      id: "C",
      title: "Code & mathematics",
      children: [
        {
          id: "C1",
          title: "Developer productivity",
          children: [
            { id: "C1a", title: "Code generation & completion" },
            { id: "C1b", title: "Refactor, debug, and translate code" },
            { id: "C1c", title: "Test generation, documentation, and code understanding" }
          ]
        },
        {
          id: "C2",
          title: "Advanced math & coding systems",
          children: [
            { id: "C2a", title: "AlphaCode 2 for competitive programming" },
            { id: "C2b", title: "FunSearch for mathematical discovery and algorithms" },
            { id: "C2c", title: "AlphaGeometry for geometry theorem proving" }
          ]
        }
      ]
    },
    {
      id: "D",
      title: "Language tasks",
      children: [
        {
          id: "D1",
          title: "Machine translation",
          children: [
            { id: "D1a", title: "Context-aware, idiomatic translation" },
            { id: "D1b", title: "Messaging, e-commerce, and travel scenarios" }
          ]
        },
        {
          id: "D2",
          title: "Text summarization",
          children: [
            { id: "D2a", title: "News and research summarization" },
            { id: "D2b", title: "Chat and thread summarization" }
          ]
        },
        {
          id: "D3",
          title: "Question answering",
          children: [
            { id: "D3a", title: "Virtual assistants and customer support" },
            { id: "D3b", title: "RAG and grounding for accurate answers" }
          ]
        }
      ]
    },
    {
      id: "E",
      title: "Chat & content",
      children: [
        {
          id: "E1",
          title: "Chatbots",
          children: [
            { id: "E1a", title: "Customer service conversations" },
            { id: "E1b", title: "Entertainment and live-stream moderation" }
          ]
        },
        {
          id: "E2",
          title: "Content generation",
          children: [
            { id: "E2a", title: "Marketing and advertising copy" },
            { id: "E2b", title: "Script and story-writing assistance" }
          ]
        }
      ]
    },
    {
      id: "F",
      title: "Analysis & classification",
      children: [
        {
          id: "F1",
          title: "Natural language inference",
          children: [
            { id: "F1a", title: "Fine-grained sentiment and implication inference" },
            { id: "F1b", title: "Legal and medical reasoning support" }
          ]
        },
        {
          id: "F2",
          title: "Text classification",
          children: [
            { id: "F2a", title: "Spam and topic tagging" },
            { id: "F2b", title: "Routing customer feedback by theme" },
            { id: "F2c", title: "LLMs as autoraters of generated outputs" }
          ]
        },
        {
          id: "F3",
          title: "Text analysis",
          children: [
            { id: "F3a", title: "Market and trend analysis from social data" },
            { id: "F3b", title: "Literary and thematic analysis of texts" }
          ]
        }
      ]
    },
    {
      id: "G",
      title: "Multimodal applications",
      children: [
        {
          id: "G1",
          title: "Creative content",
          children: [
            { id: "G1a", title: "Narrative generation from images or video" },
            { id: "G1b", title: "Targeted multimodal advertising" }
          ]
        },
        {
          id: "G2",
          title: "Education & accessibility",
          children: [
            { id: "G2a", title: "Personalized multimodal learning experiences" },
            { id: "G2b", title: "Assistive tools describing media for impaired users" }
          ]
        },
        {
          id: "G3",
          title: "Business & industry",
          children: [
            { id: "G3a", title: "Document understanding with mixed text and visuals" },
            { id: "G3b", title: "Customer service combining text and images" }
          ]
        },
        {
          id: "G4",
          title: "Science & research",
          children: [
            { id: "G4a", title: "Medical diagnosis support from scans and reports" },
            { id: "G4b", title: "Bioinformatics and drug discovery workflows" }
          ]
        }
      ]
    }
  ]
};

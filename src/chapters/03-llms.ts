import type { DiagramNode } from "../types";

export const chapter3: DiagramNode = {
  id: "llms-root", // Root for Large language models & transformers
  title: "Large language models & transformers",
  description: "How transformer architectures, self-attention, and large-scale training turn language models into modern LLMs.",
  children: [
    {
      id: "B",
      title: "Language models & sequence modeling",
      children: [
        { id: "B1", title: "Predict next-token probabilities over word sequences" },
        { id: "B2", title: "Evolve from n-grams to neural language models" }
      ]
    },
    {
      id: "C",
      title: "From RNNs to transformers",
      children: [
        { id: "C1", title: "RNNs process tokens sequentially via hidden states" },
        { id: "C2", title: "Limitations: vanishing gradients, slow training, hard parallelism" },
        { id: "C3", title: "Transformers use parallel self-attention for long-range modeling" },
        { id: "C4", title: "Quadratic attention cost limits practical context length" }
      ]
    },
    {
      id: "D",
      title: "Transformer architecture",
      children: [
        { id: "D1", title: "Encoder–decoder sequence-to-sequence design for tasks like translation" },
        { id: "D2", title: "Layers combine attention, feed-forward, residual, and normalization blocks" },
        { id: "D3", title: "Input/output embeddings and softmax projection map between tokens and logits" }
      ]
    },
    {
      id: "E",
      title: "Input preparation & embeddings",
      children: [
        { id: "E1", title: "Normalize raw text to standardize inputs" },
        { id: "E2", title: "Tokenize text into subwords and integer IDs" },
        { id: "E3", title: "Map token IDs to learned embedding vectors" },
        { id: "E4", title: "Add positional encodings to represent token order" }
      ]
    },
    {
      id: "F",
      title: "Self-attention mechanism",
      children: [
        { id: "F1", title: "Project token embeddings into query, key, and value vectors" },
        { id: "F2", title: "Compute attention scores via dot products of queries with keys" },
        { id: "F3", title: "Scale and apply softmax to obtain attention weight distributions" },
        { id: "F4", title: "Form context-aware token outputs as weighted sums of value vectors" },
        { id: "F5", title: "Implement attention with Q, K, V matrices for parallel computation" }
      ]
    },
    {
      id: "G",
      title: "Multi-head attention",
      children: [
        { id: "G1", title: "Use multiple independent attention heads in parallel" },
        { id: "G2", title: "Allow heads to specialize in different token relationships" },
        { id: "G3", title: "Concatenate head outputs into a single representation" },
        { id: "G4", title: "Apply a linear projection to produce rich final features" }
      ]
    },
    {
      id: "H",
      title: "Training data & objectives",
      children: [
        {
          id: "H1",
          title: "Data preparation pipeline",
          children: [
            { id: "H1a", title: "Clean, filter, deduplicate, and normalize text" },
            { id: "H1b", title: "Apply subword tokenization and build a vocabulary" },
            { id: "H1c", title: "Split corpus into training and evaluation sets" }
          ]
        },
        {
          id: "H2",
          title: "Core training loop",
          children: [
            { id: "H2a", title: "Batch input sequences and corresponding targets" },
            { id: "H2b", title: "Run forward passes and compute cross-entropy loss" },
            { id: "H2c", title: "Backpropagate gradients and update parameters" },
            { id: "H2d", title: "Iterate until convergence or token budget is exhausted" }
          ]
        },
        {
          id: "H3",
          title: "Architecture-specific objectives",
          children: [
            { id: "H3a", title: "Decoder-only models: causal language modeling with shifted targets" },
            { id: "H3b", title: "Encoder-only models: masked language modeling to reconstruct hidden tokens" },
            { id: "H3c", title: "Encoder–decoder models: supervised and unsupervised sequence-to-sequence tasks" }
          ]
        },
        {
          id: "H4",
          title: "Context length trade-offs",
          children: [
            { id: "H4a", title: "Longer contexts capture more distant dependencies" },
            { id: "H4b", title: "Long contexts increase memory and compute via quadratic attention" }
          ]
        }
      ]
    }
  ]
};

import type { DiagramNode } from "../types";

export const chapter7: DiagramNode = {
  id: "accel-root",
  title: "Accelerating inference in LLMs",
  description: "How to reduce LLM latency and cost using trade-offs, approximate methods, exact optimizations, and system-level techniques.",
  children: [
    {
      id: "B",
      title: "Motivation & resources",
      children: [
        {
          id: "B1",
          title: "Larger models increase memory and compute needs"
        },
        {
          id: "B2",
          title: "Inference constrained by memory, FLOPs, and bandwidth"
        },
        {
          id: "B3",
          title: "Cost–performance must be tuned per use case"
        }
      ]
    },
    {
      id: "C",
      title: "Trade-offs",
      children: [
        {
          id: "C1",
          title: "Quality vs latency/cost",
          children: [
            { id: "C1a", title: "Use smaller or quantized models" },
            { id: "C1b", title: "Distinguish theoretical vs practical quality loss" }
          ]
        },
        {
          id: "C2",
          title: "Latency vs cost / throughput",
          children: [
            { id: "C2a", title: "Bulk offline vs interactive workloads" },
            { id: "C2b", title: "Throughput as a key driver of cost" }
          ]
        },
        {
          id: "C3",
          title: "Method taxonomy",
          children: [
            { id: "C3a", title: "Output-approximating methods" },
            { id: "C3b", title: "Output-preserving methods" }
          ]
        }
      ]
    },
    {
      id: "D",
      title: "Output-approximating methods",
      children: [
        {
          id: "D1",
          title: "Quantization",
          children: [
            { id: "D1a", title: "Lower precision weights and activations" },
            { id: "D1b", title: "Smaller memory, faster matmuls, less IO" },
            { id: "D1c", title: "Post-training vs quantization-aware training" },
            { id: "D1d", title: "Per-tensor and per-channel strategies" }
          ]
        },
        {
          id: "D2",
          title: "Distillation",
          children: [
            { id: "D2a", title: "Large models outperform small ones at same data" },
            { id: "D2b", title: "Data distillation with synthetic training data" },
            { id: "D2c", title: "Knowledge distillation via soft targets" },
            { id: "D2d", title: "On-policy distillation with RL feedback" }
          ]
        }
      ]
    },
    {
      id: "E",
      title: "Output-preserving methods",
      children: [
        {
          id: "E1",
          title: "Flash Attention",
          children: [
            { id: "E1a", title: "Attention is quadratic and IO-heavy" },
            { id: "E1b", title: "IO-aware reordering and fused operations" },
            { id: "E1c", title: "Exact outputs with 2–4× attention speedup" }
          ]
        },
        {
          id: "E2",
          title: "Prefix caching",
          children: [
            { id: "E2a", title: "Reuse KV cache across requests" },
            { id: "E2b", title: "Ideal for long, stable prefixes (chat, docs)" },
            { id: "E2c", title: "Requires prefix-stable input schema" },
            { id: "E2d", title: "Implemented as Context Caching in Gemini/Vertex" }
          ]
        },
        {
          id: "E3",
          title: "Speculative decoding",
          children: [
            { id: "E3a", title: "Drafter proposes multi-token blocks" },
            { id: "E3b", title: "Main model verifies candidates in parallel" },
            { id: "E3c", title: "Accept longest matching prefix per step" },
            { id: "E3d", title: "Quality-neutral but needs good model alignment" }
          ]
        }
      ]
    },
    {
      id: "F",
      title: "Batching & parallelization",
      children: [
        {
          id: "F1",
          title: "Batching",
          children: [
            { id: "F1a", title: "Batch decode requests to use spare compute" },
            { id: "F1b", title: "KV cache memory limits constrain batch size" },
            { id: "F1c", title: "Essential for high-throughput serving" }
          ]
        },
        {
          id: "F2",
          title: "Model parallelization",
          children: [
            { id: "F2a", title: "Sequence parallelism" },
            { id: "F2b", title: "Pipeline parallelism" },
            { id: "F2c", title: "Tensor parallelism" },
            { id: "F2d", title: "Balance compute gains vs communication overhead" }
          ]
        }
      ]
    }
  ]
};

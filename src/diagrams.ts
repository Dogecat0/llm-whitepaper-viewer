// src/diagrams.ts
import type { DiagramNode } from "./types";

// Import your chapters
import { chapter1 } from "./chapters/01-intro";
import { chapter2 } from "./chapters/02-why-llm-is-important";
import { chapter3 } from "./chapters/03-llms";
import { chapter4 } from "./chapters/04-transformer-evolution";
import { chapter5 } from "./chapters/05-fine-tuning-llms";
import { chapter6 } from "./chapters/06-use-llms";
import { chapter7 } from "./chapters/07-accelerating-inference";
import { chapter8 } from "./chapters/08-applications";

// --- Re-export Types for App.tsx to use ---
export type { DiagramNode };

// --- Define the Book (The Aggregator) ---
const fullBookStructure: DiagramNode = {
  id: "ROOT_BOOK",
  title: "Foundational Large Language Models & Text Generation",
  description: "A comprehensive guide to the foundations of Large Language Models.",
  children: [
    chapter1,
    chapter2,
    chapter3,
    chapter4,
    chapter5,
    chapter6,
    chapter7,
    chapter8
  ]
};

export const ROOT_NODE = fullBookStructure;

// --- MERMAID LOGIC BELOW ---

// HTML Helpers
const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const escapeForMermaid = (value: string) => value.replace(/\\/g, "\\\\");

const buildNodeLabel = (node: DiagramNode, expanded: boolean) => {
  const hasChildren = node.children && node.children.length > 0;
  const icon = hasChildren ? (expanded ? "−" : "+") : "";
  
  return escapeForMermaid(`
    <div class='node-container'>
      <div class='node-title'>${escapeHtml(node.title)}</div>
      ${hasChildren ? `<div class='node-toggle'>${icon}</div>` : ""}
    </div>
  `);
};

const DEPTH_STYLES = ["Rose", "Peach", "Sun", "Mint", "Sky", "Iris"];

const getClassForDepth = (depth: number) => {
  if (depth < DEPTH_STYLES.length) return DEPTH_STYLES[depth];
  return "Ash";
};

export const buildMermaidDocument = (root: DiagramNode, expandedIds: Set<string>): string => {
  // We use a single list for definitions to ensure subgraphs wrap nodes correctly in order
  const definitionLines: string[] = [];
  const edgeLines: string[] = [];
  const classAssignments: string[] = [];

  const walk = (node: DiagramNode, depth: number) => {
    const isExpanded = expandedIds.has(node.id);
    
    // 1. Define the Node
    definitionLines.push(`  ${node.id}["${buildNodeLabel(node, isExpanded)}"]`);
    classAssignments.push(`  class ${node.id} ${getClassForDepth(depth)}`);

    // 2. If expanded, process children
    if (node.children && node.children.length > 0 && isExpanded) {
      
      // --- THE FIX: WRAP CHILDREN IN AN INVISIBLE SUBGRAPH ---
      // This forces Mermaid to keep these nodes physically grouped together
      // and prevents them from mixing with siblings' children.
      const sgId = `sg_${node.id.replace(/-/g, "_")}`;
      
      definitionLines.push(`  subgraph ${sgId} [" "]`); // Empty label
      definitionLines.push(`    direction LR`);         // Ensure flow continues Left-Right
      definitionLines.push(`    style ${sgId} fill:none,stroke:none`); // Make it invisible

      // Recursively define children inside this subgraph block
      node.children.forEach((child) => {
        walk(child, depth + 1);
      });

      definitionLines.push(`  end`); 
      // -------------------------------------------------------

      // 3. Define Edges (Parent -> Child)
      node.children.forEach((child) => {
        edgeLines.push(`  ${node.id} --> ${child.id}`);
      });
    }
  };

  walk(root, 0);

  const styles = [
    "classDef Rose stroke-width:1px, stroke:#FF5978, fill:#FFDFE5, color:#8E2236, rx:4px, ry:4px",
    "classDef Peach stroke-width:1px, stroke:#FBB35A, fill:#FFEFDB, color:#8F632D, rx:4px, ry:4px",
    "classDef Sun stroke-width:1px, stroke:#EAB308, fill:#FEF9C3, color:#854D0E, rx:4px, ry:4px",
    "classDef Mint stroke-width:1px, stroke:#22C55E, fill:#DCFCE7, color:#14532D, rx:4px, ry:4px",
    "classDef Sky stroke-width:1px, stroke:#3B82F6, fill:#DBEAFE, color:#1E3A8A, rx:4px, ry:4px",
    "classDef Iris stroke-width:1px, stroke:#8B5CF6, fill:#F3E8FF, color:#581C87, rx:4px, ry:4px",
    "classDef Ash stroke-width:1px, stroke:#9CA3AF, fill:#F3F4F6, color:#374151, rx:4px, ry:4px",
    "linkStyle default stroke:#cbd5e1,stroke-width:2px,fill:none"
  ];

  // Combine all parts
  return [
    "flowchart LR", 
    ...styles, 
    ...definitionLines, 
    ...edgeLines, 
    ...classAssignments
  ].join("\n");
};

export const collectAllNodeIds = (node: DiagramNode): string[] => {
  const ids: string[] = [];
  const visit = (n: DiagramNode) => {
    ids.push(n.id);
    n.children?.forEach(visit);
  };
  visit(node);
  return ids;
};

export const collectExpandableIds = (node: DiagramNode): string[] => {
  const ids: string[] = [];
  const visit = (n: DiagramNode) => {
    if (n.children && n.children.length > 0) {
      ids.push(n.id);
      n.children.forEach(visit);
    }
  };
  visit(node);
  return ids;
};
// src/App.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfographicView from "./InfographicView";
import {
  ROOT_NODE,
  type DiagramNode,
} from "./diagrams";

// --- Recursive Helper to find node by ID ---
const findNodeById = (node: DiagramNode, targetId: string): DiagramNode | null => {
  if (node.id === targetId) return node;
  if (!node.children) return null;
  for (const child of node.children) {
    const match = findNodeById(child, targetId);
    if (match) return match;
  }
  return null;
};

const App: React.FC = () => {
  // --- Persistence Logic ---
  const [selectedId, setSelectedId] = useState(() => {
    const saved = localStorage.getItem("llm-whitepaper-selected");
    return saved || ROOT_NODE.id;
  });

  useEffect(() => {
    localStorage.setItem("llm-whitepaper-selected", selectedId);
  }, [selectedId]);

  const selectedNode = useMemo(() => findNodeById(ROOT_NODE, selectedId) || ROOT_NODE, [selectedId]);

  const handleNodeClick = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return (
    <div className="layout">
      <main className="canvas-area">
        <div className="diagram-wrapper">
          <InfographicView
            node={selectedNode}
            onNodeClick={handleNodeClick}
          />
        </div>

      </main>
    </div>
  );
};

export default App;
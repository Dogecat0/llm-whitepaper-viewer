// src/App.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfographicView from "./InfographicView";
import {
  ROOT_NODE,
  type DiagramNode,
} from "./diagrams";

const STORAGE_KEY = "llm-whitepaper-selected-path";
const PATH_DELIMITER = ">";

// --- Recursive Helper to find node by path (uses ancestry to avoid ID collisions) ---
const findNodeByPath = (node: DiagramNode, path: string): DiagramNode | null => {
  const parts = path.split(PATH_DELIMITER).filter(Boolean);
  if (parts.length === 0) return node;
  if (parts[0] !== node.id) return null;

  let current: DiagramNode = node;
  for (let i = 1; i < parts.length; i += 1) {
    const next = current.children?.find((child) => child.id === parts[i]);
    if (!next) return null;
    current = next;
  }

  return current;
};

const App: React.FC = () => {
  // --- Persistence Logic ---
  const [selectedPath, setSelectedPath] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const node = findNodeByPath(ROOT_NODE, saved);
      if (node) return saved;
    }
    return ROOT_NODE.id;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedPath);
  }, [selectedPath]);

  const selectedNode = useMemo(
    () => findNodeByPath(ROOT_NODE, selectedPath) || ROOT_NODE,
    [selectedPath],
  );

  const handleNodeClick = useCallback((path: string) => {
    setSelectedPath(path);
  }, []);

  return (
    <div className="layout">
      <main className="canvas-area">
        <div className="diagram-wrapper">
          <InfographicView
            node={selectedNode}
            currentPath={selectedPath}
            pathDelimiter={PATH_DELIMITER}
            onNodeClick={handleNodeClick}
          />
        </div>

      </main>
    </div>
  );
};

export default App;

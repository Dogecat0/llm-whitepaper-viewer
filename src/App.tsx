// src/App.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MermaidDiagram from "./MermaidDiagram";
import {
  ROOT_NODE,
  type DiagramNode,
  buildMermaidDocument,
  collectAllNodeIds,
  collectExpandableIds
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

// Helper to limit depth class to defined CSS (0-6)
const getDepthClass = (depth: number) => `tree-row--depth-${Math.min(depth, 6)}`;

// --- Sidebar Tree Component ---
const TreeItem: React.FC<{
  node: DiagramNode;
  depth: number;
  expandedIds: Set<string>;
  selectedId: string;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}> = ({ node, depth, expandedIds, selectedId, onSelect, onToggle }) => {
  const hasChildren = !!node.children?.length;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  return (
    <div className="tree-item-wrapper">
      <div 
        className={`tree-row ${getDepthClass(depth)} ${isSelected ? "tree-row--selected" : ""}`}
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
        onClick={() => onSelect(node.id)}
      >
        <span
          className={`tree-expander ${hasChildren ? "visible" : "invisible"} ${isExpanded ? "expanded" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(node.id);
          }}
        >
          ▶
        </span>
        <span className="tree-label">{node.title}</span>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="tree-children">
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  // ... existing code ...
  // (The rest of the file remains unchanged)
  
  // --- Persistence Logic ---
  
  // Load Selected ID
  const [selectedId, setSelectedId] = useState(() => {
    const saved = localStorage.getItem("llm-whitepaper-selected");
    return saved || ROOT_NODE.id;
  });

  // Load Expanded IDs (Convert Array -> Set)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("llm-whitepaper-expanded");
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch (e) {
        return new Set([ROOT_NODE.id]);
      }
    }
    return new Set([ROOT_NODE.id]);
  });

  // Save Selected ID when it changes
  useEffect(() => {
    localStorage.setItem("llm-whitepaper-selected", selectedId);
  }, [selectedId]);

  // Save Expanded IDs when they change (Convert Set -> Array)
  useEffect(() => {
    localStorage.setItem("llm-whitepaper-expanded", JSON.stringify(Array.from(expandedIds)));
  }, [expandedIds]);

  // --- End Persistence Logic ---

  const selectedNode = useMemo(() => findNodeById(ROOT_NODE, selectedId) || ROOT_NODE, [selectedId]);
  const mermaidCode = useMemo(() => buildMermaidDocument(ROOT_NODE, expandedIds), [expandedIds]);
  const allIds = useMemo(() => collectAllNodeIds(ROOT_NODE), []);
  const expandableIds = useMemo(() => collectExpandableIds(ROOT_NODE), []);

  const handleToggle = useCallback((id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  // Interaction from Diagram
  const handleDiagramClick = useCallback((id: string) => {
    setSelectedId(id);
    if (expandableIds.includes(id)) {
      handleToggle(id);
    }
  }, [expandableIds, handleToggle]);

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Explorer</h2>
          <p>LLM Whitepaper</p>
        </div>
        <div className="sidebar-content">
          <TreeItem
            node={ROOT_NODE}
            depth={0}
            expandedIds={expandedIds}
            selectedId={selectedId}
            onSelect={handleSelect}
            onToggle={handleToggle}
          />
        </div>
        <div className="sidebar-footer">
          <button onClick={() => setExpandedIds(new Set(allIds))}>Expand All</button>
          <button onClick={() => setExpandedIds(new Set([ROOT_NODE.id]))}>Collapse All</button>
        </div>
      </aside>

      <main className="canvas-area">
        <div className="canvas-header">
          <div className="breadcrumb">
             <span className="badge">Selected Node</span>
             <span className="current-title">{selectedNode.title}</span>
          </div>
          {selectedNode.description && <div className="node-desc">{selectedNode.description}</div>}
        </div>

        <div className="diagram-wrapper">
          <MermaidDiagram
            code={mermaidCode}
            clickableNodeIds={allIds}
            onNodeClick={handleDiagramClick}
          />
        </div>
        
        <div className="canvas-controls-hint">
          Scroll to Zoom • Drag to Pan • Click nodes to expand
        </div>
      </main>
    </div>
  );
};

export default App;
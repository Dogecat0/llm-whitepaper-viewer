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
  // --- Responsive & UI State ---
  // FIX 1: Initialize based on screen width to prevent mobile popup on refresh
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Only auto-close if transitioning TO mobile, don't force close on every resize
      if (mobile && window.innerWidth >= 768) setIsSidebarOpen(false);
    };
    
    // Run once
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- Persistence Logic ---
  
  // Load Selected ID
  const [selectedId, setSelectedId] = useState(() => {
    const saved = localStorage.getItem("llm-whitepaper-selected");
    return saved || ROOT_NODE.id;
  });

  // Load Expanded IDs
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

  useEffect(() => {
    localStorage.setItem("llm-whitepaper-selected", selectedId);
  }, [selectedId]);

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
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  const handleDiagramClick = useCallback((id: string) => {
    setSelectedId(id);
    if (expandableIds.includes(id)) {
      handleToggle(id);
    }
  }, [expandableIds, handleToggle]);

  return (
    <div className={`layout ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      
      <div 
        className={`mobile-backdrop ${isSidebarOpen ? "visible" : ""}`} 
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title-row">
            <div>
              <h2>Explorer</h2>
              <p>LLM Whitepaper</p>
            </div>
            <button className="icon-btn close-sidebar-btn" onClick={() => setIsSidebarOpen(false)}>✕</button>
          </div>
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
          <button 
            className="icon-btn toggle-sidebar-btn" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          >
            {isSidebarOpen ? "◀" : "☰"}
          </button>

          <div className="header-info">
            <div className="breadcrumb">
              <span className="badge">Selected</span>
              <span className="current-title">{selectedNode.title}</span>
            </div>
            {selectedNode.description && <div className="node-desc">{selectedNode.description}</div>}
          </div>
        </div>

        <div className="diagram-wrapper">
          <MermaidDiagram
            code={mermaidCode}
            clickableNodeIds={allIds}
            onNodeClick={handleDiagramClick}
          />
        </div>
        
        <div className="canvas-controls-hint">
          {isMobile ? "Drag to Pan • Tap nodes" : "Scroll to Zoom • Drag to Pan • Click nodes to expand"}
        </div>
      </main>
    </div>
  );
};

export default App;
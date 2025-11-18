// src/MermaidDiagram.tsx
import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  securityLevel: "loose",
  maxTextSize: 1000000, // <--- ADDED: Increases text limit to prevent crash on large diagrams
  flowchart: { 
    useMaxWidth: false, 
    htmlLabels: true, 
    // CHANGE: 'basis' -> 'stepAfter' for clean right angles
    curve: "stepAfter", 
    // ADD: Increase spacing to prevent bunching
    rankSpacing: 80, 
    nodeSpacing: 30,
    padding: 20
  }
});

interface Props {
  code: string;
  clickableNodeIds?: string[];
  onNodeClick?: (id: string) => void;
}

// Define the shape of our viewport state
interface TransformState {
  x: number;
  y: number;
  scale: number;
}

const STORAGE_KEY = "mermaid-viewport-transform";

const MermaidDiagram: React.FC<Props> = ({ code, clickableNodeIds, onNodeClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState("");
  const [opacity, setOpacity] = useState(0);
  
  // Viewport State - Initialize from LocalStorage if available
  // We explicitly pass <TransformState> to useState to fix inference
  const [transform, setTransform] = useState<TransformState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as TransformState;
      }
    } catch (e) {
      console.warn("Failed to load diagram transform state", e);
    }
    return { x: 0, y: 0, scale: 1 };
  });

  // Interaction Refs
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false); // To distinguish click vs drag

  // Save Transform to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transform));
  }, [transform]);

  // 1. Render Mermaid
  useEffect(() => {
    let isMounted = true;
    const render = async () => {
      if (svgContent) setOpacity(0.6);
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, code);
        if (isMounted) {
          setSvgContent(svg);
          setOpacity(1);
        }
      } catch (e) {
        console.error("Mermaid render failed", e);
      }
    };
    render();
    return () => { isMounted = false; };
  }, [code]);

  // 2. Attach Click Listeners to Nodes
  useEffect(() => {
    if (!containerRef.current || !clickableNodeIds || !onNodeClick) return;

    const svgRoot = containerRef.current.querySelector("svg");
    if (!svgRoot) return;

    svgRoot.style.maxWidth = "none";
    svgRoot.style.height = "auto";

    clickableNodeIds.forEach(id => {
      const el = svgRoot.querySelector(`[id^="flowchart-${id}-"]`) as HTMLElement;
      if (el) {
        el.style.cursor = "pointer";
        el.onclick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          // Only fire click if we didn't drag
          if (!hasMoved.current) {
            onNodeClick(id);
          }
        };
      }
    });
  }, [svgContent, clickableNodeIds, onNodeClick]);

  // --- Simplified Event Handlers ---

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop browser native drag
    isDragging.current = true;
    hasMoved.current = false;
    startPos.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
    document.body.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    
    const newX = e.clientX - startPos.current.x;
    const newY = e.clientY - startPos.current.y;

    // If we moved more than 5 pixels, consider it a move (not a click)
    if (Math.abs(newX - transform.x) > 5 || Math.abs(newY - transform.y) > 5) {
      hasMoved.current = true;
    }

    setTransform(prev => ({ ...prev, x: newX, y: newY }));
  };

  // Stop dragging on Up or Leave
  const stopDragging = () => {
    isDragging.current = false;
    document.body.style.cursor = "";
  };

  const handleZoom = (factor: number) => {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(0.1, Math.min(5, prev.scale * factor))
    }));
  };

  const handleReset = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div className="diagram-container">
      {/* Required Note */}
      <div style={{
        position: "absolute", 
        top: 20, 
        right: 20, 
        background: "#fffbeb", 
        border: "1px solid #fcd34d", 
        padding: "16px 20px",
        fontSize: "15px",
        fontWeight: "500",
        color: "#92400e", 
        borderRadius: "8px",
        zIndex: 50,
        pointerEvents: "none",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}>
        <strong>Tip:</strong> If stuck in pan mode, click a expandable node in the sidebar or refresh the page to reset.
      </div>

      <div className="diagram-tools">
        <button onClick={() => handleZoom(1.2)} title="Zoom In">＋</button>
        <button onClick={() => handleZoom(0.8)} title="Zoom Out">－</button>
        <button onClick={handleReset} title="Reset View">↺</button>
      </div>
      
      <div 
        className="diagram-viewport"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging} 
        onWheel={(e) => handleZoom(e.deltaY < 0 ? 1.1 : 0.9)}
        style={{ cursor: "grab" }}
      >
        <div 
          ref={containerRef}
          className="diagram-content"
          style={{ 
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            opacity: opacity,
            // Smooth transition only for opacity, instant for transform to feel responsive
            transition: "opacity 0.2s ease-in-out", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            transformOrigin: "center center"
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }} 
        />
      </div>
    </div>
  );
};

export default MermaidDiagram;
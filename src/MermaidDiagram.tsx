// src/MermaidDiagram.tsx
import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  securityLevel: "loose",
  maxTextSize: 1000000,
  flowchart: { 
    useMaxWidth: false, 
    htmlLabels: true, 
    curve: "stepAfter", 
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
  
  const [transform, setTransform] = useState<TransformState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as TransformState;
    } catch (e) {
      console.warn("Failed to load diagram transform state", e);
    }
    return { x: 0, y: 0, scale: 1 };
  });

  // Interaction Refs
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false); // To distinguish click vs drag

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transform));
  }, [transform]);

  // Render Mermaid
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

  // --- Unified Mouse & Touch Handlers ---

  const handleStart = (clientX: number, clientY: number) => {
    isDragging.current = true;
    hasMoved.current = false;
    startPos.current = { x: clientX - transform.x, y: clientY - transform.y };
    document.body.style.cursor = "grabbing";
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    
    const newX = clientX - startPos.current.x;
    const newY = clientY - startPos.current.y;

    // Increased threshold (6px) to allow for clumsy clicks/taps not to register as drags
    if (Math.abs(newX - transform.x) > 6 || Math.abs(newY - transform.y) > 6) {
      hasMoved.current = true;
    }

    setTransform(prev => ({ ...prev, x: newX, y: newY }));
  };

  const handleEnd = () => {
    isDragging.current = false;
    document.body.style.cursor = "";
  };

  // Mouse Events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  // Touch Events (FIX 2: Added for mobile support)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Click Handling via Delegation (FIX 3: Robust click detection)
  const handleContainerClick = (e: React.MouseEvent | React.TouchEvent) => {
    // If we dragged, ignore the click
    if (hasMoved.current) return;

    // Determine target from event
    const target = e.target as HTMLElement;
    
    // Find closest parent that is a node
    const nodeElement = target.closest('.node');
    if (nodeElement && nodeElement.id && clickableNodeIds && onNodeClick) {
      // Extract ID from Mermaid's format "flowchart-{ID}-{hash}"
      // We look for our known IDs in the element ID
      const foundId = clickableNodeIds.find(id => nodeElement.id.startsWith(`flowchart-${id}-`));
      
      if (foundId) {
        onNodeClick(foundId);
      }
    }
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
      <div className="mermaid-tip-box" style={{
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
        <strong>Tip:</strong> Scroll/Pinch to Zoom • Drag to Pan
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
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd} 
        
        // Touch Listeners
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}

        // Click Listener (Delegation)
        onClick={handleContainerClick}
        // Handle tap on mobile (some browsers treat tap as click, some need specific handling, 
        // but onClick usually fires after touchEnd if no default prevented)
        
        onWheel={(e) => handleZoom(e.deltaY < 0 ? 1.1 : 0.9)}
        style={{ cursor: "grab", touchAction: "none" }} // touch-action: none is CRITICAL for preventing browser scroll
      >
        <div 
          ref={containerRef}
          className="diagram-content"
          style={{ 
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            opacity: opacity,
            transition: "opacity 0.2s ease-in-out", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            transformOrigin: "center center",
            pointerEvents: "none" // Let clicks pass through transform wrapper
          }}
        >
           {/* Re-enable pointer events for the actual SVG so we can click it */}
           <div 
             style={{ pointerEvents: "auto" }}
             dangerouslySetInnerHTML={{ __html: svgContent }} 
           />
        </div>
      </div>
    </div>
  );
};

export default MermaidDiagram;
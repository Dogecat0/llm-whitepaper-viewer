import React from 'react';
import type { DiagramNode } from './types';
import './infographic.css';

interface InfographicViewProps {
    node: DiagramNode;
    onNodeClick?: (path: string) => void;
    currentPath: string;
    pathDelimiter?: string;
}

// Recursive component for list items
const RecursiveListItem: React.FC<{
    node: DiagramNode;
    onNodeClick?: (path: string) => void;
    nodePath: string;
    pathDelimiter: string;
}> = ({ node, onNodeClick, nodePath, pathDelimiter }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const hasChildren = node.children && node.children.length > 0;
    const isInteractive = !!node.layout;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isInteractive) {
            onNodeClick?.(nodePath);
            return;
        }
        if (hasChildren) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <li
            onClick={handleClick}
            style={{ cursor: (hasChildren || isInteractive) ? 'pointer' : 'default' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                {hasChildren && !isInteractive && (
                    <span className={`card-chevron ${isExpanded ? 'expanded' : ''}`} style={{ fontSize: '0.7rem' }}>
                        ▶
                    </span>
                )}
                <span>{node.title}</span>
                {isInteractive && (
                    <span style={{
                        fontSize: '0.6rem',
                        background: 'rgba(100, 108, 255, 0.2)',
                        color: '#8899ff',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        marginLeft: 'auto',
                        border: '1px solid rgba(100, 108, 255, 0.3)'
                    }}>
                        Interactive
                    </span>
                )}
            </div>

            {hasChildren && isExpanded && !isInteractive && (
                <ul className="card-list" style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}>
                    {node.children!.map(child => (
                        <RecursiveListItem
                            key={child.id}
                            node={child}
                            nodePath={`${nodePath}${pathDelimiter}${child.id}`}
                            onNodeClick={onNodeClick}
                            pathDelimiter={pathDelimiter}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

import { AnimatedProcess } from './components/AnimatedProcess';
import { AnimatedTimeline } from './components/AnimatedTimeline';
import { ROOT_NODE } from './diagrams';
import { ArrowLeft } from 'lucide-react';

export const InfographicView: React.FC<InfographicViewProps> = ({
    node,
    onNodeClick,
    currentPath,
    pathDelimiter = '>'
}) => {
    // Helper to get initials for the icon
    const getInitials = (title: string) => title.substring(0, 2).toUpperCase();
    const [expandedCardIds, setExpandedCardIds] = React.useState<Set<string>>(new Set());

    const buildChildPath = (childId: string) => `${currentPath}${pathDelimiter}${childId}`;

    const toggleCard = (id: string) => {
        setExpandedCardIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    // If the node is a leaf (no children), we might want to show a "Detail View" 
    // or just a single card centered. For now, if it has no children, we treat it as a single item.
    const hasChildren = node.children && node.children.length > 0;

    if (!hasChildren) {
        return (
            <div className="infographic-container">
                {node.id !== ROOT_NODE.id && (
                    <button
                        onClick={() => onNodeClick?.(ROOT_NODE.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            background: 'none', border: 'none', color: 'var(--text-muted)',
                            cursor: 'pointer', marginBottom: '1rem', padding: 0
                        }}
                    >
                        <ArrowLeft size={16} /> Back to Overview
                    </button>
                )}
                <div className="infographic-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div className="card-header">
                        <div className="card-icon">
                            {node.icon ? (
                                typeof node.icon === 'string' ? <span>{node.icon}</span> : <span className="icon-wrapper">{node.icon}</span>
                            ) : (
                                getInitials(node.title)
                            )}
                        </div>
                        <h3>{node.title}</h3>
                    </div>
                    <div className="card-body">
                        {node.description && <p className="card-desc">{node.description}</p>}
                    </div>
                </div>
            </div>
        );
    }

    // Check for custom layouts
    if (node.layout === 'process') {
        return (
            <div className="infographic-container">
                <button
                    onClick={() => onNodeClick?.(ROOT_NODE.id)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        background: 'none', border: 'none', color: 'var(--text-muted)',
                        cursor: 'pointer', marginBottom: '1rem', padding: 0
                    }}
                >
                    <ArrowLeft size={16} /> Back to Overview
                </button>
                <header className="infographic-header">
                    <h1 className="infographic-title">{node.title}</h1>
                    {node.description && <p className="infographic-desc">{node.description}</p>}
                </header>
                <AnimatedProcess node={node} />
            </div>
        );
    }

    if (node.layout === 'timeline') {
        return (
            <div className="infographic-container">
                <button
                    onClick={() => onNodeClick?.(ROOT_NODE.id)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        background: 'none', border: 'none', color: 'var(--text-muted)',
                        cursor: 'pointer', marginBottom: '1rem', padding: 0
                    }}
                >
                    <ArrowLeft size={16} /> Back to Overview
                </button>
                <header className="infographic-header">
                    <h1 className="infographic-title">{node.title}</h1>
                    {node.description && <p className="infographic-desc">{node.description}</p>}
                </header>
                <AnimatedTimeline node={node} />
            </div>
        );
    }

    return (
        <div className="infographic-container">
            {node.id !== ROOT_NODE.id && (
                <button
                    onClick={() => onNodeClick?.(ROOT_NODE.id)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        background: 'none', border: 'none', color: 'var(--text-muted)',
                        cursor: 'pointer', marginBottom: '1rem', padding: 0
                    }}
                >
                    <ArrowLeft size={16} /> Back to Overview
                </button>
            )}
            <header className="infographic-header">
                <h1 className="infographic-title">{node.title}</h1>
                {node.description && <p className="infographic-desc">{node.description}</p>}
            </header>

            <div className="infographic-grid">
                {node.children!.map((child, index) => {
                    const hasSubItems = child.children && child.children.length > 0;
                    const isExpanded = expandedCardIds.has(child.id);
                    const isInteractive = !!child.layout;
                    const childPath = buildChildPath(child.id);

                    return (
                        <div
                            key={child.id}
                            className={`infographic-card ${isExpanded ? 'expanded' : ''}`}
                            onClick={() => {
                                if (isInteractive) {
                                    onNodeClick?.(childPath);
                                } else if (hasSubItems) {
                                    toggleCard(child.id);
                                }
                            }}
                            style={{ cursor: (hasSubItems || isInteractive) ? 'pointer' : 'default', position: 'relative' }}
                        >
                            {isInteractive && (
                                <div style={{
                                    position: 'absolute', top: '12px', right: '12px',
                                    background: 'rgba(100, 108, 255, 0.2)', color: '#8899ff',
                                    padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem',
                                    border: '1px solid rgba(100, 108, 255, 0.3)',
                                    fontWeight: 500
                                }}>
                                    Interactive
                                </div>
                            )}
                            <div className="card-header">
                                <div className="card-icon">
                                    {child.icon ? (
                                        typeof child.icon === 'string' ? (
                                            <span>{child.icon}</span>
                                        ) : (
                                            <span className="icon-wrapper">{child.icon}</span>
                                        )
                                    ) : (
                                        child.id.replace(/^[A-Z]-?/, '') || (index + 1)
                                    )}
                                </div>
                                <h3 style={{ flex: 1, paddingRight: isInteractive ? '60px' : '0' }}>{child.title}</h3>
                                {hasSubItems && !isInteractive && (
                                    <span className={`card-chevron ${isExpanded ? 'expanded' : ''}`}>
                                        ▶
                                    </span>
                                )}
                            </div>
                            <div className="card-body">
                                {child.description && <p className="card-desc">{child.description}</p>}

                                {hasSubItems && isExpanded && !isInteractive && (
                                    <ul className="card-list">
                                        {child.children!.map(grandchild => (
                                            <RecursiveListItem
                                                key={grandchild.id}
                                                node={grandchild}
                                                nodePath={`${childPath}${pathDelimiter}${grandchild.id}`}
                                                onNodeClick={onNodeClick}
                                                pathDelimiter={pathDelimiter}
                                            />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InfographicView;

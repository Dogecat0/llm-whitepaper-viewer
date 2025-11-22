import React from 'react';
import { motion } from 'framer-motion';
import type { DiagramNode } from '../types';

interface AnimatedProcessProps {
    node: DiagramNode;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export const AnimatedProcess: React.FC<AnimatedProcessProps> = ({ node }) => {
    if (!node.children) return null;

    return (
        <div className="animated-process-container" style={{ padding: '2rem' }}>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
                {node.children.map((step, index) => (
                    <motion.div key={step.id} variants={item} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="process-step-indicator" style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'var(--accent-color, #646cff)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            zIndex: 2
                        }}>
                            {index + 1}
                        </div>

                        <div className="process-content" style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '1rem',
                            borderRadius: '8px',
                            flex: 1,
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <h4 style={{ margin: '0 0 0.5rem 0' }}>{step.title}</h4>
                            {step.description && <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>{step.description}</p>}
                        </div>

                        {index < node.children!.length - 1 && (
                            <div style={{ position: 'absolute', left: '20px', top: '40px', bottom: '-20px', width: '2px', background: 'rgba(255,255,255,0.2)', zIndex: 1 }}></div>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

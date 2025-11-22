import React from 'react';
import { motion } from 'framer-motion';
import type { DiagramNode } from '../types';
import { ArrowRight } from 'lucide-react';

interface AnimatedTimelineProps {
    node: DiagramNode;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4
        }
    }
};

const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
};

export const AnimatedTimeline: React.FC<AnimatedTimelineProps> = ({ node }) => {
    if (!node.children) return null;

    return (
        <div className="animated-timeline-container" style={{ padding: '2rem', overflowX: 'auto' }}>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 'max-content' }}
            >
                {node.children.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <motion.div variants={item} style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            width: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <div style={{
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                color: 'var(--accent-color, #646cff)',
                                fontWeight: 'bold'
                            }}>
                                Step {index + 1}
                            </div>
                            <h4 style={{ margin: 0 }}>{step.title}</h4>
                            {step.description && <p style={{ margin: 0, opacity: 0.8, fontSize: '0.85rem' }}>{step.description}</p>}
                        </motion.div>

                        {index < node.children!.length - 1 && (
                            <motion.div variants={item}>
                                <ArrowRight size={24} style={{ opacity: 0.5 }} />
                            </motion.div>
                        )}
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    );
};

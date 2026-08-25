import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    preset?: 'display' | 'sans';
    align?: 'left' | 'center';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap: Record<string, string> = {
    sm: 'var(--bt-text-2xl)',
    md: 'var(--bt-text-4xl)',
    lg: 'var(--bt-text-5xl)',
    xl: 'var(--bt-text-7xl)',
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.12,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
    eyebrow,
    title,
    subtitle,
    preset = 'display',
    align = 'left',
    size = 'lg',
}) => {
    const isDisplay = preset === 'display';

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--bt-space-4)',
                textAlign: align,
                maxWidth: '800px',
                ...(align === 'center' ? { margin: '0 auto' } : {}),
            }}
        >
            {eyebrow && (
                <motion.span custom={0} variants={fadeUp} className="bt-label">
                    {eyebrow}
                </motion.span>
            )}
            <motion.h2
                custom={eyebrow ? 1 : 0}
                variants={fadeUp}
                className={isDisplay ? 'bt-heading-display' : 'bt-heading-sans'}
                style={{ fontSize: sizeMap[size], margin: 0 }}
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    custom={eyebrow ? 2 : 1}
                    variants={fadeUp}
                    className="bt-body"
                    style={{
                        fontSize: 'var(--bt-text-lg)',
                        maxWidth: '600px',
                        ...(align === 'center' ? { margin: '0 auto' } : {}),
                    }}
                >
                    {subtitle}
                </motion.p>
            )}
        </motion.div>
    );
};

export default SectionHeading;

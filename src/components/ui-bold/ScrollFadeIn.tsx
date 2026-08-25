import React from 'react';
import { motion } from 'framer-motion';

interface ScrollFadeInProps {
    children: React.ReactNode;
    delay?: number;
    y?: number;
    duration?: number;
    className?: string;
    style?: React.CSSProperties;
}

export const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({
    children,
    delay = 0,
    y = 32,
    duration = 0.7,
    className,
    style,
}) => (
    <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
        }}
        className={className}
        style={style}
    >
        {children}
    </motion.div>
);

export default ScrollFadeIn;

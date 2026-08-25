import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface BoldCardProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
    accentTop?: boolean;          // show a 2px blood-red bar at the top
    hoverable?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddings: Record<string, string> = {
    none: '0',
    sm: 'var(--bt-space-4)',
    md: 'var(--bt-space-6)',
    lg: 'var(--bt-space-8)',
};

export const BoldCard: React.FC<BoldCardProps> = ({
    children,
    accentTop = false,
    hoverable = true,
    padding = 'md',
    style,
    ...rest
}) => {
    return (
        <motion.div
            style={{
                background: 'var(--bt-color-bg-card)',
                border: '1px solid var(--bt-color-border-subtle)',
                borderRadius: 0,
                boxShadow: 'none',
                padding: paddings[padding],
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color var(--bt-duration-normal) var(--bt-ease-out)',
                ...style,
            }}
            whileHover={hoverable ? { borderColor: 'var(--bt-color-border)' } : undefined}
            {...rest}
        >
            {accentTop && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'linear-gradient(to right, var(--bt-color-blood), transparent)',
                    }}
                />
            )}
            {children}
        </motion.div>
    );
};

export default BoldCard;

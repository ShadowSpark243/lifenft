import React from 'react';

interface BoldDividerProps {
    accent?: boolean;
    spacing?: 'sm' | 'md' | 'lg';
    style?: React.CSSProperties;
}

const spacings: Record<string, string> = {
    sm: 'var(--bt-space-4)',
    md: 'var(--bt-space-8)',
    lg: 'var(--bt-space-12)',
};

export const BoldDivider: React.FC<BoldDividerProps> = ({
    accent = false,
    spacing = 'md',
    style,
}) => (
    <hr
        className={accent ? 'bt-divider bt-divider--accent' : 'bt-divider'}
        style={{
            margin: `${spacings[spacing]} 0`,
            ...style,
        }}
    />
);

export default BoldDivider;

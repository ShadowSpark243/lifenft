import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BoldButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    variant?: Variant;
    size?: Size;
    children: React.ReactNode;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

const sizeStyles: Record<Size, React.CSSProperties> = {
    sm: { padding: '8px 16px', fontSize: 'var(--bt-text-xs)', letterSpacing: 'var(--bt-tracking-wider)' },
    md: { padding: '12px 28px', fontSize: 'var(--bt-text-sm)', letterSpacing: 'var(--bt-tracking-wider)' },
    lg: { padding: '16px 40px', fontSize: 'var(--bt-text-base)', letterSpacing: 'var(--bt-tracking-widest)' },
};

const base: React.CSSProperties = {
    fontFamily: 'var(--bt-font-body)',
    fontWeight: 700,
    textTransform: 'uppercase',
    border: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all var(--bt-duration-normal) var(--bt-ease-out)',
    position: 'relative',
    outline: 'none',
    lineHeight: 1,
    boxShadow: 'none',
};

const variantStyles: Record<Variant, React.CSSProperties> = {
    primary: {
        background: 'var(--bt-color-text-primary)',
        color: 'var(--bt-color-bg)',
    },
    secondary: {
        background: 'transparent',
        color: 'var(--bt-color-text-primary)',
        border: '1px solid var(--bt-color-border)',
    },
    ghost: {
        background: 'transparent',
        color: 'var(--bt-color-text-primary)',
        padding: '0',
        borderBottom: '1px solid var(--bt-color-text-primary)',
        borderRadius: 0,
    },
};

const hoverVariants: Record<Variant, React.CSSProperties> = {
    primary: {
        background: 'var(--bt-color-blood)',
        color: '#ffffff',
    },
    secondary: {
        background: 'var(--bt-color-accent-muted)',
        borderColor: 'var(--bt-color-text-primary)',
    },
    ghost: {
        borderBottomColor: 'var(--bt-color-blood)',
        color: 'var(--bt-color-blood-light)',
    },
};

export const BoldButton: React.FC<BoldButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    icon,
    fullWidth = false,
    style,
    ...rest
}) => {
    const [hovered, setHovered] = React.useState(false);

    const mergedStyle: React.CSSProperties = {
        ...base,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...(hovered ? hoverVariants[variant] : {}),
        ...(fullWidth ? { width: '100%' } : {}),
        ...style,
    };

    return (
        <motion.button
            className="bt-focus-ring"
            style={mergedStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            {...rest}
        >
            {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
            {children}
        </motion.button>
    );
};

export default BoldButton;

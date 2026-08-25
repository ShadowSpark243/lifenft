import React from 'react';

interface BoldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    error?: string;
}

export const BoldInput: React.FC<BoldInputProps> = ({
    label,
    helperText,
    error,
    style,
    id,
    ...rest
}) => {
    const inputId = id || `bt-input-${label?.toLowerCase().replace(/\s+/g, '-') || 'field'}`;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bt-space-2)' }}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="bt-label"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className="bt-focus-ring"
                style={{
                    fontFamily: 'var(--bt-font-body)',
                    fontSize: 'var(--bt-text-base)',
                    fontWeight: 400,
                    color: 'var(--bt-color-text-primary)',
                    background: 'var(--bt-color-surface)',
                    border: '1px solid var(--bt-color-border)',
                    borderRadius: 0,
                    padding: '12px 16px',
                    outline: 'none',
                    transition: 'border-color var(--bt-duration-normal) var(--bt-ease-out)',
                    width: '100%',
                    boxSizing: 'border-box',
                    boxShadow: 'none',
                    ...(error ? { borderColor: 'var(--bt-color-error)' } : {}),
                    ...style,
                }}
                onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--bt-color-text-primary)';
                    rest.onFocus?.(e);
                }}
                onBlur={(e) => {
                    e.currentTarget.style.borderColor = error
                        ? 'var(--bt-color-error)'
                        : 'var(--bt-color-border)';
                    rest.onBlur?.(e);
                }}
                {...rest}
            />
            {(helperText || error) && (
                <span
                    style={{
                        fontFamily: 'var(--bt-font-body)',
                        fontSize: 'var(--bt-text-xs)',
                        color: error ? 'var(--bt-color-error)' : 'var(--bt-color-text-muted)',
                        letterSpacing: 'var(--bt-tracking-wide)',
                    }}
                >
                    {error || helperText}
                </span>
            )}
        </div>
    );
};

export default BoldInput;

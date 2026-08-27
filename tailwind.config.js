/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        foreground: '#f5f5f5',
        border: '#2a2a2a',
        muted: '#1a1a1a',
        primary: {
          DEFAULT: '#f5f5f5',
          foreground: '#ffffff'
        },
        'bt-bg': '#050505',
        'bt-bg-elevated': '#0c0c0c',
        'bt-bg-card': '#111111',
        'bt-surface': '#1a1a1a',
        'bt-border': '#2a2a2a',
        'bt-text': '#f5f5f5',
        'bt-text-sec': '#a0a0a0',
        'bt-text-muted': '#666666',
        'bt-blood': { DEFAULT: '#c62828', light: '#e53935', dark: '#8e0000' },
        'bt-success': '#66bb6a',
        'bt-warning': '#ffa726',
        'bt-error': '#ef5350',
        secondary: {
          DEFAULT: '#c62828',
          dark: '#8e0000',
          light: '#e53935',
          foreground: '#ffffff'
        }
      },
      keyframes: {
        fadeSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-slide-in-1': 'fadeSlideIn 0.5s ease-out forwards',
        'fade-slide-in-2': 'fadeSlideIn 0.5s ease-out 0.1s forwards',
        'fade-slide-in-3': 'fadeSlideIn 0.5s ease-out 0.2s forwards',
        'fade-slide-in-4': 'fadeSlideIn 0.5s ease-out 0.3s forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'fade-up': 'fade-up 1s ease-out forwards',
      },
      fontFamily: {
        'bt-display': ['Playfair Display', 'Georgia', 'serif'],
        'bt-body': ['Inter Tight', 'Inter', 'system-ui', 'sans-serif'],
        'bt-mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '0',
      },
      spacing: {
        'bt-1': '0.25rem',
        'bt-2': '0.5rem',
        'bt-3': '0.75rem',
        'bt-4': '1rem',
        'bt-6': '1.5rem',
        'bt-8': '2rem',
        'bt-12': '3rem',
        'bt-16': '4rem',
        'bt-24': '6rem',
        'bt-32': '8rem',
      },
      boxShadow: {
        'glow': 'none',
        'glow-lg': 'none',
      }
    },
  },
  plugins: [],
}

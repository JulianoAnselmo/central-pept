import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // tokens dinâmicos que respondem ao modo claro/escuro via CSS var
        teal: {
          DEFAULT: 'var(--teal)',
          50:  'var(--teal-50)',
          100: 'var(--teal-100)',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: 'var(--teal-700)',
        },
        // Cor secundária — laranja para energia/highlights
        orange: {
          50:  '#fff7ed',
          100: '#ffedd5',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        ink: {
          DEFAULT: 'var(--text)',
          2: 'var(--text-2)',
          3: 'var(--text-3)',
        },
        surface: 'var(--surface)',
        bg:      'var(--bg)',
        border:  'var(--border)',
        'border-2': 'var(--border-2)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '18px',
        xl: '24px',
        '2xl': '28px',
      },
      boxShadow: {
        sm:  '0 1px 2px rgba(15,23,42,.04)',
        DEFAULT: '0 1px 3px rgba(15,23,42,.05), 0 2px 8px rgba(15,23,42,.04)',
        lg:  '0 8px 24px rgba(15,23,42,.08), 0 2px 4px rgba(15,23,42,.04)',
        xl:  '0 20px 40px rgba(15,23,42,.10), 0 4px 12px rgba(15,23,42,.05)',
        glow: '0 0 0 1px rgba(13,148,136,.1), 0 8px 32px rgba(13,148,136,.15)',
      },
      backgroundImage: {
        'gradient-hero': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(13,148,136,.12), transparent 60%)',
        'gradient-teal': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)',
        'gradient-mesh': 'radial-gradient(at 20% 0%, rgba(13,148,136,.08) 0, transparent 50%), radial-gradient(at 80% 0%, rgba(249,115,22,.05) 0, transparent 50%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

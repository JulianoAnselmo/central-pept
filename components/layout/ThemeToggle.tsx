'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
const LS_KEY = 'peptidecalc:theme';

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Sincroniza com <html> após hidratação
  useEffect(() => {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(current);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    apply(next);
    try { localStorage.setItem(LS_KEY, next); } catch { /* ignore */ }
  }

  // Enquanto não hidratou, render um botão neutro (evita flash)
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
      title={isDark ? 'Modo claro' : 'Modo escuro'}
      className="w-9 h-9 flex items-center justify-center rounded-md text-ink-2 hover:bg-teal-50 hover:text-teal-700 transition-colors"
    >
      {isDark ? (
        <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx={10} cy={10} r={3.5} />
          <path d="M10 2v1.5M10 16.5V18M2 10h1.5M16.5 10H18M4.2 4.2l1.1 1.1M14.7 14.7l1.1 1.1M4.2 15.8l1.1-1.1M14.7 5.3l1.1-1.1" />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M16.5 11.5A7 7 0 0 1 8.5 3.5a7 7 0 1 0 8 8z" />
        </svg>
      )}
    </button>
  );
}

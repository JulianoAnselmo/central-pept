'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { buildSearchIndex, searchIndex, type SearchResult } from '@/lib/search-index';

const TYPE_LABELS: Record<SearchResult['type'], string> = {
  peptide: 'Peptídeo',
  article: 'Artigo',
  tool: 'Ferramenta',
  page: 'Página',
  ebook: 'Ebook',
};

const TYPE_COLORS: Record<SearchResult['type'], string> = {
  peptide: 'bg-teal-50 text-teal-700 border-teal-100',
  article: 'bg-blue-50 text-blue-700 border-blue-100',
  tool: 'bg-orange-50 text-orange-700 border-orange-100',
  page: 'bg-slate-100 text-slate-600 border-slate-200',
  ebook: 'bg-purple-50 text-purple-700 border-purple-100',
};

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  const index = useMemo(() => buildSearchIndex(), []);
  const results = useMemo(() => searchIndex(index, query), [index, query]);

  // Atalho teclado: "/" ou Cmd/Ctrl+K abre
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.key === '/' && !isEditable(e.target)) || ((e.metaKey || e.ctrlKey) && e.key === 'k')) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Focus input ao abrir
  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  // Reset highlight ao mudar query
  useEffect(() => { setHighlight(0); }, [query]);

  // Scroll item ativo
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector(`[data-idx="${highlight}"]`) as HTMLElement | null;
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlight]);

  function close() {
    setOpen(false);
    setQuery('');
    setHighlight(0);
  }

  function go(url: string) {
    close();
    router.push(url);
  }

  return (
    <>
      {/* Trigger button no header */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buscar"
        title="Buscar (tecle / ou Ctrl+K)"
        className="inline-flex items-center gap-2 h-9 pl-2.5 pr-2 rounded-md text-ink-2 hover:bg-teal-50 hover:text-teal-700 transition-colors"
      >
        <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx={9} cy={9} r={6} /><path d="m16 16-3.5-3.5" />
        </svg>
        <kbd className="hidden lg:inline-flex items-center px-1.5 h-5 rounded border border-border text-[10px] font-mono text-ink-3 bg-bg">
          /
        </kbd>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center p-4 pt-[10vh] bg-ink/40 backdrop-blur-sm animate-fade-in"
          onClick={close}
          role="dialog"
          aria-label="Busca global"
        >
          <div
            className="w-full max-w-xl bg-surface rounded-xl shadow-xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-ink-3">
                <circle cx={9} cy={9} r={6} /><path d="m16 16-3.5-3.5" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                placeholder="Buscar peptídeo, artigo, ferramenta..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') close();
                  else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setHighlight((h) => Math.min(h + 1, Math.max(results.length - 1, 0)));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setHighlight((h) => Math.max(h - 1, 0));
                  } else if (e.key === 'Enter' && results[highlight]) {
                    e.preventDefault();
                    go(results[highlight].url);
                  }
                }}
                className="flex-1 bg-transparent outline-none text-base text-ink placeholder:text-ink-3"
              />
              <kbd className="hidden sm:inline-flex items-center px-2 h-6 rounded border border-border text-xs font-mono text-ink-3 bg-bg">
                ESC
              </kbd>
            </div>

            {/* Results */}
            {query.trim() === '' ? (
              <div className="p-6 text-center text-sm text-ink-3">
                <p className="mb-4">Digite para buscar entre 21 peptídeos, artigos, ferramentas e páginas.</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {['semaglutida', 'bpc-157', 'reconstituição', 'tirzepatida', 'cronograma'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-full border border-border bg-bg text-ink-2 hover:border-teal hover:text-teal-700 hover:bg-teal-50 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-sm text-ink-3">
                Nenhum resultado para <strong className="text-ink">&quot;{query}&quot;</strong>.
              </div>
            ) : (
              <ul ref={listRef} role="listbox" className="list-none m-0 p-2 max-h-[60vh] overflow-y-auto">
                {results.map((r, i) => (
                  <li
                    key={r.id}
                    data-idx={i}
                    role="option"
                    aria-selected={highlight === i}
                    onMouseEnter={() => setHighlight(i)}
                    onMouseDown={(e) => { e.preventDefault(); go(r.url); }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer ${
                      highlight === i ? 'bg-teal-50' : 'hover:bg-teal-50'
                    }`}
                  >
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border flex-shrink-0 ${TYPE_COLORS[r.type]}`}>
                      {TYPE_LABELS[r.type]}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-sm text-ink truncate">{r.title}</div>
                      {r.subtitle && (
                        <div className="text-xs text-ink-3 truncate">{r.subtitle}</div>
                      )}
                    </div>
                    <svg viewBox="0 0 20 20" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-ink-3 flex-shrink-0">
                      <path d="M5 10h10M10 5l5 5-5 5" />
                    </svg>
                  </li>
                ))}
              </ul>
            )}

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-border bg-bg flex items-center justify-between text-[11px] text-ink-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="inline-flex items-center px-1.5 h-4 rounded border border-border font-mono bg-surface">↑↓</kbd>
                  navegar
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="inline-flex items-center px-1.5 h-4 rounded border border-border font-mono bg-surface">↵</kbd>
                  abrir
                </span>
              </div>
              <span>{results.length > 0 ? `${results.length} resultado${results.length > 1 ? 's' : ''}` : ''}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}

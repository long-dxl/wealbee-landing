import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { searchStocks, type Stock } from "../../lib/stocks";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (stock: Stock) => void;
  stocks: Stock[];
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

// ── Exchange colour tokens ────────────────────────────────────────────────────
const EX = {
  HOSE: {
    chip: "bg-[#eff6ff] border-[#bfdbfe]",
    symbol: "text-[#1d4ed8]",
    badge: "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]",
    dot: "bg-[#3b82f6]",
  },
  HNX: {
    chip: "bg-[#f0fdf4] border-[#86efac]",
    symbol: "text-[#15803d]",
    badge: "bg-[#dcfce7] text-[#15803d] border-[#86efac]",
    dot: "bg-[#22c55e]",
  },
  UPCoM: {
    chip: "bg-[#f9fafb] border-[#d1d5db]",
    symbol: "text-[#374151]",
    badge: "bg-[#f3f4f6] text-[#6b7280] border-[#d1d5db]",
    dot: "bg-[#9ca3af]",
  },
} as const;

type ExKey = keyof typeof EX;
const exStyle = (ex: string) => EX[(ex as ExKey) in EX ? (ex as ExKey) : "UPCoM"];

// Strip legal prefix so chip name stays compact
const PREFIX_RE =
  /^(CTCP|Ngân hàng TMCP|Ngân hàng|Tổng Công ty Cổ phần|Tổng Công ty CP|Tổng công ty|Công ty Cổ phần|Công ty CP|Công ty TNHH|TNHH)\s+/i;

function shortName(name: string) {
  return name.replace(PREFIX_RE, "").trim();
}

// ── Dropdown name renderer (prefix dimmed) ───────────────────────────────────
function NameLabel({ name }: { name: string }) {
  const match = name.match(PREFIX_RE);
  if (!match) return <span className="text-[#111827]">{name}</span>;
  const prefix = match[0];
  const brand = name.slice(prefix.length);
  return (
    <>
      <span className="text-[#9ca3af]">{prefix.trimEnd()} </span>
      <span className="text-[#111827]">{brand}</span>
    </>
  );
}

// ── Confirmed chip ────────────────────────────────────────────────────────────
function StockChip({
  stock,
  onClear,
}: {
  stock: Stock;
  onClear: () => void;
}) {
  const s = exStyle(stock.exchange);
  return (
    <div
      className={`flex items-center gap-1.5 border rounded-md px-2 py-[5px] min-w-0 w-full ${s.chip}`}
    >
      {/* Exchange dot */}
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />

      {/* Symbol */}
      <span className={`text-[13px] font-bold shrink-0 font-mono tracking-wide ${s.symbol}`}>
        {stock.symbol}
      </span>

      {/* Separator */}
      <span className="text-[#d1d5db] text-[11px] shrink-0">·</span>

      {/* Short company name */}
      <span
        className="flex-1 text-[11px] text-[#6b7280] truncate min-w-0"
        title={stock.name}
      >
        {shortName(stock.name)}
      </span>

      {/* Exchange badge */}
      <span
        className={`text-[9px] font-bold px-1 py-0.5 rounded border shrink-0 ${s.badge}`}
      >
        {stock.exchange}
      </span>

      {/* Clear button */}
      <button
        type="button"
        onClick={onClear}
        className="shrink-0 text-[#9ca3af] hover:text-[#374151] transition-colors ml-0.5"
        tabIndex={-1}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M9 3L3 9M3 3l6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function StockSymbolInput({
  value,
  onChange,
  onSelect,
  stocks,
  placeholder,
  className,
  autoFocus,
  onKeyDown,
}: Props) {
  const [suggestions, setSuggestions] = useState<Stock[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const [confirmed, setConfirmed] = useState<Stock | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Pre-confirm when editing an existing valid symbol (e.g., edit mode)
  useEffect(() => {
    if (!confirmed && value && stocks.length > 0) {
      const match = stocks.find((s) => s.symbol === value.toUpperCase());
      if (match) setConfirmed(match);
    }
  }, [stocks]); // only when stocks list loads

  useEffect(() => {
    if (autoFocus && !confirmed) inputRef.current?.focus();
  }, [autoFocus, confirmed]);

  const updateRect = useCallback(() => {
    if (inputRef.current) {
      const r = inputRef.current.getBoundingClientRect();
      setRect({ top: r.bottom + 4, left: r.left, width: r.width });
    }
  }, []);

  useEffect(() => {
    if (confirmed) { setOpen(false); return; }
    const results = searchStocks(value, stocks);
    setSuggestions(results);
    setActiveIndex(0);
    const shouldOpen = results.length > 0 && value.length > 0;
    setOpen(shouldOpen);
    if (shouldOpen) updateRect();
  }, [value, stocks, confirmed]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !(e.target as Element).closest("[data-stock-dropdown]") &&
        e.target !== inputRef.current
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Update portal position on scroll/resize
  useEffect(() => {
    if (!open) return;
    const update = () => updateRect();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, updateRect]);

  const confirmStock = useCallback(
    (stock: Stock) => {
      onChange(stock.symbol);
      onSelect?.(stock);
      setConfirmed(stock);
      setOpen(false);
    },
    [onChange, onSelect]
  );

  // Auto-confirm on blur if value is an exact symbol match
  const handleBlur = () => {
    const q = value.toUpperCase();
    const exact = stocks.find((s) => s.symbol === q);
    if (exact) { confirmStock(exact); return; }
    setOpen(false);
  };

  const clearConfirmed = () => {
    setConfirmed(null);
    onChange("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (open && suggestions.length > 0) {
      if (e.key === "Tab" || e.key === "Enter") {
        e.preventDefault();
        confirmStock(suggestions[activeIndex]);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
    }
    // Tab/Enter with no dropdown but exact match → confirm
    if ((e.key === "Tab" || e.key === "Enter") && value) {
      const exact = stocks.find((s) => s.symbol === value.toUpperCase());
      if (exact) { e.preventDefault(); confirmStock(exact); return; }
    }
    onKeyDown?.(e);
  };

  // ── Render confirmed chip ──────────────────────────────────────────────────
  if (confirmed) {
    return <StockChip stock={confirmed} onClear={clearConfirmed} />;
  }

  // ── Render text input + portal dropdown ───────────────────────────────────
  const dropdown =
    open && rect
      ? createPortal(
          <div
            data-stock-dropdown
            style={{
              position: "fixed",
              top: rect.top,
              left: rect.left,
              width: Math.max(rect.width, 320),
              zIndex: 9999,
            }}
            className="bg-white border border-[#e5e7eb] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] overflow-hidden"
          >
            {suggestions.map((stock, i) => (
              <button
                key={stock.symbol}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  confirmStock(stock);
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors ${
                  i === activeIndex ? "bg-[#eff6ff]" : "hover:bg-[#f9fafb]"
                }`}
              >
                <span className="w-[48px] text-[13px] font-bold text-[#0849ac] shrink-0 font-mono tracking-wide">
                  {stock.symbol}
                </span>
                <span className="w-px h-4 bg-[#e5e7eb] shrink-0" />
                <span className="flex-1 text-[13px] leading-snug min-w-0">
                  <span className="truncate block" title={stock.name}>
                    <NameLabel name={stock.name} />
                  </span>
                </span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border shrink-0 ${
                    exStyle(stock.exchange).badge
                  }`}
                >
                  {stock.exchange}
                </span>
              </button>
            ))}
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-t border-[#f3f4f6] bg-[#fafafa]">
              <kbd className="text-[10px] text-[#9ca3af] bg-white border border-[#e5e7eb] rounded px-1 py-0.5 font-mono">Tab</kbd>
              <span className="text-[10px] text-[#9ca3af]">hoặc</span>
              <kbd className="text-[10px] text-[#9ca3af] bg-white border border-[#e5e7eb] rounded px-1 py-0.5 font-mono">↵</kbd>
              <span className="text-[10px] text-[#9ca3af]">để chọn</span>
              <span className="text-[10px] text-[#d1d5db] mx-1">·</span>
              <kbd className="text-[10px] text-[#9ca3af] bg-white border border-[#e5e7eb] rounded px-1 py-0.5 font-mono">↑↓</kbd>
              <span className="text-[10px] text-[#9ca3af]">điều hướng</span>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => {
          if (suggestions.length > 0 && value.length > 0) {
            updateRect();
            setOpen(true);
          }
        }}
        placeholder={placeholder}
        maxLength={10}
        autoComplete="off"
        spellCheck={false}
        className={className}
      />
      {dropdown}
    </>
  );
}

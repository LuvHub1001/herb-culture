import { memo, useCallback, useEffect, useRef, useState } from "react";

export interface SortSelectOption<T extends string> {
  value: T;
  label: string;
}

interface Props<T extends string> {
  value: T;
  options: SortSelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

function SortSelectInner<T extends string>({
  value,
  options,
  onChange,
  className = "",
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const currentLabel =
    options.find((o) => o.value === value)?.label ?? options[0]?.label;

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const pick = useCallback(
    (v: T) => {
      onChange(v);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex h-9 items-center gap-2 rounded-full border border-[var(--border)] bg-white py-1.5 pl-4 pr-3 text-sm font-bold text-[var(--text)] outline-none transition-colors hover:border-gray-400 focus-visible:border-[var(--text)]"
      >
        <span>{currentLabel}</span>
        <svg
          aria-hidden
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-2 min-w-[10rem] overflow-hidden rounded-2xl border border-[var(--border)] bg-white py-1 shadow-lg shadow-black/5"
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => pick(opt.value)}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm font-bold transition-colors ${
                    active
                      ? "bg-gray-50 text-[var(--text)]"
                      : "text-[var(--text)] hover:bg-gray-50"
                  }`}
                >
                  <span>{opt.label}</span>
                  {active && (
                    <svg
                      aria-hidden
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const SortSelect = memo(SortSelectInner) as typeof SortSelectInner;
export default SortSelect;

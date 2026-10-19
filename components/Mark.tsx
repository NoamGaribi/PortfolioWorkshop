"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  variant?: "circle" | "underline";
  note?: string;
};

// Hand-drawn red-pen mark that draws itself the first time it scrolls into view.
export function Mark({ children, variant = "circle", note }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className="pen" data-drawn={drawn}>
      <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10 font-semibold">{children}</span>
      <svg
        aria-hidden="true"
        className={
          variant === "circle"
            ? "pointer-events-none absolute -left-2.5 -top-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+1.25rem)] overflow-visible text-mark"
            : "pointer-events-none absolute -bottom-1.5 left-0 h-2 w-full overflow-visible text-mark"
        }
        viewBox={variant === "circle" ? "0 0 100 40" : "0 0 100 8"}
        preserveAspectRatio="none"
      >
        {variant === "circle" ? (
          <path
            d="M88 6 C 70 0, 18 0, 6 12 C -2 22, 14 37, 50 38 C 84 39, 101 28, 96 15 C 92 6, 70 3, 54 4"
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ) : (
          <path
            d="M1 5 C 20 2, 45 7, 70 4 S 95 3, 99 5"
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
      </span>
      {note && (
        <span
          aria-hidden="true"
          className="pen-note ml-3 inline-block whitespace-nowrap font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-mark"
        >
          {note}
        </span>
      )}
    </span>
  );
}

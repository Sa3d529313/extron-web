"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

// Adds `is-in` once the element scrolls into view; the CSS (.line-mask,
// .fade-up in globals.css) does the motion, so the hidden state is there on
// the very first frame and nothing flashes.
export default function Reveal({
  as: Tag = "div",
  className = "",
  children,
  threshold = 0.25,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  threshold?: number;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

// One headline line that rises out of its own mask.
export function Line({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`line-mask ${className}`}>
      <span>{children}</span>
    </span>
  );
}

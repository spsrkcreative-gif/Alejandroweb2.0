import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4;
  as?: 'div' | 'article';
}

/**
 * Wraps content with the .reveal / .reveal-dN classes from lab.css and
 * toggles .in via IntersectionObserver, mirroring the original vanilla-JS
 * scroll-reveal behavior.
 */
export function Reveal({ children, className = '', delay, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delayClass = delay ? `reveal-d${delay}` : '';
  const Tag = as as 'div';
  return (
    <Tag ref={ref} className={`reveal ${delayClass} ${visible ? 'in' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  );
}

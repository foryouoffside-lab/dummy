'use client';
import { useInView } from '@/lib/useInView';

export default function Reveal({ children, className = '', delay = 0, duration = 500, yOffset = 20 }) {
  const [ref, isInView] = useInView({ threshold: 0.1, once: true });

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : `translateY(${yOffset}px)`,
      }}
    >
      {children}
    </div>
  );
}

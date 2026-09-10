// Scroll-reveal wrapper.
//
// This used to be an IntersectionObserver component that rendered every wrapped
// block at `opacity: 0` via an inline style. That state was part of the
// prerendered HTML -- 22 blocks on the home page, 11 on /drills -- so the page
// shipped with everything below the hero invisible until the JS bundle had
// downloaded, hydrated and fired the observer. A refresh left that whole region
// blank for the duration, and a client that never ran the JS never saw the
// content at all.
//
// The animation is now driven entirely by CSS (see `.reveal` in globals.css), so
// the markup is visible on its own and no JS has to run for content to appear.
// That also makes this a plain server-renderable component -- one less client
// boundary on every page that uses it.
export default function Reveal({ children, className = '', delay = 0, yOffset = 20 }) {
  return (
    <div
      className={`reveal ${className}`}
      // `delay` is kept as a stagger offset into the scroll range rather than a
      // time, because a view() timeline advances with scroll position, not time.
      style={{ '--reveal-y': `${yOffset}px`, '--reveal-stagger': `${delay / 10}%` }}
    >
      {children}
    </div>
  );
}

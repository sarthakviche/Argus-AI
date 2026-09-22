import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const isHoveredRef = useRef(false);
  const rafId = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const updatePosition = () => {
      const { x, y } = mousePos.current;
      const isHovered = isHoveredRef.current;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${isHovered ? 1.4 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${isHovered ? 1.15 : 1})`;
        if (isHovered) {
          ringRef.current.classList.add('w-8', 'h-8', 'border-[#315BEA]', 'bg-[#315BEA]/10');
          ringRef.current.classList.remove('w-6', 'h-6', 'border-[#315BEA]/40', 'bg-transparent');
        } else {
          ringRef.current.classList.add('w-6', 'h-6', 'border-[#315BEA]/40', 'bg-transparent');
          ringRef.current.classList.remove('w-8', 'h-8', 'border-[#315BEA]', 'bg-[#315BEA]/10');
        }
      }
    };

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          updatePosition();
          rafId.current = null;
        });
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest(
        'button, a, input, select, textarea, [role="button"], tr[data-interactive="true"], .interactive-element, .argus-slider-track'
      );
      isHoveredRef.current = !!isInteractive;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Precision inner dot */}
      <div
        ref={dotRef}
        className="argus-cursor-dot fixed top-0 left-0 w-2 h-2 bg-[#315BEA] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
      />
      {/* Outer subtle aura ring */}
      <div
        ref={ringRef}
        className="argus-cursor-ring fixed top-0 left-0 border rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out will-change-transform w-6 h-6 border-[#315BEA]/40 bg-transparent pointer-events-none"
      />
    </>
  );
}

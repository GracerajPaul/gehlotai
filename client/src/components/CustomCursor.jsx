import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target;
      const clickable = target.closest('button') || target.closest('a') || target.closest('[data-hover="true"]') || target.closest('input') || target.closest('textarea') || target.closest('select');
      setHovering(!!clickable);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      className={`custom-cursor ${hovering ? 'hovering' : ''}`}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
    />
  );
}

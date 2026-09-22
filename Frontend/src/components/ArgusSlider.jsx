import React, { useRef, useState, useCallback } from 'react';

export default function ArgusSlider({ value, min = 0, max = 100, onChange, color = 'red', label }) {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateValueFromPointer = useCallback((clientX) => {
    if (!trackRef.current) return value;
    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const rawVal = min + percentage * (max - min);
    return Math.round(rawVal);
  }, [min, max, value]);

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    const newVal = calculateValueFromPointer(e.clientX);
    onChange(newVal);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const newVal = calculateValueFromPointer(e.clientX);
    onChange(newVal);
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  const colorStyles = color === 'red' ? {
    activeTrack: 'bg-[#DC2626]',
    border: 'border-[#DC2626]',
    dot: 'bg-[#DC2626]',
    glow: 'shadow-[0_0_16px_rgba(220,38,38,0.5)]',
    badge: 'bg-red-50 text-[#DC2626] border-red-200',
    title: 'text-[#DC2626]'
  } : {
    activeTrack: 'bg-[#D97706]',
    border: 'border-[#D97706]',
    dot: 'bg-[#D97706]',
    glow: 'shadow-[0_0_16px_rgba(217,119,6,0.5)]',
    badge: 'bg-amber-50 text-[#D97706] border-amber-200',
    title: 'text-[#D97706]'
  };

  return (
    <div className="space-y-2 select-none">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className={colorStyles.title}>{label}</span>
        <span className={`px-2.5 py-0.5 rounded-md font-mono font-bold border text-xs ${colorStyles.badge}`}>
          {value} / 100
        </span>
      </div>

      <div 
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="argus-slider-track relative h-8 flex items-center cursor-pointer touch-none group"
      >
        {/* Track Background (Neutral Dark Enterprise Track) */}
        <div className="w-full h-2.5 bg-[#0B1630] rounded-full overflow-hidden relative border border-[#1E293B]">
          {/* Active Highlight Track */}
          <div 
            className={`h-full ${colorStyles.activeTrack} ${isDragging ? '' : 'transition-[width] duration-75 ease-out'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Custom Premium Enterprise Thumb Handle */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-2 ${colorStyles.border} rounded-full shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing ${
            isDragging 
              ? `scale-125 ${colorStyles.glow} ring-4 ring-white/90 z-20` 
              : 'group-hover:scale-110 transition-transform duration-150 ease-out z-10'
          }`}
          style={{ left: `${percentage}%` }}
        >
          {/* Thumb Inner Core Dot */}
          <div className={`w-2 h-2 rounded-full ${colorStyles.dot} ${isDragging ? 'scale-125' : ''}`} />

          {/* Floating Dragging Tooltip */}
          {isDragging && (
            <div className="absolute -top-9 px-2.5 py-0.5 bg-[#0B1630] text-white font-mono text-[11px] font-bold rounded-md shadow-lg border border-[#315BEA]/40 whitespace-nowrap animate-fadeIn">
              {value}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";

export default function CircleOfFifths() {
  const majors = ["C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#", "F"]; // clockwise fifths
  const minors = ["Am", "Em", "Bm", "F#m", "C#m", "G#m", "D#m", "A#m", "Fm", "Cm", "Gm", "Dm"]; // relative minors aligned to majors

  const outerRadius = 115;
  const innerRadius = 80;
  const zoneOuter = 125;
  const [centerIndex, setCenterIndex] = React.useState<number>(0); // 0 = C
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isInZone = (index: number): boolean => {
    const n = majors.length;

    if (index === centerIndex) return true;
    if (minors[index] === minors[centerIndex]) return true;
    if ((index + 1) % n === centerIndex || (index - 1 + n) % n === centerIndex) return true;
    if (minors[(centerIndex + 1) % n] === minors[index]) return true;
    if (minors[(centerIndex - 1 + n) % n] === minors[index]) return true;

    return false;
  };

  const angleToIndex = (x: number, y: number): number => {
    // Map pointer coords to index with 12 o'clock = C (index 0), increasing clockwise.
    // Invert y for screen coords, then rotate so that top is 0 and increase clockwise.
    const theta = Math.atan2(-y, x); // standard polar angle (CCW from +x), corrected for screen Y-down
    const full = 2 * Math.PI;
    const sector = full / majors.length;
    const angleClockwiseFromTop = (Math.PI / 2 - theta + full) % full;
    const idx = Math.floor((angleClockwiseFromTop + sector / 2) / sector) % majors.length;
    return idx;
  };

  /** Handle pointer down: set center to clicked sector (fixed, no dragging). */
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setCenterIndex(angleToIndex(x, y));
  };

  const ring = majors.map((M, i) => ({ major: M, minor: minors[i], i }));

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <svg
        role="img"
        aria-label="Interactive Circle of Fifths"
        className="max-w-sm w-full h-auto cursor-pointer select-none"
        viewBox="-160 -160 320 320"
        onPointerDown={handlePointerDown}
      >
        <defs>
          <radialGradient id="circleGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.06" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.12" />
          </radialGradient>
        </defs>

        {/* Base rings */}
        <circle cx="0" cy="0" r="135" fill="url(#circleGradient)" stroke="currentColor" strokeOpacity="0.2" />
        <circle cx="0" cy="0" r="95" fill="none" stroke="currentColor" strokeOpacity="0.15" />
        <circle cx="0" cy="0" r="60" fill="none" stroke="currentColor" strokeOpacity="0.1" />

        {/* Compatibility zone arc (highlight narrow segments) */}
        {ring.map(({ i }) => {
          if (!isInZone(i)) return null;
          const centerAngle = ((i + 0.5) / ring.length) * 2 * Math.PI - Math.PI / 2;
          const delta = (Math.PI * 2) / ring.length / 4; // make zone narrower
          const a0 = centerAngle - delta;
          const a1 = centerAngle + delta;

          const R = zoneOuter;
          const r = 70;
          const x0o = Math.cos(a0) * R,
            y0o = Math.sin(a0) * R;
          const x1o = Math.cos(a1) * R,
            y1o = Math.sin(a1) * R;
          const x0i = Math.cos(a0) * r,
            y0i = Math.sin(a0) * r;
          const x1i = Math.cos(a1) * r,
            y1i = Math.sin(a1) * r;
          const large = 0;

          const path = `M ${x0o} ${y0o} A ${R} ${R} 0 ${large} 1 ${x1o} ${y1o} 
                        L ${x1i} ${y1i} A ${r} ${r} 0 ${large} 0 ${x0i} ${y0i} Z`;

          return <path key={`zone-${i}`} d={path} fill="currentColor" opacity="0.12" />;
        })}

        {/* Labels */}
        {ring.map(({ major, minor, i }) => {
          const angle = (i / ring.length) * 2 * Math.PI - Math.PI / 2;
          const xo = Math.cos(angle) * outerRadius;
          const yo = Math.sin(angle) * outerRadius;
          const xi = Math.cos(angle) * innerRadius;
          const yi = Math.sin(angle) * innerRadius;
          const active = isInZone(i);
          return (
            <g key={major}>
              <g transform={`translate(${xo}, ${yo})`} onClick={() => setCenterIndex(i)}>
                <circle
                  r="16"
                  fill="currentColor"
                  opacity={active ? 0.16 : 0.06}
                  stroke={active ? "currentColor" : "none"}
                  strokeWidth={active ? 2 : 0}
                  className={active ? "text-primary" : undefined}
                />
                <text x={0} y={5} textAnchor="middle" fontSize="14" className="fill-current">
                  {major}
                </text>
              </g>
              <g transform={`translate(${xi}, ${yi})`} onClick={() => setCenterIndex(i)}>
                <circle
                  r="12"
                  fill="currentColor"
                  opacity={active ? 0.14 : 0.05}
                  stroke={active ? "currentColor" : "none"}
                  strokeWidth={active ? 1.5 : 0}
                  className={active ? "text-primary" : undefined}
                />
                <text x={0} y={4} textAnchor="middle" fontSize="11" className="fill-current">
                  {minor}
                </text>
              </g>
            </g>
          );
        })}

        {/* Center label */}
        <text x="0" y="-4" textAnchor="middle" fontSize="12" opacity="0.7" className="fill-current text-secondary">
          Circle of Fifths
        </text>
        <text x="0" y="14" textAnchor="middle" fontSize="12" opacity="0.9" className="fill-current text-secondary">
          Center: {majors[centerIndex]} / {minors[centerIndex]}
        </text>
      </svg>
    </div>
  );
}

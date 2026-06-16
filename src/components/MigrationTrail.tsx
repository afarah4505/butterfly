"use client";

import { useEffect, useRef } from "react";

export default function MigrationTrail() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll("path");
    paths.forEach((path, idx) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      const animation = path.animate(
        [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
        {
          duration: 3000 + idx * 500,
          fill: "forwards",
          easing: "ease-in-out",
        }
      );

      const repeatAnimation = () => {
        animation.playbackRate = 1;
        animation.play();
      };

      setTimeout(repeatAnimation, 4000 + idx * 600);
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 600"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="trailGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 215, 100, 0.6)" />
          <stop offset="100%" stopColor="rgba(255, 143, 90, 0.2)" />
        </linearGradient>
        <linearGradient id="trailGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255, 159, 90, 0.6)" />
          <stop offset="100%" stopColor="rgba(255, 215, 100, 0.2)" />
        </linearGradient>
      </defs>

      <path
        d="M 100 500 Q 250 200, 400 400 T 800 100"
        stroke="url(#trailGrad1)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M 900 450 Q 700 150, 550 350 T 150 550"
        stroke="url(#trailGrad2)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M 200 150 Q 500 400, 700 200 Q 850 100, 950 450"
        stroke="url(#trailGrad1)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

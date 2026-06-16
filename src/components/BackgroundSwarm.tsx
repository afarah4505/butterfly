"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type BackgroundButterfly = {
  id: number;
  x: number;
  y: number;
  scale: number;
  duration: number;
  delay: number;
  size: number;
};

export default function BackgroundSwarm() {
  const butterflies = useMemo<BackgroundButterfly[]>(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      scale: 0.4 + Math.random() * 0.8,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
      size: 12 + Math.random() * 18,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden">
      {butterflies.map((bf) => (
        <motion.div
          key={bf.id}
          className="absolute text-amber-100/40"
          style={{
            left: `${bf.x}%`,
            top: `${bf.y}%`,
            fontSize: `${bf.size}px`,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, 40 - Math.random() * 80, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: bf.duration,
            delay: bf.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          BFLY
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SwarmMoment() {
  const [showSwarm, setShowSwarm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwarm(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const butterflies = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.8,
    duration: 2.5 + Math.random() * 1.5,
    x: Math.random() * 100 - 50,
    y: Math.random() * 60 + 20,
    size: 10 + Math.random() * 20,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-[8] overflow-hidden">
      {showSwarm &&
        butterflies.map((bf) => (
          <motion.div
            key={bf.id}
            className="absolute text-amber-200"
            initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0.3, 1, 0.5],
              x: [0, bf.x * 0.5, bf.x],
              y: [0, -bf.y * 0.3, -bf.y],
            }}
            transition={{
              duration: bf.duration,
              delay: bf.delay,
              ease: "easeOut",
            }}
            style={{
              left: "50%",
              top: "50%",
              fontSize: `${bf.size}px`,
              filter: `drop-shadow(0 0 ${bf.size * 0.5}px rgba(255, 215, 100, 0.8))`,
            }}
          >
            BFLY
          </motion.div>
        ))}
    </div>
  );
}

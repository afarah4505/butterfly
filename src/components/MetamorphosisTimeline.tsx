"use client";

import { motion } from "framer-motion";

type Stage = {
  label: string;
  emoji: string;
  description: string;
};

const stages: Stage[] = [
  {
    label: "Caterpillar",
    emoji: "🐛",
    description: "Small. Hungry. Crawling.",
  },
  {
    label: "Cocoon",
    emoji: "🫧",
    description: "Pressure. Silence. Transformation.",
  },
  {
    label: "Butterfly",
    emoji: "🦋",
    description: "Flight. Freedom. Swarm.",
  },
];

export default function MetamorphosisTimeline() {
  return (
    <div className="relative mt-12 flex items-center justify-center gap-2 sm:gap-6">
      {stages.map((stage, idx) => (
        <div key={stage.label} className="flex flex-col items-center">
          <motion.div
            className="rounded-full border-2 border-amber-200 bg-black/20 p-3 sm:p-4"
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <span className="text-2xl sm:text-4xl">{stage.emoji}</span>
          </motion.div>

          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-amber-100 sm:text-sm">
            {stage.label}
          </p>
          <p className="text-[10px] text-amber-100/70 sm:text-xs">{stage.description}</p>

          {idx < stages.length - 1 && (
            <motion.div
              className="absolute top-5 h-1 bg-gradient-to-r from-amber-300 to-orange-300 sm:top-7"
              style={{
                width: "calc(5rem + 2px)",
                left: `calc(50% + 2rem + ${idx * 8}px)`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.3 + 0.2 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

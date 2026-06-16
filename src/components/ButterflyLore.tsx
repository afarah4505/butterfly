"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function ButterflyLore() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const loreItems = [
    {
      phase: "The Egg",
      text: "A single transaction sparks life. One holder plants conviction in the digital soil.",
      color: "from-lime-300 to-green-500",
      icon: "🔆",
    },
    {
      phase: "The Caterpillar",
      text: "Hunger drives growth. Early believers consume chart data and build foundation. Slow, deliberate, unstoppable.",
      color: "from-emerald-400 to-teal-500",
      icon: "🌱",
    },
    {
      phase: "The Cocoon",
      text: "Community condenses into silence. Before flight comes transformation. Before triumph comes the pressure.",
      color: "from-amber-400 to-orange-500",
      icon: "✨",
    },
    {
      phase: "The Butterfly",
      text: "Wings unfold across screens. Millions watching. Thousands buying. One swarm. Every holder becomes part of something alive.",
      color: "from-purple-400 to-pink-500",
      icon: "🦋",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section ref={ref} className="relative z-20 py-24 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6">The Butterfly Lore</h2>
        <p className="text-lg text-amber-100/80 max-w-2xl mx-auto">
          Every metamorphosis tells a story. Here&apos;s yours.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
      >
        {loreItems.map((lore, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="group relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm hover:border-amber-400/50 transition-all duration-300"
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${lore.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

            {/* Content */}
            <div className="relative p-8 z-10">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{lore.icon}</span>
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${lore.color} bg-clip-text text-transparent`}>{lore.phase}</h3>
              </div>
              <p className="text-amber-100/90 leading-relaxed text-lg">{lore.text}</p>
            </div>

            {/* Hover glow */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              style={{
                background: `radial-gradient(circle at center, rgba(255, 200, 100, 0.1) 0%, transparent 70%)`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Cinematic quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center py-12 px-8 rounded-2xl border border-amber-400/30 bg-gradient-to-b from-amber-400/10 to-transparent backdrop-blur-sm"
      >
        <p className="text-2xl sm:text-3xl font-light text-white leading-relaxed">
          &quot;You&apos;re not buying a meme coin. You&apos;re becoming a butterfly. <br />
          <span className="text-amber-300 font-semibold">And butterflies don&apos;t ask permission to take flight.&quot;</span>
        </p>
      </motion.div>
    </section>
  );
}

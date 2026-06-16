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
    <section ref={ref} className="relative z-20 px-2 py-10 sm:px-4 sm:py-20 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center sm:mb-16"
      >
        <h2 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-6xl">The Butterfly Lore</h2>
        <p className="mx-auto max-w-2xl text-base text-amber-100/90 sm:text-lg">
          Every metamorphosis tells a story. Here&apos;s yours.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-10 grid grid-cols-1 gap-4 sm:mb-16 sm:gap-8 md:grid-cols-2"
      >
        {loreItems.map((lore, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="group relative overflow-hidden rounded-2xl border border-white/20 bg-black/35 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/50"
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${lore.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

            {/* Content */}
            <div className="relative z-10 p-5 sm:p-8">
              <div className="mb-3 flex items-center gap-3 sm:mb-4 sm:gap-4">
                <span className="text-3xl sm:text-4xl">{lore.icon}</span>
                <h3 className={`text-xl font-bold sm:text-2xl bg-gradient-to-r ${lore.color} bg-clip-text text-transparent`}>{lore.phase}</h3>
              </div>
              <p className="text-base leading-relaxed text-amber-100/95 sm:text-lg">{lore.text}</p>
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
        className="rounded-2xl border border-amber-300/35 bg-gradient-to-b from-amber-400/14 to-transparent px-5 py-8 text-center backdrop-blur-sm sm:px-8 sm:py-12"
      >
        <p className="text-xl font-light leading-relaxed text-white sm:text-3xl">
          &quot;You&apos;re not buying a meme coin. You&apos;re becoming a butterfly. <br />
          <span className="text-amber-300 font-semibold">And butterflies don&apos;t ask permission to take flight.&quot;</span>
        </p>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function ShareMoment() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hoveredMoment, setHoveredMoment] = useState<number | null>(null);

  const moments = [
    {
      id: 1,
      title: "The Ascension",
      description: "Butterfly emerges from cocoon in real-time",
      stat: "3,500+ screenshots",
      gradient: "from-orange-400 via-pink-500 to-purple-600",
      emoji: "🚀",
    },
    {
      id: 2,
      title: "The Swarm",
      description: "Hover triggers 100 butterflies to converge",
      stat: "8,200+ shares",
      gradient: "from-cyan-400 via-blue-500 to-purple-600",
      emoji: "🌪️",
    },
    {
      id: 3,
      title: "The Crown",
      description: "Glowing halo crowns your portfolio success",
      stat: "12,400+ likes",
      gradient: "from-yellow-400 via-orange-500 to-red-600",
      emoji: "👑",
    },
    {
      id: 4,
      title: "The Metamorphosis",
      description: "Watch your investment transform in real-time",
      stat: "Priceless moment",
      gradient: "from-lime-400 via-emerald-500 to-teal-600",
      emoji: "✨",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <section ref={ref} className="relative z-20 max-w-7xl mx-auto px-2 py-10 sm:px-4 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center sm:mb-16"
      >
        <h2 className="mb-4 bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 bg-clip-text text-3xl font-bold text-transparent sm:mb-6 sm:text-6xl">
          Screenshot Moments
        </h2>
        <p className="mx-auto max-w-2xl text-base text-amber-100/90 sm:text-lg">
          These are the moments your community wants to share on X. These are the moments that go viral.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-10 grid grid-cols-1 gap-4 sm:mb-16 sm:gap-6 md:grid-cols-2"
      >
        {moments.map((moment) => (
          <motion.div
            key={moment.id}
            variants={item}
            onMouseEnter={() => setHoveredMoment(moment.id)}
            onMouseLeave={() => setHoveredMoment(null)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-black/35 backdrop-blur-sm transition-all duration-300 hover:border-white/30"
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${moment.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col p-5 sm:p-8">
              <div className="mb-4 flex items-start justify-between">
                <span className="text-4xl sm:text-5xl">{moment.emoji}</span>
                <motion.div
                  animate={hoveredMoment === moment.id ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                  className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm"
                >
                  <p className="text-xs font-semibold text-amber-300">{moment.stat}</p>
                </motion.div>
              </div>

              <h3 className={`mb-2 bg-gradient-to-r ${moment.gradient} bg-clip-text text-xl font-bold text-transparent sm:text-2xl`}>
                {moment.title}
              </h3>
              <p className="flex-grow leading-relaxed text-amber-100/92">{moment.description}</p>

              {/* CTA on hover */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={hoveredMoment === moment.id ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-6 pt-4 border-t border-white/10"
              >
                <p className="text-sm text-amber-300 font-semibold">✦ Ready to capture this moment</p>
              </motion.div>
            </div>

            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, rgba(255, 200, 100, 0.05) 0%, transparent 70%)`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Viral moment builder */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="rounded-2xl border-2 border-dashed border-amber-400/40 bg-gradient-to-b from-amber-400/8 to-transparent p-6 text-center sm:p-12"
      >
        <h3 className="mb-4 text-2xl font-bold text-white">Your Share, Your Way</h3>
        <p className="mx-auto mb-8 max-w-2xl text-amber-100/90">
          The butterfly adapts to every moment. Hover over it. Watch it respond. Screenshot it. Share it. Let your community see the magic.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold transition hover:shadow-lg hover:shadow-amber-400/50"
        >
          🦋 Ready to Share
        </motion.button>
      </motion.div>
    </section>
  );
}

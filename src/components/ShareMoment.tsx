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
    <section ref={ref} className="relative z-20 py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 bg-clip-text text-transparent mb-6">
          Screenshot Moments
        </h2>
        <p className="text-lg text-amber-100/80 max-w-2xl mx-auto">
          These are the moments your community wants to share on X. These are the moments that go viral.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
      >
        {moments.map((moment) => (
          <motion.div
            key={moment.id}
            variants={item}
            onMouseEnter={() => setHoveredMoment(moment.id)}
            onMouseLeave={() => setHoveredMoment(null)}
            className="group relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-300 cursor-pointer"
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${moment.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

            {/* Content */}
            <div className="relative p-8 z-10 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl">{moment.emoji}</span>
                <motion.div
                  animate={hoveredMoment === moment.id ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                  className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm"
                >
                  <p className="text-xs font-semibold text-amber-300">{moment.stat}</p>
                </motion.div>
              </div>

              <h3 className={`text-2xl font-bold bg-gradient-to-r ${moment.gradient} bg-clip-text text-transparent mb-2`}>
                {moment.title}
              </h3>
              <p className="text-amber-100/80 leading-relaxed flex-grow">{moment.description}</p>

              {/* CTA on hover */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={hoveredMoment === moment.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
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
        className="rounded-2xl border-2 border-dashed border-amber-400/40 bg-gradient-to-b from-amber-400/5 to-transparent p-12 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-4">Your Share, Your Way</h3>
        <p className="text-amber-100/80 mb-8 max-w-2xl mx-auto">
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

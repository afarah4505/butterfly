"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Stage = {
  icon: string;
  title: string;
  line: string;
  quote: string;
};

const stages: Stage[] = [
  {
    icon: "🐛",
    title: "Caterpillar",
    line: "Still crawling through red candles.",
    quote: "Everyone starts here.",
  },
  {
    icon: "🥚",
    title: "Cocoon",
    line: "Silent. Hidden. Loading transformation.",
    quote: "The cocoon was bullish.",
  },
  {
    icon: "🦋",
    title: "Butterfly",
    line: "You stopped chasing. You started flying.",
    quote: "Not everyone gets wings.",
  },
  {
    icon: "👑",
    title: "Migration Leader",
    line: "You do not follow the swarm. You move it.",
    quote: "Migration season starts with you.",
  },
];

const messages = [
  "Paper hands detected.",
  "Wings loading...",
  "The cocoon was bullish.",
  "Butterfly spotted.",
  "Migration season approaching.",
  "Wen wings?",
];

export default function Home() {
  const [selected, setSelected] = useState<Stage | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
      })),
    []
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030711] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_10%,rgba(255,187,84,0.25),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(57,255,188,0.12),transparent_25%),linear-gradient(180deg,#030711,#07131c_45%,#02040a)]" />

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none fixed z-0 h-1.5 w-1.5 rounded-full bg-amber-200/70 shadow-[0_0_18px_rgba(251,191,36,0.9)]"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
          animate={{ y: [-20, -120], opacity: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <MigrationToast text={messages[messageIndex]} />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="#hero" className="text-lg font-black tracking-[0.28em]">
            BFLY
          </a>

          <div className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.22em] text-white/70 md:flex">
            <a href="#spotted" className="hover:text-amber-200">
              Spotted
            </a>
            <a href="#stage" className="hover:text-amber-200">
              Stage
            </a>
            <a href="#cocoon" className="hover:text-amber-200">
              Cocoon
            </a>
            <a href="#swarm" className="hover:text-amber-200">
              Swarm
            </a>
          </div>

          <a
            href="#swarm"
            className="rounded-full border border-amber-300/50 bg-amber-300 px-4 py-2 text-xs font-black uppercase tracking-widest text-black shadow-[0_0_24px_rgba(251,191,36,0.35)]"
          >
            Join
          </a>
        </nav>
      </header>

      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-24 pt-32 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-amber-300/30 blur-[90px]" />
          <div className="relative text-[8rem] leading-none md:text-[14rem]">
            🦋
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-xs font-black uppercase tracking-[0.38em] text-amber-200"
        >
          The Butterfly Has Been Spotted
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-5 max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-tight md:text-8xl"
        >
          Not Everyone
          <br />
          Gets Wings.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 max-w-xl text-lg font-medium text-white/85 md:text-xl"
        >
          Every trader starts as a caterpillar. A few survive the cocoon.
          Welcome to the Butterfly Effect.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#stage"
            className="rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-widest text-black"
          >
            Begin Migration
          </a>
          <a
            href="#swarm"
            className="rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-black uppercase tracking-widest text-white backdrop-blur"
          >
            Join The Swarm
          </a>
        </motion.div>

        <p className="absolute bottom-8 text-3xl">🐛 → 🥚 → ⚡ → 🦋</p>
      </section>

      <section
        id="spotted"
        className="relative min-h-screen px-4 py-32 md:py-40"
      >
        <div className="mx-auto max-w-6xl">
          {["Dogs bark.", "Cats meow.", "Frogs croak.", "Butterflies migrate."].map(
            (line, index) => (
              <motion.h2
                key={line}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
                className="mb-6 text-5xl font-black uppercase leading-none tracking-tight md:text-8xl"
              >
                {line}
              </motion.h2>
            )
          )}
        </div>
      </section>

      <section
        id="stage"
        className="relative min-h-screen px-4 py-32 md:py-40"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-200">
            Migration Test
          </p>
          <h2 className="mt-4 text-5xl font-black uppercase leading-none md:text-7xl">
            What Stage
            <br />
            Are You?
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {stages.map((stage) => (
              <button
                key={stage.title}
                onClick={() => setSelected(stage)}
                className="group rounded-[2rem] border border-white/15 bg-white/[0.08] p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:border-amber-300/60 hover:bg-amber-300/10"
              >
                <div className="text-5xl">{stage.icon}</div>
                <h3 className="mt-5 text-2xl font-black">{stage.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-white/80">
                  {stage.line}
                </p>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.96 }}
                className="mt-10 rounded-[2rem] border border-amber-300/30 bg-black/60 p-7 shadow-[0_0_60px_rgba(251,191,36,0.16)] backdrop-blur-xl"
              >
                <p className="text-6xl">{selected.icon}</p>
                <h3 className="mt-4 text-4xl font-black uppercase">
                  {selected.title}
                </h3>
                <p className="mt-3 text-xl text-amber-100">
                  {selected.quote}
                </p>
                <p className="mt-5 text-white/80">
                  Screenshot this. Post it. Let them know your wings are
                  loading.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section
        id="cocoon"
        className="relative flex min-h-screen items-center px-4 py-32 md:py-40"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-200">
              The Cocoon
            </p>
            <h2 className="mt-4 text-5xl font-black uppercase leading-none md:text-7xl">
              They Thought
              <br />
              We Vanished.
            </h2>
            <p className="mt-6 text-xl font-medium text-white/85">
              We were not dead. We were not quiet. We were transforming.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative mx-auto flex h-80 w-64 items-center justify-center rounded-full bg-gradient-to-b from-amber-200/30 to-orange-900/20 shadow-[0_0_100px_rgba(251,191,36,0.25)]"
          >
            <div className="absolute h-64 w-36 rounded-full border border-amber-100/30 bg-gradient-to-b from-amber-100/35 to-black/50" />
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute h-56 w-1 rotate-12 bg-amber-100/80"
            />
            <motion.div
              animate={{ scale: [0.7, 1.2, 0.7], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl"
            >
              🦋
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        id="swarm"
        className="relative min-h-screen px-4 py-32 text-center md:py-40"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-7xl">🐛 → 🦋</p>
          <h2 className="mt-8 text-5xl font-black uppercase leading-none md:text-8xl">
            You Don&apos;t Buy BFLY.
            <br />
            You Become It.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              ["🦋", "Wings Earned"],
              ["🌸", "Flowers Planted"],
              ["🌎", "Territories Reached"],
              ["⚡", "Transformations"],
            ].map(([icon, label]) => (
              <div
                key={label}
                className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-6 backdrop-blur"
              >
                <div className="text-4xl">{icon}</div>
                <p className="mt-4 text-sm font-black uppercase tracking-widest text-white/80">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://x.com"
              className="rounded-full bg-amber-300 px-8 py-4 text-sm font-black uppercase tracking-widest text-black"
            >
              Join X
            </a>
            <button className="rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-black uppercase tracking-widest text-white backdrop-blur">
              Plant Your Flower
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function MigrationToast({ text }: { text: string }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-full border border-white/15 bg-black/70 px-5 py-3 text-center text-sm font-bold text-amber-100 shadow-2xl backdrop-blur-xl md:bottom-auto md:left-auto md:right-5 md:top-24 md:translate-x-0">
      🦋 {text}
    </div>
  );
}

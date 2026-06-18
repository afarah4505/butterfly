"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BUTTERFLY_IMAGE = "/images/butterfly-hero.png";

const stages = [
  {
    icon: "🐛",
    title: "Caterpillar",
    line: "Still crawling through red candles.",
    quote: "Everyone starts here.",
    result: "Fresh Caterpillar",
  },
  {
    icon: "🥚",
    title: "Cocoon",
    line: "Silent. Hidden. Loading transformation.",
    quote: "The cocoon was bullish.",
    result: "Cocoon Dweller",
  },
  {
    icon: "🦋",
    title: "Butterfly",
    line: "You stopped chasing. You started flying.",
    quote: "Not everyone gets wings.",
    result: "Emerging Butterfly",
  },
  {
    icon: "👑",
    title: "Migration Leader",
    line: "You do not follow the swarm. You move it.",
    quote: "Migration season starts with you.",
    result: "Migration Leader",
  },
];

const messages = [
  "Paper hands detected.",
  "Wings loading...",
  "The cocoon was bullish.",
  "Butterfly spotted.",
  "Migration season approaching.",
  "Wen wings?",
  "Swarm detected.",
  "You are being watched by butterflies.",
];

const phases = [
  "Forest Floor",
  "Cocoon",
  "Swarm Formation",
  "Migration Season",
  "Butterfly Spotted",
  "Wings Growing",
];

type Stage = (typeof stages)[number];

type Particle = {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
};

type SwarmButterfly = {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  rotate: number;
  scale: number;
  duration: number;
};

export default function Home() {
  const [selected, setSelected] = useState<Stage | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [swarm, setSwarm] = useState(false);
  const [swarmButterflies, setSwarmButterflies] = useState<SwarmButterfly[]>([]);

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
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

  useEffect(() => {
    const timer = setInterval(() => {
      setPhaseIndex((current) => (current + 1) % phases.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const triggerSwarm = () => {
    if (typeof window === "undefined") return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    setSwarmButterflies(
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        startX: centerX + (Math.random() * 120 - 60),
        startY: centerY + (Math.random() * 120 - 60),
        endX: Math.random() * window.innerWidth,
        endY: Math.random() * window.innerHeight,
        rotate: Math.random() * 720 - 360,
        scale: 0.7 + Math.random() * 1.2,
        duration: 1.4 + Math.random() * 1.2,
      }))
    );

    setSwarm(true);
    window.setTimeout(() => setSwarm(false), 2600);
  };

  const handleButterflyClick = () => {
    const next = clicks + 1;
    setClicks(next);

    if (next >= 7) {
      setClicks(0);
      triggerSwarm();
    }
  };

  const shareText = selected
    ? `🐛 → 🦋\n\nI'm a ${selected.result}.\n\n${selected.quote}\n\n#BFLY`
    : "🐛 → 🦋\n\nNot everyone gets wings.\n\n#BFLY";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030711] text-white selection:bg-cyan-300 selection:text-black">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_12%,rgba(34,211,238,0.28),transparent_26%),radial-gradient(circle_at_18%_78%,rgba(57,255,188,0.12),transparent_25%),radial-gradient(circle_at_80%_76%,rgba(251,191,36,0.12),transparent_25%),linear-gradient(180deg,#02030a,#07131c_48%,#02040a)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none fixed z-0 h-1.5 w-1.5 rounded-full bg-cyan-200/70 shadow-[0_0_18px_rgba(34,211,238,0.9)]"
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
      <MigrationStatus phase={phases[phaseIndex]} />

      <AnimatePresence>{swarm && <SwarmEvent butterflies={swarmButterflies} />}</AnimatePresence>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="#hero" className="text-lg font-black tracking-[0.28em]">
            BFLY
          </a>

          <div className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.22em] text-white/75 md:flex">
            <a href="#spotted" className="hover:text-cyan-200">
              Spotted
            </a>
            <a href="#stage" className="hover:text-cyan-200">
              Stage
            </a>
            <a href="#cocoon" className="hover:text-cyan-200">
              Cocoon
            </a>
            <a href="#swarm" className="hover:text-cyan-200">
              Swarm
            </a>
          </div>

          <a
            href="#swarm"
            className="rounded-full border border-cyan-300/50 bg-cyan-300 px-4 py-2 text-xs font-black uppercase tracking-widest text-black shadow-[0_0_24px_rgba(34,211,238,0.35)]"
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
          <div className="absolute inset-0 rounded-full bg-cyan-300/30 blur-[110px]" />
          <motion.button
            type="button"
            onClick={handleButterflyClick}
            aria-label="Release the butterfly swarm"
            animate={{
              y: [-10, 10, -10],
              rotate: [-2, 2, -2],
              scale: [1, 1.035, 1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative block cursor-pointer outline-none"
          >
            <img
              src={BUTTERFLY_IMAGE}
              alt="BFLY butterfly"
              className="relative w-[250px] select-none drop-shadow-[0_0_70px_rgba(34,211,238,0.75)] md:w-[430px]"
              draggable={false}
            />
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-xs font-black uppercase tracking-[0.38em] text-cyan-200"
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

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mt-7"
        >
          <p className="text-2xl md:text-3xl">🐛 → 🦋</p>
          <p className="mt-3 text-lg font-semibold text-white/85 md:text-xl">
            Some chase pumps.
            <br />
            Some earn wings.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-6 max-w-xl text-lg font-medium text-white/85 md:text-xl"
        >
          Every trader starts as a caterpillar. A few survive the cocoon.
          Welcome to the Butterfly Effect.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
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

      <section id="spotted" className="relative min-h-screen px-4 py-32 md:py-40">
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

      <section id="stage" className="relative min-h-screen px-4 py-32 md:py-40">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-200">
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
                className="group rounded-[2rem] border border-white/15 bg-black/50 p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-cyan-300/10"
              >
                <div className="text-5xl">{stage.icon}</div>
                <h3 className="mt-5 text-2xl font-black">{stage.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-white/85">
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
                className="mt-10 rounded-[2rem] border border-cyan-300/30 bg-black/70 p-7 shadow-[0_0_60px_rgba(34,211,238,0.18)] backdrop-blur-xl"
              >
                <p className="text-6xl">{selected.icon}</p>
                <h3 className="mt-4 text-4xl font-black uppercase">{selected.result}</h3>
                <p className="mt-3 text-xl text-cyan-100">{selected.quote}</p>
                <p className="mt-5 text-white/85">
                  You survived rugs. You survived red candles. You survived yourself.
                  Wings loading...
                </p>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex rounded-full bg-cyan-300 px-6 py-3 text-sm font-black uppercase tracking-widest text-black"
                >
                  Share on X
                </a>
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
            <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-200">
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
            className="relative mx-auto flex h-80 w-64 items-center justify-center rounded-full bg-gradient-to-b from-cyan-200/25 to-blue-950/30 shadow-[0_0_100px_rgba(34,211,238,0.25)]"
          >
            <div className="absolute h-64 w-36 rounded-full border border-cyan-100/30 bg-gradient-to-b from-cyan-100/25 to-black/55" />
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute h-56 w-1 rotate-12 bg-cyan-100/80"
            />
            <motion.img
              src={BUTTERFLY_IMAGE}
              alt="Butterfly emerging from cocoon"
              animate={{ scale: [0.7, 1.05, 0.7], opacity: [0, 1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="relative w-28 drop-shadow-[0_0_45px_rgba(34,211,238,0.75)]"
              draggable={false}
            />
          </motion.div>
        </div>
      </section>

      <section id="swarm" className="relative min-h-screen px-4 py-32 text-center md:py-40">
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
                className="rounded-[2rem] border border-white/15 bg-black/50 p-6 backdrop-blur"
              >
                <div className="text-4xl">{icon}</div>
                <p className="mt-4 text-sm font-black uppercase tracking-widest text-white/85">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://x.com"
              className="rounded-full bg-cyan-300 px-8 py-4 text-sm font-black uppercase tracking-widest text-black"
            >
              Join X
            </a>
            <button
              type="button"
              onClick={triggerSwarm}
              className="rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-black uppercase tracking-widest text-white backdrop-blur"
            >
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
    <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-full border border-white/15 bg-black/75 px-5 py-3 text-center text-sm font-bold text-cyan-100 shadow-2xl backdrop-blur-xl md:bottom-auto md:left-auto md:right-5 md:top-24 md:translate-x-0">
      🦋 {text}
    </div>
  );
}

function MigrationStatus({ phase }: { phase: string }) {
  return (
    <div className="fixed bottom-5 left-5 z-40 hidden rounded-3xl border border-white/15 bg-black/65 p-5 shadow-2xl backdrop-blur-xl md:block">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">
        Migration Status
      </p>
      <p className="mt-3 font-bold text-white">🦋 Wings Growing...</p>
      <div className="mt-3 h-2 w-44 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-cyan-300"
          animate={{ width: ["35%", "80%", "60%", "90%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <p className="mt-4 text-sm text-white/75">Current Phase:</p>
      <p className="font-black text-cyan-100">{phase}</p>
    </div>
  );
}

function SwarmEvent({ butterflies }: { butterflies: SwarmButterfly[] }) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[999] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: -20, x: "-50%" }}
        className="absolute left-1/2 top-10 rounded-full border border-cyan-300/30 bg-black/80 px-8 py-4 text-center text-sm font-black uppercase tracking-widest text-cyan-100 backdrop-blur-xl md:text-base"
      >
        🦋 The Swarm Has Arrived
      </motion.div>

      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute text-2xl md:text-3xl"
          initial={{ x: b.startX, y: b.startY, opacity: 1, scale: 0.4 }}
          animate={{ x: b.endX, y: b.endY, opacity: 0, rotate: b.rotate, scale: b.scale }}
          transition={{ duration: b.duration, ease: "easeOut" }}
        >
          🦋
        </motion.div>
      ))}
    </motion.div>
  );
}

"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import ThreeBackdrop from "@/components/ThreeBackdrop";

gsap.registerPlugin(ScrollTrigger);

type Stage = "Caterpillar" | "Cocoon" | "Butterfly" | "Migration Leader";

type ResultCard = {
  icon: string;
  title: Stage;
  line: string;
  arc: string;
  quote: string;
};

const CONTRACT_ADDRESS = "0xBFLYBFLYBFLYBFLYBFLYBFLYBFLYBFLYBFLY";

const randomMessages = [
  "Paper hands detected.",
  "Migration season approaching.",
  "The cocoon was bullish.",
  "Butterfly spotted.",
  "Wen wings?",
];

const statusMessages = [
  "Wings Growing...",
  "Cocoon Holding...",
  "Transformation Active...",
  "Migration Season...",
];

const dramaticLines = ["Dogs bark.", "Cats meow.", "Frogs croak.", "Butterflies migrate."];

const stageCards: Record<Stage, ResultCard> = {
  Caterpillar: {
    icon: "🐛",
    title: "Caterpillar",
    line: "Still crawling through fear candles.",
    arc: "Forest Floor Arc",
    quote: "Not everyone gets wings.",
  },
  Cocoon: {
    icon: "🥚",
    title: "Cocoon",
    line: "Silent. Hidden. Loading transformation.",
    arc: "Cocoon Chamber Arc",
    quote: "The cocoon was bullish.",
  },
  Butterfly: {
    icon: "🦋",
    title: "Butterfly",
    line: "You stopped chasing. You started flying.",
    arc: "First Flight Arc",
    quote: "Wen wings? Right now.",
  },
  "Migration Leader": {
    icon: "👑",
    title: "Migration Leader",
    line: "Timeline commander. Migration signal source.",
    arc: "Migration Season Arc",
    quote: "Butterfly spotted.",
  },
};

const swarmActions = [
  { label: "Join The Swarm", wings: 640, transforms: 2 },
  { label: "Grow Wings", wings: 920, transforms: 3 },
  { label: "Begin Migration", wings: 1400, transforms: 4 },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [nightMix, setNightMix] = useState(0.1);
  const [isPhone, setIsPhone] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const [showHeroEvent, setShowHeroEvent] = useState(false);
  const [easterEgg, setEasterEgg] = useState(randomMessages[0]);
  const [showEgg, setShowEgg] = useState(false);

  const [statusIndex, setStatusIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState(statusMessages[0]);
  const [statusBar, setStatusBar] = useState(82);

  const [selectedStage, setSelectedStage] = useState<Stage>("Cocoon");
  const [resultCard, setResultCard] = useState<ResultCard | null>(null);

  const [wingsEarned, setWingsEarned] = useState(12841);
  const [flowersPlanted, setFlowersPlanted] = useState(4112);
  const [territoriesReached, setTerritoriesReached] = useState(73);
  const [transformationsCompleted, setTransformationsCompleted] = useState(8927);

  const shouldReduceEffects = isPhone || prefersReducedMotion;

  const pollenSprites = useMemo(
    () =>
      Array.from({ length: shouldReduceEffects ? 10 : 24 }, (_, idx) => ({
        id: idx,
        left: Math.random() * 100,
        top: 58 + Math.random() * 38,
        duration: 6 + Math.random() * 6,
        delay: idx * -0.7,
      })),
    [shouldReduceEffects]
  );

  const petalSprites = useMemo(
    () =>
      Array.from({ length: shouldReduceEffects ? 8 : 18 }, (_, idx) => ({
        id: idx,
        left: 2 + Math.random() * 96,
        duration: 9 + Math.random() * 9,
        delay: idx * -1.2,
      })),
    [shouldReduceEffects]
  );

  const fireflies = useMemo(
    () =>
      Array.from({ length: shouldReduceEffects ? 10 : 26 }, (_, idx) => ({
        id: idx,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 5,
        delay: idx * -0.45,
      })),
    [shouldReduceEffects]
  );

  const skyButterflies = useMemo(
    () =>
      Array.from({ length: shouldReduceEffects ? 3 : 8 }, (_, idx) => ({
        id: idx,
        top: 8 + Math.random() * 62,
        duration: 16 + Math.random() * 18,
        delay: idx * -4.5,
      })),
    [shouldReduceEffects]
  );

  useEffect(() => {
    const phoneQuery = window.matchMedia("(max-width: 767px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyPreferences = () => {
      setIsPhone(phoneQuery.matches);
      setPrefersReducedMotion(reducedMotionQuery.matches);
    };

    applyPreferences();
    phoneQuery.addEventListener("change", applyPreferences);
    reducedMotionQuery.addEventListener("change", applyPreferences);

    return () => {
      phoneQuery.removeEventListener("change", applyPreferences);
      reducedMotionQuery.removeEventListener("change", applyPreferences);
    };
  }, []);

  useEffect(() => {
    const intro = window.setTimeout(() => {
      setShowHeroEvent(true);
      setShowEgg(true);
      setEasterEgg("Butterfly spotted.");
      window.setTimeout(() => setShowEgg(false), 2500);
    }, 1100);
    return () => window.clearTimeout(intro);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const nextStatus = (statusIndex + 1) % statusMessages.length;
      const nextBar = 62 + Math.floor(Math.random() * 35);
      const nextEgg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      setStatusIndex(nextStatus);
      setStatusMessage(statusMessages[nextStatus]);
      setStatusBar(nextBar);
      setEasterEgg(nextEgg);
      setShowEgg(true);
      window.setTimeout(() => setShowEgg(false), 2300);
    }, 9000);

    return () => window.clearInterval(timer);
  }, [statusIndex]);

  useEffect(() => {
    if (shouldReduceEffects) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.02,
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.05,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [shouldReduceEffects]);

  useEffect(() => {
    if (shouldReduceEffects) {
      return;
    }

    const sections = gsap.utils.toArray<HTMLElement>(".story-panel");
    const drifts = gsap.utils.toArray<HTMLElement>("[data-drift]");

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0.25, y: 70 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.35,
          },
        }
      );
    });

    drifts.forEach((node) => {
      const amount = Number(node.dataset.drift ?? 12);
      gsap.fromTo(
        node,
        { yPercent: amount * -0.35 },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: node.closest("section") ?? node,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [shouldReduceEffects]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60;
    const circadian = (Math.sin((hour / 24) * Math.PI * 2 - Math.PI / 2) + 1) / 2;
    const blend = Math.min(1, Math.max(0, 0.38 * value + (1 - circadian) * 0.62));
    setNightMix(blend);
    document.documentElement.style.setProperty("--blend", blend.toFixed(3));
  });

  const runSwarmAction = (action: (typeof swarmActions)[number]) => {
    setWingsEarned((v) => v + action.wings);
    setTransformationsCompleted((v) => v + action.transforms);
    setFlowersPlanted((v) => v + Math.floor(action.wings / 20));
    setTerritoriesReached((v) => v + 1);
  };

  const revealCard = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const card = stageCards[selectedStage];
    setResultCard(card);
    setWingsEarned((v) => v + 555);
    setTransformationsCompleted((v) => v + 3);
  };

  const copyResultForX = async () => {
    if (!resultCard) {
      return;
    }

    const text = `I am ${resultCard.icon} ${resultCard.title} in the BFLY metamorphosis. ${resultCard.line} ${resultCard.quote} #BFLY`;
    try {
      await navigator.clipboard.writeText(text);
      setEasterEgg("Migration season approaching.");
      setShowEgg(true);
      window.setTimeout(() => setShowEgg(false), 2000);
    } catch {
      setEasterEgg("Paper hands detected.");
      setShowEgg(true);
      window.setTimeout(() => setShowEgg(false), 2000);
    }
  };

  const copyContractAddress = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setEasterEgg("Contract copied. Wings loading...");
      setShowEgg(true);
      window.setTimeout(() => setShowEgg(false), 2000);
    } catch {
      setEasterEgg("Paper hands detected.");
      setShowEgg(true);
      window.setTimeout(() => setShowEgg(false), 2000);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <ThreeBackdrop nightMix={nightMix} reduceEffects={shouldReduceEffects} />
      <div className="sun-rays" />
      <div className="mist-overlay" />

      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
        {pollenSprites.map((item) => (
          <span
            key={`p-${item.id}`}
            className="pollen-drift"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          />
        ))}

        {petalSprites.map((item) => (
          <span
            key={`pt-${item.id}`}
            className="petal"
            style={{
              left: `${item.left}%`,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          />
        ))}

        {fireflies.map((item) => (
          <motion.span
            key={`f-${item.id}`}
            className="firefly"
            style={{ left: `${item.left}%`, top: `${item.top}%` }}
            animate={
              shouldReduceEffects
                ? { opacity: 0.55, scale: 1 }
                : { opacity: [0.1, 0.95, 0.2], scale: [0.7, 1.15, 0.85], y: [0, -10, 0] }
            }
            transition={
              shouldReduceEffects
                ? { duration: 0.2 }
                : { duration: item.duration, repeat: Infinity, ease: "easeInOut", delay: item.delay }
            }
          />
        ))}

        {skyButterflies.map((item) => (
          <motion.span
            key={`b-${item.id}`}
            className="sky-butterfly text-lg"
            style={{ top: `${item.top}%` }}
            animate={
              shouldReduceEffects
                ? { opacity: 0.2, x: 0 }
                : { x: ["-10vw", "110vw"], opacity: [0, 0.75, 0.2, 0] }
            }
            transition={
              shouldReduceEffects
                ? { duration: 0.2 }
                : { duration: item.duration, repeat: Infinity, ease: "linear", delay: item.delay }
            }
          >
            🦋
          </motion.span>
        ))}
      </div>

      <div className="forest-parallax fixed inset-0 z-[0]">
        <div className="forest-layer layer-1" />
        <div className="forest-layer layer-2" />
        <div className="forest-layer layer-3" />
      </div>

      <motion.div
        className="fixed left-0 top-0 z-[40] h-1 bg-gradient-to-r from-amber-300 via-orange-300 to-cyan-300"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: showEgg ? 1 : 0, y: showEgg ? 0 : -14 }}
        className="fixed right-3 top-4 z-[45] max-w-[72vw] rounded-full border border-amber-100/40 bg-black/65 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-amber-100 backdrop-blur-xl sm:right-5 sm:top-6 sm:max-w-none sm:px-4 sm:text-xs"
      >
        {easterEgg}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="status-widget fixed bottom-20 left-3 z-[44] w-[188px] rounded-2xl border border-white/22 bg-black/65 p-3 backdrop-blur-xl sm:bottom-6 sm:left-auto sm:right-5 sm:w-[220px]"
      >
        <p className="text-[10px] uppercase tracking-[0.22em] text-amber-100/86">🦋 Migration Season</p>
        <p className="mt-2 text-sm font-semibold text-white/96">Wings Growing...</p>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full border border-white/25 bg-black/50">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-300 via-orange-300 to-cyan-300"
            animate={{ width: `${statusBar}%` }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </div>
        <p className="mt-2 text-[11px] text-amber-100/84">{randomMessages[statusIndex]}</p>
      </motion.div>

      <section id="home" className="relative z-10 min-h-screen overflow-hidden px-4 pb-12 pt-4 sm:px-8 sm:pb-16 sm:pt-6 lg:px-12">
        <div className="absolute inset-0 bg-[#050b10]" />

        <div className="relative z-20 mx-auto flex min-h-[90svh] max-w-7xl flex-col">
          <nav className="mb-6 flex items-center justify-between rounded-full border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-xl sm:mb-8">
            <a href="#home" className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-100 sm:text-xs sm:tracking-[0.3em]">
              BFLY Metamorphosis
            </a>
            <div className="hidden items-center gap-5 text-[11px] uppercase tracking-[0.22em] text-amber-50/75 md:flex">
              <a href="#line-theater" className="transition hover:text-amber-100">Ritual</a>
              <a href="#stage-test" className="transition hover:text-amber-100">Stage</a>
              <a href="#migration-widget" className="transition hover:text-amber-100">Status</a>
              <a href="#cocoon" className="transition hover:text-amber-100">Cocoon</a>
              <a href="#swarm" className="transition hover:text-amber-100">Swarm</a>
            </div>
          </nav>

          <div className="grid flex-1 items-center gap-10 lg:grid-cols-[0.95fr,1.05fr]">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-200/90 sm:text-xs">🐛 → 🥚 → ⚡ → 🦋</p>
              <h1 className="mt-4 text-5xl font-bold leading-[0.88] text-white sm:mt-6 sm:text-7xl lg:text-[6.1rem]">
                THE BUTTERFLY
                <br />
                HAS BEEN SPOTTED.
              </h1>
              <p className="mt-4 text-xl text-amber-50/92 sm:mt-5 sm:text-2xl">Not everyone gets wings.</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button onClick={() => runSwarmAction(swarmActions[0])} className="action-pill bg-gradient-to-r from-amber-300 to-orange-400 text-black">
                  JOIN THE SWARM
                </button>
                <button onClick={() => runSwarmAction(swarmActions[2])} className="action-pill border border-white/25 bg-black/45 text-amber-50">
                  BEGIN MIGRATION
                </button>
              </div>

              <div className="mt-5 rounded-[1.35rem] border border-white/20 bg-black/60 p-4 backdrop-blur-xl sm:p-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-amber-100/88 sm:text-xs">Contract Address</p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <code className="min-w-0 flex-1 overflow-x-auto rounded-xl bg-black/65 px-3 py-3 font-mono text-xs text-amber-100/98 sm:text-sm">
                    {CONTRACT_ADDRESS}
                  </code>
                  <button onClick={copyContractAddress} className="action-pill shrink-0 border border-white/30 bg-white/10 text-amber-100">
                    Copy CA
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: showHeroEvent ? 1 : 0.15, scale: showHeroEvent ? 1 : 0.92 }}
              transition={{ duration: 1.2 }}
              className="relative min-h-[52svh] overflow-hidden rounded-[2rem] sm:min-h-[62svh]"
            >
              <div className="butterfly-moon" data-drift="16">
                <div className="butterfly-moon__halo" />
                <div className="butterfly-moon__halo butterfly-moon__halo--second" />
                <Image
                  src="/images/butterfly-hero.png"
                  alt="Legendary butterfly"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-contain object-center drop-shadow-[0_35px_100px_rgba(0,0,0,0.55)]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="line-theater" className="story-panel scene-panel z-10 px-4">
        <div className="scene-shell mx-auto w-[min(1000px,96vw)] text-center">
          {dramaticLines.map((line, idx) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: idx * 0.2, duration: 0.7 }}
              className="line-theater-text"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </section>

      <section id="stage-test" className="story-panel scene-panel z-10 px-4">
        <div className="scene-shell mx-auto w-[min(1080px,96vw)]">
          <div className="scene-heading text-center">
            <p className="scene-kicker">First Flight</p>
            <h2 className="scene-title">WHAT STAGE ARE YOU?</h2>
          </div>

          <form onSubmit={revealCard} className="mt-8 grid gap-4 lg:grid-cols-[0.85fr,1.15fr]">
            <div className="glass-card rounded-[2rem] p-5 sm:p-6">
              <div className="grid gap-3">
                {(Object.keys(stageCards) as Stage[]).map((stage) => (
                  <label
                    key={stage}
                    className={`rounded-[1.3rem] border p-4 text-left transition ${
                      selectedStage === stage
                        ? "border-amber-200/55 bg-amber-200/14"
                        : "border-white/20 bg-black/35 hover:border-white/30 hover:bg-white/8"
                    }`}
                  >
                    <input
                      type="radio"
                      name="stage"
                      value={stage}
                      checked={selectedStage === stage}
                      onChange={() => setSelectedStage(stage)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{stageCards[stage].icon}</span>
                      <p className="text-xl font-semibold text-white/95">{stage}</p>
                    </div>
                  </label>
                ))}
              </div>

              <button type="submit" className="action-pill mt-5 w-full bg-gradient-to-r from-amber-300 to-orange-400 text-black">
                Generate Share Card
              </button>
            </div>

            <div className="glass-card rounded-[2rem] p-5 sm:p-6">
              {!resultCard ? (
                <div className="screenshot-card flex min-h-[320px] items-center justify-center rounded-[1.5rem] border border-dashed border-white/20 bg-black/35 p-6 text-center">
                  <p className="max-w-sm text-lg text-amber-50/92">Pick a stage. Generate the card. Screenshot it for X.</p>
                </div>
              ) : (
                <div className="screenshot-card rounded-[1.75rem] border border-white/20 bg-[radial-gradient(circle_at_top,rgba(255,206,126,0.18),transparent_35%),linear-gradient(180deg,rgba(6,15,24,0.85),rgba(4,10,18,0.94))] p-6 sm:p-7">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-amber-100/88">BFLY Aura Card</p>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-6xl">{resultCard.icon}</p>
                      <h3 className="mt-3 text-4xl text-white/95">{resultCard.title}</h3>
                    </div>
                    <div className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-amber-100/85">
                      {resultCard.arc}
                    </div>
                  </div>

                  <p className="mt-6 text-xl text-amber-50/94">{resultCard.line}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.16em] text-amber-100/82">{resultCard.quote}</p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={copyResultForX} type="button" className="action-pill border border-white/25 bg-white/8 text-amber-50">
                      Copy For X
                    </button>
                    <button onClick={() => runSwarmAction(swarmActions[1])} type="button" className="action-pill border border-amber-200/30 bg-amber-200/12 text-amber-50">
                      Grow Wings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      <section id="migration-widget" className="story-panel scene-panel z-10 px-4">
        <div className="scene-shell mx-auto w-[min(980px,96vw)]">
          <div className="glass-card rounded-[2rem] p-6 sm:p-8">
            <p className="scene-kicker">🦋 Migration Season</p>
            <h2 className="scene-title">Wings Growing...</h2>

            <div className="mt-5 h-4 rounded-full border border-white/25 bg-black/50 p-1">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-cyan-300"
                animate={{ width: `${statusBar}%` }}
                transition={{ duration: 0.9 }}
              />
            </div>

            <p className="mt-4 text-base text-amber-50/94">{statusMessage}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-amber-100/82">{randomMessages[statusIndex]}</p>
          </div>
        </div>
      </section>

      <section id="cocoon" className="story-panel scene-panel scene-panel--cocoon z-10 px-4">
        <div className="scene-shell glass-card cocoon-card mx-auto w-[min(1080px,96vw)] overflow-hidden rounded-[2rem] p-6 sm:p-10">
          <div className="scene-heading max-w-2xl">
            <p className="scene-kicker">THE COCOON</p>
            <h2 className="scene-title">Everyone thought we disappeared.</h2>
            <h3 className="mt-2 text-2xl text-amber-100/92 sm:text-4xl">We were transforming.</h3>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
            <div className="relative min-h-[320px] rounded-[1.75rem] border border-white/20 bg-black/45 p-4 sm:min-h-[380px]">
              <div className="cocoon-shell" />
              <motion.span className="crack-line crack-1" animate={shouldReduceEffects ? { scaleY: 0.7 } : { scaleY: [0.2, 1, 0.45] }} transition={shouldReduceEffects ? { duration: 0.2 } : { duration: 2.2, repeat: Infinity }} />
              <motion.span className="crack-line crack-2" animate={shouldReduceEffects ? { scaleY: 0.75 } : { scaleY: [0.3, 1, 0.5] }} transition={shouldReduceEffects ? { duration: 0.2 } : { duration: 2.1, repeat: Infinity, delay: 0.25 }} />
              <motion.span className="crack-line crack-3" animate={shouldReduceEffects ? { scaleY: 0.68 } : { scaleY: [0.25, 1, 0.4] }} transition={shouldReduceEffects ? { duration: 0.2 } : { duration: 2.4, repeat: Infinity, delay: 0.5 }} />
            </div>

            <div className="grid gap-4">
              {["Particles rising.", "Shell cracking.", "Butterfly emerging."].map((line, idx) => (
                <div key={line} className="glass-card rounded-[1.5rem] p-5" data-drift={12 + idx * 4}>
                  <p className="text-lg text-amber-50/94 sm:text-xl">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="swarm" className="story-panel scene-panel z-10 px-4 pb-28">
        <div className="scene-shell mx-auto w-[min(1100px,96vw)]">
          <div className="scene-heading text-center">
            <p className="scene-kicker">THE SWARM</p>
            <h2 className="scene-title">Movement over noise.</h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="glass-card scene-card p-6" data-drift="10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-100/88">🦋 Wings Earned</p>
              <p className="mt-3 text-4xl font-semibold text-white/96">{wingsEarned.toLocaleString()}</p>
            </div>
            <div className="glass-card scene-card p-6" data-drift="12">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-100/88">🌸 Flowers Planted</p>
              <p className="mt-3 text-4xl font-semibold text-white/96">{flowersPlanted.toLocaleString()}</p>
            </div>
            <div className="glass-card scene-card p-6" data-drift="14">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-100/88">🌎 Territories Reached</p>
              <p className="mt-3 text-4xl font-semibold text-white/96">{territoriesReached.toLocaleString()}</p>
            </div>
            <div className="glass-card scene-card p-6" data-drift="16">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-100/88">⚡ Transformations Completed</p>
              <p className="mt-3 text-4xl font-semibold text-white/96">{transformationsCompleted.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {swarmActions.map((action) => (
              <button
                key={action.label}
                onClick={() => runSwarmAction(action)}
                className="action-pill border border-white/28 bg-black/42 text-amber-50"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

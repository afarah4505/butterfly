"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import ThreeBackdrop from "@/components/ThreeBackdrop";

gsap.registerPlugin(ScrollTrigger);

type WallFlower = {
  id: number;
  name: string;
  message: string;
  x: number;
  y: number;
  color: string;
};

type QuizResult = {
  title: "Still a Caterpillar" | "Emerging Butterfly" | "Full Butterfly";
  copy: string;
  chant: string;
};

const easterEggs = [
  "Paper hands detected.",
  "The cocoon was bullish.",
  "Bird attack avoided.",
  "Wen wings?",
  "Metamorphosis successful.",
  "Migration season approaching.",
  "Wings loading...",
  "Butterfly spotted.",
  "The Butterfly has entered the chat.",
  "You don't buy BFLY. You become it.",
];

const traderTypes = [
  {
    title: "Paper Hands",
    icon: "📉",
    points: ["Panic sells", "Chases green candles", "Gets eaten by birds"],
  },
  {
    title: "Bag Holders",
    icon: "🥚",
    points: ["Sleeps in cocoon", "Confused", "Survives winter"],
  },
  {
    title: "Butterflies",
    icon: "🦋",
    points: ["Sees beyond charts", "Migrates with the swarm", "Creates the trend"],
  },
];

const migrationStages = [
  "Paper Hands Detected",
  "The Cocoon Was Bullish",
  "Wen Wings?",
  "Butterflies Fly",
  "Migration Season",
  "Main Character Mode",
];

const beforeAfterBFLY = [
  {
    before: "Panic sells at 2x",
    after: "Holds through 100x",
  },
  {
    before: "Checks chart every 30 seconds",
    after: "Checks chart every season",
  },
  {
    before: "Paper hands shaking",
    after: "Diamond hands flying",
  },
  {
    before: "Rugs ruined the portfolio",
    after: "BFLY is the portfolio",
  },
];

const swarmActions = [
  { label: "Meme Raid", butterflies: 850, events: 2, territories: 1 },
  { label: "Diamond Hold", butterflies: 1200, events: 1, territories: 1 },
  { label: "Post The Arrow", butterflies: 1600, events: 3, territories: 2 },
  { label: "Community Space", butterflies: 2300, events: 4, territories: 3 },
];

const heroSymbols = ["🐛", "🥚", "⚡", "🦋"];
const CONTRACT_ADDRESS = "0xBFLYBFLYBFLYBFLYBFLYBFLYBFLYBFLYBFLY";

const initialFlowers: WallFlower[] = [
  {
    id: 1,
    name: "@wingmaxi",
    message: "I survived 3 cycles. Still flapping.",
    x: 19,
    y: 52,
    color: "#ffd486",
  },
  {
    id: 2,
    name: "@chartwitch",
    message: "From rugs to wings. 🐛 → 🦋",
    x: 68,
    y: 38,
    color: "#9bd5ff",
  },
  {
    id: 3,
    name: "@cocoonclub",
    message: "The swarm is the signal.",
    x: 41,
    y: 62,
    color: "#ffa8c9",
  },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [nightMix, setNightMix] = useState(0.1);
  const [easterEgg, setEasterEgg] = useState(easterEggs[0]);
  const [showEgg, setShowEgg] = useState(true);
  const [isPhone, setIsPhone] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const [butterfliesMigrated, setButterfliesMigrated] = useState(12841);
  const [flowersPlanted, setFlowersPlanted] = useState(4112);
  const [territoriesReached, setTerritoriesReached] = useState(73);
  const [metamorphosisEvents, setMetamorphosisEvents] = useState(8927);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wallFlowers, setWallFlowers] = useState<WallFlower[]>(initialFlowers);

  const [rugsSurvived, setRugsSurvived] = useState("2");
  const [topsBought, setTopsBought] = useState("2");
  const [panicSells, setPanicSells] = useState("2");
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const [migrationStatusIndex, setMigrationStatusIndex] = useState(0);
  const migrationEmojis = ["🐛", "🥚", "🦋"];
  const migrationLabels = ["Caterpillar", "Cocoon", "Butterfly"];

  const shouldReduceEffects = isPhone || prefersReducedMotion;

  const heroParticles = useMemo(
    () =>
      Array.from({ length: shouldReduceEffects ? 10 : 22 }, (_, idx) => ({
        id: idx,
        left: 4 + Math.random() * 92,
        top: 8 + Math.random() * 80,
        speed: 12 + Math.random() * 12,
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

  const triggerEgg = (forced?: string) => {
    const pick = forced ?? easterEggs[Math.floor(Math.random() * easterEggs.length)];
    setEasterEgg(pick);
    setShowEgg(true);
    window.setTimeout(() => setShowEgg(false), 2600);
  };

  useEffect(() => {
    if (shouldReduceEffects) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
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
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0.2, y: 80 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.45,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [shouldReduceEffects]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      triggerEgg();
      setMigrationStatusIndex((prev) => (prev + 1) % 3);
    }, 9200);

    return () => window.clearInterval(timer);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60;
    const circadian = (Math.sin((hour / 24) * Math.PI * 2 - Math.PI / 2) + 1) / 2;
    const blend = Math.min(1, Math.max(0, 0.38 * value + (1 - circadian) * 0.62));
    setNightMix(blend);
    document.documentElement.style.setProperty("--blend", blend.toFixed(3));
  });

  const runSwarmAction = (action: (typeof swarmActions)[number]) => {
    setButterfliesMigrated((current) => current + action.butterflies);
    setMetamorphosisEvents((current) => current + action.events);
    setTerritoriesReached((current) => current + action.territories);
    triggerEgg(action.label === "Post The Arrow" ? "Wen wings?" : undefined);
  };

  const evaluateQuiz = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const score = Number(rugsSurvived) * 2 + Number(topsBought) * 2 + Number(panicSells) * 3;

    let result: QuizResult;
    if (score >= 17) {
      result = {
        title: "Still a Caterpillar",
        copy: "Paper hands detected.",
        chant: "🐛 → 🦋",
      };
    } else if (score >= 10) {
      result = {
        title: "Emerging Butterfly",
        copy: "The cocoon was bullish.",
        chant: "Wen wings? Soon.",
      };
    } else {
      result = {
        title: "Full Butterfly",
        copy: "Migration season. You lead.",
        chant: "Butterflies fly.",
      };
    }

    setQuizResult(result);
    setButterfliesMigrated((value) => value + 777);
    setMetamorphosisEvents((value) => value + 5);
    triggerEgg("Metamorphosis successful.");
  };

  const copyResultForX = async () => {
    if (!quizResult) {
      return;
    }

    const text = `I got \"${quizResult.title}\" on the BFLY metamorphosis test. ${quizResult.chant} #BFLY #CryptoTwitter`;
    try {
      await navigator.clipboard.writeText(text);
      triggerEgg("Migration season approaching.");
    } catch {
      triggerEgg("Paper hands detected.");
    }
  };

  const copyContractAddress = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      triggerEgg("Contract copied. Migration season.");
    } catch {
      triggerEgg("Paper hands detected.");
    }
  };

  const plantMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) {
      triggerEgg("Wen wings?");
      return;
    }

    const flower: WallFlower = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      x: 8 + Math.random() * 84,
      y: 12 + Math.random() * 76,
      color: ["#ffc37e", "#ff95b5", "#8bf7c9", "#98c9ff", "#ffe88c"][Math.floor(Math.random() * 5)],
    };

    setWallFlowers((current) => [flower, ...current].slice(0, 85));
    setFlowersPlanted((current) => current + 1);
    setTerritoriesReached((current) => (wallFlowers.length % 6 === 0 ? current + 1 : current));
    setMessage("");
    triggerEgg("The cocoon was bullish.");
  };

  const gardenHeight = (isPhone ? 280 : 320) + Math.min(isPhone ? 160 : 220, wallFlowers.length * 4);

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <ThreeBackdrop nightMix={nightMix} reduceEffects={shouldReduceEffects} />
      <div className="sun-rays" />
      <div className="mist-overlay" />

      <div className="fixed inset-0 z-[2] pointer-events-none">
        {Array.from({ length: shouldReduceEffects ? 8 : 20 }).map((_, idx) => (
          <span
            key={`pollen-${idx}`}
            className="pollen-drift"
            style={{
              left: `${(idx / 20) * 100}%`,
              top: `${80 + (idx % 6) * 4}%`,
              animationDuration: `${6 + (idx % 5) * 2}s`,
              animationDelay: `${idx * -0.9}s`,
            }}
          />
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
        className="fixed right-2 top-4 z-[45] max-w-[70vw] rounded-full border border-amber-100/40 bg-black/55 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-amber-100 backdrop-blur-md sm:right-4 sm:top-6 sm:max-w-none sm:px-4 sm:text-xs sm:tracking-[0.24em]"
      >
        {easterEgg}
      </motion.div>

      <section className="relative z-10 min-h-screen overflow-hidden px-4 pb-10 pt-4 sm:px-8 sm:pb-16 sm:pt-6 lg:px-12">
        <div className="absolute inset-0 bg-[#071118]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,206,126,0.3),transparent_20%),radial-gradient(circle_at_70%_14%,rgba(255,160,76,0.22),transparent_24%),linear-gradient(180deg,rgba(6,15,20,0.2),rgba(6,15,20,0.92)_68%,rgba(6,15,20,1))]" />
        <div className="absolute inset-0 bg-[url('/images/butterfly-hero.png')] bg-cover bg-center opacity-15 blur-2xl scale-110" />

        <div className="relative z-20 mx-auto flex min-h-[88svh] max-w-7xl flex-col sm:min-h-[92svh]">
          <nav className="mb-6 flex items-center justify-between rounded-full border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-lg sm:mb-8">
            <a href="#home" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-100 sm:text-xs sm:tracking-[0.3em]">BFLY Movement</a>
            <div className="hidden items-center gap-5 text-[11px] uppercase tracking-[0.22em] text-amber-50/75 md:flex">
              <a href="#traders" className="transition hover:text-amber-100">Traders</a>
              <a href="#cocoon" className="transition hover:text-amber-100">Cocoon</a>
              <a href="#swarm" className="transition hover:text-amber-100">Swarm</a>
              <a href="#test" className="transition hover:text-amber-100">Test</a>
              <a href="#migration" className="transition hover:text-amber-100">Migration</a>
              <a href="#community" className="transition hover:text-amber-100">Community</a>
            </div>
          </nav>

          <div className="mb-5 flex gap-2 overflow-x-auto pb-2 md:hidden">
            {[
              ["#traders", "Traders"],
              ["#cocoon", "Cocoon"],
              ["#swarm", "Swarm"],
              ["#test", "Test"],
              ["#migration", "Migration"],
              ["#community", "Community"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="shrink-0 rounded-full border border-white/15 bg-black/25 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-amber-100/85"
              >
                {label}
              </a>
            ))}
          </div>

          <div id="home" className="grid flex-1 items-center gap-8 lg:grid-cols-[1fr,1.05fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <p className="text-[10px] uppercase tracking-[0.24em] text-amber-200/85 sm:text-xs sm:tracking-[0.36em]">🐛 → 🦋 THE BUTTERFLY EFFECT</p>
              <h1 className="mt-4 text-4xl font-bold leading-[0.9] text-white sm:mt-6 sm:text-7xl lg:text-8xl">
                BUY BFLY
                <br />
                JOIN THE SWARM.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-amber-50/85 sm:mt-6 sm:text-base sm:leading-8">
                Dogs bark. Frogs croak. Butterflies fly.
              </p>

              <p className="mt-6 italic text-amber-200/85 sm:mt-8 sm:text-lg">
                &ldquo;You don&apos;t buy BFLY. You become it.&rdquo;
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a href="https://jup.ag" target="_blank" rel="noreferrer" className="rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-black sm:text-sm">
                  Buy BFLY
                </a>
                <button onClick={copyContractAddress} className="rounded-full border border-amber-200/50 bg-black/30 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-amber-50 sm:text-sm">
                  Contract Address
                </button>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-amber-50 sm:text-sm">
                  Join X
                </a>
                <a href="https://t.me" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-amber-50 sm:text-sm">
                  Telegram
                </a>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-xl border sm:border-white/15 sm:bg-black/25 border-white/25 bg-black/60 px-3 py-2 text-[10px] sm:text-xs tracking-[0.08em]">
                <span className="shrink-0 text-amber-100/85">CA:</span>
                <code className="break-all font-mono text-amber-100/95">{CONTRACT_ADDRESS}</code>
                <button onClick={copyContractAddress} className="ml-auto shrink-0 rounded bg-amber-300/20 px-2 py-1 text-[9px] uppercase text-amber-200 hover:bg-amber-300/40 sm:text-[10px]">Copy</button>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
                <a href="#community" className="rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-5 py-2.5 text-xs font-semibold text-black shadow-[0_0_40px_rgba(255,184,96,0.2)] sm:px-7 sm:py-3 sm:text-sm">Plant Your Flower</a>
                <a href="#test" className="rounded-full border border-amber-200/50 bg-white/5 px-5 py-2.5 text-xs font-semibold text-amber-50 backdrop-blur-md sm:px-7 sm:py-3 sm:text-sm">Wen Wings?</a>
              </div>

              <div className="mt-7 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/25 px-3 py-3 text-xl sm:mt-10 sm:gap-3 sm:px-4 sm:py-4 sm:text-3xl">
                {heroSymbols.map((symbol, idx) => (
                  <motion.span
                    key={symbol}
                    animate={shouldReduceEffects ? { opacity: 1 } : { y: [0, -8, 0], opacity: [0.55, 1, 0.55] }}
                    transition={shouldReduceEffects ? { duration: 0.2 } : { duration: 2.4, repeat: Infinity, delay: idx * 0.25 }}
                  >
                    {symbol}
                  </motion.span>
                ))}
                <span className="ml-1 text-[10px] uppercase tracking-[0.16em] text-amber-100/70 sm:ml-2 sm:text-xs sm:tracking-[0.24em]">Transformation Loop</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1 }}
              className="relative min-h-[44svh] overflow-hidden rounded-[1.6rem] border border-amber-100/20 bg-black/20 shadow-[0_35px_120px_rgba(0,0,0,0.52)] sm:min-h-[54svh] sm:rounded-[2rem]"
            >
              <Image
                src="/images/butterfly-hero.png"
                alt="Butterfly hero artwork"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-contain object-center drop-shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(255,210,122,0.25),transparent_24%),linear-gradient(180deg,rgba(7,17,24,0.12),rgba(7,17,24,0.72))]" />

              {heroParticles.map((particle) => (
                <motion.span
                  key={particle.id}
                  className="pointer-events-none absolute text-[10px] uppercase tracking-[0.25em] text-amber-100/65"
                  style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
                  animate={shouldReduceEffects ? { opacity: 0.5 } : { y: [0, -14, 0], opacity: [0.15, 0.9, 0.15] }}
                  transition={shouldReduceEffects ? { duration: 0.2 } : { duration: particle.speed, repeat: Infinity, ease: "easeInOut" }}
                >
                  🐛→🦋
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="traders" className="story-panel z-10 px-4">
        <div className="w-[min(1080px,96vw)]">
          <h2 className="text-center text-3xl sm:text-6xl text-white/95">PICK YOUR FORM</h2>
          <p className="mt-4 text-center text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-100/90 sm:text-amber-100/75">Paper hands detected. Choose better.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {traderTypes.map((card) => (
              <article key={card.title} className="glass-card rounded-3xl p-6 sm:p-6 border-white/25 sm:border-white/15 bg-black/60 sm:bg-black/30">
                <p className="text-3xl">{card.icon}</p>
                <h3 className="mt-3 text-2xl sm:text-3xl text-white/95">{card.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-amber-100/90 sm:text-amber-50/85">
                  {card.points.map((point) => (
                    <li key={point} className="text-amber-50/90 sm:text-amber-50/85">• {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-panel z-10 px-4">
        <div className="w-[min(1080px,96vw)]">
          <h2 className="text-center text-3xl sm:text-6xl text-white/95">BEFORE BFLY vs AFTER BFLY</h2>
          <p className="mt-4 text-center text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-100/90 sm:text-amber-100/75">What transformation looks like in the wild.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {beforeAfterBFLY.map((item, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-6 border-white/25 sm:border-white/15 bg-black/60 sm:bg-black/30">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-red-300/85">Before</p>
                    <p className="mt-2 text-base sm:text-lg text-amber-50/90">{item.before}</p>
                  </div>
                  <div className="text-xl">→</div>
                  <div className="flex-1">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-green-300/85">After</p>
                    <p className="mt-2 text-base sm:text-lg text-amber-50/90">{item.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cocoon" className="story-panel z-10 px-4">
        <div className="glass-card cocoon-card w-[min(980px,95vw)] overflow-hidden rounded-[2rem] p-6 sm:p-12 border-white/25 sm:border-white/15 bg-black/60 sm:bg-black/30">
          <p className="text-xs uppercase tracking-[0.32em] text-amber-200/90 sm:text-amber-200/80">THE COCOON</p>
          <h2 className="mt-3 text-3xl sm:text-6xl text-white/95">The cocoon was bullish.</h2>
          <h3 className="mt-3 text-2xl sm:text-5xl text-amber-100/90">Migration season is live.</h3>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,0.9fr]">
            <p className="max-w-xl text-sm sm:text-base leading-7 sm:leading-8 text-amber-50/90 sm:text-amber-50/88">
              Sideways chart. Loud community. Wings loading.
              <br />
              Wen wings? Right now.
            </p>
            <div className="relative min-h-56 rounded-3xl border border-white/15 bg-black/25 p-4">
              <div className="cocoon-shell" />
              <motion.span className="crack-line crack-1" animate={shouldReduceEffects ? { scaleY: 0.7 } : { scaleY: [0.2, 1, 0.45] }} transition={shouldReduceEffects ? { duration: 0.2 } : { duration: 2.2, repeat: Infinity }} />
              <motion.span className="crack-line crack-2" animate={shouldReduceEffects ? { scaleY: 0.75 } : { scaleY: [0.3, 1, 0.5] }} transition={shouldReduceEffects ? { duration: 0.2 } : { duration: 2.1, repeat: Infinity, delay: 0.25 }} />
              <motion.span className="crack-line crack-3" animate={shouldReduceEffects ? { scaleY: 0.68 } : { scaleY: [0.25, 1, 0.4] }} transition={shouldReduceEffects ? { duration: 0.2 } : { duration: 2.4, repeat: Infinity, delay: 0.5 }} />
            </div>
          </div>
        </div>
      </section>

      <section id="swarm" className="story-panel z-10 px-4">
        <div className="glass-card w-[min(1020px,96vw)] rounded-[2rem] p-6 sm:p-10 border-white/25 sm:border-white/15 bg-black/60 sm:bg-black/30">
          <h2 className="text-3xl sm:text-6xl text-white/95">THE SWARM</h2>
          <p className="mt-3 text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-100/90 sm:text-amber-100/70">Move fast. Post hard. Hold wings.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/25 sm:border-white/10 bg-black/50 sm:bg-black/25 p-4">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-amber-100/90 sm:text-amber-100/75">🦋 Butterflies Migrated</p>
              <p className="mt-2 text-2xl sm:text-3xl font-semibold text-white/95">{butterfliesMigrated.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-white/25 sm:border-white/10 bg-black/50 sm:bg-black/25 p-4">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-amber-100/90 sm:text-amber-100/75">🌸 Flowers Planted</p>
              <p className="mt-2 text-2xl sm:text-3xl font-semibold text-white/95">{flowersPlanted.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-white/25 sm:border-white/10 bg-black/50 sm:bg-black/25 p-4">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-amber-100/90 sm:text-amber-100/75">🌎 Territories Reached</p>
              <p className="mt-2 text-2xl sm:text-3xl font-semibold text-white/95">{territoriesReached.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-white/25 sm:border-white/10 bg-black/50 sm:bg-black/25 p-4">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-amber-100/90 sm:text-amber-100/75">⚡ Metamorphosis Events</p>
              <p className="mt-2 text-2xl sm:text-3xl font-semibold text-white/95">{metamorphosisEvents.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {swarmActions.map((action) => (
              <button
                key={action.label}
                onClick={() => runSwarmAction(action)}
                className="rounded-2xl border border-amber-200/40 sm:border-amber-200/30 bg-amber-200/15 sm:bg-amber-200/10 px-4 py-4 text-left text-xs uppercase tracking-[0.15em] text-amber-50/95 sm:text-amber-50 transition hover:-translate-y-1 hover:bg-amber-200/25 sm:hover:bg-amber-200/20"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="test" className="story-panel z-10 px-4">
        <div className="glass-card w-[min(1000px,95vw)] rounded-[2rem] p-6 sm:p-10 border-white/25 sm:border-white/15 bg-black/60 sm:bg-black/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-6xl text-white/95">WEN WINGS TEST</h2>
              <p className="mt-3 text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-100/90 sm:text-amber-100/70">3 taps. Know your form.</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/25 sm:border-white/15 bg-black/50 sm:bg-black/40 px-4 py-3 text-sm sm:text-base">
              <span className="text-lg sm:text-2xl">{migrationEmojis[migrationStatusIndex]}</span>
              <span className="text-amber-100/90">{migrationLabels[migrationStatusIndex]}</span>
            </div>
          </div>

          <form onSubmit={evaluateQuiz} className="mt-7 grid gap-4 sm:grid-cols-3">
            <label className="rounded-2xl border border-white/25 sm:border-white/10 bg-black/50 sm:bg-black/20 p-4 text-xs sm:text-sm text-amber-50/90">
              <span>How many rugs survived?</span>
              <select value={rugsSurvived} onChange={(event) => setRugsSurvived(event.target.value)} className="mt-3 w-full rounded-xl border border-white/25 sm:border-white/20 bg-black/50 sm:bg-black/40 px-3 py-2 text-amber-50/95">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </label>
            <label className="rounded-2xl border border-white/25 sm:border-white/10 bg-black/50 sm:bg-black/20 p-4 text-xs sm:text-sm text-amber-50/90">
              <span>How many times bought the top?</span>
              <select value={topsBought} onChange={(event) => setTopsBought(event.target.value)} className="mt-3 w-full rounded-xl border border-white/25 sm:border-white/20 bg-black/50 sm:bg-black/40 px-3 py-2 text-amber-50/95">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </label>
            <label className="rounded-2xl border border-white/25 sm:border-white/10 bg-black/50 sm:bg-black/20 p-4 text-xs sm:text-sm text-amber-50/90">
              <span>How many times panic sold?</span>
              <select value={panicSells} onChange={(event) => setPanicSells(event.target.value)} className="mt-3 w-full rounded-xl border border-white/25 sm:border-white/20 bg-black/50 sm:bg-black/40 px-3 py-2 text-amber-50/95">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </label>

            <button type="submit" className="sm:col-span-3 rounded-2xl bg-gradient-to-r from-amber-300 to-orange-400 px-6 py-3 text-xs sm:text-sm font-semibold text-black">
              Reveal Form
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-white/25 sm:border-white/15 bg-black/50 sm:bg-black/30 p-6">
            {!quizResult ? (
              <p className="text-amber-50/90 text-sm">Tap answers. Reveal your meme form.</p>
            ) : (
              <>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-amber-100/85 sm:text-amber-100/75">Result</p>
                <h3 className="mt-2 text-3xl sm:text-4xl text-white/95">{quizResult.title}</h3>
                <p className="mt-3 text-sm sm:text-base text-amber-50/90">{quizResult.copy}</p>
                <p className="mt-2 text-base sm:text-lg text-amber-200">{quizResult.chant}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button onClick={copyResultForX} className="rounded-full border border-amber-200/50 sm:border-amber-200/40 bg-amber-200/15 sm:bg-amber-200/10 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-amber-100/95 sm:px-5 sm:text-xs sm:tracking-[0.2em]">
                    Copy Result For X
                  </button>
                  <p className="self-center text-[10px] uppercase tracking-[0.14em] text-amber-100/85 sm:text-amber-100/70 sm:text-xs sm:tracking-[0.2em]">Post it. Dogs bark. Butterflies fly.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section id="migration" className="story-panel z-10 px-4">
        <div className="w-[min(1000px,95vw)]">
          <h2 className="text-center text-3xl sm:text-6xl text-white/95">MIGRATION SEASON</h2>
          <p className="mt-3 text-center text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-100/90 sm:text-amber-100/70">No roadmap essays. Just movement.</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {migrationStages.map((stage, idx) => (
              <div key={stage} className="glass-card rounded-2xl p-5 border-white/25 sm:border-white/15 bg-black/60 sm:bg-black/30">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-amber-100/90 sm:text-amber-100/75">Stage {idx + 1}</p>
                <p className="mt-2 text-xl sm:text-2xl text-white/95">{stage}</p>
                <p className="mt-2 text-sm text-amber-50/85">🐛 → 🦋</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="story-panel z-10 px-4 pb-24">
        <div className="glass-card w-[min(1040px,96vw)] rounded-[2rem] p-6 sm:p-10 border-white/25 sm:border-white/15 bg-black/60 sm:bg-black/30">
          <h2 className="text-3xl sm:text-6xl text-white/95">COMMUNITY WALL</h2>
          <p className="mt-3 max-w-2xl text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-100/90 sm:text-amber-100/70">Plant Your Flower. Join the movement.</p>

          <form onSubmit={plantMessage} className="mt-6 grid gap-3 sm:grid-cols-[1fr,1fr,auto]">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="X handle or name"
              className="rounded-2xl border border-white/30 sm:border-white/25 bg-black/50 sm:bg-black/20 px-4 py-3 text-xs sm:text-sm text-amber-50/95 placeholder:text-amber-100/65 sm:placeholder:text-amber-100/50 focus:border-amber-200 focus:outline-none"
            />
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Drop your swarm message"
              className="rounded-2xl border border-white/30 sm:border-white/25 bg-black/50 sm:bg-black/20 px-4 py-3 text-xs sm:text-sm text-amber-50/95 placeholder:text-amber-100/65 sm:placeholder:text-amber-100/50 focus:border-amber-200 focus:outline-none"
            />
            <button className="rounded-2xl bg-gradient-to-r from-amber-300 to-orange-300 px-4 sm:px-5 py-3 text-xs sm:text-sm font-semibold text-black/95 whitespace-nowrap">
              Plant
            </button>
          </form>

          <div className="garden-plot mt-6" style={{ minHeight: `${gardenHeight}px` }}>
            {wallFlowers.map((flower, idx) => (
              <motion.button
                key={flower.id}
                type="button"
                whileHover={isPhone ? undefined : { scale: 1.16, y: -8 }}
                animate={shouldReduceEffects ? { y: 0, rotate: 0 } : { y: [0, -4, 0], rotate: [0, 2, -2, 0] }}
                transition={shouldReduceEffects ? { duration: 0.2 } : { duration: 4 + (idx % 4), repeat: Infinity, ease: "easeInOut" }}
                className="flower"
                style={{ left: `${flower.x}%`, top: `${flower.y}%`, color: flower.color, width: 28, height: 28 }}
                title={`${flower.name}: ${flower.message}`}
              >
                <span className="flower-center" />
              </motion.button>
            ))}
          </div>

          <div className="mt-5 grid gap-2 text-[11px] sm:text-sm text-amber-50/90 sm:text-amber-100/85 sm:grid-cols-2">
            {wallFlowers.slice(0, 8).map((flower) => (
              <p key={`wall-${flower.id}`} className="break-words">
                <span className="font-semibold text-amber-200">{flower.name}:</span> {flower.message}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/20 bg-black/85 px-2 py-2 backdrop-blur-lg md:hidden">
        <div className="grid grid-cols-4 gap-2">
          <a href="https://jup.ag" target="_blank" rel="noreferrer" className="rounded-xl bg-amber-300 px-2 py-2 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-black hover:bg-amber-400">Buy</a>
          <button onClick={copyContractAddress} className="rounded-xl border border-white/30 bg-white/8 px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-amber-100/95 hover:bg-white/15">CA</button>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="rounded-xl border border-white/30 bg-white/8 px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-amber-100/95 hover:bg-white/15">X</a>
          <a href="https://t.me" target="_blank" rel="noreferrer" className="rounded-xl border border-white/30 bg-white/8 px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-amber-100/95 hover:bg-white/15">TG</a>
        </div>
      </div>
    </main>
  );
}

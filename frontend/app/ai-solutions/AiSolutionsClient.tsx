"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  PlayCircle,
  Target,
  Database,
  Users,
  BarChart3,
  MessageSquare,
  Zap,
  Box,
  Link2,
  Layers,
  Search,
  PenTool,
  Code2,
  CheckCircle2,
  TrendingUp,
  Headphones,
  Workflow,
  LineChart,
  ShoppingCart,
} from "lucide-react";

import { useTheme } from "../theme-provider";
import Navbar from "../components/Navbar";

const LIGHT_COLORS = {
  topLeft: "rgba(251, 240, 240, 1)",
  topRight: "rgba(245, 236, 236, 1)",
  bottomLeft: "rgba(255, 255, 255, 1)",
  bottomRight: "rgba(255, 255, 255, 1)",
};

const DARK_COLORS = {
  topRight: "rgba(14, 20, 45, 1)",
  topLeft: "rgba(10, 15, 35, 1)",
  bottomLeft: "rgba(8, 8, 12, 1)",
  bottomRight: "rgba(10, 12, 26, 1)",
};

const heroBadges = [
  {
    icon: BarChart3,
    label: "Understand",
    description: "Turn data into insights.",
    position: "left-0 top-6 sm:-left-4 sm:top-8",
  },
  {
    icon: Zap,
    label: "Automate",
    description: "Reduce repetitive work.",
    position: "right-0 top-0 sm:-right-4 sm:top-4",
  },
  {
    icon: MessageSquare,
    label: "Assist",
    description: "Support your team.",
    position: "left-0 bottom-24 sm:-left-8 sm:bottom-28",
  },
  {
    icon: Layers,
    label: "Scale",
    description: "Grow with intelligence.",
    position: "right-0 bottom-6 sm:-right-6 sm:bottom-10",
  },
];

const whyAi = [
  {
    icon: Target,
    title: "Higher Efficiency",
    description: "Automate repetitive work and reduce manual effort.",
  },
  {
    icon: Database,
    title: "Better Decisions",
    description: "Turn complex information into clear insights.",
  },
  {
    icon: Users,
    title: "Stronger Teams",
    description: "Give your people intelligent tools to do their best work.",
  },
  {
    icon: TrendingUp,
    title: "New Opportunities",
    description: "Discover new ways to create value and grow.",
  },
];

const whatWeBuild = [
  {
    icon: MessageSquare,
    title: "AI Assistants",
    description: "Custom AI assistants that answer, assist and get work done.",
  },
  {
    icon: Zap,
    title: "AI Automation",
    description: "Intelligent automation for repetitive and time-consuming tasks.",
  },
  {
    icon: Box,
    title: "Custom AI Applications",
    description: "Tailored AI solutions for unique business challenges.",
  },
  {
    icon: Link2,
    title: "AI Integrations",
    description: "Connect AI with your existing tools, systems and data.",
  },
  {
    icon: Layers,
    title: "Knowledge Systems",
    description: "Turn your information into a searchable, usable knowledge base.",
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    description: "Understand your goals, challenges and opportunities.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design",
    description: "Plan the solution, workflow and user experience.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Develop",
    description: "Build with the right technology, data and integrations.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Test",
    description: "Validate, refine and ensure real-world performance.",
    icon: CheckCircle2,
  },
  {
    number: "05",
    title: "Scale",
    description: "Monitor, improve and grow the solution over time.",
    icon: LineChart,
  },
];

const categories = [
  "All",
  "Operations",
  "Customer Support",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
];

const applications = [
  {
    category: "Customer Support",
    icon: Headphones,
    title: "Customer Support",
    description: "Faster answers, happier customers.",
  },
  {
    category: "Operations",
    icon: Workflow,
    title: "Operations",
    description: "Smarter workflows, leaner teams.",
  },
  {
    category: "Finance",
    icon: LineChart,
    title: "Finance",
    description: "Clearer insights, better decisions.",
  },
  {
    category: "E-commerce",
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Personalised experiences, higher conversions.",
  },
];

export default function AiSolutionsClient() {
  const dotsRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      const moveX = x * 20;
      const moveY = y * 20;
      if (dotsRef.current) {
        dotsRef.current.style.backgroundPosition = `${moveX}px ${moveY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const cornerColors = isDark ? DARK_COLORS : LIGHT_COLORS;

  const visibleApplications =
    activeCategory === "All"
      ? applications
      : applications.filter((app) => app.category === activeCategory);

  return (
    <main
      className="relative min-h-screen overflow-hidden text-zinc-950 dark:text-white"
      style={{
        backgroundColor: isDark ? "#0a0f1e" : "#ffffff",
        transition: "background-color 0.5s ease",
      }}
    >
      {/* Blended 4-color corners */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 0%, ${cornerColors.topLeft} 0%, transparent 55%),
            radial-gradient(circle at 100% 0%, ${cornerColors.topRight} 0%, transparent 55%),
            radial-gradient(circle at 0% 100%, ${cornerColors.bottomLeft} 0%, transparent 55%),
            radial-gradient(circle at 100% 100%, ${cornerColors.bottomRight} 0%, transparent 55%)
          `,
          filter: "blur(40px)",
          transition: "background-image 0.5s ease",
          transform: "translate3d(0,0,0)",
          willChange: "transform",
        }}
      />

      {/* Dotted grid overlay — moves with mouse */}
      <div
        ref={dotsRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-0"
        style={{
          inset: "-40px",
          backgroundImage: `radial-gradient(${
            isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)"
          } 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          opacity: 0.9,
          transition:
            "background-position 0.2s ease-out, background-image 0.5s ease",
          transform: "translate3d(0,0,0)",
          willChange: "transform",
        }}
      />

      <div className="relative z-10">
        <Navbar isDark />

        {/* ======================================================= */}
        {/* HERO — dark band */}
        {/* ======================================================= */}

        <section className="relative overflow-hidden bg-zinc-950 text-white">
          <div className="container-premium relative">
            <div className="grid items-center gap-12 py-24 lg:grid-cols-2 lg:gap-16 lg:py-32">
              {/* LEFT */}
              <div className="relative z-20 max-w-xl">
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-2 w-2 bg-white" />
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400">
                    AI Solutions
                  </span>
                </div>

                <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white">
                  Intelligence that turns possibilities into{" "}
                  <span className="italic text-zinc-400">progress.</span>
                </h1>

                <p className="mt-6 max-w-md text-base leading-7 text-zinc-400">
                  Custom AI solutions, intelligent workflows and automation
                  designed for real business impact.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <Link
                    href="#build"
                    className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium text-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-200"
                  >
                    Explore AI Solutions
                    <ArrowRight
                      size={16}
                      strokeWidth={1.8}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="#process"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-300"
                  >
                    Our Process
                    <PlayCircle
                      size={18}
                      strokeWidth={1.6}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                <div className="mt-14 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
                  <span>Automate</span>
                  <span>/</span>
                  <span>Augment</span>
                  <span>/</span>
                  <span>Innovate</span>
                  <span>/</span>
                  <span>Grow</span>
                </div>
              </div>

              {/* RIGHT — hero image with floating badges */}
              <div className="relative order-first lg:order-last">
                <span className="pointer-events-none absolute right-0 top-0 hidden font-mono text-[8px] uppercase leading-[1.8] tracking-[0.25em] text-zinc-500 lg:block">
                  People
                  <br />
                  Ideas
                  <br />
                  AI
                  <br />
                  Real Results
                </span>

                <div className="relative mx-auto aspect-square w-full max-w-md">
                  <Image
                    src="/ai-solution.png"
                    alt="AI solutions"
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 80vw"
                    className="object-contain"
                  />

                  {heroBadges.map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <div
                        key={badge.label}
                        className={`absolute z-20 hidden w-40 rounded-xl border border-white/10 bg-zinc-950/80 p-3 backdrop-blur-sm sm:block ${badge.position}`}
                      >
                        <Icon
                          size={16}
                          strokeWidth={1.6}
                          className="text-white"
                        />
                        <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white">
                          {badge.label}
                        </div>
                        <div className="mt-1 text-[11px] leading-4 text-zinc-400">
                          {badge.description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* WHY AI */}
        {/* ======================================================= */}

        <section className="border-b border-black/10 dark:border-white/10">
          <div className="container-premium py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-zinc-950 dark:bg-white" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    Why AI
                  </span>
                </div>
                <h2 className="font-display mt-6 max-w-sm text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.03em]">
                  Solve real problems with{" "}
                  <span className="italic text-zinc-500 dark:text-zinc-300">
                    real intelligence.
                  </span>
                </h2>
                <p className="mt-6 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  AI is most valuable when it helps people do meaningful work
                  — faster, smarter and with better outcomes.
                </p>
              </div>

              <div className="grid gap-x-10 gap-y-10 border-t border-black/10 pt-10 dark:border-white/10 sm:grid-cols-2">
                {whyAi.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title}>
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className="text-zinc-700 dark:text-zinc-300"
                      />
                      <h3 className="mt-5 text-base font-medium tracking-[-0.01em]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* WHAT WE BUILD — dark band */}
        {/* ======================================================= */}

        <section id="build" className="relative overflow-hidden bg-zinc-950 text-white">
          <div className="container-premium relative z-10 py-20 md:py-28">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-white" />
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                  What We Build
                </span>
              </div>
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 sm:block">
                Ideas to Intelligence
              </span>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end lg:gap-16">
              <h2 className="font-display max-w-sm text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.03em]">
                AI solutions designed around{" "}
                <span className="italic text-zinc-400">your business.</span>
              </h2>

              <p className="max-w-xl text-base leading-7 text-zinc-400">
                From AI assistants to fully custom applications, we build
                solutions that fit your goals, your workflows and your
                people.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {whatWeBuild.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group rounded-xl border border-white/10 p-6 transition-colors duration-300 hover:bg-white/[0.03]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10">
                      <Icon size={16} strokeWidth={1.6} className="text-white" />
                    </div>
                    <h3 className="mt-6 text-sm font-medium tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-zinc-500">
                      {item.description}
                    </p>
                    <ArrowRight
                      size={14}
                      strokeWidth={1.8}
                      className="mt-4 text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.15) 0%, transparent 65%)",
            }}
          />
        </section>

        {/* ======================================================= */}
        {/* PROCESS */}
        {/* ======================================================= */}

        <section
          id="process"
          className="border-b border-black/10 dark:border-white/10"
        >
          <div className="container-premium py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-zinc-950 dark:bg-white" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    Our Process
                  </span>
                </div>
                <h2 className="font-display mt-6 max-w-sm text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.03em]">
                  A clear path from idea to{" "}
                  <span className="italic text-zinc-500 dark:text-zinc-300">
                    impact.
                  </span>
                </h2>
                <p className="mt-6 max-w-xs font-mono text-[9px] uppercase leading-5 tracking-[0.2em] text-zinc-400">
                  Think · Build · Learn · Improve
                </p>
              </div>

              <div className="lg:pt-2">
                <div className="relative flex justify-between">
                  <span className="absolute left-0 right-0 top-[7px] h-px bg-black/10 dark:bg-white/10" />
                  {process.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={step.number}
                        className="relative z-10 flex flex-1 flex-col items-start"
                      >
                        <span
                          className={`h-3.5 w-3.5 rounded-full border-2 ${
                            i % 2 === 0
                              ? "border-zinc-950 bg-zinc-950 dark:border-white dark:bg-white"
                              : "border-zinc-950 bg-white dark:border-white dark:bg-zinc-950"
                          }`}
                        />
                        <Icon
                          size={18}
                          strokeWidth={1.5}
                          className="mt-6 text-zinc-500 dark:text-zinc-400"
                        />
                        <span className="mt-3 font-mono text-[10px] tracking-[0.2em] text-zinc-400">
                          {step.number}
                        </span>
                        <h3 className="mt-2 text-base font-medium tracking-[-0.01em]">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-[10rem] text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                          {step.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        
        {/* ======================================================= */}
        {/* FINAL CTA */}
        {/* ======================================================= */}

        <section id="contact" className="relative overflow-hidden">
          <div className="container-premium py-24 md:py-32">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                  Let's Build
                </span>
                <h2 className="font-display mt-6 text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em]">
                  Ready to explore what AI can do for{" "}
                  <span className="italic text-zinc-500 dark:text-zinc-300">
                    you?
                  </span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  Tell us about your ideas, challenges or goals. We'll help
                  you explore the right AI solution for your business — no
                  obligation, just a conversation.
                </p>
              </div>

              <div className="flex flex-col items-start gap-6 lg:items-end">
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-zinc-950 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Start a Conversation
                  <ArrowRight
                    size={16}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-400">
                  Ideas · Solutions · Impact
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
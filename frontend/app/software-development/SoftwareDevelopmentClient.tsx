"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  PlayCircle,
  Users,
  Zap,
  Maximize,
  ShieldCheck,
  Globe,
  Smartphone,
  Database,
  Link2,
  Settings,
  Headphones,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTypescript,
  SiPython,
  SiDjango,
  SiMysql,
  SiPostgresql,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

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

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "95%", label: "Client Satisfaction" },
  { value: "4+", label: "Years of Experience" },
];

const whyCustom = [
  {
    icon: Users,
    title: "Tailored Solutions",
    description:
      "Built to fit your exact business needs, not the limitations of generic tools.",
  },
  {
    icon: Zap,
    title: "Greater Efficiency",
    description: "Automate workflows, reduce manual work and get more done.",
  },
  {
    icon: Maximize,
    title: "Scalability",
    description:
      "Built to grow with your business and adapt to new opportunities.",
  },
  {
    icon: ShieldCheck,
    title: "Long-Term Value",
    description:
      "A reliable, secure foundation for continuous improvement and innovation.",
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    description: "Understand your goals, challenges and requirements.",
  },
  {
    number: "02",
    title: "Plan",
    description: "Define the solution, architecture and roadmap.",
  },
  {
    number: "03",
    title: "Develop",
    description: "Build with clean, scalable and maintainable code.",
  },
  {
    number: "04",
    title: "Test",
    description: "Ensure quality, performance and security.",
  },
  {
    number: "05",
    title: "Launch",
    description: "Deploy, monitor and support for long-term success.",
  },
];

const whatWeBuild = [
  {
    icon: Globe,
    title: "Web Applications",
    description: "Powerful, scalable web apps for modern businesses.",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: "Native and cross-platform apps for iOS and Android.",
  },
  {
    icon: Database,
    title: "Business Platforms",
    description:
      "Custom systems to streamline operations and improve productivity.",
  },
  {
    icon: Link2,
    title: "APIs & Integrations",
    description: "Connect your tools and systems seamlessly.",
  },
  {
    icon: Settings,
    title: "Internal Tools",
    description: "Custom dashboards and tools for your team.",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    description: "Maintenance, updates and feature development.",
  },
];

const technologies = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Python", Icon: SiPython },
  { name: "Django", Icon: SiDjango },
  { name: "Azure", Icon: VscAzure },
  { name: "MySQL", Icon: SiMysql },
  { name: "PostgreSQL", Icon: SiPostgresql },
];

export default function SoftwareDevelopmentClient() {
  const dotsRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

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
        <Navbar />

        {/* ======================================================= */}
        {/* HERO */}
        {/* ======================================================= */}

        <section className="relative overflow-hidden border-b border-black/10 dark:border-white/10">
          <div className="container-premium relative">
            <div className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
              {/* LEFT */}
              <div className="relative z-20 max-w-xl">
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-2 w-2 bg-zinc-950 dark:bg-white" />
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-600 dark:text-zinc-300">
                    Software Development
                  </span>
                </div>

                <h1 className="font-display text-[clamp(2.75rem,5.5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-zinc-950 dark:text-white">
                  Custom software
                  <br />
                  for real{" "}
                  <span className="italic text-zinc-600 dark:text-zinc-300">
                    impact.
                  </span>
                </h1>

                <p className="mt-6 max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  We design and build custom software solutions that solve
                  real problems, streamline operations and create new
                  opportunities for growth.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <Link
                    href="#contact"
                    className="group inline-flex items-center gap-3 rounded-full bg-zinc-950 px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    Start a Conversation
                    <ArrowRight
                      size={16}
                      strokeWidth={1.8}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="#process"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Our Process
                    <PlayCircle
                      size={18}
                      strokeWidth={1.6}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                <div className="mt-14 flex items-center gap-8 border-t border-black/10 pt-8 dark:border-white/10">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-8">
                      <div>
                        <div className="font-display text-2xl tracking-[-0.02em]">
                          {stat.value}
                        </div>
                        <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                          {stat.label}
                        </div>
                      </div>
                      {i < stats.length - 1 && (
                        <span className="h-10 w-px bg-black/10 dark:bg-white/10" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — hero image */}
              <div className="relative order-first lg:order-last">
                <span className="pointer-events-none absolute right-0 top-0 hidden font-mono text-[8px] uppercase leading-[1.8] tracking-[0.25em] text-zinc-500 dark:text-zinc-400 lg:block">
                  Ideas
                  <br />
                  Technology
                  <br />
                  People
                  <br />
                  Results
                </span>

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-[5/4]">
                  <Image
                    src="/softwaredev.png"
                    alt="Custom software development"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* WHY CUSTOM SOFTWARE */}
        {/* ======================================================= */}

        <section className="border-b border-black/10 dark:border-white/10">
          <div className="container-premium py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-zinc-950 dark:bg-white" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    Why Custom Software
                  </span>
                </div>
                <h2 className="font-display mt-6 max-w-sm text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.03em]">
                  Built around your goals.
                </h2>
              </div>
              <div className="flex items-start lg:pt-2">
                <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
                  Off-the-shelf software can only take you so far. We create
                  custom solutions tailored to your business, your users and
                  your vision — so you can work smarter, faster and stay
                  ahead.
                </p>
              </div>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {whyCustom.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                      <Icon size={18} strokeWidth={1.6} />
                    </div>
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
                    Our Development Process
                  </span>
                </div>
                <h2 className="font-display mt-6 max-w-sm text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.03em]">
                  A clear path from idea to{" "}
                  <span className="italic text-zinc-500 dark:text-zinc-300">
                    impact.
                  </span>
                </h2>
              </div>

              <div className="lg:pt-2">
                <div className="relative flex justify-between">
                  <span className="absolute left-0 right-0 top-[7px] h-px bg-black/10 dark:bg-white/10" />
                  {process.map((step, i) => (
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
                      <span className="mt-6 font-mono text-[10px] tracking-[0.2em] text-zinc-400">
                        {step.number}
                      </span>
                      <h3 className="mt-2 text-base font-medium tracking-[-0.01em]">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[10rem] text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* WHAT WE BUILD */}
        {/* ======================================================= */}

        <section className="border-b border-black/10 dark:border-white/10">
          <div className="container-premium py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-zinc-950 dark:bg-white" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    What We Build
                  </span>
                </div>
                <h2 className="font-display mt-6 max-w-sm text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.03em]">
                  Software solutions for different needs.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {whatWeBuild.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-xl border border-black/10 p-6 transition-colors duration-300 hover:bg-black/[0.02] dark:border-white/10 dark:hover:bg-white/[0.02]"
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.6}
                        className="text-zinc-600 dark:text-zinc-300"
                      />
                      <h3 className="mt-4 text-sm font-medium tracking-[-0.01em]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
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
        {/* TECHNOLOGIES — dark band */}
        {/* ======================================================= */}

        <section className="relative overflow-hidden bg-zinc-950 text-white">
          <div className="container-premium relative z-10 py-20 md:py-28">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-white" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                Technologies We Work With
              </span>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end lg:gap-16">
              <h2 className="font-display max-w-sm text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.03em]">
                Modern tools for{" "}
                <span className="italic text-zinc-400">meaningful</span>{" "}
                solutions.
              </h2>

              <p className="max-w-xl text-base leading-7 text-zinc-400">
                We use proven, modern technologies to build secure,
                high-performance software tailored to your needs.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-6">
              {technologies.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="group flex flex-col items-center gap-3 text-center"
                >
                  <Icon
                    size={30}
                    className="text-zinc-400 transition-colors duration-300 group-hover:text-white"
                  />
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* subtle wave graphic at the bottom */}
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
        {/* FEATURED WORK */}
        {/* ======================================================= */}

        <section className="border-b border-black/10 dark:border-white/10">
          <div className="container-premium py-20 md:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-zinc-950 dark:bg-white" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    Featured Work
                  </span>
                </div>
                <h2 className="font-display mt-6 text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.03em]">
                  Real solutions.
                  <br />
                  Real{" "}
                  <span className="italic text-zinc-500 dark:text-zinc-300">
                    results.
                  </span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  From startups to established businesses, we've helped teams
                  turn ideas into powerful software.
                </p>
                <Link
                  href="/case-studies"
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-950 dark:text-white"
                >
                  View all case studies
                  <ArrowRight
                    size={16}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

                <Link
                    href="https://arvynx.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-950"
                >
                    <Image
                    src="/case-studies/arvynx.webp"
                    alt="Arvynx case study"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                    <div className="absolute left-6 top-6 z-10 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-white" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-300">
                        Case Study
                    </span>
                    </div>
                    <div className="absolute inset-x-6 bottom-6 z-10">
                    <h3 className="font-display text-2xl leading-tight text-white">
                        Arvynx — a scalable platform for a growing business
                    </h3>
                    <p className="mt-3 max-w-xs text-sm text-zinc-300">
                        Custom web platform to streamline operations and drive
                        growth.
                    </p>
                    <span className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-950 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight size={16} strokeWidth={1.8} />
                    </span>
                    </div>
              </Link>
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
                  Have an{" "}
                  <span className="italic text-zinc-500 dark:text-zinc-300">
                    idea
                  </span>{" "}
                  in mind?
                </h2>
                <p className="mt-6 max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  Tell us about your project. We'll help you explore the best
                  way forward — no obligation, just a conversation.
                </p>
              </div>

              <div className="flex flex-col items-start gap-6 lg:items-end">
                <Link
                  href="/#contact"
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
                  Discuss · Plan · Build · Grow
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
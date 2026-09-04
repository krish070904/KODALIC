"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Code2,
  Lightbulb,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";

import Image from "next/image";

import { useTheme } from "../theme-provider";
import Navbar from "../components/Navbar";

// Same corner palette as the homepage
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

const capabilities = [
  {
    number: "01",
    title: "Business Websites",
    description:
      "Professional websites designed to communicate your value clearly, build trust and support business growth.",
  },
  {
    number: "02",
    title: "Corporate Websites",
    description:
      "Scalable digital experiences for established businesses that need clarity, credibility and performance.",
  },
  {
    number: "03",
    title: "Startup Websites",
    description:
      "Flexible, modern websites built to help startups communicate ideas, attract users and move quickly.",
  },
  {
    number: "04",
    title: "E-commerce Websites",
    description:
      "Thoughtful online stores designed around products, customers, conversions and long-term growth.",
  },
];

const process = [
  {
    number: "01",
    title: "Strategy",
    description:
      "Understand the business, audience, goals and requirements before deciding what should be built.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Structure",
    description:
      "Plan the pages, information hierarchy, content and functionality around the user journey.",
    icon: Search,
  },
  {
    number: "03",
    title: "Design",
    description:
      "Create a distinctive visual system that feels right for the business and remains easy to use.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Development",
    description:
      "Turn the approved experience into a responsive, performant and maintainable website.",
    icon: Code2,
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Test, refine, optimise and launch with the foundations needed for the website to perform.",
    icon: Rocket,
  },
];

const benefits = [
  "Responsive across desktop, tablet and mobile",
  "Built around real business objectives",
  "Performance-focused development",
  "SEO-ready technical foundations",
  "Clear and maintainable code",
  "Easy-to-manage content structures",
  "Scalable architecture",
  "Support after launch",
];

export default function WebsiteDevelopmentClient() {
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
      {/* Blended 4-color corners — same as homepage */}
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

      {/* ========================================================= */}
      {/* CONTENT */}
      {/* ========================================================= */}

      <div className="relative z-10">
        <Navbar />

        {/* ======================================================= */}
        {/* HERO */}
        {/* ======================================================= */}

        <section className="relative min-h-[calc(100vh-80px)] overflow-hidden border-b border-black/10 dark:border-white/10">
          <div className="container-premium relative flex min-h-[calc(100vh-80px)] items-center">
            <div className="grid w-full items-center lg:grid-cols-2">
              {/* LEFT — EMPTY SPACE OF IMAGE */}
              <div className="relative z-20 max-w-2xl py-24 lg:py-32">
                {/* Eyebrow */}
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-2 w-2 bg-zinc-950 dark:bg-white" />
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-600 dark:text-zinc-300">
                    01 / Website Development
                  </span>
                </div>

                {/* Heading */}
                <h1 className="font-display text-[clamp(4rem,7.5vw,8rem)] font-medium uppercase leading-[0.78] tracking-[-0.065em] text-zinc-950 dark:text-white">
                  Websites
                  <br />
                  built around
                  <br />
                  <span className="italic text-zinc-600 dark:text-zinc-300">
                    business.
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-10 max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300 sm:text-lg sm:leading-8">
                  Business, corporate, startup and e-commerce websites built
                  around business goals — not just visual appearance.
                </p>

                {/* CTA */}
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <Link
                    href="/#contact"
                    className="group inline-flex items-center gap-3 rounded-full bg-zinc-950 px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    Start a Conversation
                    <ArrowRight
                      size={16}
                      strokeWidth={1.8}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                    Strategy · Design · Development
                  </span>
                </div>
              </div>

              {/* RIGHT — VISUAL AREA */}
<div className="relative hidden lg:block lg:h-[560px]">
  <Image
    src="/websitehero.png"
    alt="Website development"
    fill
    priority
    sizes="(min-width: 1024px) 50vw, 0px"
    className="object-contain object-right"
  />
</div>
            </div>
          </div>

          {/* Bottom information */}
          <div className="absolute bottom-8 left-0 right-0 hidden md:block">
            <div className="container-premium">
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-4">
                  <span className="h-px w-12 bg-zinc-950/30 dark:bg-white/30" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                    Ideas · Design · Development · Results
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                    Scroll to explore
                  </span>
                  <ArrowDown
                    size={14}
                    strokeWidth={1.4}
                    className="text-zinc-600 dark:text-zinc-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* INTRO */}
        {/* ======================================================= */}

        <section className="border-b border-black/10 bg-white/85 dark:border-white/10 dark:bg-zinc-950/85">
          <div className="container-premium py-24 md:py-32">
            <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-zinc-950 dark:bg-white" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    02 / Our Approach
                  </span>
                </div>
              </div>
              <div>
                <h2 className="font-display max-w-5xl text-[clamp(3rem,6vw,6.5rem)] leading-[0.84] tracking-[-0.055em]">
                  A website should do
                  <br />
                  <span className="italic text-zinc-500 dark:text-zinc-300">
                    more
                  </span>{" "}
                  than look good.
                </h2>
                <p className="mt-10 max-w-3xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
                  Your website is often the first serious interaction someone
                  has with your business. We design and develop digital
                  experiences that communicate clearly, build credibility and
                  help move the business forward.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* CAPABILITIES */}
        {/* ======================================================= */}

        <section className="border-b border-black/10 bg-white/90 dark:border-white/10 dark:bg-zinc-950/90">
          <div className="container-premium py-24 md:py-32">
            <div className="grid gap-14 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              {/* LEFT */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-zinc-950 dark:bg-white" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    03 / Capabilities
                  </span>
                </div>
                <h2 className="font-display mt-8 max-w-md text-[clamp(3.5rem,5.5vw,6rem)] leading-[0.82] tracking-[-0.055em]">
                  What
                  <br />
                  we
                  <br />
                  build.
                </h2>
                <p className="mt-8 max-w-sm text-base leading-7 text-zinc-500 dark:text-zinc-400">
                  Different businesses have different problems. The website
                  should reflect that.
                </p>
              </div>

              {/* RIGHT */}
              <div className="grid sm:grid-cols-2">
                {capabilities.map((item, index) => (
                  <article
                    key={item.number}
                    className={`group relative min-h-[280px] border-black/10 p-8 transition-colors duration-300 hover:bg-black/[0.025] dark:border-white/10 dark:hover:bg-white/[0.025] sm:p-10 ${
                      index < 2 ? "border-b" : ""
                    } ${index % 2 === 0 ? "sm:border-r" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl text-zinc-500 dark:text-zinc-400">
                        {item.number}
                      </span>
                      <ArrowRight
                        size={17}
                        strokeWidth={1.2}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                      />
                    </div>
                    <h3 className="font-display mt-16 text-2xl tracking-[-0.025em]">
                      {item.title}
                    </h3>
                    <p className="mt-5 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* PROCESS */}
        {/* ======================================================= */}

        <section className="border-b border-black/10 bg-white/90 dark:border-white/10 dark:bg-zinc-950/90">
          <div className="container-premium py-24 md:py-32">
            <div className="grid gap-14 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              {/* LEFT */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-zinc-950 dark:bg-white" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    04 / Process
                  </span>
                </div>
                <h2 className="font-display mt-8 max-w-md text-[clamp(3.5rem,5.5vw,6rem)] leading-[0.82] tracking-[-0.055em]">
                  From idea
                  <br />
                  to live
                  <br />
                  <span className="italic text-zinc-500 dark:text-zinc-300">
                    website.
                  </span>
                </h2>
              </div>

              {/* RIGHT */}
              <div>
                <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
                  {process.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.number}
                        className="group border-t border-black/10 p-6 dark:border-white/10 lg:border-l lg:border-t-0 lg:first:border-l-0"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                            {item.number}
                          </span>
                          <Icon
                            size={19}
                            strokeWidth={1.3}
                            className="text-zinc-500 transition-transform duration-300 group-hover:-translate-y-1 dark:text-zinc-400"
                          />
                        </div>
                        <h3 className="mt-14 font-serif text-xl">
                          {item.title}
                        </h3>
                        <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                          {item.description}
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
        {/* BENEFITS */}
        {/* ======================================================= */}

        <section className="border-b border-black/10 bg-white/90 dark:border-white/10 dark:bg-zinc-950/90">
          <div className="container-premium py-24 md:py-32">
            <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-zinc-950 dark:bg-white" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    05 / What You Get
                  </span>
                </div>
                <h2 className="font-display mt-8 text-[clamp(3.5rem,5.5vw,6rem)] leading-[0.82] tracking-[-0.055em]">
                  Built
                  <br />
                  properly.
                </h2>
              </div>

              <div>
                <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  We don't treat development as simply turning a design into
                  code. The website needs to work technically, visually and
                  commercially.
                </p>

                <div className="mt-12 grid sm:grid-cols-2">
                  {benefits.map((benefit, index) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-4 border-t border-black/10 py-5 dark:border-white/10"
                    >
                      <span className="font-mono text-[9px] text-zinc-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex items-start gap-3">
                        <Check
                          size={16}
                          strokeWidth={1.4}
                          className="mt-0.5 shrink-0 text-zinc-700 dark:text-zinc-300"
                        />
                        <span className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                          {benefit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* FINAL CTA */}
        {/* ======================================================= */}

        <section className="relative overflow-hidden bg-white/90 dark:bg-zinc-950/90">
          <div className="container-premium py-28 text-center md:py-40">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              Ready to build?
            </span>

            <h2 className="font-display mx-auto mt-8 max-w-5xl text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.82] tracking-[-0.06em]">
              Let's build something
              <br />
              that moves the
              <br />
              <span className="italic text-zinc-500 dark:text-zinc-300">
                business forward.
              </span>
            </h2>

            <p className="mx-auto mt-9 max-w-xl text-base leading-7 text-zinc-500 dark:text-zinc-400 sm:text-lg">
              Tell us what you're trying to build, where the business is
              today, and where you want it to go.
            </p>

            <Link
              href="/#contact"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-zinc-950 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Start a Conversation
              <ArrowRight
                size={16}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <div className="mt-16 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-black/20 dark:bg-white/20" />
              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-400">
                Ideas · Technology · Growth
              </span>
              <span className="h-px w-10 bg-black/20 dark:bg-white/20" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
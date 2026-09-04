"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTheme } from "../theme-provider";
import OptionWheel from "../components/optionWheel";
import LineSidebar from "../components/lineSlider";
import {
  Search,
  FileText,
  Code2,
  Pencil,
  Rocket,
  Headphones,
} from "lucide-react";

// Light mode corner colors — matches homepage
const LIGHT_COLORS = {
  topLeft: "rgba(251, 240, 240, 1)",
  topRight: "rgba(245, 236, 236, 1)",
  bottomLeft: "rgba(255, 255, 255, 1)",
  bottomRight: "rgba(255, 255, 255, 1)",
};

// Dark mode corner colors — deep navy / near-black only, matches homepage
const DARK_COLORS = {
  topRight: "rgba(14, 20, 45, 1)",
  topLeft: "rgba(10, 15, 35, 1)",
  bottomLeft: "rgba(8, 8, 12, 1)",
  bottomRight: "rgba(10, 12, 26, 1)",
};

// ---------------------------------------------------------------------------
// Reveal — one quiet, consistent scroll-in treatment used across the page.
// Fades up a section's content the first time it enters the viewport, then
// leaves it alone. Respects prefers-reduced-motion.
// ---------------------------------------------------------------------------
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition:
          "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: `${delay}s`,
        willChange: visible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

const capabilities = [
  {
    number: "01",
    title: "Website Development",
    description:
      "Business, corporate, startup and e-commerce websites built around business goals, not just visual appearance.",
    href: "/website-development",
  },
  {
    number: "02",
    title: "Software Development",
    description:
      "Custom software, web applications, internal business systems, dashboards and integrations.",
    href: "/software-development",
  },
  {
    number: "03",
    title: "Business Automation",
    description:
      "Workflow, CRM, lead, marketing, process and API/integration automation.",
    href: "/automation",
  },
  {
    number: "04",
    title: "AI-Powered Solutions",
    description:
      "AI assistants, AI workflows, intelligent automation, integrations and custom AI applications where they genuinely help.",
    href: "/ai-solutions",
  },
  {
    number: "05",
    title: "Digital Growth",
    description:
      "SEO, digital marketing, social media marketing and analytics foundations.",
    href: "/digital-marketing",
  },
];
const industries = [
  {
    title: "Healthcare",
    description:
      "Smarter digital experiences and systems for modern healthcare.",
    image: "/whatiskodalic1.png",
  },
  {
    title: "Fitness",
    description: "Technology that helps fitness businesses grow and engage.",
    image: "/whatiskodalic2.png",
  },
  {
    title: "Real Estate",
    description:
      "Digital platforms and tools for connected property businesses.",
    image: "/whatiskodalic3.png",
  },
  {
    title: "Professional Services",
    description: "Streamlined technology for service-driven businesses.",
    image: "/whatiskodalic4.png",
  },
  {
    title: "Startups",
    description:
      "Purpose-built technology for turning ideas into scalable products.",
    image: "/whatiskodalicmid.png",
  },
  {
    title: "Growing Businesses",
    description: "Technology to accelerate your next stage of growth.",
    image: "/whatiskodalic1.png",
  },
  {
    title: "Mid-sized Businesses",
    description: "Flexible solutions for bigger ambitions and complex needs.",
    image: "/whatiskodalic2.png",
  },
  {
    title: "Professional Teams",
    description: "Digital systems that improve collaboration and productivity.",
    image: "/whatiskodalic3.png",
  },
];
const processIcons = [Search, FileText, Code2, Pencil, Rocket, Headphones];

const process = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Understand the business, goals and what the technology needs to do before making recommendations.",
  },
  {
    number: "02",
    title: "Proposal",
    description:
      "Present clear scope, inclusions, timeline and cost. No vague deliverables.",
  },
  {
    number: "03",
    title: "Development",
    description: "Build with regular updates and clear communication.",
  },
  {
    number: "04",
    title: "Review & Refinement",
    description: "Review together, gather feedback and refine before launch.",
  },
  {
    number: "05",
    title: "Launch & Handover",
    description:
      "Launch, explain how everything works, connect the right tools and enable independent management.",
  },
  {
    number: "06",
    title: "Ongoing Support",
    description:
      "Offer ongoing support for businesses that need continued help managing, improving or growing their digital systems.",
  },
];

const reasons = [
  {
    title: "Built Around Your Business",
    description:
      "We start with your requirements — not a template, a trend or what is easiest to build.",
  },
  {
    title: "Clear Handover",
    description:
      "We make sure you understand how to access and manage what we build. Nothing is left as a black box.",
  },
  {
    title: "Support Beyond Launch",
    description:
      "We offer ongoing management and support for businesses that need continued help after launch.",
  },
  {
    title: "Privacy First",
    description:
      "We do not publicly share client information, internal systems or project details without permission.",
  },
  {
    title: "Practical Technology",
    description:
      "We recommend technology based on actual business needs, not unnecessary complexity.",
  },
  {
    title: "Accessible Support",
    description:
      "Clients should know who to contact and how to get help when they need it.",
  },
];

const values = [
  {
    title: "Transparency",
    description:
      "Clear communication, realistic expectations and straightforward processes.",
  },
  {
    title: "Quality",
    description: "Attention to usability, reliability and detail.",
  },
  {
    title: "Simplicity",
    description: "Complex problems can have clear, practical solutions.",
  },
  {
    title: "Trust",
    description: "Trust is earned through consistent behaviour, not claims.",
  },
  {
    title: "Results",
    description:
      "Technology should solve real problems and support real business objectives.",
  },
  {
    title: "Accessibility",
    description:
      "Support and technology should be approachable for businesses at different stages.",
  },
];

const faqs = [
  {
    question: "What does Kodalic do?",
    answer:
      "Kodalic is a technology solutions company working across websites, software, automation, AI and digital growth.",
  },
  {
    question: "Is Kodalic a website development company?",
    answer:
      "Yes. Website development is Kodalic's primary service, but the company is broader than a web agency.",
  },
  {
    question: "What other technology services does Kodalic provide?",
    answer:
      "Kodalic provides software development, automation, AI-powered solutions, SEO, digital marketing and social media marketing.",
  },
  {
    question: "Who does Kodalic work with?",
    answer:
      "Kodalic works with startups, entrepreneurs, growing businesses, mid-sized businesses and professional teams.",
  },
  {
    question: "Where is Kodalic based?",
    answer:
      "Kodalic is based in Mumbai, Maharashtra, India, and serves local and international businesses.",
  },
  {
    question: "Does Kodalic work with startups?",
    answer:
      "Yes. This includes startups building a digital presence from scratch.",
  },
  {
    question: "Does Kodalic provide website management?",
    answer: "Yes. Ongoing management and support are offered where required.",
  },
  {
    question: "Can Kodalic build custom software?",
    answer:
      "Yes. This includes web applications, internal systems, CRM and integrations.",
  },
  {
    question: "Does Kodalic provide AI and automation?",
    answer: "Yes, where they can genuinely improve business operations.",
  },
  {
    question: "How does a project start?",
    answer:
      "A project starts with a conversation. Requirements are understood before a clear scope is proposed.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="h-2 w-2 shrink-0 bg-cyan-400" />
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400 sm:text-[11px] sm:tracking-[0.28em]">
        {children}
      </span>
    </div>
  );
}

function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display max-w-4xl text-3xl font-semibold uppercase leading-[1.02] tracking-[-0.02em] text-zinc-950 dark:text-white xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[0.98] lg:tracking-[-0.03em] ${className}`}
    >
      {children}
    </h2>
  );
}

export default function AboutPageClient() {
  const dotsRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const [selectedIndustry, setSelectedIndustry] = useState(0);
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
      className="font-sans"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundColor: isDark ? "#0a0f1e" : "#ffffff",
        transition: "background-color 0.5s ease",
      }}
    >
      {/* Blended 4-color corners — same treatment as homepage */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 0% 0%, ${cornerColors.topLeft} 0%, transparent 55%),
            radial-gradient(circle at 100% 0%, ${cornerColors.topRight} 0%, transparent 55%),
            radial-gradient(circle at 0% 100%, ${cornerColors.bottomLeft} 0%, transparent 55%),
            radial-gradient(circle at 100% 100%, ${cornerColors.bottomRight} 0%, transparent 55%)
          `,
          filter: "blur(40px)",
          transition: "background-image 0.5s ease",
          zIndex: 0,
          pointerEvents: "none",
          transform: "translate3d(0,0,0)",
          willChange: "transform",
        }}
      />

      {/* Dotted overlay — moves with mouse, same treatment as homepage */}
      <div
        ref={dotsRef}
        style={{
          position: "absolute",
          inset: "-40px",
          backgroundImage: `radial-gradient(${
            isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)"
          } 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          opacity: 0.9,
          transition:
            "background-position 0.2s ease-out, background-image 0.5s ease",
          zIndex: 0,
          pointerEvents: "none",
          transform: "translate3d(0,0,0)",
          willChange: "transform",
        }}
      />

      {/* Page content — sits above the gradient + dot layers */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="container-premium w-full">
            <div className="grid min-h-fit items-center gap-12 py-20 sm:py-24 lg:min-h-[88vh] lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-20">
              {/* LEFT — ABOUT CONTENT */}
              <Reveal className="max-w-5xl lg:-translate-x-15">
                <p className="mb-6 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400 sm:mb-8 sm:text-[11px] sm:tracking-[0.28em]">
                  EST. 2019 · MUMBAI, INDIA
                </p>

                <h1 className="font-display max-w-5xl text-[clamp(2.75rem,13vw,7.5rem)] font-medium uppercase leading-[0.9] tracking-[-0.03em] text-zinc-950 dark:text-white sm:leading-[0.84] lg:tracking-[-0.045em]">
                  About
                  <br />
                  Kodalic
                </h1>

                <div className="mt-8 flex flex-col gap-6 border-l border-cyan-400 pl-5 sm:mt-10 sm:gap-7 sm:pl-9">
                  <p className="max-w-2xl font-display text-[clamp(1.35rem,4.5vw,2.15rem)] font-normal leading-[1.25] tracking-[-0.02em] text-zinc-700 dark:text-zinc-300 sm:leading-[1.18]">
                    Technology solutions built around real business needs.
                  </p>
                  <Link
                    href="#journey"
                    className="group inline-flex w-fit items-center gap-4 pt-1 sm:gap-5"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xl text-white transition-transform duration-300 group-hover:translate-x-1 dark:bg-white dark:text-zinc-950 sm:h-16 sm:w-16 sm:text-2xl">
                      →
                    </span>

                    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-zinc-950 dark:text-white sm:text-[11px] sm:tracking-[0.3em]">
                      Our Story
                    </span>
                  </Link>
                </div>
              </Reveal>

              {/* RIGHT — KODALIC VISUAL COLLAGE */}
              <Reveal
                delay={0.12}
                className="relative mx-auto h-[360px] w-full max-w-[400px] xs:h-[420px] xs:max-w-[440px] sm:h-[480px] sm:max-w-[500px] lg:h-[520px] lg:max-w-[560px] lg:translate-x-16"
              >
                <div className="absolute left-[8%] top-[4%] h-[38%] w-[38%] overflow-hidden">
                  <img
                    src="/logopart1.png"
                    alt=""
                    className="h-full w-full object-cover grayscale"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                <div className="absolute right-[4%] top-[13%] h-[38%] w-[38%] overflow-hidden">
                  <img
                    src="/logopart2.png"
                    alt=""
                    className="h-full w-full object-cover grayscale"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                <div className="absolute bottom-[5%] left-[12%] h-[38%] w-[38%] overflow-hidden">
                  <img
                    src="/logopart3.png"
                    alt=""
                    className="h-full w-full object-cover grayscale"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="absolute bottom-[1%] right-[8%] h-[38%] w-[38%] overflow-hidden">
                  <img
                    src="/logopart4.png"
                    alt=""
                    className="h-full w-full object-cover grayscale"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute left-1/2 top-1/2 z-10 flex h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-300 bg-zinc-950 p-4 shadow-2xl dark:border-zinc-700 xs:h-[170px] xs:w-[170px] sm:h-[200px] sm:w-[200px] sm:p-6 lg:h-[220px] lg:w-[220px]">
                  <img
                    src="/Kodalic.png"
                    alt="Kodalic"
                    className="h-full w-full rounded-full object-contain"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
        {/* WHAT IS KODALIC */}
        <section
          id="journey"
          className="relative overflow-hidden border-b border-black/[0.08] dark:border-white/[0.08]"
        >
          {/* Editorial dot grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(0,0,0,0.14) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="container-premium relative">
            <div className="grid min-h-fit items-center gap-14 py-20 sm:gap-16 sm:py-24 md:py-32 lg:min-h-[760px] lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
              {/* LEFT — CONTENT */}
              <Reveal className="relative z-10">
                <div className="mb-6 flex items-center gap-3 sm:mb-8">
                  <span className="h-2 w-2 shrink-0 bg-cyan-400" />

                  <span className="font-mono text-[9px] font-medium uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400 sm:text-[10px] sm:tracking-[0.3em]">
                    What Is Kodalic?
                  </span>
                </div>

                <h2 className="font-display max-w-xl text-[clamp(2.5rem,9vw,5.8rem)] font-medium uppercase leading-[0.92] tracking-[-0.03em] text-zinc-950 dark:text-white sm:leading-[0.84] lg:tracking-[-0.05em]">
                  We are a
                  <br />
                  technology
                  <br />
                  solutions
                  <br />
                  company.
                </h2>

                <div className="mt-8 h-px w-16 bg-zinc-950 dark:bg-white sm:mt-10" />

                <div className="mt-7 max-w-xl space-y-6 text-[15px] leading-[1.8] text-zinc-600 dark:text-zinc-400 sm:mt-8 sm:space-y-7 sm:text-[16px] sm:leading-[1.9]">
                  <p>
                    Kodalic is a technology solutions company founded in 2019
                    and based in Mumbai, India. We help businesses build, manage
                    and grow their digital presence through website development,
                    software development, automation, AI-powered solutions and
                    digital growth services.
                  </p>

                  <p>
                    We work with startups, growing businesses and professional
                    teams who need practical technology — not just a finished
                    product, but a reliable partner who helps them actually use
                    it.
                  </p>
                </div>
              </Reveal>

              {/* RIGHT — COLLAGE */}
              <Reveal
                delay={0.12}
                className="relative mx-auto h-[420px] w-full max-w-[420px] xs:h-[480px] xs:max-w-[480px] sm:h-[560px] sm:max-w-[600px] lg:h-[620px] lg:max-w-[680px]"
              >
                {/* Technical vertical line */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-zinc-900/10 dark:bg-white/10" />

                {/* Technical horizontal line */}
                <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-zinc-900/10 dark:bg-white/10" />

                {/* Large circular guide */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-900/15 dark:border-white/15 xs:h-[270px] xs:w-[270px] sm:h-[330px] sm:w-[330px]" />

                {/* ───────── TOP LEFT ───────── */}
                <div className="absolute left-[2%] top-[3%] h-[37%] w-[38%] overflow-hidden">
                  <img
                    src="/whatiskodalic1.png"
                    alt=""
                    className="h-full w-full object-cover grayscale"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* ───────── TOP RIGHT ───────── */}
                <div className="absolute right-[1%] top-[10%] h-[35%] w-[36%] overflow-hidden">
                  <img
                    src="/whatiskodalic2.png"
                    alt=""
                    className="h-full w-full object-cover grayscale"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* ───────── CENTER IMAGE ───────── */}
                <div className="absolute left-1/2 top-1/2 z-20 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 overflow-hidden border-[6px] border-white shadow-2xl dark:border-zinc-950 xs:h-[220px] xs:w-[220px] xs:border-[8px] sm:h-[285px] sm:w-[285px] sm:border-[10px] lg:h-[320px] lg:w-[320px]">
                  <img
                    src="/whatiskodalicmid.png"
                    alt=""
                    className="h-full w-full object-cover grayscale"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* ───────── BOTTOM LEFT ───────── */}
                <div className="absolute bottom-[3%] left-[7%] h-[36%] w-[40%] overflow-hidden">
                  <img
                    src="/whatiskodalic3.png"
                    alt=""
                    className="h-full w-full object-cover grayscale"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* ───────── BOTTOM RIGHT ───────── */}
                <div className="absolute bottom-[6%] right-[2%] h-[35%] w-[37%] overflow-hidden">
                  <img
                    src="/whatiskodalic4.png"
                    alt=""
                    className="h-full w-full object-cover grayscale"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Cyan technical markers */}
                <span className="absolute left-1/2 top-[12%] z-30 h-2 w-2 -translate-x-1/2 bg-cyan-400" />

                <span className="absolute left-[12%] top-1/2 z-30 h-2 w-2 -translate-y-1/2 bg-cyan-400" />

                <span className="absolute bottom-[12%] left-1/2 z-30 h-2 w-2 -translate-x-1/2 bg-cyan-400" />

                {/* Small technical labels */}
                <div className="absolute left-0 top-[44%] hidden -translate-y-1/2 lg:block">
                  <span className="font-mono text-[9px] leading-5 tracking-[0.28em] text-zinc-500">
                    BUILD
                    <br />
                    SOLVE
                    <br />
                    GROW
                  </span>
                </div>

                <div className="absolute right-0 top-[43%] hidden lg:block">
                  <span className="font-mono text-[9px] leading-5 tracking-[0.28em] text-zinc-500">
                    PEOPLE
                    <br />
                    IDEAS
                    <br />
                    PROGRESS
                  </span>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-0 right-0 hidden lg:block">
                  <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-400">
                    PRACTICAL TECHNOLOGY
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section
          id="what-we-do"
          className="relative overflow-hidden border-b border-black/[0.08] dark:border-white/[0.08]"
        >
          {/* Editorial background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(0,0,0,0.13) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="container-premium relative py-20 sm:py-24 md:py-32 lg:py-36">
            {/* CENTERED INTRO */}
            <Reveal className="mx-auto max-w-5xl text-center">
              <div className="mb-6 flex items-center justify-center gap-3 sm:mb-8">
                <span className="h-2 w-2 shrink-0 bg-cyan-400" />

                <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-zinc-500 dark:text-zinc-400 sm:text-[10px] sm:tracking-[0.32em]">
                  What We Do
                </span>
              </div>

              <h2 className="font-display text-[clamp(2.5rem,11vw,7rem)] font-medium uppercase leading-[0.92] tracking-[-0.03em] text-zinc-950 dark:text-white sm:leading-[0.84] lg:tracking-[-0.055em]">
                Connected
                <br />
                Capabilities.
                <br />
                One Practical
                <br />
                Approach.
              </h2>

              <div className="mx-auto mt-8 h-px w-16 bg-zinc-950 dark:bg-white sm:mt-9" />

              <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-8 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                We combine strategy, design and technology to build practical
                digital solutions that help businesses launch, operate and grow.
                Everything we do is focused on real outcomes — not just
                deliverables.
              </p>
            </Reveal>

            {/* SERVICE CARDS */}
            <Reveal delay={0.12}>
              <div
                id="capability-cards"
                className="mx-auto mt-14 max-w-6xl overflow-hidden border border-black/[0.12] dark:border-white/[0.12] sm:mt-20"
              >
                <div className="grid md:grid-cols-2">
                  {capabilities.map((item, index) => (
                    <Link
                      key={item.number}
                      href={item.href}
                      className={`group relative grid min-h-[240px] grid-cols-[1fr_36%] overflow-hidden border-black/[0.12] bg-white/60 transition-colors duration-500 hover:bg-white dark:border-white/[0.12] dark:bg-[#0a0f1e]/60 dark:hover:bg-[#0e1525] xs:grid-cols-[1fr_42%] sm:min-h-[270px] ${
                        index < 4 ? "border-b" : ""
                      } ${index % 2 === 0 ? "md:border-r" : ""}`}
                    >
                      {/* CARD CONTENT */}
                      <div className="flex min-w-0 flex-col justify-between p-5 xs:p-7 sm:p-9">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] tracking-[0.28em] text-zinc-400">
                            {item.number}
                          </span>

                          <span className="text-xl text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400">
                            →
                          </span>
                        </div>

                        <div className="mt-8 sm:mt-12">
                          <h3 className="font-display text-[19px] font-medium leading-[1.05] tracking-[-0.02em] text-zinc-950 dark:text-white xs:text-[22px] sm:text-[25px] sm:leading-[0.95] sm:tracking-[-0.025em] lg:text-[29px]">
                            {item.title}
                          </h3>

                          <p className="mt-3 max-w-md text-[12px] leading-5 text-zinc-500 dark:text-zinc-400 xs:text-[13px] sm:mt-5 sm:text-sm sm:leading-6">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* CARD IMAGE */}
                      <div className="relative min-h-[240px] overflow-hidden border-l border-black/[0.12] dark:border-white/[0.12] sm:min-h-[270px]">
                        <img
                          src={
                            index === 0
                              ? "/cardwebdev.png"
                              : index === 1
                                ? "/cardsoftwaredev.png"
                                : index === 2
                                  ? "/cardbusinessautomation.png"
                                  : index === 3
                                    ? "/cardAIAutomation.png"
                                    : "/cardDigitalGrowth.png"
                          }
                          alt=""
                          className="h-full w-full object-cover  transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </Link>
                  ))}

                  {/* FINAL PANEL */}
                  <div className="relative min-h-[240px] border-black/[0.12] bg-zinc-100/60 dark:border-white/[0.12] dark:bg-white/[0.03] sm:min-h-[270px] md:col-span-1">
                    <div className="flex h-full min-h-[240px] flex-col justify-between p-6 xs:p-8 sm:min-h-[270px] sm:p-10">
                      <div>
                        <p className="font-mono text-[9px] uppercase leading-5 tracking-[0.24em] text-zinc-500 dark:text-zinc-400 sm:text-[10px] sm:leading-6 sm:tracking-[0.3em]">
                          Practical
                          <br />
                          Technology
                          <br />
                          For A Brighter
                          <br />
                          Tomorrow.
                        </p>

                        <div className="mt-6 h-px w-12 bg-zinc-950 dark:bg-white sm:mt-8" />
                      </div>

                      <span className="self-end font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-400">
                        Kodalic
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* SECTION FOOTER */}
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-4">
                <span className="hidden h-10 w-px bg-zinc-900/20 dark:bg-white/20 sm:block" />

                <span className="font-mono text-[8px] uppercase leading-relaxed tracking-[0.24em] text-zinc-400 xs:text-[9px] sm:tracking-[0.3em]">
                  Technology&nbsp;&nbsp;·&nbsp;&nbsp;People&nbsp;&nbsp;·&nbsp;&nbsp;Progress
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 bg-cyan-400" />

                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-400">
                  Kodalic
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* WHO WE HELP */}
        <section className="relative overflow-hidden border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="container-premium py-20 sm:py-24 md:py-32 lg:py-36">
            <div className="grid gap-12 sm:gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-20">
              {/* LEFT */}
              <Reveal>
                <SectionLabel>Who We Help</SectionLabel>

                <SectionHeading className="mt-6 max-w-xl text-[clamp(2.5rem,10vw,6.5rem)] leading-[0.94] sm:leading-[0.86]">
                  Technology
                  <br />
                  for businesses
                  <br />
                  at{" "}
                  <span className="relative inline-block italic text-[#8B5E3C]">
                    different
                  </span>
                  <br />
                  stages.
                </SectionHeading>

                <p className="mt-8 max-w-lg text-[15px] leading-6 text-zinc-500 dark:text-zinc-400 sm:mt-10 sm:text-base sm:leading-7 md:text-lg">
                  From startups to growing businesses, we help teams across
                  industries transform, scale, and stay ahead with purpose-built
                  technology solutions.
                </p>
              </Reveal>

              {/* RIGHT — OPTION WHEEL */}
              <Reveal delay={0.12} className="relative">
                {/* Desktop connector */}
                <div className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-16 bg-zinc-900/10 dark:bg-white/10 lg:block" />

                <OptionWheel
                  items={industries.map((industry) => industry.title)}
                  defaultSelected={selectedIndustry}
                  onChange={(index) => setSelectedIndustry(index)}
                />

                {/* Mobile hint */}
                <div className="mt-6 text-center lg:hidden">
                  <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-400">
                    Swipe or scroll to explore
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
        {/* WHY KODALIC EXISTS */}
        <section className="relative overflow-hidden border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="container-premium py-20 sm:py-24 md:py-32 lg:py-36">
            <div className="grid items-center gap-12 sm:gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              {/* LEFT — QUESTION MARK VISUAL */}
              <Reveal className="order-2 flex min-h-[280px] items-center justify-center xs:min-h-[340px] lg:order-1 lg:min-h-[620px]">
                <div className="relative h-[280px] w-full max-w-[300px] xs:h-[340px] xs:max-w-[350px] sm:h-[420px] sm:max-w-[420px] md:h-[500px] md:max-w-[500px] lg:h-[600px] lg:max-w-[560px]">
                  <img
                    src="/whykodalic.png"
                    alt=""
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Small editorial marker */}
                  <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-8 bg-[#8B5E3C]/50" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-400">
                        More than a website
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* RIGHT — CONTENT */}
              <Reveal delay={0.12} className="order-1 lg:order-2">
                <SectionLabel>Why Kodalic Exists ?</SectionLabel>

                <div className="mb-6 font-mono text-[9px] uppercase tracking-[0.2em] text-[#8B5E3C] sm:mb-7 sm:text-[10px] sm:tracking-[0.24em]">
                  01 / Why
                </div>

                <h2 className="font-display max-w-4xl text-[clamp(2.5rem,9vw,6.8rem)] font-medium uppercase leading-[0.94] tracking-[-0.03em] text-zinc-950 dark:text-white sm:leading-[0.86] lg:tracking-[-0.055em]">
                  Technology
                  <br />
                  should not stop
                  <br />
                  at delivery.
                </h2>

                <div className="mt-8 h-px w-16 bg-[#8B5E3C] sm:mt-10" />

                <div className="mt-7 max-w-3xl space-y-6 text-[15px] leading-[1.75] text-zinc-600 dark:text-zinc-400 sm:mt-8 sm:space-y-7 sm:text-base sm:leading-[1.85] lg:text-lg">
                  <p>
                    We saw a common problem in the market. Businesses were often
                    given a website or digital product and then left to figure
                    out the technology, the management and the next steps
                    themselves. A website was delivered. A system was built. And
                    then the conversation ended.
                  </p>

                  <p>
                    Kodalic was built with a different approach. We help
                    businesses build the technology, understand how it works,
                    manage it after launch and continue improving it as their
                    needs change. Our goal is not just to deliver a digital
                    product — it is to make sure that product actually works for
                    the business using it.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
        {/* JOURNEY */}
        <section className="relative overflow-hidden border-b border-black/[0.08] dark:border-white/[0.08]">
          {/* CENTERED BACKGROUND IMAGE — scales down on small screens so it never crowds the text */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
            <img
              src="/globaltoindia.png"
              alt=""
              className="h-[200px] w-[220px] object-contain xs:h-[240px] xs:w-[270px] sm:h-[340px] sm:w-[390px] md:h-[440px] md:w-[480px] lg:h-[520px] lg:w-[520px]"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* SUBTLE BACKGROUND TINT */}
          <div className="pointer-events-none absolute inset-0 bg-white/45 dark:bg-black/45" />

          {/* CONTENT */}
          <div className="container-premium relative z-10 py-16 xs:py-20 sm:py-24 md:py-32 lg:py-36">
            <div className="grid gap-10 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
              {/* LEFT */}
              <Reveal>
                <SectionLabel>Our Journey</SectionLabel>

                <SectionHeading className="mt-6 max-w-2xl text-[clamp(2.25rem,11vw,6.5rem)] leading-[0.98] sm:leading-[0.9] lg:leading-[0.86]">
                  From
                  <br />
                  international
                  <br />
                  markets to{" "}
                  <span className="italic text-[#8B5E3C]">India.</span>
                </SectionHeading>

                <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-8 sm:mt-10">
                  <span className="h-px w-12 bg-[#8B5E3C]" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-400 sm:tracking-[0.28em]">
                    Different markets · One direction
                  </span>
                </div>
              </Reveal>

              {/* RIGHT */}
              <Reveal
                delay={0.12}
                className="max-w-xl space-y-6 sm:space-y-8 lg:ml-auto"
              >
                <div>
                  <span className="font-mono text-[9px] tracking-[0.18em] text-[#8B5E3C] sm:text-[10px] sm:tracking-[0.22em]">
                    01 / ORIGIN
                  </span>

                  <p className="mt-4 text-[15px] leading-[1.75] text-zinc-700 dark:text-zinc-300 sm:mt-5 sm:text-base sm:leading-[1.85] lg:text-lg">
                    Kodalic began with a focus on helping businesses outside
                    India. As we worked across different markets, we learned
                    that technology alone is not enough. Understanding local
                    expectations, communication styles and business culture
                    matters just as much as the technology itself.
                  </p>
                </div>

                <div className="h-px w-full bg-black/[0.08] dark:bg-white/[0.08]" />

                <div>
                  <span className="font-mono text-[9px] tracking-[0.18em] text-[#8B5E3C] sm:text-[10px] sm:tracking-[0.22em]">
                    02 / INDIA
                  </span>

                  <p className="mt-4 text-[15px] leading-[1.75] text-zinc-700 dark:text-zinc-300 sm:mt-5 sm:text-base sm:leading-[1.85] lg:text-lg">
                    Over time, Kodalic expanded its approach across multiple
                    markets and grew its presence in India, with a team now
                    based in Mumbai. Today, we help businesses locally and
                    internationally build and manage their digital presence.
                  </p>
                </div>

                <div className="pt-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-400">
                    Mumbai · India · Global
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* DOT GRID */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(139,94,60,0.18) 0.7px, transparent 0.7px)",
              backgroundSize: "24px 24px",
            }}
          />
        </section>

        {/* APPROACH */}
        <section className="border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="container-premium py-20 sm:py-24 md:py-32">
            <Reveal>
              <SectionLabel>Our Approach to Technology</SectionLabel>
              <SectionHeading className="mb-10 sm:mb-14">
                We build for the business — not just the brief.
              </SectionHeading>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="border border-black/[0.08] bg-white/60 p-6 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-8">
                  <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-white sm:text-xl">
                    Understand first.
                  </h3>
                  <p className="mt-4 text-[15px] leading-6 text-zinc-500 dark:text-zinc-400 sm:mt-5 sm:text-base sm:leading-7">
                    Before we recommend a solution, we try to understand the
                    business, the problem, who will use it and what happens after
                    launch.
                  </p>
                </div>

                <div className="border border-black/[0.08] bg-white/60 p-6 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-8">
                  <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-white sm:text-xl">
                    Recommend what works.
                  </h3>
                  <p className="mt-4 text-[15px] leading-6 text-zinc-500 dark:text-zinc-400 sm:mt-5 sm:text-base sm:leading-7">
                    We recommend technology based on what will genuinely work —
                    not what is most complex, fashionable or highest margin.
                  </p>
                </div>

                <div className="border border-black/[0.08] bg-white/60 p-6 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-8">
                  <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-white sm:text-xl">
                    Make it understandable.
                  </h3>
                  <p className="mt-4 text-[15px] leading-6 text-zinc-500 dark:text-zinc-400 sm:mt-5 sm:text-base sm:leading-7">
                    Clients should understand what they are getting, how it works,
                    how to manage it and how to get support when they need it.
                  </p>
                </div>
              </div>

              <p className="mt-8 max-w-3xl text-[15px] leading-6 text-zinc-500 dark:text-zinc-400 sm:text-base sm:leading-7">
                If a simpler approach solves the problem effectively, that is what
                we recommend.
              </p>
            </Reveal>
          </div>
        </section>
        {/* HOW WE WORK */}
        <section className="border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="container-premium py-20 sm:py-24 md:py-32">
            <Reveal>
              <SectionLabel>How We Work</SectionLabel>

              <SectionHeading className="mb-10 sm:mb-16">
                A clear process from conversation to support.
              </SectionHeading>

              <div className="grid gap-3 md:grid-cols-2">
                {process.map((item, index) => {
                  const ProcessIcon = processIcons[index];

                  return (
                    <div
                      key={item.number}
                      className="group relative overflow-hidden border border-black/[0.08] bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#8B5E3C]/30 hover:bg-white dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-[#8B5E3C]/30 dark:hover:bg-white/[0.05] sm:p-8 lg:p-10"
                    >
                      {/* TOP ROW */}
                      <div className="flex items-start justify-between gap-6">
                        {/* NUMBER */}
                        <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-cyan-500 sm:text-[11px] sm:tracking-[0.16em]">
                          {item.number}
                        </span>

                        {/* ICON */}
                        <div className="flex items-center gap-5">
                          <ProcessIcon
                            size={26}
                            strokeWidth={1.25}
                            className="text-zinc-800 transition-transform duration-300 group-hover:scale-110 dark:text-zinc-300 sm:h-[30px] sm:w-[30px]"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* TITLE */}
                      <h3 className="font-display mt-10 text-xl font-semibold tracking-[-0.02em] text-zinc-950 dark:text-white sm:mt-14 sm:text-2xl lg:text-3xl">
                        {item.title}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="mt-4 max-w-xl text-[15px] leading-6 text-zinc-500 dark:text-zinc-400 sm:mt-5 sm:text-base sm:leading-7">
                        {item.description}
                      </p>

                      {/* LARGE BACKGROUND NUMBER */}
                      <span className="pointer-events-none absolute -bottom-8 -right-2 select-none font-display text-[5rem] font-semibold leading-none text-zinc-950/[0.025] dark:text-white/[0.025] sm:text-[8rem]">
                        {item.number}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

    {/* LEADERSHIP */}
<section className="relative overflow-hidden border-b border-black/[0.08] dark:border-white/[0.08]">
  <div className="container-premium relative py-20 sm:py-24 md:py-32 lg:py-36">

    {/* HEADER */}
    <Reveal>
    <div className="grid gap-10 sm:gap-14 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">

      {/* LEFT INTRO */}
      <div className="lg:pt-4">
        <SectionLabel>Leadership</SectionLabel>

        <h2 className="font-display mt-8 max-w-md text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[0.92] tracking-[-0.03em] text-black dark:text-white sm:mt-10 sm:leading-[0.86] lg:tracking-[-0.055em]">
          The people
          <br />
          behind{" "}
          <span className="italic text-[#9b6659]">
            progress.
          </span>
        </h2>

        <div className="mt-8 h-px w-16 bg-black dark:bg-white sm:mt-10" />

        <p className="mt-7 max-w-sm font-serif text-base leading-7 text-black/70 dark:text-white/70 sm:mt-8 sm:text-lg sm:leading-8">
          Different roles. A shared commitment to building meaningful
          solutions.
        </p>

        <div className="mt-10 sm:mt-14">
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/45 dark:text-white/45 sm:tracking-[0.32em]">
            People · Purpose · Progress
          </span>
        </div>
      </div>

      {/* LEADERS */}
      <div className="grid gap-4 md:grid-cols-2">

        {/* FOUNDER */}
        <article
          className="group relative min-h-[380px] overflow-hidden border border-black/15 bg-white/35 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white/60 dark:border-white/15 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] sm:min-h-[430px] sm:p-9"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 26px 100%, 0 calc(100% - 26px))",
          }}
        >
          {/* LARGE NUMBER */}
          <span className="pointer-events-none absolute right-4 top-8 select-none font-serif text-[6rem] leading-none text-black/[0.045] dark:text-white/[0.045] sm:text-[9rem]">
            01
          </span>

          {/* TOP */}
          <div className="relative flex items-center gap-4">
            <span className="font-serif text-2xl text-black dark:text-white sm:text-3xl">
              01
            </span>

            <span className="h-px w-10 bg-black/50 dark:bg-white/50 sm:w-12" />

            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-black dark:text-white sm:text-[9px] sm:tracking-[0.25em]">
              Founder & CEO
            </span>
          </div>

          {/* CONTENT */}
          <div className="relative mt-14 sm:mt-20">
            <h3 className="font-display text-3xl font-medium tracking-[-0.03em] text-black dark:text-white sm:text-4xl sm:tracking-[-0.035em] lg:text-5xl">
              Aayush Sahu
            </h3>

            <div className="mt-5 h-px w-12 bg-black dark:bg-white sm:mt-6" />

            <p className="mt-6 text-sm leading-6 text-black/70 dark:text-white/70 sm:mt-7 sm:leading-7 sm:text-base">
              Aayush Sahu is the Founder and CEO of Kodalic, where he leads
              company operations, business strategy and the development of
              technology solutions built around real business needs.
            </p>

            <p className="mt-4 text-sm leading-6 text-black/60 dark:text-white/60 sm:mt-5 sm:leading-7">
              Since founding Kodalic in 2019, Aayush has led the company
              across international and domestic markets, with a consistent
              focus on practical technology — not just delivered, but
              understood and used by the businesses it is built for.
            </p>
          </div>
        </article>

        {/* DIRECTOR */}
        <article
          className="group relative min-h-[380px] overflow-hidden border border-black/15 bg-white/35 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white/60 dark:border-white/15 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] sm:min-h-[430px] sm:p-9"
          style={{
            clipPath:
              "polygon(26px 0, 100% 0, 100% calc(100% - 26px), calc(100% - 26px) 100%, 0 100%, 0 26px)",
          }}
        >
          {/* LARGE NUMBER */}
          <span className="pointer-events-none absolute right-4 top-8 select-none font-serif text-[6rem] leading-none text-black/[0.045] dark:text-white/[0.045] sm:text-[9rem]">
            02
          </span>

          {/* TOP */}
          <div className="relative flex items-center gap-4">
            <span className="font-serif text-2xl text-black dark:text-white sm:text-3xl">
              02
            </span>

            <span className="h-px w-10 bg-black/50 dark:bg-white/50 sm:w-12" />

            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-black dark:text-white sm:text-[9px] sm:tracking-[0.25em]">
              Director
            </span>
          </div>

          {/* CONTENT */}
          <div className="relative mt-14 sm:mt-20">
            <h3 className="font-display text-3xl font-medium tracking-[-0.03em] text-black dark:text-white sm:text-4xl sm:tracking-[-0.035em] lg:text-5xl">
              Ayush Chaurasiya
            </h3>

            <div className="mt-5 h-px w-12 bg-black dark:bg-white sm:mt-6" />

            <p className="mt-6 text-sm leading-6 text-black/70 dark:text-white/70 sm:mt-7 sm:leading-7 sm:text-base">
              Ayush Chaurasiya serves as Director at Kodalic, contributing
              to the company&apos;s strategic direction, business growth and
              operational development.
            </p>
          </div>
        </article>
      </div>
    </div>
    </Reveal>

    {/* DIVIDER */}
    <div className="my-12 h-px bg-black/15 dark:bg-white/15 sm:my-16 md:my-20" />

    {/* TEAM */}
    <Reveal>
    <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">

      {/* TEAM INTRO */}
      <div>
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 shrink-0 bg-black dark:bg-white" />

          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-black dark:text-white sm:text-[10px] sm:tracking-[0.28em]">
            The Team
          </span>
        </div>

        <p className="mt-6 max-w-xs font-serif text-base leading-7 text-black/70 dark:text-white/70 sm:mt-8 sm:text-lg sm:leading-8">
          A strong team across technology, finance, people and growth.
        </p>

        <div className="mt-8 h-px w-16 bg-black dark:bg-white sm:mt-10" />

        <span className="mt-5 block font-mono text-[8px] uppercase tracking-[0.3em] text-black/45 dark:text-white/45 sm:mt-6">
          Built to
          <br />
          go further
        </span>
      </div>

      {/* TEAM GRID */}
      <div className="grid gap-3 xs:grid-cols-2 lg:grid-cols-4">
        {[
          [
            "03",
            "Riya Rajbhar",
            "Chief Technology Officer",
            "Leads technology strategy and development.",
          ],
          [
            "04",
            "Abhishek Upadhyaya",
            "CA / Chief Financial Officer",
            "Oversees financial planning and business operations.",
          ],
          [
            "05",
            "Rahul Shrivastav",
            "Sr. Manager / HR Manager",
            "Supports people, culture and team growth.",
          ],
          [
            "06",
            "Mukul Joshi",
            "Sales Manager",
            "Drives client relationships and business growth.",
          ],
        ].map(([number, name, role, description], index) => (
          <article
            key={name}
            className="group relative min-h-[240px] overflow-hidden border border-black/15 bg-white/30 p-5 transition-all duration-500 hover:-translate-y-1 hover:bg-white/55 dark:border-white/15 dark:bg-white/[0.025] dark:hover:bg-white/[0.05] sm:min-h-[280px] sm:p-7"
            style={{
              clipPath:
                index % 2 === 0
                  ? "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))"
                  : "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
            }}
          >
            {/* BACKGROUND NUMBER */}
            <span className="pointer-events-none absolute right-2 top-3 select-none font-serif text-[4rem] leading-none text-black/[0.045] dark:text-white/[0.045] sm:text-[6rem]">
              {number}
            </span>

            {/* NUMBER */}
            <div className="relative flex items-center gap-3">
              <span className="font-serif text-xl text-black dark:text-white sm:text-2xl">
                {number}
              </span>

              <span className="h-px w-8 bg-black/50 dark:bg-white/50 sm:w-9" />
            </div>

            {/* PERSON */}
            <div className="relative mt-9 sm:mt-12">
              <h4 className="font-display text-lg font-medium tracking-[-0.02em] text-black dark:text-white sm:text-xl sm:tracking-[-0.025em]">
                {name}
              </h4>

              <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                {role}
              </p>

              <div className="mt-4 h-px w-8 bg-black dark:bg-white sm:mt-5" />

              <p className="mt-4 text-sm leading-6 text-black/60 dark:text-white/60 sm:mt-5">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
    </Reveal>

    {/* FOOTER */}
    <div className="mt-14 flex flex-col gap-4 border-t border-black/15 pt-7 dark:border-white/15 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
      <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/45 dark:text-white/45 sm:tracking-[0.3em]">
        People · Purpose · Progress
      </span>

      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-black dark:text-white">
        KODALIC
      </span>
    </div>
  </div>
</section>
        {/* WHY CHOOSE */}
        <section className="border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="container-premium py-20 sm:py-24 md:py-32">
            <Reveal>
              <SectionLabel>Why Choose Kodalic</SectionLabel>
              <SectionHeading className="mb-10 sm:mb-16">
                Practical technology without the black box.
              </SectionHeading>

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {reasons.map((reason, index) => (
                  <div
                    key={reason.title}
                    className="border border-black/[0.08] bg-white/60 p-6 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-8"
                  >
                    <span className="text-sm text-zinc-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display mt-10 text-lg font-semibold text-zinc-950 dark:text-white sm:mt-14 sm:text-xl">
                      {reason.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-6 text-zinc-500 dark:text-zinc-400 sm:mt-5 sm:text-base sm:leading-7">
                      {reason.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONFIDENTIALITY */}
        <section className="border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="container-premium py-20 sm:py-24 md:py-32">
            <Reveal>
              <div className="grid gap-10 sm:gap-12 md:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <SectionLabel>Client Confidentiality</SectionLabel>
                  <SectionHeading>
                    Your business information stays yours.
                  </SectionHeading>
                </div>

                <div className="max-w-3xl text-base leading-[1.8] text-zinc-600 dark:text-zinc-400 sm:text-lg sm:leading-[1.9]">
                  <p>
                    We respect the privacy of every business we work with. We do
                    not publicly share confidential client information, internal
                    systems or project details without explicit permission.
                  </p>
                  <p className="mt-6 sm:mt-7">
                    Some work may not be publicly showcased for this reason. Never
                    publish client information without permission.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* VALUES */}
        <section className="relative overflow-hidden border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="container-premium relative py-20 sm:py-24 md:py-32 lg:py-36">
            <Reveal>
              <div className="grid gap-10 sm:gap-14 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
                {/* LEFT INTRO */}
                <div className="lg:pt-4">
                  <SectionLabel>Our Values</SectionLabel>

                  <SectionHeading className="mt-7 max-w-md text-[clamp(2.5rem,8vw,6rem)] leading-[0.94] sm:mt-8 sm:leading-[0.86]">
                    How we
                    <br />
                    choose to
                    <br />
                    <span className="italic text-[#9b6659]">work.</span>
                  </SectionHeading>

                  <div className="mt-8 h-px w-16 bg-black dark:bg-white sm:mt-10" />

                  <p className="mt-7 max-w-sm font-serif text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:mt-8 sm:text-lg sm:leading-8">
                    Values that guide our decisions, shape our culture and drive
                    meaningful outcomes.
                  </p>
                </div>

                {/* VALUES GRID */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {values.map((value, index) => {
                    const shapes = [
                      "polygon(0 0, 94% 0, 100% 8%, 100% 100%, 7% 100%, 0 92%)",
                      "polygon(6% 0, 100% 0, 100% 92%, 94% 100%, 0 100%, 0 8%)",
                      "polygon(0 7%, 8% 0, 100% 0, 100% 94%, 92% 100%, 0 100%)",
                      "polygon(7% 0, 100% 0, 100% 93%, 93% 100%, 0 100%, 0 7%)",
                      "polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)",
                      "polygon(8% 0, 100% 0, 100% 92%, 92% 100%, 0 100%, 0 8%)",
                    ];

                    return (
                      <article
                        key={value.title}
                        className="group relative min-h-[230px] overflow-hidden border border-black/[0.12] bg-white/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white/70 dark:border-white/[0.1] dark:bg-white/[0.025] dark:hover:bg-white/[0.05] sm:min-h-[270px] sm:p-9"
                        style={{
                          clipPath: shapes[index % shapes.length],
                        }}
                      >
                        {/* LARGE BACKGROUND NUMBER */}
                        <span className="pointer-events-none absolute -right-2 -top-2 select-none font-serif text-[5.5rem] leading-none text-black/[0.035] dark:text-white/[0.035] sm:text-[8rem]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* TOP */}
                        <div className="relative flex items-center gap-4">
                          <span className="font-serif text-xl text-black dark:text-white sm:text-2xl">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="h-px w-9 bg-black/40 dark:bg-white/40 sm:w-10" />
                        </div>

                        {/* CONTENT */}
                        <div className="relative mt-9 sm:mt-12">
                          <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-zinc-950 dark:text-white sm:text-2xl sm:tracking-[-0.025em] lg:text-3xl">
                            {value.title}
                          </h3>

                          <div className="mt-4 h-px w-8 bg-[#9b6659] sm:mt-5" />

                          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-5 sm:text-base sm:leading-7">
                            {value.description}
                          </p>
                        </div>

                        {/* BOTTOM DETAIL */}
                        <div className="absolute bottom-6 left-6 sm:bottom-7 sm:left-9">
                          <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-zinc-400">
                            Kodalic principle
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* SUBTLE DOT GRID */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-25 dark:opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(0,0,0,0.16) 0.7px, transparent 0.7px)",
              backgroundSize: "24px 24px",
            }}
          />
        </section>

        {/* MISSION / VISION */}
        <section className="border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="container-premium py-20 sm:py-24 md:py-32">
            <Reveal>
              <SectionLabel>Mission & Vision</SectionLabel>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-zinc-950 p-7 text-white dark:bg-white dark:text-zinc-950 sm:p-9 md:p-11">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-50 sm:text-sm sm:tracking-[0.18em]">
                    Mission
                  </p>
                  <p className="font-display mt-8 text-2xl font-medium leading-[1.3] tracking-[-0.02em] sm:mt-11 sm:text-3xl sm:leading-[1.25]">
                    To help businesses use technology in practical ways that make
                    their digital presence, operations and growth simpler and more
                    effective.
                  </p>
                </div>

                <div className="border border-black/[0.1] bg-white/60 p-7 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-9 md:p-11">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400 sm:text-sm sm:tracking-[0.18em]">
                    Vision
                  </p>
                  <p className="font-display mt-8 text-2xl font-medium leading-[1.3] tracking-[-0.02em] text-zinc-950 dark:text-white sm:mt-11 sm:text-3xl sm:leading-[1.25]">
                    To help 1 lakh+ businesses and entrepreneurs build, launch,
                    manage and grow their digital presence through connected
                    technology solutions.
                  </p>
                  <p className="mt-5 text-[15px] leading-6 text-zinc-500 dark:text-zinc-400 sm:mt-6 sm:text-base sm:leading-7">
                    The 1 lakh+ statement is a future goal, not an achieved
                    result.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="container-premium py-20 sm:py-24 md:py-32">
            <Reveal>
              <SectionLabel>FAQ</SectionLabel>
              <SectionHeading className="mb-10 sm:mb-16">
                Common questions about Kodalic.
              </SectionHeading>

              <div className="mx-auto max-w-4xl divide-y divide-black/[0.1] border-y border-black/[0.1] dark:divide-white/[0.08] dark:border-white/[0.08]">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group py-6 sm:py-7">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-zinc-950 marker:hidden dark:text-white sm:gap-6 sm:text-lg">
                      <span>{faq.question}</span>
                      <span className="shrink-0 text-xl font-light text-zinc-400 transition-transform duration-300 group-open:rotate-45 sm:text-2xl">
                        +
                      </span>
                    </summary>
                    <p className="max-w-3xl pr-6 pt-4 text-[15px] leading-6 text-zinc-500 dark:text-zinc-400 sm:pr-10 sm:pt-5 sm:text-base sm:leading-7">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <div className="container-premium relative py-20 text-center sm:py-28 md:py-40">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400 sm:text-sm sm:tracking-[0.22em]">
                Ready when you are
              </p>

              <h2 className="font-display mx-auto mt-6 max-w-4xl text-4xl font-semibold uppercase leading-[1] tracking-[-0.02em] text-zinc-950 dark:text-white xs:text-5xl sm:mt-7 sm:text-7xl sm:leading-[0.92] sm:tracking-[-0.04em] md:text-8xl">
                Have an idea worth building?
              </h2>

              <p className="mx-auto mt-7 max-w-xl text-base leading-6 text-zinc-500 dark:text-zinc-400 sm:mt-8 sm:text-lg sm:leading-7">
                Start with a conversation. We&apos;ll understand the business,
                requirements and what the technology actually needs to do.
              </p>

              <Link
                href="/#contact"
                className="mt-9 inline-flex items-center justify-center rounded-full bg-zinc-950 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:px-8 dark:bg-white dark:text-zinc-950 sm:mt-11 sm:px-9 sm:py-4 sm:text-base sm:hover:px-10"
              >
                Start a Conversation
                <span className="ml-3 text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
      </div>
    </main>
  );
}
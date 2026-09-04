"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  PlayCircle,
  Search,
  Target,
  TrendingUp,
  BarChart3,
  Megaphone,
  Users,
  MousePointerClick,
  Mail,
  Globe,
  LineChart,
  Rocket,
} from "lucide-react";
import {
  SiGoogle,
  SiFacebook,
  SiInstagram,
 
  SiYoutube,
  SiTiktok,
  SiGoogleanalytics,
  SiMailchimp,
  SiHubspot,
  SiGoogleads,
} from "react-icons/si";

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
  { value: "320%", label: "Avg. Traffic Growth" },
  { value: "98%", label: "Client Retention" },
  { value: "5+", label: "Years of Experience" },
];

const whyGrowth = [
  {
    icon: Search,
    title: "Get Discovered",
    description:
      "Appear where your audience is searching and be found by the right people.",
  },
  {
    icon: Users,
    title: "Attract the Right Audience",
    description:
      "Reach people who are actually interested in what you offer.",
  },
  {
    icon: MousePointerClick,
    title: "Turn Interest Into Action",
    description: "Convert visitors into enquiries, customers and revenue.",
  },
  {
    icon: LineChart,
    title: "Build Long-Term Growth",
    description: "Use data to improve and scale your results over time.",
  },
];

const process = [
  {
    number: "01",
    title: "Strategy",
    description: "Understand your goals, audience and market opportunities.",
  },
  {
    number: "02",
    title: "Execution",
    description: "Implement campaigns across the right channels.",
  },
  {
    number: "03",
    title: "Measure",
    description: "Track what's working and identify areas to improve.",
  },
  {
    number: "04",
    title: "Scale",
    description: "Double down on what works and create long-term growth.",
  },
];

const whatWeOffer = [
  {
    icon: Search,
    title: "SEO",
    description: "Improve search rankings and get discovered by the right people.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Run targeted campaigns that deliver measurable results.",
  },
  {
    icon: Globe,
    title: "Social Media",
    description: "Build engagement and a stronger brand presence across platforms.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track performance and find new opportunities for growth.",
  },
  {
    icon: Mail,
    title: "Email & CRM",
    description: "Nurture leads and retain customers with targeted messaging.",
  },
  {
    icon: Target,
    title: "Paid Advertising",
    description: "Data-driven ad campaigns across search and social.",
  },
];

const platforms = [
  { name: "Google", Icon: SiGoogle },
  { name: "Google Ads", Icon: SiGoogleads },
  { name: "Analytics", Icon: SiGoogleanalytics },
  { name: "Meta", Icon: SiFacebook },
  { name: "Instagram", Icon: SiInstagram },
  { name: "YouTube", Icon: SiYoutube },
  { name: "TikTok", Icon: SiTiktok },
  { name: "Mailchimp", Icon: SiMailchimp },
  { name: "HubSpot", Icon: SiHubspot },
];

export default function DigitalGrowthClient() {
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
                    Digital Growth
                  </span>
                </div>

                <h1 className="font-display text-[clamp(2.75rem,5.5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-zinc-950 dark:text-white">
                  More than traffic.
                  <br />
                  Real{" "}
                  <span className="italic text-zinc-600 dark:text-zinc-300">
                    growth.
                  </span>
                </h1>

                <p className="mt-6 max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  Data-driven digital marketing strategies that attract,
                  engage and convert — built for sustainable business growth.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <Link
                    href="#contact"
                    className="group inline-flex items-center gap-3 rounded-full bg-zinc-950 px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    Grow Your Business
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
                    Watch Overview
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
                  People
                  <br />
                  Platforms
                  <br />
                  Performance
                  <br />
                  Possibilities
                </span>

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-[5/4]">
                  <Image
                    src="/digitalgrowth1.png"
                    alt="Digital growth illustration showing rising analytics and social platform icons"
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
        {/* WHY DIGITAL GROWTH */}
        {/* ======================================================= */}

        <section className="border-b border-black/10 dark:border-white/10">
          <div className="container-premium py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-zinc-950 dark:bg-white" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    Why Digital Growth
                  </span>
                </div>
                <h2 className="font-display mt-6 max-w-sm text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.03em]">
                  Visibility creates{" "}
                  <span className="italic text-zinc-500 dark:text-zinc-300">
                    opportunities.
                  </span>
                </h2>
              </div>
              <div className="flex items-start lg:pt-2">
                <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
                  A strong digital presence helps the right people discover
                  your brand, builds trust and creates real business
                  opportunities. More reach, more leads, more customers, a
                  stronger brand.
                </p>
              </div>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {whyGrowth.map((item) => {
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
                    Our Process
                  </span>
                </div>
                <h2 className="font-display mt-6 max-w-sm text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.03em]">
                  A clear path to measurable{" "}
                  <span className="italic text-zinc-500 dark:text-zinc-300">
                    growth.
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
        {/* WHAT WE OFFER */}
        {/* ======================================================= */}

        <section className="border-b border-black/10 dark:border-white/10">
          <div className="container-premium py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-zinc-950 dark:bg-white" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    Our Services
                  </span>
                </div>
                <h2 className="font-display mt-6 max-w-sm text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.03em]">
                  A complete digital growth solution.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {whatWeOffer.map((item) => {
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
        {/* PLATFORMS — dark band */}
        {/* ======================================================= */}

        <section className="relative overflow-hidden bg-zinc-950 text-white">
          <div className="container-premium relative z-10 py-20 md:py-28">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-white" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                Platforms We Work With
              </span>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end lg:gap-16">
              <h2 className="font-display max-w-sm text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.03em]">
                Reach your audience{" "}
                <span className="italic text-zinc-400">everywhere</span> that
                matters.
              </h2>

              <p className="max-w-xl text-base leading-7 text-zinc-400">
                We run and optimize campaigns across the search engines,
                social networks and marketing tools your customers already
                use.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-5">
              {platforms.map(({ name, Icon }) => (
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
        {/* REAL RESULTS */}
        {/* ======================================================= */}

        <section className="border-b border-black/10 dark:border-white/10">
          <div className="container-premium py-20 md:py-28">
            <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-zinc-950 dark:bg-white" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    Real Results
                  </span>
                </div>
                <h2 className="font-display mt-6 text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.03em]">
                  Growth stories from{" "}
                  <span className="italic text-zinc-500 dark:text-zinc-300">
                    real businesses.
                  </span>
                </h2>
              </div>
              <p className="max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
                We help businesses across industries increase visibility,
                generate leads and achieve sustainable growth.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {[
                { stat: "+320%", label: "Organic Traffic", tag: "E-commerce Brand" },
                { stat: "+180%", label: "Social Engagement", tag: "Lifestyle Brand" },
                { stat: "+250%", label: "Leads & Enquiries", tag: "B2B Service Provider" },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex min-h-[200px] flex-col justify-end rounded-2xl border border-black/10 p-6 dark:border-white/10"
                >
                  <span className="font-display text-3xl tracking-[-0.02em]">
                    {r.stat}
                  </span>
                  <span className="mt-1 text-sm font-medium">{r.label}</span>
                  <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {r.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
                  Real strategy.
                  <br />
                  Real{" "}
                  <span className="italic text-zinc-500 dark:text-zinc-300">
                    growth.
                  </span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  From startups to established brands, we've helped
                  businesses turn visibility into measurable growth.
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
                href="/case-studies"
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-950"
              >
                <Image
                  src="/growth.png"
                  alt="UrbanCart case study"
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
                    UrbanCart — a full-funnel growth strategy
                  </h3>
                  <p className="mt-3 max-w-xs text-sm text-zinc-300">
                    SEO, paid media and social strategy that grew traffic and
                    enquiries in months.
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
                  Let's Grow
                </span>
                <h2 className="font-display mt-6 text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em]">
                  Ready to grow{" "}
                  <span className="italic text-zinc-500 dark:text-zinc-300">
                    your business?
                  </span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  Let's create a digital growth strategy tailored to your
                  goals — no obligation, just a conversation.
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
                  Ideas · Strategy · Growth
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
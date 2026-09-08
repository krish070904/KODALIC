"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { createClient } from "../../lib/supabase/client";

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

type ServerNavItem = {
  label: string;
  href: string;
  permission: string;
  icon: string;
};

function HamburgerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-full w-full"
    >
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10.5V20h14v-9.5" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function LeadsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-full w-full"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20c.5-3.5 2.4-5.5 5.5-5.5s5 2 5.5 5.5" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M15 14.5c2.8.2 4.5 2 5 4.5" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-full w-full"
    >
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M8 6V4h8v2" />
      <path d="M3 11h18" />
    </svg>
  );
}

function CaseStudiesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-full w-full"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M6 6h10M6 10h10M6 14h6" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-full w-full"
    >
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

function ContentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-full w-full"
    >
      <path d="M4 20h4l11-11a2.8 2.8 0 0 0-4-4L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </svg>
  );
}

function MediaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-full w-full"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8" cy="9" r="1.5" />
      <path d="m4 17 5-5 3.5 3.5 2.5-2.5 5 5" />
    </svg>
  );
}

function SeoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-full w-full"
    >
      <path d="M4 19V10" />
      <path d="M10 19V5" />
      <path d="M16 19v-8" />
      <path d="M22 19V3" />
      <path d="m4 7 6-2 6 3 6-5" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-full w-full"
    >
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 15 3-4 3 2 5-7" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-full w-full"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2.6V20a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.6-1H6v-2.6h.4A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h2.6V5a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2V14h-.2a1.7 1.7 0 0 0-1.6 1Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-full w-full"
    >
      <path d="M10 5H5v14h5" />
      <path d="M13 8l4 4-4 4" />
      <path d="M17 12H9" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-full w-full"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

const settingsNavigation: NavItem[] = [
  {
    label: "Settings",
    href: "/admin/settings",
    icon: <SettingsIcon />,
  },
];

function NavigationIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "dashboard":
      return <DashboardIcon />;

    case "leads":
      return <LeadsIcon />;

    case "projects":
      return <ProjectsIcon />;

    case "case-studies":
      return <CaseStudiesIcon />;

    case "blog":
      return <BlogIcon />;

    case "content":
      return <ContentIcon />;

    case "media":
      return <MediaIcon />;

    case "seo":
      return <SeoIcon />;

    case "analytics":
      return <AnalyticsIcon />;

    default:
      return <DashboardIcon />;
  }
}

export type AdminSidebarProps = {
  name: string;
  email: string;
  role: string;
  navigation: ServerNavItem[];
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
};

export default function AdminSidebar({
  name,
  email,
  role,
  navigation,
  isCollapsed = false,
  onToggleCollapse,
  isMobile = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out failed:", error);
      setSigningOut(false);
      return;
    }

    router.replace("/admin/login");
    router.refresh();
  }

  const avatarLetter = name?.trim() ? name.trim().charAt(0).toUpperCase() : "A";

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1120] text-slate-800 dark:text-white shadow-xl dark:shadow-2xl transition-all duration-200 ease-out ${
        isMobile
          ? "w-72 max-w-[85vw]"
          : isCollapsed
          ? "w-20"
          : "w-64"
      }`}
    >
      {/* Brand & Hamburger Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 dark:border-white/10 px-3.5">
        {/* Expanded / Mobile View Brand */}
        {(!isCollapsed || isMobile) ? (
          <>
            <Link
              href="/admin"
              onClick={onCloseMobile}
              className="flex items-center gap-2.5 overflow-hidden group"
              title="KODALIC Admin"
            >
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#6d7cff]/20 to-[#9d50bb]/20 dark:from-[#6d7cff]/30 dark:to-[#9d50bb]/30 p-0.5 border border-indigo-200 dark:border-white/15 shadow-inner transition-transform group-hover:scale-105">
                <div className="text-xl font-black italic tracking-tighter text-[#5b3df5] dark:text-[#7e8dff]">
                  K
                </div>
              </div>

              <div className="min-w-0">
                <span className="block text-base font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                  KODALIC
                </span>
                <span className="block text-[9px] font-semibold tracking-widest text-[#6d7cff] dark:text-[#a78bfa] uppercase">
                  Admin
                </span>
              </div>
            </Link>

            {/* Hamburger on Sidebar (Desktop Collapse) */}
            {!isMobile && onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/[0.04] text-slate-600 dark:text-white/70 hover:border-[#6d7cff]/40 hover:bg-slate-200 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white transition active:scale-95"
              >
                <HamburgerIcon />
              </button>
            )}

            {/* Close Button on Mobile Drawer */}
            {isMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Close sidebar"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/[0.04] text-slate-600 dark:text-white/70 hover:bg-slate-200 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white transition active:scale-95"
              >
                <div className="h-5 w-5">
                  <CloseIcon />
                </div>
              </button>
            )}
          </>
        ) : (
          /* Collapsed Desktop View Header: Perfectly Centered Hamburger Button with Tooltip */
          <div className="relative group w-full flex items-center justify-center">
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label="Expand sidebar"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/[0.04] text-slate-700 dark:text-white/80 hover:border-[#6d7cff]/50 hover:bg-[#5b3df5]/15 dark:hover:bg-[#5b3df5]/20 hover:text-[#5b3df5] dark:hover:text-white transition active:scale-95 shadow-sm"
            >
              <HamburgerIcon />
            </button>

            {/* Tooltip */}
            <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 hidden rounded-md bg-slate-900 text-white dark:bg-[#161c32] dark:text-white px-2.5 py-1.5 text-xs font-semibold shadow-xl border border-slate-700 dark:border-white/15 whitespace-nowrap group-hover:block">
              Expand sidebar
            </div>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
        {/* Main Section Header */}
        {(!isCollapsed || isMobile) ? (
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
            Main
          </p>
        ) : (
          <div className="my-1.5 border-t border-slate-100 dark:border-white/5" />
        )}

        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isCollapsed && !isMobile
                      ? "justify-center px-0 py-2.5"
                      : ""
                  } ${
                    isActive
                      ? "bg-[#5b3df5]/15 dark:bg-[#5b3df5]/30 text-[#5b3df5] dark:text-white border border-[#7c5dff]/40 shadow-sm shadow-[#5b3df5]/10"
                      : "text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white border border-transparent"
                  }`}
                >
                  <span
                    className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? "text-[#5b3df5] dark:text-[#a78bfa]" : "text-slate-400 dark:text-white/60"
                    }`}
                  >
                    <NavigationIcon icon={item.icon} />
                  </span>

                  {(!isCollapsed || isMobile) && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>

                {/* Floating Tooltip for Desktop Collapsed Mode */}
                {isCollapsed && !isMobile && (
                  <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 hidden rounded-md bg-slate-900 text-white dark:bg-[#161c32] dark:text-white px-3 py-1.5 text-xs font-medium shadow-xl border border-slate-700 dark:border-white/15 whitespace-nowrap group-hover:block transition-opacity">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Settings Section Header */}
        {(!isCollapsed || isMobile) ? (
          <p className="mb-2 mt-6 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
            Settings
          </p>
        ) : (
          <div className="my-3 border-t border-slate-100 dark:border-white/5" />
        )}

        <nav className="space-y-1">
          {settingsNavigation.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isCollapsed && !isMobile
                      ? "justify-center px-0 py-2.5"
                      : ""
                  } ${
                    isActive
                      ? "bg-[#5b3df5]/15 dark:bg-[#5b3df5]/30 text-[#5b3df5] dark:text-white border border-[#7c5dff]/40 shadow-sm"
                      : "text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white border border-transparent"
                  }`}
                >
                  <span
                    className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? "text-[#5b3df5] dark:text-[#a78bfa]" : "text-slate-400 dark:text-white/60"
                    }`}
                  >
                    {item.icon}
                  </span>

                  {(!isCollapsed || isMobile) && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>

                {/* Floating Tooltip for Desktop Collapsed Mode */}
                {isCollapsed && !isMobile && (
                  <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 hidden rounded-md bg-slate-900 text-white dark:bg-[#161c32] dark:text-white px-3 py-1.5 text-xs font-medium shadow-xl border border-slate-700 dark:border-white/15 whitespace-nowrap group-hover:block transition-opacity">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer: User Profile & Sign Out */}
      <div className="border-t border-slate-200 dark:border-white/10 p-2.5 bg-slate-50 dark:bg-black/20 shrink-0">
        {/* User Card */}
        {(!isCollapsed || isMobile) ? (
          <div className="mb-1.5 flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/[0.03] p-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6845e8] to-[#9d50bb] text-xs font-bold text-white uppercase shadow-sm">
              {avatarLetter}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">{name || "Admin"}</p>
              <p className="truncate text-[10px] font-medium text-[#6d7cff] dark:text-[#a78bfa] capitalize">
                {role || "Administrator"}
              </p>
            </div>
          </div>
        ) : (
          <div className="relative group mb-1.5 flex justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#6845e8] to-[#9d50bb] text-xs font-bold text-white uppercase cursor-default shadow-sm">
              {avatarLetter}
            </div>
            <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 hidden rounded-md bg-slate-900 text-white dark:bg-[#161c32] dark:text-white p-2 text-xs shadow-xl border border-slate-700 dark:border-white/15 whitespace-nowrap group-hover:block">
              <p className="font-semibold">{name || "Admin"}</p>
              <p className="text-[10px] text-[#a78bfa]">{role || "Administrator"}</p>
              <p className="text-[10px] text-slate-300 dark:text-white/40">{email}</p>
            </div>
          </div>
        )}

        {/* Sign Out Button */}
        <div className="relative group">
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            aria-label="Sign out"
            className={`flex w-full items-center gap-2.5 rounded-xl py-2 text-xs font-medium text-slate-600 dark:text-white/70 transition hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50 ${
              isCollapsed && !isMobile
                ? "justify-center px-0"
                : "px-2.5"
            }`}
          >
            <span className="h-4 w-4 shrink-0 text-slate-400 dark:text-white/60 group-hover:text-red-500 dark:group-hover:text-red-300 transition">
              <LogoutIcon />
            </span>

            {(!isCollapsed || isMobile) && (
              <span className="truncate">{signingOut ? "Signing out..." : "Sign out"}</span>
            )}
          </button>

          {isCollapsed && !isMobile && (
            <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 hidden rounded-md bg-slate-900 text-white dark:bg-[#161c32] dark:text-white px-2.5 py-1 text-xs font-medium text-red-400 shadow-xl border border-slate-700 dark:border-white/15 whitespace-nowrap group-hover:block">
              {signingOut ? "Signing out..." : "Sign out"}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

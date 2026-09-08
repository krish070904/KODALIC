"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, ReactNode } from "react";
import AdminSidebar from "./sidebar";
import Link from "next/link";
import { useTheme } from "../../app/theme-provider";
import { Sun, Moon } from "lucide-react";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export type ServerNavItem = {
  label: string;
  href: string;
  permission: string;
  icon: string;
};

type AdminShellProps = {
  adminUser: AdminUser | null;
  navigation: ServerNavItem[];
  children: ReactNode;
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function getBreadcrumb(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length <= 1) {
    return [{ label: "Dashboard", href: "/admin" }];
  }

  return parts.map((part, index) => {
    const href = "/" + parts.slice(0, index + 1).join("/");
    let label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ");
    if (part === "admin") label = "Admin";
    if (part === "seo") label = "SEO";
    if (part === "mfa") label = "MFA";
    return { label, href };
  });
}

export default function AdminShell({
  adminUser,
  navigation,
  children,
}: AdminShellProps) {
  const pathname = usePathname();
  const { isDark, toggleDark } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load sidebar collapsed preference from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("admin_sidebar_collapsed");
      if (saved !== null) {
        setIsCollapsed(saved === "true");
      }
    } catch {
      // ignore
    }
  }, []);

  // Save sidebar collapsed preference to localStorage
  function toggleCollapse() {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("admin_sidebar_collapsed", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  // Automatically close mobile sidebar on navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Check if current route is an auth or standalone page
  const isAuthPage =
    !adminUser ||
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/security") ||
    pathname.startsWith("/admin/unauthorized");

  if (isAuthPage) {
    return <>{children}</>;
  }

  const breadcrumbs = getBreadcrumb(pathname);
  const avatarLetter = adminUser.name?.trim()
    ? adminUser.name.trim().charAt(0).toUpperCase()
    : "A";

  const effectiveCollapsed = mounted ? isCollapsed : false;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080c1e] text-slate-900 dark:text-white transition-colors duration-200">
      {/* Mobile Drawer Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-Over Sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden">
          <AdminSidebar
            name={adminUser.name}
            email={adminUser.email}
            role={adminUser.role}
            navigation={navigation}
            isMobile={true}
            onCloseMobile={() => setIsMobileOpen(false)}
          />
        </div>
      )}

      {/* Desktop Collapsible Sidebar (with integrated hamburger control) */}
      <div className="hidden lg:block">
        <AdminSidebar
          name={adminUser.name}
          email={adminUser.email}
          role={adminUser.role}
          navigation={navigation}
          isCollapsed={effectiveCollapsed}
          onToggleCollapse={toggleCollapse}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-200 ease-out ${
          effectiveCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 dark:border-white/10 bg-white/85 dark:bg-[#0b1120]/85 px-4 sm:px-6 lg:px-8 backdrop-blur-md transition-colors duration-200">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/[0.04] text-slate-600 dark:text-white/75 shadow-sm transition hover:border-[#6d7cff]/40 hover:bg-slate-200 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white active:scale-95"
            >
              <HamburgerIcon />
            </button>

            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs sm:text-sm"
            >
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <div key={crumb.href} className="flex items-center gap-1.5">
                    {idx > 0 && <span className="text-slate-400 dark:text-white/30">/</span>}
                    {isLast ? (
                      <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[160px] sm:max-w-[260px]">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white/80 transition"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right Header Controls / Badges / Status */}
          <div className="flex items-center gap-3">
            {/* Quick Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleDark}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/[0.04] text-slate-600 dark:text-white/75 shadow-sm transition hover:border-[#6d7cff]/40 hover:bg-slate-200 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white active:scale-95"
            >
              {mounted && isDark ? (
                <Sun className="h-4 w-4 text-amber-400 transition-transform duration-200" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-500 transition-transform duration-200" />
              )}
            </button>

            <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Online</span>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/[0.03] px-2.5 py-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#6845e8] to-[#9d50bb] text-xs font-bold text-white shadow-sm">
                {avatarLetter}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none">
                  {adminUser.name || "Admin"}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-white/40 leading-none mt-1 capitalize">
                  {adminUser.role}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Child Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

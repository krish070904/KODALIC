"use client";

import { useState, useEffect } from "react";
import { useTheme, ThemeMode } from "../../theme-provider";
import {
  Sun,
  Moon,
  Monitor,
  Check,
  ShieldCheck,
  User,
  LayoutDashboard,
  Bell,
  Lock,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";

type SettingsManagerProps = {
  user: {
    name: string;
    email: string;
    role: string;
  };
};

export default function SettingsManager({ user }: SettingsManagerProps) {
  const { theme, setTheme, isDark } = useTheme();
  const [defaultCollapsed, setDefaultCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Profile Form State
  const [name, setName] = useState(user.name || "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Notification Preferences State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [leadAlerts, setLeadAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [notifMsg, setNotifMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password Update State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("admin_sidebar_collapsed");
      setDefaultCollapsed(saved === "true");

      const savedNotifs = localStorage.getItem("admin_notif_prefs");
      if (savedNotifs) {
        const parsed = JSON.parse(savedNotifs);
        setEmailNotifications(parsed.emailNotifications ?? true);
        setLeadAlerts(parsed.leadAlerts ?? true);
        setSecurityAlerts(parsed.securityAlerts ?? true);
      }
    } catch {
      // ignore
    }
  }, []);

  function handleSidebarDefaultChange(collapsed: boolean) {
    setDefaultCollapsed(collapsed);
    try {
      localStorage.setItem("admin_sidebar_collapsed", String(collapsed));
    } catch {
      // ignore
    }
  }

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name, name: name }
      });

      if (error) {
        setProfileMsg({ type: "error", text: error.message });
      } else {
        setProfileMsg({ type: "success", text: "Profile details updated successfully!" });
      }
    } catch (err) {
      setProfileMsg({ type: "error", text: err instanceof Error ? err.message : "Failed to update profile." });
    } finally {
      setSavingProfile(false);
    }
  }

  function handleSaveNotificationPrefs(e: React.FormEvent) {
    e.preventDefault();
    setSavingNotifications(true);
    setNotifMsg(null);

    try {
      const prefs = { emailNotifications, leadAlerts, securityAlerts };
      localStorage.setItem("admin_notif_prefs", JSON.stringify(prefs));
      setTimeout(() => {
        setNotifMsg({ type: "success", text: "Notification preferences saved!" });
        setSavingNotifications(false);
      }, 300);
    } catch {
      setNotifMsg({ type: "error", text: "Could not save preferences to storage." });
      setSavingNotifications(false);
    }
  }

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    setSavingPassword(true);
    setPasswordMsg(null);

    if (newPassword.length < 8) {
      setPasswordMsg({ type: "error", text: "New password must be at least 8 characters long." });
      setSavingPassword(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "New password and confirmation do not match." });
      setSavingPassword(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        setPasswordMsg({ type: "error", text: error.message });
      } else {
        setPasswordMsg({ type: "success", text: "Password updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setPasswordMsg({ type: "error", text: err instanceof Error ? err.message : "Failed to update password." });
    } finally {
      setSavingPassword(false);
    }
  }

  const themeOptions: {
    id: ThemeMode;
    title: string;
    description: string;
    icon: React.ReactNode;
    previewBg: string;
    previewSidebar: string;
  }[] = [
    {
      id: "dark",
      title: "Dark Theme",
      description: "Deep midnight obsidian palette with vibrant purple and indigo accents.",
      icon: <Moon className="h-5 w-5 text-indigo-400" />,
      previewBg: "bg-[#080c1e] border-white/10",
      previewSidebar: "bg-[#0b1120] border-r border-white/10",
    },
    {
      id: "light",
      title: "Light Theme",
      description: "Clean, high-contrast bright palette with crisp typography and borders.",
      icon: <Sun className="h-5 w-5 text-amber-500" />,
      previewBg: "bg-slate-100 border-slate-300",
      previewSidebar: "bg-white border-r border-slate-200",
    },
    {
      id: "system",
      title: "System Default",
      description: "Syncs automatically with your operating system's dark/light appearance.",
      icon: <Monitor className="h-5 w-5 text-emerald-400" />,
      previewBg: "bg-gradient-to-r from-[#080c1e] to-slate-100 border-white/10",
      previewSidebar: "bg-gradient-to-b from-[#0b1120] to-white border-r border-white/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Theme & Appearance Section */}
      <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] p-6 sm:p-8 shadow-sm dark:shadow-none transition-colors duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5b3df5]/15 dark:bg-[#5b3df5]/20 text-[#5b3df5] dark:text-[#a78bfa]">
                {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Appearance & Theme</h2>
            </div>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-white/50">
              Customize how the Kodalic admin interface looks on your device.
            </p>
          </div>

          {/* Quick Toggle Switch */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.04] p-1.5">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                !isDark
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                  : "text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Sun className="h-3.5 w-3.5 text-amber-500" />
              <span>Light</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                isDark
                  ? "bg-[#5b3df5] text-white shadow-sm"
                  : "text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Moon className="h-3.5 w-3.5 text-white" />
              <span>Dark</span>
            </button>
          </div>
        </div>

        {/* Theme Cards Grid */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {themeOptions.map((opt) => {
            const isSelected = mounted && theme === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id)}
                className={`relative flex flex-col rounded-xl border p-5 text-left transition-all ${
                  isSelected
                    ? "border-[#7c5dff] bg-[#5b3df5]/10 dark:bg-[#5b3df5]/15 ring-2 ring-[#7c5dff]/40 shadow-md"
                    : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100/70 dark:hover:bg-white/[0.05]"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#5b3df5] text-white shadow-md">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                )}

                <div className={`mb-4 h-24 w-full rounded-lg border overflow-hidden p-2 flex gap-2 ${opt.previewBg}`}>
                  <div className={`w-8 h-full rounded-md ${opt.previewSidebar}`} />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 w-3/4 rounded bg-slate-400/30 dark:bg-white/20" />
                    <div className="h-2 w-1/2 rounded bg-slate-400/20 dark:bg-white/10" />
                    <div className="h-2 w-2/3 rounded bg-slate-400/20 dark:bg-white/10" />
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  {opt.icon}
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">{opt.title}</h3>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-white/50">
                  {opt.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Profile & Personal Info Settings */}
      <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] p-6 sm:p-8 shadow-sm dark:shadow-none transition-colors duration-200">
        <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
            <User className="h-4 w-4" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Profile Information</h2>
        </div>

        <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/50 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Full Name"
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/20 px-4 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-[#7c5dff] focus:ring-2 focus:ring-[#7c5dff]/20 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/50 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/[0.02] px-4 py-2.5 text-sm text-slate-500 dark:text-white/40 cursor-not-allowed"
            />
            <p className="mt-1 text-[11px] text-slate-400 dark:text-white/30">Email address cannot be changed directly.</p>
          </div>

          {profileMsg && (
            <div
              className={`flex items-center gap-2 rounded-xl p-3 text-xs font-medium ${
                profileMsg.type === "success"
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20"
              }`}
            >
              {profileMsg.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <span>{profileMsg.text}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={savingProfile}
            className="inline-flex items-center gap-2 rounded-xl bg-[#5b3df5] hover:bg-[#4c2ee3] text-white px-5 py-2.5 text-xs font-semibold transition disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{savingProfile ? "Saving Profile..." : "Save Profile Details"}</span>
          </button>
        </form>
      </section>

      {/* Navigation & Layout Preferences */}
      <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] p-6 sm:p-8 shadow-sm dark:shadow-none transition-colors duration-200">
        <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Layout & Sidebar</h2>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Default Sidebar State</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-white/50">
              Choose whether the sidebar opens in expanded or collapsed mode by default.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSidebarDefaultChange(false)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold border transition ${
                !defaultCollapsed
                  ? "border-[#7c5dff] bg-[#5b3df5]/15 dark:bg-[#5b3df5]/25 text-[#5b3df5] dark:text-white"
                  : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Expanded (256px)
            </button>
            <button
              type="button"
              onClick={() => handleSidebarDefaultChange(true)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold border transition ${
                defaultCollapsed
                  ? "border-[#7c5dff] bg-[#5b3df5]/15 dark:bg-[#5b3df5]/25 text-[#5b3df5] dark:text-white"
                  : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Collapsed (80px)
            </button>
          </div>
        </div>
      </section>

      {/* Notification Preferences */}
      <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] p-6 sm:p-8 shadow-sm dark:shadow-none transition-colors duration-200">
        <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/15 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
            <Bell className="h-4 w-4" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Notifications & Alerts</h2>
        </div>

        <form onSubmit={handleSaveNotificationPrefs} className="mt-6 space-y-5 max-w-2xl">
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Email Digest & System Updates</p>
              <p className="text-xs text-slate-500 dark:text-white/50 mt-0.5">Receive administrative announcements and summary updates.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none dark:bg-white/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5b3df5]" />
            </label>
          </div>

          <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Instant Lead Alerts</p>
              <p className="text-xs text-slate-500 dark:text-white/50 mt-0.5">Get notified immediately when a new contact or lead inquiry arrives.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={leadAlerts}
                onChange={(e) => setLeadAlerts(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none dark:bg-white/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5b3df5]" />
            </label>
          </div>

          <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Security & Login Alerts</p>
              <p className="text-xs text-slate-500 dark:text-white/50 mt-0.5">Alert on logins from new browsers or MFA configuration changes.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securityAlerts}
                onChange={(e) => setSecurityAlerts(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none dark:bg-white/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5b3df5]" />
            </label>
          </div>

          {notifMsg && (
            <div
              className={`flex items-center gap-2 rounded-xl p-3 text-xs font-medium ${
                notifMsg.type === "success"
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20"
              }`}
            >
              {notifMsg.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <span>{notifMsg.text}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={savingNotifications}
            className="inline-flex items-center gap-2 rounded-xl bg-[#5b3df5] hover:bg-[#4c2ee3] text-white px-5 py-2.5 text-xs font-semibold transition disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{savingNotifications ? "Saving..." : "Save Notification Preferences"}</span>
          </button>
        </form>
      </section>

      {/* Security & Password Update Section */}
      <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] p-6 sm:p-8 shadow-sm dark:shadow-none transition-colors duration-200">
        <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Lock className="h-4 w-4" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Security & Password</h2>
        </div>

        <form onSubmit={handleUpdatePassword} className="mt-6 space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/50 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/20 px-4 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-[#7c5dff] focus:ring-2 focus:ring-[#7c5dff]/20 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/50 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/20 px-4 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-[#7c5dff] focus:ring-2 focus:ring-[#7c5dff]/20 transition"
              required
            />
          </div>

          {passwordMsg && (
            <div
              className={`flex items-center gap-2 rounded-xl p-3 text-xs font-medium ${
                passwordMsg.type === "success"
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20"
              }`}
            >
              {passwordMsg.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <span>{passwordMsg.text}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={savingPassword}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black px-5 py-2.5 text-xs font-semibold transition disabled:opacity-50"
          >
            <Lock className="h-4 w-4" />
            <span>{savingPassword ? "Updating Password..." : "Update Password"}</span>
          </button>
        </form>

        <div className="mt-8 border-t border-slate-200 dark:border-white/10 pt-6">
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-wider">Two-Factor Authentication (MFA)</p>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-white/50">
                Protect your administrator account with a 6-digit TOTP authenticator app.
              </p>
            </div>

            <Link
              href="/admin/security/mfa"
              className="inline-flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] border border-slate-200 dark:border-white/10 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-white transition whitespace-nowrap"
            >
              Configure MFA Security
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

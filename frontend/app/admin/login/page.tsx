"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error: signInError } =
      await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

    if (signInError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    const {
      data: assuranceData,
      error: assuranceError,
    } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

    if (assuranceError) {
      setError("Unable to verify authentication status.");
      setLoading(false);
      return;
    }

    if (
      assuranceData.currentLevel === "aal1" &&
      assuranceData.nextLevel === "aal2"
    ) {
      router.replace("/admin/security/mfa/challenge");
      router.refresh();
      return;
    }

    if (
      assuranceData.currentLevel === "aal1" &&
      assuranceData.nextLevel === "aal1"
    ) {
      router.replace("/admin/security/mfa");
      router.refresh();
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="relative min-h-screen bg-[#060919] text-white flex items-center justify-center px-4 py-12 overflow-hidden selection:bg-[#5b3df5] selection:text-white">
      {/* Background Glowing Orbs & Mesh Grids */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#5b3df5]/20 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#5b3df5] to-indigo-400 shadow-lg shadow-[#5b3df5]/30 group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="h-6 w-6 text-white stroke-[2.2]" />
            </div>
          </Link>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white font-sans">
            Kodalic Admin
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Sign in to access your administrative control panel
          </p>
        </div>

        {/* Login Glassmorphism Card */}
        <div className="rounded-3xl border border-white/[0.12] bg-[#0c1129]/80 backdrop-blur-xl p-8 shadow-2xl shadow-black/80">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70"
              >
                Email Address
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-white/40">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={loading}
                  required
                  placeholder="admin@kodalic.com"
                  className="w-full rounded-xl border border-white/10 bg-black/40 pl-11 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none transition duration-200 focus:border-[#7c5dff] focus:ring-2 focus:ring-[#7c5dff]/30 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-white/70"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-white/40">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={loading}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-black/40 pl-11 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none transition duration-200 focus:border-[#7c5dff] focus:ring-2 focus:ring-[#7c5dff]/30 disabled:opacity-60"
                />
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-center gap-2.5 rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-xs font-medium text-rose-300"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#5b3df5] to-[#7c5dff] hover:from-[#4c2ee3] hover:to-[#6b47ff] px-5 py-3.5 text-xs font-semibold text-white shadow-lg shadow-[#5b3df5]/25 transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/40 flex items-center justify-center gap-1.5">
              <KeyRound className="h-3.5 w-3.5 text-[#a78bfa]" />
              <span>Protected by Two-Factor Authentication (MFA)</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

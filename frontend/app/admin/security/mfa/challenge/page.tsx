"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../../lib/supabase/client";
import { ShieldCheck, ArrowRight, AlertCircle, Loader2, KeyRound } from "lucide-react";
import Link from "next/link";

export default function MfaChallengePage() {
  const router = useRouter();
  const supabase = createClient();

  const [code, setCode] = useState("");
  const [factorId, setFactorId] = useState("");
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFactor() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data, error } = await supabase.auth.mfa.listFactors();

      if (error) {
        setError("Unable to load your authentication factor.");
        setLoading(false);
        return;
      }

      const verifiedTotp = data.totp.find(
        (factor) => factor.status === "verified"
      );

      if (!verifiedTotp) {
        router.replace("/admin/security/mfa");
        return;
      }

      setFactorId(verifiedTotp.id);
      setLoading(false);
    }

    loadFactor();
  }, [router, supabase]);

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit authenticator code.");
      return;
    }

    if (!factorId) {
      setError("Authentication factor is unavailable.");
      return;
    }

    setVerifying(true);

    const { data: challengeData, error: challengeError } =
      await supabase.auth.mfa.challenge({
        factorId,
      });

    if (challengeError) {
      setError("Unable to start MFA verification.");
      setVerifying(false);
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challengeData.id,
      code,
    });

    if (verifyError) {
      setError("Invalid verification code.");
      setCode("");
      setVerifying(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="relative min-h-screen bg-[#060919] text-white flex items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#7c5dff]" />
          <p className="text-xs text-white/50 font-medium">Preparing verification factor...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#060919] text-white flex items-center justify-center px-4 py-12 overflow-hidden selection:bg-[#5b3df5] selection:text-white">
      {/* Background Glowing Orbs & Mesh Grids */}
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#5b3df5]/20 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#5b3df5] to-indigo-400 shadow-lg shadow-[#5b3df5]/30">
              <KeyRound className="h-6 w-6 text-white stroke-[2.2]" />
            </div>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white font-sans">
            Two-Factor Verification
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Enter the 6-digit security code from your authenticator app
          </p>
        </div>

        {/* Challenge Form Glassmorphism Card */}
        <div className="rounded-3xl border border-white/[0.12] bg-[#0c1129]/80 backdrop-blur-xl p-8 shadow-2xl shadow-black/80">
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label
                htmlFor="code"
                className="mb-3 block text-center text-xs font-semibold uppercase tracking-wider text-white/70"
              >
                Security Code
              </label>

              <input
                id="code"
                name="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChange={(event) =>
                  setCode(event.target.value.replace(/\D/g, ""))
                }
                disabled={verifying}
                required
                autoFocus
                placeholder="000000"
                className="w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-4 text-center text-3xl tracking-[0.4em] font-mono text-white outline-none transition duration-200 focus:border-[#7c5dff] focus:ring-2 focus:ring-[#7c5dff]/30 placeholder:text-white/15 disabled:opacity-60"
              />
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
              disabled={verifying || code.length !== 6}
              className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#5b3df5] to-[#7c5dff] hover:from-[#4c2ee3] hover:to-[#6b47ff] px-5 py-3.5 text-xs font-semibold text-white shadow-lg shadow-[#5b3df5]/25 transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              {verifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <span>Verify & Access Dashboard</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Back link */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <Link
              href="/admin/login"
              className="text-xs font-medium text-white/50 hover:text-white transition"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
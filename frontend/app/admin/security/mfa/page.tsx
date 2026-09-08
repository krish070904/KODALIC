"use client";

import { useState } from "react";
import { createClient } from "../../../../lib/supabase/client";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";

type TotpEnrollment = {
  id: string;
  qr_code: string;
  secret: string;
  uri: string;
};

export default function MfaPage() {
  const supabase = createClient();

  const [enrollment, setEnrollment] = useState<TotpEnrollment | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function startEnrollment() {
    setLoading(true);
    setError("");
    setMessage("");

    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "Kodalic Authenticator",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setEnrollment({
      id: data.id,
      qr_code: data.totp.qr_code,
      secret: data.totp.secret,
      uri: data.totp.uri,
    });

    setLoading(false);
  }

  async function verifyEnrollment() {
    if (!enrollment) {
      return;
    }

    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit authenticator code.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const { data: challengeData, error: challengeError } =
      await supabase.auth.mfa.challenge({
        factorId: enrollment.id,
      });

    if (challengeError) {
      setError(challengeError.message);
      setLoading(false);
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId: enrollment.id,
      challengeId: challengeData.id,
      code,
    });

    if (verifyError) {
      setError(verifyError.message);
      setLoading(false);
      return;
    }

    setMessage(
      "Authenticator successfully enabled. Your session is now MFA verified."
    );

    setCode("");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#080c1e] px-6 py-12 text-slate-900 dark:text-white transition-colors duration-200">
      <div className="mx-auto max-w-xl">
        <Link
          href="/admin/settings"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Settings</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/40 font-medium">
              Account Security
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Two-Factor Authentication (MFA)
            </h1>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600 dark:text-white/60 leading-relaxed">
          Add an extra layer of protection to your Kodalic admin account using an authenticator application.
        </p>

        {!enrollment && (
          <div className="mt-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] p-6 shadow-sm dark:shadow-none">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-[#5b3df5] dark:text-[#a78bfa]" />
              <span>Enable Authenticator App</span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-white/60">
              Use Google Authenticator, Microsoft Authenticator, Authy,
              1Password, or any standard TOTP-compatible application.
            </p>

            <button
              type="button"
              onClick={startEnrollment}
              disabled={loading}
              className="mt-6 rounded-xl bg-[#5b3df5] hover:bg-[#4c2ee3] px-5 py-2.5 text-xs font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Generating Secret..." : "Set Up Authenticator"}
            </button>
          </div>
        )}

        {enrollment && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] p-6 shadow-sm dark:shadow-none">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                1. Scan the QR code
              </h2>

              <p className="mt-2 text-sm text-slate-600 dark:text-white/60">
                Open your authenticator app and scan this QR code.
              </p>

              <div
                className="mx-auto mt-6 w-fit rounded-2xl bg-white p-4 border border-slate-200 dark:border-none shadow-md"
                dangerouslySetInnerHTML={{
                  __html: enrollment.qr_code,
                }}
              />

              <div className="mt-4 text-center">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-white/30">Manual Secret Key</p>
                <code className="mt-1 inline-block rounded bg-slate-100 dark:bg-black/40 px-3 py-1 font-mono text-xs text-slate-800 dark:text-white/80">
                  {enrollment.secret}
                </code>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] p-6 shadow-sm dark:shadow-none">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                2. Enter verification code
              </h2>

              <p className="mt-2 text-sm text-slate-600 dark:text-white/60">
                Enter the current 6-digit security code generated by your authenticator app.
              </p>

              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChange={(event) =>
                  setCode(event.target.value.replace(/\D/g, ""))
                }
                placeholder="000000"
                className="mt-6 w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/30 px-4 py-3 text-center text-2xl tracking-[0.5em] text-slate-900 dark:text-white outline-none placeholder:text-slate-300 dark:placeholder:text-white/20 focus:border-[#7c5dff] focus:ring-2 focus:ring-[#7c5dff]/20 transition"
              />

              <button
                type="button"
                onClick={verifyEnrollment}
                disabled={loading || code.length !== 6}
                className="mt-5 w-full rounded-xl bg-[#5b3df5] hover:bg-[#4c2ee3] px-5 py-3 text-xs font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify and Enable 2FA"}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-xs font-medium text-rose-700 dark:text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}
      </div>
    </main>
  );
}
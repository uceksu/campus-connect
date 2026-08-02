"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Eye, EyeOff, Loader2, Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin");
    }
  }, [router, status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsSubmitting(false);

    if (!result) {
      setError("Unable to sign in. Please try again.");
      return;
    }

    if (result.error === "wrong_password") {
      setError("Wrong password entered. Please try again.");
      return;
    }

    if (result.error === "user_not_found") {
      setError("User not found. Please check your email.");
      return;
    }

    if (result.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }
    window.location.href = "/admin";
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060b1a]">
        <Loader2 className="animate-spin text-[#456be5]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#060b1a] relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#456be5]/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#7c3aed]/20 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-[55%] p-16 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-[#456be5] flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Campus Connect</span>
          </div>

          <p className="text-[#a9c1ff] font-mono text-xs font-semibold uppercase tracking-[0.28em] mb-6">
            KSU UCE · Admin Portal
          </p>

          <h1 className="text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Manage your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#456be5] to-[#818cf8]">
              campus
            </span><br />
            from one place.
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            Control hostels, hospitals, academic notes, tea shops, nearby places, notices, and scholarships — all from a single powerful dashboard.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {["Hostels", "Hospitals", "Academic Notes", "Tea Shops", "Nearby Places", "Notices", "Scholarships"].map((item) => (
            <span key={item} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-medium">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Glassmorphism card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-8 lg:hidden">
              <div className="w-9 h-9 rounded-xl bg-[#456be5] flex items-center justify-center">
                <Shield size={18} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg">Campus Connect</span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
            <p className="text-slate-400 mb-8">Sign in to your admin account</p>

            <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="login-email" className="block text-sm font-medium text-slate-300">
                  Email address
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@campus.edu"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] focus:border-transparent transition-all"
                />
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label htmlFor="login-password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    id="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                id="login-submit"
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#456be5] hover:bg-[#5b7df0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 transition-all duration-200 flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in to Admin Panel"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-500">
              Protected area · Authorised personnel only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

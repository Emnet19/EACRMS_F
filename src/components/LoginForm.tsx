"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, DEMO_USERS, DEMO_PASSWORDS } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const user = DEMO_USERS.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (!user) {
      setError("No official account found for this email.");
      return;
    }

    if (DEMO_PASSWORDS[user.email.toLowerCase()] !== password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(user);
      setIsLoading(false);
    }, 500);
  };

  const inputStyle = {
    backgroundColor: theme === "dark" ? "#21262D" : "#F7F8FA",
    borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
    color: "inherit",
  };

  const labelStyle = theme === "dark" ? "#C9D1D9" : "#555B63";

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 shadow-xl border transition-colors space-y-6 max-w-lg mx-auto w-full"
      style={{
        backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
        borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
      }}
    >
      <div className="border-b pb-4" style={{ borderColor: theme === "dark" ? "#30363D" : "#D9DEE5" }}>
        <span className="text-xs font-mono font-bold text-[#0140A7] uppercase tracking-wider block">
          AUTHENTICATION GATEWAY
        </span>
        <h2 className="text-xl font-extrabold mt-1">Official Federation Sign In</h2>
        <p className="text-xs mt-1" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
          Enter your official credentials to access the control panels.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold block mb-1.5" style={{ color: labelStyle }}>
            Official Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="you@eaf.gov.et"
            autoComplete="email"
            className="w-full rounded-xl px-4 py-3 text-xs border focus:outline-none transition-colors"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="text-xs font-bold block mb-1.5" style={{ color: labelStyle }}>
            Official Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password..."
              autoComplete="current-password"
              className="w-full rounded-xl px-4 py-3 text-xs border focus:outline-none transition-colors pr-12"
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 pl-2 text-current opacity-60 hover:opacity-100 transition-opacity"
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl text-xs font-semibold text-[#D32F2F] bg-[rgba(211,47,47,0.1)] border border-[rgba(211,47,47,0.2)] text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-2xl text-xs font-extrabold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          style={{ backgroundColor: "#0140A7" }}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Authenticating Official Security Token...
            </>
          ) : (
            `Sign In →`
          )}
        </button>
      </form>

      {/* Demo Credentials Reference */}
      <div
        className="p-3 rounded-xl text-xs border font-mono space-y-1.5"
        style={{
          backgroundColor: theme === "dark" ? "#21262D" : "#FFF3CC",
          borderColor: theme === "dark" ? "#30363D" : "#E6A500",
          color: theme === "dark" ? "#C9D1D9" : "#C98F00",
        }}
      >
        <p className="font-extrabold uppercase tracking-wide">Demo Official Accounts:</p>
        {DEMO_USERS.map((u) => (
          <p key={u.id} className="text-[11px] leading-relaxed">
            <span className="font-extrabold">{u.role}:</span> {u.email} / {DEMO_PASSWORDS[u.email.toLowerCase()]}
          </p>
        ))}
      </div>

      {/* Security Footer */}
      <div
        className="p-3 rounded-xl text-xs text-center border font-mono"
        style={{
          backgroundColor: theme === "dark" ? "#21262D" : "#FFF3CC",
          borderColor: theme === "dark" ? "#30363D" : "#E6A500",
          color: theme === "dark" ? "#C9D1D9" : "#C98F00",
        }}
      >
        🔒 Protected under Ethiopian Athletics Federation Digital Security Standards.
      </div>
    </div>
  );
}

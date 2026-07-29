"use client";

import React from "react";
import { LoginForm } from "@/components/LoginForm";
import { useTheme } from "@/context/ThemeContext";

export default function LoginPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors relative overflow-hidden"
      style={{
        backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
        color: theme === "dark" ? "#F0F2F5" : "#1D1D1F",
      }}
    >
      {/* Decorative Background Orbs */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-[160px] pointer-events-none opacity-20 bg-[#0140A7]" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full blur-[160px] pointer-events-none opacity-20 bg-[#E6A500]" />

      {/* Top Header Theme Toggle */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-sm border"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
          }}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      <div className="w-full max-w-lg space-y-6 relative z-10">
        <div className="text-center space-y-3">
          <div
            className="h-16 w-16 mx-auto rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-xl"
            style={{ backgroundColor: "#0140A7" }}
          >
            EAF
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Federation Executive Portal
          </h1>
          <p className="text-xs" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
            Ethiopian Athletics Federation — Official Operations &amp; Verification Gateway
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}

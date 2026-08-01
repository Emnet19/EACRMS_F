"use client";

import React from "react";
import { useAuth, DEMO_USERS } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between px-4 sm:px-6 backdrop-blur-md transition-all border-b shadow-sm"
      style={{
        backgroundColor: theme === "dark" ? "rgba(11, 15, 25, 0.85)" : "rgba(255, 255, 255, 0.85)",
        borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
      }}
    >
      {/* Left side: Mobile Menu Button & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-xl text-current hover:bg-[var(--bg-surface-variant)] transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl font-extrabold text-white text-xs shadow-md bg-gradient-to-br from-[#0140A7] via-[#0288D1] to-[#0A4870] hover:scale-105 transition-transform"
          >
            EAF
          </div>
          <div>
            <span className="font-black text-sm sm:text-base tracking-tight block leading-tight text-[var(--text-primary)]">
              EACRMS Federation
            </span>
            <span className="text-[9px] font-mono font-extrabold tracking-widest text-[#0288D1] dark:text-[#3B82F6] block uppercase">
              National Executive Portal
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Theme Switcher & User Profile */}
      <div className="flex items-center gap-3">

        {/* Theme Toggle - Modern SVG Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center rounded-xl p-2 transition-all border hover:scale-105 hover:bg-slate-100 dark:hover:bg-slate-800"
          style={{
            backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
            color: theme === "dark" ? "#F59E0B" : "#475569",
          }}
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
        >
          {theme === "light" ? (
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          )}
        </button>

        {user ? (
          <>
            {/* Role Switcher for Demo */}
            <select
              value={user.id}
              onChange={(e) => {
                const found = DEMO_USERS.find((u) => u.id === e.target.value);
                if (found) login(found);
              }}
              className="hidden lg:block rounded-xl px-3 py-1.5 text-xs font-bold transition-all border focus:outline-none focus:ring-1 focus:ring-[#0140A7]"
              style={{
                backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
                borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
                color: theme === "dark" ? "#F8FAFC" : "#0F172A",
              }}
            >
              {DEMO_USERS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>

            {/* Sign Out Button */}
            <button
              onClick={logout}
              className="rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all border text-[#EF4444] border-red-500/20 hover:bg-red-500/10 cursor-pointer active:scale-95"
            >
              Sign Out
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
}

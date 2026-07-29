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
      className="sticky top-0 z-30 flex h-16 items-center justify-between px-4 sm:px-6 backdrop-blur-md transition-colors border-b"
      style={{
        backgroundColor: theme === "dark" ? "rgba(22, 27, 34, 0.92)" : "rgba(255, 255, 255, 0.95)",
        borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
      }}
    >
      {/* Left side: Mobile Menu Button & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg text-current hover:bg-[var(--bg-surface-variant)] transition-colors"
          aria-label="Toggle Menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl font-extrabold text-white text-sm shadow-md"
            style={{ backgroundColor: "#0140A7" }}
          >
            EAF
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight block leading-tight">
              EACRMS Federation
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-[#0288D1] block">
              NATIONAL EXECUTIVE PORTAL
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Controls, Theme Switcher & User Profile */}
      <div className="flex items-center gap-3">
        {/* Fayda System Status Badge */}
        <div
          className="hidden sm:flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
          style={{
            backgroundColor: theme === "dark" ? "rgba(1, 64, 167, 0.2)" : "#DCEBF6",
            color: "#0140A7",
            border: "1px solid rgba(1, 64, 167, 0.3)",
          }}
        >
          <span className="h-2.5 w-2.5 rounded-full animate-pulse bg-[#2E7D32]" />
          <span className="font-mono text-xs font-bold">FAYDA ID ONLINE</span>
        </div>

        {/* LIGHT / DARK THEME TOGGLE BUTTON (No "Bright" text) */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all shadow-sm border"
          style={{
            backgroundColor: theme === "dark" ? "#21262D" : "#F1F3F5",
            borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
            color: theme === "dark" ? "#F0F2F5" : "#1D1D1F",
          }}
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
        >
          {theme === "light" ? (
            <>
              <span className="text-sm">🌙</span>
              <span className="hidden md:inline font-semibold text-xs">Dark Mode</span>
            </>
          ) : (
            <>
              <span className="text-sm">☀️</span>
              <span className="hidden md:inline font-semibold text-xs">Light Mode</span>
            </>
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
              className="hidden lg:block rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors border"
              style={{
                backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
                borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                color: theme === "dark" ? "#F0F2F5" : "#1D1D1F",
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
              className="rounded-xl px-3 py-1.5 text-xs font-bold transition-all border text-[#D32F2F] hover:bg-[rgba(211,47,47,0.08)]"
              style={{ borderColor: "rgba(211,47,47,0.3)" }}
            >
              Sign Out
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
}

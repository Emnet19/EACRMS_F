"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { theme } = useTheme();

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      ),
    },
    {
      name: "Verification Panel",
      href: "/verification",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      name: "Events Control",
      href: "/events",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "Policy & Licensing",
      href: "/policy",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: "Results Portal",
      href: "/results",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      name: "Club & Roster Hub",
      href: "/clubs",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Clean User Profile Info with Glassmorphism */}
        <div
          className="p-4 mx-3 my-4 rounded-2xl border shadow-sm transition-all hover:shadow-md"
          style={{
            backgroundColor: theme === "dark" ? "rgba(30, 41, 59, 0.4)" : "rgba(241, 245, 249, 0.6)",
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.5)" : "rgba(226, 232, 240, 0.8)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center font-extrabold text-white text-xs shrink-0 shadow-md bg-gradient-to-br from-[#0140A7] to-[#0288D1]"
            >
              {user?.name.split(" ").map((n) => n[0]).join("") || "EAF"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-extrabold text-xs text-[var(--text-primary)] truncate">{user?.name}</p>
              <p className="text-[10px] font-semibold truncate text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition-all hover:translate-x-1 duration-200"
                style={
                  isActive
                    ? {
                      background: theme === "dark" 
                        ? "linear-gradient(135deg, #0140A7 0%, #0A4870 100%)" 
                        : "linear-gradient(135deg, #DCEBF6 0%, #B9D7F2 100%)",
                      color: theme === "dark" ? "#FFFFFF" : "#0140A7",
                      boxShadow: theme === "dark" 
                        ? "0 4px 12px rgba(1, 64, 167, 0.3)" 
                        : "0 4px 12px rgba(1, 64, 167, 0.08)",
                    }
                    : {
                      color: theme === "dark" ? "#94A3B8" : "#475569",
                    }
                }
              >
                <span style={{ color: isActive ? (theme === "dark" ? "#FFFFFF" : "#0140A7") : "inherit" }}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Clean Footer Info */}
      <div
        className="p-4 m-3 rounded-2xl border text-[10px] transition-all hover:bg-slate-50 dark:hover:bg-slate-900/30"
        style={{
          backgroundColor: theme === "dark" ? "rgba(30, 41, 59, 0.2)" : "rgba(248, 250, 252, 0.5)",
          borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.6)",
          color: theme === "dark" ? "#94A3B8" : "#64748B",
        }}
      >
        <p className="font-extrabold text-xs" style={{ color: theme === "dark" ? "#F8FAFC" : "#0F172A" }}>
          EACRMS Federation Portal
        </p>
        <p className="text-[9px] font-semibold mt-0.5 opacity-80">Official EAF Administration System</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex md:w-60 md:flex-col shrink-0 border-r min-h-[calc(100vh-4rem)] transition-all"
        style={{
          backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
          borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <aside
            className="relative z-50 w-64 max-w-full flex-col flex h-full shadow-2xl transition-all"
            style={{
              backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            }}
          >
            <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)" }}>
              <span className="font-bold text-xs">Federation Navigation</span>
              <button onClick={onCloseMobile} className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-xs">
                ✕
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

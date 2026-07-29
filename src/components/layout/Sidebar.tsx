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
        {/* Clean User Profile Info */}
        <div
          className="p-4 mx-3 my-4 rounded-xl border"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#F7F8FA",
            borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-full flex items-center justify-center font-semibold text-white text-xs shrink-0"
              style={{ backgroundColor: "#0140A7" }}
            >
              {user?.name.split(" ").map((n) => n[0]).join("") || "EAF"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-xs truncate">{user?.name}</p>
              <p className="text-[11px] truncate text-[#555B63] dark:text-[#8B949E]">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links without sticker badges */}
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all"
                style={
                  isActive
                    ? {
                        backgroundColor: theme === "dark" ? "#0A4870" : "#DCEBF6",
                        color: "#0140A7",
                        fontWeight: 600,
                      }
                    : {
                        color: theme === "dark" ? "#C9D1D9" : "#555B63",
                      }
                }
              >
                <span style={{ color: isActive ? "#0140A7" : "inherit" }}>
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
        className="p-3 m-3 rounded-lg border text-[11px] space-y-0.5"
        style={{
          backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
          borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
          color: theme === "dark" ? "#8B949E" : "#555B63",
        }}
      >
        <p className="font-semibold text-xs" style={{ color: theme === "dark" ? "#F0F2F5" : "#1D1D1F" }}>
          EACRMS Federation Portal
        </p>
        <p className="text-[10px]">Fayda ID Integrated • Proclamation 1284/2023</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex md:w-60 md:flex-col shrink-0 border-r min-h-[calc(100vh-4rem)] transition-colors"
        style={{
          backgroundColor: theme === "dark" ? "#0D1117" : "#FFFFFF",
          borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
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
            className="relative z-50 w-64 max-w-full flex-col flex h-full shadow-xl transition-colors"
            style={{
              backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            }}
          >
            <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: theme === "dark" ? "#30363D" : "#D9DEE5" }}>
              <span className="font-semibold text-xs">Federation Navigation</span>
              <button onClick={onCloseMobile} className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-xs">
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

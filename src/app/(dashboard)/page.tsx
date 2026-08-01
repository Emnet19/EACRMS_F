"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function FederationDashboardPage() {
  const { user } = useAuth();
  const { theme } = useTheme();

  const [auditing, setAuditing] = useState(false);
  const [auditDone, setAuditDone] = useState(false);

  const runSystemAudit = () => {
    setAuditing(true);
    setTimeout(() => {
      setAuditing(false);
      setAuditDone(true);
      setTimeout(() => setAuditDone(false), 4000);
    }, 1200);
  };

  const statCards = [
    {
      title: "Fayda Verified Athletes",
      value: "15,482",
      sub: "98.2% FAN Biometric Match",
      badge: "Verified",
      badgeBg: "rgba(46, 125, 50, 0.15)",
      badgeColor: "#2E7D32",
      icon: "ID",
    },
    {
      title: "Registered Clubs",
      value: "48 / 48",
      sub: "National League Roster Complete",
      badge: "Active",
      badgeBg: "rgba(1, 64, 167, 0.15)",
      badgeColor: "#0140A7",
      icon: "ORG",
    },
    {
      title: "Pending Verification Queues",
      value: "124",
      sub: "Requires Manual Document Audit",
      badge: "Action Required",
      badgeBg: "rgba(245, 158, 11, 0.15)",
      badgeColor: "#F59E0B",
      icon: "PENDING",
    },
    {
      title: "Live Timing Ingestors",
      value: "4 Systems",
      sub: "FinishLynx & Wind Gauges Active",
      badge: "Live Feed",
      badgeBg: "rgba(2, 136, 209, 0.15)",
      badgeColor: "#0288D1",
      icon: "LIVE",
    },
  ];

  const recentLogs = [
    { id: 1, type: "Verification", text: "Fayda FAN query verified 1,240 athlete profiles via SMS OTP engine.", time: "12m ago", badgeBg: "rgba(1,64,167,0.12)", badgeColor: "#0140A7" },
    { id: 2, type: "Audit Alert", text: "Flagged age discrepancy on U18 registry for Arada Athletics Club.", time: "35m ago", badgeBg: "rgba(211,47,47,0.12)", badgeColor: "#D32F2F" },
    { id: 3, type: "Timing Feed", text: "FinishLynx camera 01 connected for Addis Ababa Stadium 100m Final.", time: "1h ago", badgeBg: "rgba(46,125,50,0.12)", badgeColor: "#2E7D32" },
    { id: 4, type: "Policy License", text: "Mugher Cement Athletics Club renewed annual EAF competition license.", time: "3h ago", badgeBg: "rgba(230,165,0,0.15)", badgeColor: "#C98F00" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#0140A7]">
              EXECUTIVE COMMAND DASHBOARD
            </span>
            <span className="text-xs font-mono text-[#8B9098]">•</span>
            <span className="text-xs font-mono text-[#2E7D32] font-bold">SYSTEM ACTIVE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name}
          </h1>
          <p className="text-xs sm:text-sm mt-1" style={{ color: theme === "dark" ? "#C9D1D9" : "#555B63" }}>
            Federation Governance &amp; Competition Control Panel for {user?.department}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runSystemAudit}
            disabled={auditing}
            className="flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-extrabold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 hover:shadow-blue-500/20 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #0140A7 0%, #0288D1 100%)",
            }}
          >
            {auditing ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Auditing System Biometrics...
              </>
            ) : (
              <>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-extrabold tracking-wide uppercase">Run Biometric Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {auditDone && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[#10B981] text-xs font-bold flex items-center gap-2.5 animate-fadeIn shadow-sm">
          <span>🛡️</span> Biometric Registry Audit complete: 15,482 athlete FAN tokens validated with 0 unresolved integrity breaks.
        </div>
      )}

      {/* ── METRIC STAT CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl p-5 border shadow-sm transition-all hover-lift hover:shadow-md space-y-3"
            style={{
              backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
              borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-extrabold bg-[rgba(1,64,167,0.08)] text-[#0140A7] px-2.5 py-1 rounded-lg">{card.icon}</span>
              <span
                className="rounded-full px-2.5 py-0.5 text-[9px] font-mono font-extrabold"
                style={{ backgroundColor: card.badgeBg, color: card.badgeColor }}
              >
                {card.badge}
              </span>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black tracking-tight">{card.value}</p>
              <p className="text-xs font-bold mt-1" style={{ color: theme === "dark" ? "#F8FAFC" : "#0F172A" }}>
                {card.title}
              </p>
              <p className="text-[11px] mt-1.5 font-semibold" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
                {card.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── QUICK ACTION TILES ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/verification"
          className="group rounded-2xl p-6 border shadow-sm hover-lift hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          style={{
            backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
          }}
        >
          <div className="space-y-3">
            <div className="h-10 w-16 rounded-xl flex items-center justify-center text-[10px] font-mono font-extrabold bg-amber-500/10 text-amber-500 tracking-wider">
              VERIFY
            </div>
            <h3 className="font-extrabold text-base group-hover:text-[#0140A7] transition-colors text-[var(--text-primary)]">
              Verification Audit Queue
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: theme === "dark" ? "#94A3B8" : "#475569" }}>
              Audit pending Fayda FAN registrations, resolve flagged age discrepancies, and grant official federation licenses.
            </p>
          </div>
          <span className="text-xs font-extrabold text-[#0140A7] dark:text-[#3B82F6] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Open Verification Control <span className="text-sm">→</span>
          </span>
        </Link>

        <Link
          href="/events"
          className="group rounded-2xl p-6 border shadow-sm hover-lift hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          style={{
            backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
          }}
        >
          <div className="space-y-3">
            <div className="h-10 w-16 rounded-xl flex items-center justify-center text-[10px] font-mono font-extrabold bg-emerald-500/10 text-emerald-500 tracking-wider">
              EVENTS
            </div>
            <h3 className="font-extrabold text-base group-hover:text-[#0140A7] transition-colors text-[var(--text-primary)]">
              Events Setup &amp; Seeding
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: theme === "dark" ? "#94A3B8" : "#475569" }}>
              Configure track heats, seed lanes using World Athletics algorithms, and verify FinishLynx photo-finish links.
            </p>
          </div>
          <span className="text-xs font-extrabold text-[#0140A7] dark:text-[#3B82F6] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Open Events Control <span className="text-sm">→</span>
          </span>
        </Link>

        <Link
          href="/results"
          className="group rounded-2xl p-6 border shadow-sm hover-lift hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          style={{
            backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
          }}
        >
          <div className="space-y-3">
            <div className="h-10 w-16 rounded-xl flex items-center justify-center text-[10px] font-mono font-extrabold bg-blue-500/10 text-blue-500 tracking-wider">
              RESULTS
            </div>
            <h3 className="font-extrabold text-base group-hover:text-[#0140A7] transition-colors text-[var(--text-primary)]">
              Results &amp; Live Timing Portal
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: theme === "dark" ? "#94A3B8" : "#475569" }}>
              Monitor live competition standings, photo-finish timings, wind gauge readings, and export official EAF certificates.
            </p>
          </div>
          <span className="text-xs font-extrabold text-[#0140A7] dark:text-[#3B82F6] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Live Results <span className="text-sm">→</span>
          </span>
        </Link>
      </div>

      {/* ── SYSTEMIC LOGS SECTION ── */}
      <div
        className="rounded-2xl p-6 border shadow-sm space-y-5"
        style={{
          backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
          borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
        }}
      >
        <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
          <div>
            <h3 className="font-extrabold text-base text-[var(--text-primary)]">Federation Operation Logs</h3>
            <p className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8] mt-0.5">Real-time system telemetry and transaction audit log</p>
          </div>
          <span className="text-[9px] font-mono font-extrabold text-[#0140A7] bg-[rgba(1,64,167,0.08)] px-2.5 py-1 rounded-lg">
            LIVE AUDIT STREAM
          </span>
        </div>

        <div className="space-y-3">
          {recentLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-xl flex items-start gap-4 text-xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 border"
              style={{
                backgroundColor: theme === "dark" ? "rgba(30, 41, 59, 0.2)" : "#F8FAFC",
                borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)",
              }}
            >
              <span
                className="rounded-md px-2 py-0.5 text-[9px] font-mono font-extrabold uppercase shrink-0"
                style={{ backgroundColor: log.badgeBg, color: log.badgeColor }}
              >
                {log.type}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-bold leading-relaxed text-[var(--text-primary)]">{log.text}</p>
                <p className="text-[10px] font-mono mt-1 font-semibold" style={{ color: theme === "dark" ? "#64748B" : "#8B9098" }}>
                  {log.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

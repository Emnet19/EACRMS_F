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
      icon: "🆔",
    },
    {
      title: "Registered Clubs",
      value: "48 / 48",
      sub: "National League Roster Complete",
      badge: "Active",
      badgeBg: "rgba(1, 64, 167, 0.15)",
      badgeColor: "#0140A7",
      icon: "🏛️",
    },
    {
      title: "Pending Verification Queues",
      value: "124",
      sub: "Requires Manual Document Audit",
      badge: "Action Required",
      badgeBg: "rgba(245, 158, 11, 0.15)",
      badgeColor: "#F59E0B",
      icon: "⏳",
    },
    {
      title: "Live Timing Ingestors",
      value: "4 Systems",
      sub: "FinishLynx & Wind Gauges Active",
      badge: "Live Feed",
      badgeBg: "rgba(2, 136, 209, 0.15)",
      badgeColor: "#0288D1",
      icon: "⏱️",
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
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
            style={{ backgroundColor: "#0140A7" }}
          >
            {auditing ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Auditing System Biometrics...
              </>
            ) : (
              <>
                <span>🛡️</span> Run Biometric System Audit
              </>
            )}
          </button>
        </div>
      </div>

      {auditDone && (
        <div className="p-4 rounded-2xl bg-[rgba(46,125,50,0.12)] border border-[rgba(46,125,50,0.3)] text-[#2E7D32] text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <span>✅</span> Biometric Registry Audit complete: 15,482 athlete FAN tokens validated with 0 unresolved integrity breaks.
        </div>
      )}

      {/* ── METRIC STAT CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl p-5 shadow-lg transition-all hover:shadow-xl space-y-3"
            style={{
              backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl">{card.icon}</span>
              <span
                className="rounded-full px-2.5 py-0.5 text-[9px] font-mono font-bold"
                style={{ backgroundColor: card.badgeBg, color: card.badgeColor }}
              >
                {card.badge}
              </span>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold">{card.value}</p>
              <p className="text-xs font-bold mt-0.5" style={{ color: theme === "dark" ? "#F0F2F5" : "#1D1D1F" }}>
                {card.title}
              </p>
              <p className="text-[11px] mt-1" style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>
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
          className="group rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
          }}
        >
          <div className="space-y-2">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center text-xl bg-[rgba(245,158,11,0.15)] text-[#F59E0B]">
              🆔
            </div>
            <h3 className="font-extrabold text-base group-hover:text-[#0140A7] transition-colors">
              Verification Audit Queue
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
              Audit pending Fayda FAN registrations, resolve flagged age discrepancies, and grant official federation licenses.
            </p>
          </div>
          <span className="text-xs font-extrabold text-[#0140A7] group-hover:underline">
            Open Verification Control →
          </span>
        </Link>

        <Link
          href="/events"
          className="group rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
          }}
        >
          <div className="space-y-2">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center text-xl bg-[rgba(46,125,50,0.15)] text-[#2E7D32]">
              🏃
            </div>
            <h3 className="font-extrabold text-base group-hover:text-[#0140A7] transition-colors">
              Events Setup &amp; Seeding
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
              Configure track heats, seed lanes using World Athletics algorithms, and verify FinishLynx photo-finish links.
            </p>
          </div>
          <span className="text-xs font-extrabold text-[#0140A7] group-hover:underline">
            Open Events Control →
          </span>
        </Link>

        <Link
          href="/results"
          className="group rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
          }}
        >
          <div className="space-y-2">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center text-xl bg-[rgba(2,136,209,0.15)] text-[#0288D1]">
              📊
            </div>
            <h3 className="font-extrabold text-base group-hover:text-[#0140A7] transition-colors">
              Results &amp; Live Timing Portal
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
              Monitor live competition standings, photo-finish timings, wind gauge readings, and export official EAF certificates.
            </p>
          </div>
          <span className="text-xs font-extrabold text-[#0140A7] group-hover:underline">
            View Live Results →
          </span>
        </Link>
      </div>

      {/* ── SYSTEMIC LOGS SECTION ── */}
      <div
        className="rounded-2xl p-6 shadow-sm space-y-4"
        style={{
          backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
        }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base">Federation Operation Logs</h3>
          <span className="text-[10px] font-mono font-bold text-[#0140A7] bg-[rgba(1,64,167,0.1)] px-2 py-1 rounded-md">
            LIVE AUDIT STREAM
          </span>
        </div>

        <div className="space-y-3">
          {recentLogs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl flex items-start gap-3 text-xs"
              style={{
                backgroundColor: theme === "dark" ? "#21262D" : "#F7F8FA",
              }}
            >
              <span
                className="rounded-md px-2 py-0.5 text-[9px] font-mono font-bold uppercase shrink-0"
                style={{ backgroundColor: log.badgeBg, color: log.badgeColor }}
              >
                {log.type}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold leading-tight">{log.text}</p>
                <p className="text-[10px] font-mono mt-1" style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>
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

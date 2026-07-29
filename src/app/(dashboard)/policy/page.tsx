"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

export default function PolicyPage() {
  const { theme } = useTheme();

  const policies = [
    {
      code: "PROC-1284",
      title: "Digital National ID Biometric Mandate",
      authority: "Ethiopian Athletics Federation Council",
      description:
        "Pursuant to Federal Proclamation No. 1284/2023, every athlete registered in national track and road events must validate their 16-digit Fayda FAN ID. Age cheating incurs a mandatory 24-month ban.",
      status: "Enforced",
      statusColor: "#2E7D32",
    },
    {
      code: "WADA-2026",
      title: "Anti-Doping & Therapeutic Use Exemption (TUE)",
      authority: "Ethiopian NADO & World Athletics",
      description:
        "All national pool athletes are subject to unannounced out-of-competition testing. TUE filings must be submitted 30 days prior to championship registration.",
      status: "Active Policy",
      statusColor: "#0140A7",
    },
    {
      code: "CLUB-LIC-04",
      title: "Annual Club Accreditation & Roster Cap",
      authority: "EAF Member Services Desk",
      description:
        "Clubs must maintain at least 15 verified senior athletes and 10 junior athletes to retain voting rights in the EAF General Assembly.",
      status: "Annual Audit",
      statusColor: "#F59E0B",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div>
        <span className="text-xs font-mono font-bold text-[#0140A7] uppercase tracking-wider block">
          LEGAL &amp; REGULATORY FRAMEWORK
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Policy &amp; Licensing Directives
        </h1>
        <p className="text-xs mt-1" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
          Official governance rules, Proclamation compliance mandates, and club licensing requirements.
        </p>
      </div>

      {/* Primary Proclamation Card */}
      <div
        className="rounded-2xl p-6 border shadow-md space-y-4"
        style={{
          backgroundColor: theme === "dark" ? "#0A4870" : "#DCEBF6",
          borderColor: "rgba(1, 64, 167, 0.3)",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full text-white bg-[#0140A7]">
            PROCLAMATION NO. 1284/2023
          </span>
          <span className="text-xs font-bold text-[#0140A7]">Federal Gazette Certified</span>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#0A4870] dark:text-white">
            Biometric Identity Integration in Ethiopian Sports Operations
          </h2>
          <p className="text-xs leading-relaxed mt-2 text-[#555B63] dark:text-[#C9D1D9]">
            This directive establishes the Fayda National ID (FAN) as the sole legal identifier for athlete age verification, club transfer authorization, and national team selection. Any entry without a verified 16-digit FAN token is null and void.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-xl text-xs font-extrabold text-white shadow-md bg-[#0140A7]">
            📄 Download Full Proclamation PDF
          </button>
          <button className="px-4 py-2 rounded-xl text-xs font-bold border border-[#0140A7] text-[#0140A7] hover:bg-[rgba(1,64,167,0.1)]">
            📋 View Implementation Circular
          </button>
        </div>
      </div>

      {/* Directives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {policies.map((p) => (
          <div
            key={p.code}
            className="rounded-2xl p-6 border shadow-sm space-y-4 flex flex-col justify-between"
            style={{
              backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
              borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
            }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#0140A7]">{p.code}</span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[9px] font-mono font-extrabold text-white"
                  style={{ backgroundColor: p.statusColor }}
                >
                  {p.status}
                </span>
              </div>
              <h3 className="font-extrabold text-base">{p.title}</h3>
              <p className="text-[11px] font-semibold text-[#8B9098]">{p.authority}</p>
              <p className="text-xs leading-relaxed" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
                {p.description}
              </p>
            </div>

            <button className="w-full py-2 rounded-xl text-xs font-bold border border-[var(--border-color)] hover:bg-[var(--bg-surface-variant)] transition-colors">
              Read Directive →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Application {
  id: string;
  name: string;
  club: string;
  fanId: string;
  eventCategory: string;
  age: number;
  status: "Pending" | "Verified" | "Flagged";
  biometricScore: number;
  flagReason?: string;
}

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "APP-9081",
    name: "Tadu Nare",
    club: "Oromia Athletics Club",
    fanId: "FAN-9081-2241-1002",
    eventCategory: "5000m Women",
    age: 23,
    status: "Verified",
    biometricScore: 99.8,
  },
  {
    id: "APP-9082",
    name: "Lamecha Girma",
    club: "Defense Athletics Club",
    fanId: "FAN-9082-8812-4091",
    eventCategory: "3000m Steeplechase Men",
    age: 24,
    status: "Verified",
    biometricScore: 99.9,
  },
  {
    id: "APP-9083",
    name: "Selamawit Teferi",
    club: "Arada Athletics Club",
    fanId: "FAN-9083-1102-9920",
    eventCategory: "10,000m Women",
    age: 17,
    status: "Flagged",
    biometricScore: 82.4,
    flagReason: "Age discrepancy between Fayda record (2009) and club entry (2007)",
  },
  {
    id: "APP-9084",
    name: "Getaneh Molla",
    club: "Ethio Electric Athletics",
    fanId: "FAN-9084-5510-3341",
    eventCategory: "Marathon Men",
    age: 29,
    status: "Pending",
    biometricScore: 94.1,
  },
  {
    id: "APP-9085",
    name: "Gudaf Tsegay",
    club: "Banks Athletics Club",
    fanId: "FAN-9085-7711-2099",
    eventCategory: "1500m Women",
    age: 27,
    status: "Verified",
    biometricScore: 100.0,
  },
  {
    id: "APP-9086",
    name: "Berihu Aregawi",
    club: "Sidama Coffee Athletics",
    fanId: "FAN-9086-4402-8810",
    eventCategory: "10,000m Men",
    age: 23,
    status: "Pending",
    biometricScore: 91.5,
  },
];

export default function VerificationPage() {
  const { theme } = useTheme();
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [filter, setFilter] = useState<"All" | "Pending" | "Verified" | "Flagged">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const filteredApps = applications.filter((app) => {
    const matchesFilter = filter === "All" || app.status === filter;
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.fanId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: "Verified" | "Flagged") => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    if (selectedApp?.id === id) {
      setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const pendingCount = applications.filter((a) => a.status === "Pending").length;
  const flaggedCount = applications.filter((a) => a.status === "Flagged").length;
  const verifiedCount = applications.filter((a) => a.status === "Verified").length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-extrabold text-[#0140A7] tracking-widest uppercase block mb-1">
            BIOMETRIC CONTROL PANEL
          </span>
          <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
            Fayda FAN Verification Audit Queue
          </h1>
          <p className="text-xs font-semibold mt-0.5" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
            Audit National ID biometrics, age limits, and issue official EAF athlete competition licenses.
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={() => {
            setApplications((prev) =>
              prev.map((a) => (a.status === "Pending" ? { ...a, status: "Verified" } : a))
            );
          }}
          className="bg-gradient-to-r from-[#10B981] to-[#059669] hover:shadow-lg text-white font-extrabold rounded-2xl px-5 py-3 text-xs active:scale-[0.98] transition-all cursor-pointer hover:scale-[1.01]"
        >
          ✓ Batch Approve All Pending ({pendingCount})
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-5">
        <div
          className="rounded-3xl p-5 border text-center shadow-xs hover-lift transition-all"
          style={{
            backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
          }}
        >
          <p className="text-2xl font-black text-[#10B981] tracking-tight">{verifiedCount}</p>
          <p className="text-xs font-semibold mt-1" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
            Verified Athletes
          </p>
        </div>
        <div
          className="rounded-3xl p-5 border text-center shadow-xs hover-lift transition-all"
          style={{
            backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
          }}
        >
          <p className="text-2xl font-black text-amber-500 tracking-tight">{pendingCount}</p>
          <p className="text-xs font-semibold mt-1" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
            Pending Review
          </p>
        </div>
        <div
          className="rounded-3xl p-5 border text-center shadow-xs hover-lift transition-all"
          style={{
            backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
          }}
        >
          <p className="text-2xl font-black text-rose-500 tracking-tight">{flaggedCount}</p>
          <p className="text-xs font-semibold mt-1" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
            Age / Biometric Flags
          </p>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl border" style={{
          backgroundColor: theme === "dark" ? "#1E293B" : "#FFFFFF",
          borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.5)" : "rgba(226, 232, 240, 0.8)",
        }}>
          {(["All", "Pending", "Flagged", "Verified"] as const).map((tab) => {
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className="rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer"
                style={{
                  backgroundColor: isActive
                    ? "#0140A7"
                    : "transparent",
                  color: isActive ? "#FFFFFF" : "inherit",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by athlete name, club, or FAN ID..."
          className="w-full sm:w-72 rounded-2xl px-4 py-2.5 text-xs border focus:outline-none focus:ring-2 focus:ring-[#0140A7] shadow-sm"
          style={{
            backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
            color: "inherit",
          }}
        />
      </div>

      {/* Applications Table & Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Column */}
        <div
          className="lg:col-span-2 rounded-3xl border overflow-hidden shadow-sm"
          style={{
            backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className="border-b uppercase font-mono text-[10px]"
                style={{
                  backgroundColor: theme === "dark" ? "rgba(30, 41, 59, 0.3)" : "#F8FAFC",
                  borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)",
                  color: theme === "dark" ? "#94A3B8" : "#64748B",
                }}
              >
                <tr>
                  <th className="p-4 font-bold">Athlete &amp; Club</th>
                  <th className="p-4 font-bold">Fayda FAN ID</th>
                  <th className="p-4 font-bold">Biometric Match</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 text-right font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
                {filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/10"
                    style={{
                      backgroundColor: selectedApp?.id === app.id
                        ? theme === "dark" ? "rgba(1, 64, 167, 0.15)" : "#DCEBF6"
                        : "transparent",
                    }}
                  >
                    <td className="p-4">
                      <p className="font-extrabold text-[var(--text-primary)]">{app.name}</p>
                      <p className="text-[10px] font-semibold mt-0.5" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
                        {app.club} &bull; {app.eventCategory}
                      </p>
                    </td>
                    <td className="p-4 font-mono font-semibold text-[#64748B] dark:text-[#94A3B8]">{app.fanId}</td>
                    <td className="p-4">
                      <span className="font-mono font-black text-[#0140A7] dark:text-[#3B82F6]">
                        {app.biometricScore}%
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[9px] font-mono font-extrabold text-white"
                        style={{
                          backgroundColor:
                            app.status === "Verified"
                              ? "#10B981"
                              : app.status === "Flagged"
                                ? "#EF4444"
                                : "#F59E0B",
                        }}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApp(app);
                        }}
                        className="px-2.5 py-1 text-[11px] font-extrabold bg-[#0140A7]/10 dark:bg-[#3B82F6]/10 text-[#0140A7] dark:text-[#3B82F6] rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs border border-transparent"
                      >
                        Audit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Detail Inspector */}
        <div
          className="rounded-3xl p-6 border shadow-sm space-y-5 flex flex-col justify-between"
          style={{
            backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
          }}
        >
          {selectedApp ? (
            <div className="space-y-5">
              <div className="border-b pb-4" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
                <span className="text-[9px] font-mono font-extrabold text-[#0140A7] dark:text-[#3B82F6] bg-blue-500/10 px-2.5 py-1 rounded-lg uppercase">
                  APPLICATION AUDIT DOSSIER
                </span>
                <h3 className="text-lg font-black tracking-tight mt-2.5 text-[var(--text-primary)]">{selectedApp.name}</h3>
                <p className="text-xs font-semibold" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
                  {selectedApp.club}
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.2)" : "#F1F5F9" }}>
                  <span className="font-semibold text-[#64748B] dark:text-[#94A3B8]">FAN Token:</span>
                  <span className="font-mono font-bold text-[var(--text-primary)]">{selectedApp.fanId}</span>
                </div>
                <div className="flex justify-between py-1 border-b" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.2)" : "#F1F5F9" }}>
                  <span className="font-semibold text-[#64748B] dark:text-[#94A3B8]">Registered Age:</span>
                  <span className="font-bold text-[var(--text-primary)]">{selectedApp.age} years old</span>
                </div>
                <div className="flex justify-between py-1 border-b" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.2)" : "#F1F5F9" }}>
                  <span className="font-semibold text-[#64748B] dark:text-[#94A3B8]">Biometric Score:</span>
                  <span className="font-mono font-black text-[#10B981]">
                    {selectedApp.biometricScore}% MATCH
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.2)" : "#F1F5F9" }}>
                  <span className="font-semibold text-[#64748B] dark:text-[#94A3B8]">Event Category:</span>
                  <span className="font-bold text-[var(--text-primary)]">{selectedApp.eventCategory}</span>
                </div>

                {selectedApp.flagReason && (
                  <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-[#EF4444] text-xs font-semibold space-y-1">
                    <p className="font-black text-[#EF4444] text-[10px] tracking-wider uppercase">FLAG REASON:</p>
                    <p className="leading-relaxed">{selectedApp.flagReason}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3.5 pt-4">
                <button
                  onClick={() => handleUpdateStatus(selectedApp.id, "Verified")}
                  className="w-full py-3 rounded-2xl text-xs font-extrabold text-white shadow-md bg-gradient-to-r from-[#10B981] to-[#059669] hover:shadow-lg transform active:scale-95 transition-all cursor-pointer"
                >
                  ✓ Approve &amp; Issue EAF License
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedApp.id, "Flagged")}
                  className="w-full py-3 rounded-2xl text-xs font-extrabold text-white shadow-md bg-gradient-to-r from-[#EF4444] to-[#DC2626] hover:shadow-lg transform active:scale-95 transition-all cursor-pointer"
                >
                  🚩 Flag for Biometric Hearing
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-64 space-y-3" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
              <span className="text-3xl animate-bounce">👈</span>
              <p className="text-xs font-bold leading-relaxed max-w-[200px]">Select an athlete application from the list to audit dossier details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

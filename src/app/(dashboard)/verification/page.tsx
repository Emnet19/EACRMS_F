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
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#0140A7] uppercase tracking-wider block">
            BIOMETRIC CONTROL PANEL
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Fayda FAN Verification Audit Queue
          </h1>
          <p className="text-xs mt-1" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
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
          className="rounded-xl px-4 py-2.5 text-xs font-extrabold text-white shadow-md transition-all active:scale-95"
          style={{ backgroundColor: "#2E7D32" }}
        >
          ✓ Batch Approve All Pending ({pendingCount})
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div
          className="rounded-2xl p-4 border text-center"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
          }}
        >
          <p className="text-2xl font-extrabold text-[#2E7D32]">{verifiedCount}</p>
          <p className="text-xs font-semibold" style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>
            Verified Athletes
          </p>
        </div>
        <div
          className="rounded-2xl p-4 border text-center"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
          }}
        >
          <p className="text-2xl font-extrabold text-[#F59E0B]">{pendingCount}</p>
          <p className="text-xs font-semibold" style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>
            Pending Review
          </p>
        </div>
        <div
          className="rounded-2xl p-4 border text-center"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
          }}
        >
          <p className="text-2xl font-extrabold text-[#D32F2F]">{flaggedCount}</p>
          <p className="text-xs font-semibold" style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>
            Age / Biometric Flags
          </p>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border" style={{
          backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
          borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
        }}>
          {(["All", "Pending", "Flagged", "Verified"] as const).map((tab) => {
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className="rounded-lg px-3 py-1.5 text-xs font-bold transition-colors"
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
          className="w-full sm:w-72 rounded-xl px-4 py-2 text-xs border focus:outline-none"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
            color: "inherit",
          }}
        />
      </div>

      {/* Applications Table & Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Column */}
        <div
          className="lg:col-span-2 rounded-2xl border overflow-hidden shadow-sm"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className="border-b uppercase font-mono text-[10px]"
                style={{
                  backgroundColor: theme === "dark" ? "#21262D" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                  color: theme === "dark" ? "#8B949E" : "#8B9098",
                }}
              >
                <tr>
                  <th className="p-4">Athlete &amp; Club</th>
                  <th className="p-4">Fayda FAN ID</th>
                  <th className="p-4">Biometric Match</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: theme === "dark" ? "#30363D" : "#F1F3F5" }}>
                {filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="cursor-pointer transition-colors hover:bg-[var(--bg-surface-variant)]"
                    style={{
                      backgroundColor: selectedApp?.id === app.id
                        ? theme === "dark" ? "#21262D" : "#DCEBF6"
                        : "transparent",
                    }}
                  >
                    <td className="p-4">
                      <p className="font-extrabold">{app.name}</p>
                      <p className="text-[10px]" style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>
                        {app.club} • {app.eventCategory}
                      </p>
                    </td>
                    <td className="p-4 font-mono text-[11px]">{app.fanId}</td>
                    <td className="p-4">
                      <span className="font-mono font-bold text-[#0140A7]">
                        {app.biometricScore}%
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[9px] font-mono font-extrabold text-white"
                        style={{
                          backgroundColor:
                            app.status === "Verified"
                              ? "#2E7D32"
                              : app.status === "Flagged"
                                ? "#D32F2F"
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
                        className="text-xs font-bold text-[#0140A7] hover:underline"
                      >
                        Audit →
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
          className="rounded-2xl p-6 border shadow-sm space-y-5 flex flex-col justify-between"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
          }}
        >
          {selectedApp ? (
            <div className="space-y-5">
              <div className="border-b pb-3" style={{ borderColor: theme === "dark" ? "#30363D" : "#D9DEE5" }}>
                <span className="text-[10px] font-mono font-bold text-[#0140A7]">
                  APPLICATION AUDIT DOSSIER
                </span>
                <h3 className="text-lg font-extrabold mt-1">{selectedApp.name}</h3>
                <p className="text-xs" style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>
                  {selectedApp.club}
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b" style={{ borderColor: theme === "dark" ? "#21262D" : "#F1F3F5" }}>
                  <span style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>FAN Token:</span>
                  <span className="font-mono font-bold">{selectedApp.fanId}</span>
                </div>
                <div className="flex justify-between py-1 border-b" style={{ borderColor: theme === "dark" ? "#21262D" : "#F1F3F5" }}>
                  <span style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>Registered Age:</span>
                  <span className="font-bold">{selectedApp.age} years old</span>
                </div>
                <div className="flex justify-between py-1 border-b" style={{ borderColor: theme === "dark" ? "#21262D" : "#F1F3F5" }}>
                  <span style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>Biometric Score:</span>
                  <span className="font-mono font-extrabold text-[#2E7D32]">
                    {selectedApp.biometricScore}% MATCH
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b" style={{ borderColor: theme === "dark" ? "#21262D" : "#F1F3F5" }}>
                  <span style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>Event Category:</span>
                  <span className="font-bold">{selectedApp.eventCategory}</span>
                </div>

                {selectedApp.flagReason && (
                  <div className="p-3 rounded-xl bg-[rgba(211,47,47,0.1)] border border-[rgba(211,47,47,0.3)] text-[#D32F2F] text-xs font-semibold space-y-1">
                    <p className="font-bold text-[#D32F2F]">FLAG REASON:</p>
                    <p>{selectedApp.flagReason}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleUpdateStatus(selectedApp.id, "Verified")}
                  className="w-full py-2.5 rounded-xl text-xs font-extrabold text-white shadow-md"
                  style={{ backgroundColor: "#2E7D32" }}
                >
                  ✓ Approve &amp; Issue EAF License
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedApp.id, "Flagged")}
                  className="w-full py-2.5 rounded-xl text-xs font-extrabold text-white shadow-md"
                  style={{ backgroundColor: "#D32F2F" }}
                >
                  🚩 Flag for Biometric Hearing
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-64 space-y-2" style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>
              <span className="text-3xl">👈</span>
              <p className="text-xs font-semibold">Select an athlete application from the list to audit dossier details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

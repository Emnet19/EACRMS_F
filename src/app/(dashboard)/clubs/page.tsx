"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";

interface Club {
  id: string;
  name: string;
  region: string;
  athletesCount: number;
  verificationRate: number;
  headCoach: string;
  status: "Accredited" | "Audit Required";
}

export default function ClubsPage() {
  const { theme } = useTheme();
  const { clubs } = useData();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredClubs = clubs.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-extrabold text-[#0140A7] tracking-widest uppercase block mb-1">
              ATHLETE MANAGEMENT HUB
            </span>
            <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
              Club &amp; Athlete Roster Hub
            </h1>
            <p className="text-xs font-semibold mt-0.5" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
              Monitor accreditation, verification rates, and rosters for all Ethiopian athletics clubs.
            </p>
          </div>

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by club or region..."
              className="rounded-2xl px-4 py-2.5 text-xs border focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent w-full sm:w-64 transition-all shadow-sm"
              style={{
                backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
                borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
                color: "inherit",
              }}
            />
            <span className="absolute right-3.5 top-3 text-[#64748B] text-xs pointer-events-none">🔍</span>
          </div>
        </div>

        {/* Registration Buttons */}
        <div className="flex flex-wrap gap-3 border-b pb-4" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
          <button
            onClick={() => router.push('/clubs/register')}
            className="bg-gradient-to-r from-[#0140A7] to-[#0A4870] hover:shadow-lg text-white font-extrabold rounded-2xl px-5 py-3 text-xs active:scale-[0.98] transition-all cursor-pointer hover:scale-[1.01]"
          >
            Register New Club
          </button>
          <button
            onClick={() => router.push('/clubs/register-athlete')}
            className="bg-gradient-to-r from-[#10B981] to-[#059669] hover:shadow-lg text-white font-extrabold rounded-2xl px-5 py-3 text-xs active:scale-[0.98] transition-all cursor-pointer hover:scale-[1.01]"
          >
            Register Athlete Member
          </button>
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="rounded-3xl p-6 border shadow-sm hover-lift hover:shadow-md transition-all space-y-4"
            style={{
              backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
              borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-extrabold text-[#0140A7] dark:text-[#3B82F6] bg-[rgba(1,64,167,0.08)] px-2.5 py-1 rounded-lg">
                {club.id}
              </span>
              <span
                className="rounded-full px-2.5 py-0.5 text-[9px] font-mono font-extrabold text-white"
                style={{
                  backgroundColor: club.status === "Accredited" ? "#10B981" : "#F59E0B",
                }}
              >
                {club.status}
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight text-[var(--text-primary)]">{club.name}</h3>
              <p className="text-xs mt-1.5 flex items-center gap-1 font-semibold" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
                <span className="text-[10px] font-extrabold opacity-60">REGION:</span>
                <span>{club.region}</span>
              </p>
            </div>

            <div className="space-y-2 text-xs border-t pt-4" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#64748B] dark:text-[#94A3B8]">Athletes:</span>
                <span className="font-extrabold">{club.athletesCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#64748B] dark:text-[#94A3B8]">Verification:</span>
                <span className="font-black text-[#0140A7] dark:text-[#3B82F6]">{club.verificationRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#64748B] dark:text-[#94A3B8]">Head Coach:</span>
                <span className="font-extrabold text-[11px]">{club.headCoach}</span>
              </div>
            </div>

            <button
              className="w-full mt-2 bg-gradient-to-r from-[#0140A7] to-[#0A4870] hover:shadow-md text-white px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all hover:scale-[1.02] cursor-pointer active:scale-95 text-center flex items-center justify-center gap-1 shadow-sm"
              onClick={() => router.push(`/clubs/${club.id}`)}
            >
              <span>Inspect Club Roster</span>
              <span className="text-sm">→</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

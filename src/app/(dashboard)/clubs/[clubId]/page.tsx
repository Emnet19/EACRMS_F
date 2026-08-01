"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { useData } from "@/context/DataContext";
import { useParams, useRouter } from "next/navigation";

export default function ClubRosterPage() {
  const { theme } = useTheme();
  const { getClubById, getAthletesByClub } = useData();
  const params = useParams();
  const router = useRouter();
  const clubId = params.clubId as string;

  const club = getClubById(clubId);
  const athletes = getAthletesByClub(clubId);

  if (!club) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Club Not Found</h2>
          <p className="text-sm mb-4" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
            The requested club roster could not be found.
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#0140A7] text-white rounded text-sm font-medium hover:bg-[#0A4870] transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-extrabold text-[#0140A7] dark:text-[#3B82F6] bg-[rgba(1,64,167,0.08)] px-2.5 py-1 rounded-lg uppercase tracking-wider">
            Club Profile
          </span>
          <h1 className="text-2xl font-black tracking-tight mt-1.5 text-[var(--text-primary)]">{club.name} - Roster</h1>
          <p className="text-xs font-semibold mt-1" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
            {club.region} &bull; Head Coach: <span className="text-[var(--text-primary)]">{club.headCoach}</span>
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2.5 border rounded-2xl text-xs font-extrabold transition-all hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer active:scale-95 self-start sm:self-center"
          style={{
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.5)" : "rgba(226, 232, 240, 0.8)",
            color: theme === "dark" ? "#F8FAFC" : "#0F172A",
          }}
        >
          &larr; Back to Clubs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div
          className="p-5 rounded-3xl border shadow-sm"
          style={{
            backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
          }}
        >
          <div className="text-2xl font-black tracking-tight">{athletes.length}</div>
          <div className="text-xs font-semibold mt-1" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
            Total Athletes
          </div>
        </div>
        <div
          className="p-5 rounded-3xl border shadow-sm"
          style={{
            backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
          }}
        >
          <div className="text-2xl font-black text-emerald-500 tracking-tight">
            {athletes.filter(a => a.status === "Active").length}
          </div>
          <div className="text-xs font-semibold mt-1" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
            Active Competitors
          </div>
        </div>
        <div
          className="p-5 rounded-3xl border shadow-sm"
          style={{
            backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
          }}
        >
          <div className="text-2xl font-black text-amber-500 tracking-tight">
            {athletes.filter(a => a.status === "Retired").length}
          </div>
          <div className="text-xs font-semibold mt-1" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
            Retired Alumni
          </div>
        </div>
        <div
          className="p-5 rounded-3xl border shadow-sm"
          style={{
            backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
            borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
          }}
        >
          <div className="text-2xl font-black text-[#0140A7] dark:text-[#3B82F6] tracking-tight">100%</div>
          <div className="text-xs font-semibold mt-1" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
            Verification Rate
          </div>
        </div>
      </div>

      {/* Athletes List */}
      <div
        className="rounded-3xl border overflow-hidden shadow-sm"
        style={{
          backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
          borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
        }}
      >
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
          <h3 className="font-extrabold text-sm text-[var(--text-primary)]">Club Athlete Registry</h3>
          <span className="text-[9px] font-mono font-extrabold text-[#10B981] bg-emerald-500/10 px-2 py-0.5 rounded">ROSTER CERTIFIED</span>
        </div>
        <div className="divide-y" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
          {athletes.map((athlete) => (
            <div key={athlete.id} className="px-6 py-4 flex items-center justify-between transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/20">
              <div>
                <div className="font-extrabold text-sm text-[var(--text-primary)]">{athlete.name}</div>
                <div className="text-xs font-semibold mt-1" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
                  {athlete.discipline} &bull; <span className="font-mono">{athlete.faydaId}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-extrabold text-white`}
                  style={{
                    backgroundColor: athlete.status === "Active" ? "#10B981" : "#F59E0B",
                  }}
                >
                  {athlete.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{club.name} - Roster</h1>
          <p className="text-sm mt-1" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
            {club.region} • Head Coach: {club.headCoach}
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border rounded text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          style={{
            borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
          }}
        >
          ← Back to Clubs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          className="p-4 rounded border"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
          }}
        >
          <div className="text-2xl font-bold">{athletes.length}</div>
          <div className="text-sm" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
            Total Athletes
          </div>
        </div>
        <div
          className="p-4 rounded border"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
          }}
        >
          <div className="text-2xl font-bold text-green-600">
            {athletes.filter(a => a.status === "Active").length}
          </div>
          <div className="text-sm" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
            Active Athletes
          </div>
        </div>
        <div
          className="p-4 rounded border"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
          }}
        >
          <div className="text-2xl font-bold text-orange-600">
            {athletes.filter(a => a.status === "Retired").length}
          </div>
          <div className="text-sm" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
            Retired Athletes
          </div>
        </div>
        <div
          className="p-4 rounded border"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
          }}
        >
          <div className="text-2xl font-bold text-[#0140A7]">100%</div>
          <div className="text-sm" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
            Verification Rate
          </div>
        </div>
      </div>

      {/* Athletes List */}
      <div
        className="rounded border overflow-hidden"
        style={{
          backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
          borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
        }}
      >
        <div className="px-4 py-3 border-b" style={{ borderColor: theme === "dark" ? "#30363D" : "#D0D7DE" }}>
          <h3 className="font-semibold">Registered Athletes</h3>
        </div>
        <div className="divide-y" style={{ borderColor: theme === "dark" ? "#30363D" : "#D0D7DE" }}>
          {athletes.map((athlete) => (
            <div key={athlete.id} className="px-4 py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{athlete.name}</div>
                <div className="text-sm" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
                  {athlete.discipline} • {athlete.faydaId}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${athlete.status === "Active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                    }`}
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
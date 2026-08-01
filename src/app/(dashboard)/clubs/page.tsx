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
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">
              Club &amp; Athlete Roster Hub
            </h1>
            <p className="text-sm mt-1" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
              Monitor accreditation, verification rates, and rosters for all Ethiopian athletics clubs.
            </p>
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by club name or region..."
            className="rounded px-3 py-2 text-sm border focus:outline-none focus:ring-1 focus:ring-[#0140A7] focus:border-transparent w-full sm:w-64 transition-all"
            style={{
              backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
              borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
              color: "inherit",
            }}
          />
        </div>

        {/* Registration Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => router.push('/clubs/register')}
            className="bg-[#0140A7] hover:bg-[#0A4870] text-white font-semibold"
          >
            Register New Club
          </Button>
          <Button
            onClick={() => router.push('/clubs/register-athlete')}
            className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold"
          >
            Register Athlete Member
          </Button>
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all space-y-3"
            style={{
              backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#0140A7] bg-[#DCEBF6] dark:bg-[rgba(1,64,167,0.15)] px-2.5 py-0.5 rounded-md">
                {club.id}
              </span>
              <span
                className="rounded-full px-2.5 py-0.5 text-[9px] font-bold text-white"
                style={{
                  backgroundColor: club.status === "Accredited" ? "#2E7D32" : "#F59E0B",
                }}
              >
                {club.status}
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">{club.name}</h3>
              <p className="text-sm mt-0.5 flex items-center gap-1" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
                <span className="text-xs font-bold">REGION:</span>
                <span>{club.region}</span>
              </p>
            </div>

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between items-center">
                <span style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>Athletes:</span>
                <span className="font-bold">{club.athletesCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>Verification:</span>
                <span className="font-bold text-[#0140A7]">{club.verificationRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>Head Coach:</span>
                <span className="font-bold text-xs">{club.headCoach}</span>
              </div>
            </div>

            <button
              className="w-full text-[#0140A7] hover:bg-[#DCEBF6] dark:hover:bg-[rgba(1,64,167,0.1)] px-3 py-2 rounded-xl text-sm font-extrabold transition-all"
              onClick={() => router.push(`/clubs/${club.id}`)}
            >
              Inspect Club Roster →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

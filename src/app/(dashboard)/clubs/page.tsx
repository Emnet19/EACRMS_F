"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Club {
  id: string;
  name: string;
  region: string;
  athletesCount: number;
  verificationRate: number;
  headCoach: string;
  status: "Accredited" | "Audit Required";
}

const CLUBS_DATA: Club[] = [
  {
    id: "CLUB-01",
    name: "Oromia Athletics Club",
    region: "Oromia Region",
    athletesCount: 142,
    verificationRate: 99.2,
    headCoach: "Tolosa Kotu",
    status: "Accredited",
  },
  {
    id: "CLUB-02",
    name: "Defense Athletics Club (Mekelakeya)",
    region: "National Defense",
    athletesCount: 185,
    verificationRate: 100.0,
    headCoach: "Hussein Shibo",
    status: "Accredited",
  },
  {
    id: "CLUB-03",
    name: "Ethio Electric Athletics Club",
    region: "Federal Corporate",
    athletesCount: 96,
    verificationRate: 97.8,
    headCoach: "Woldemeskel Kostre",
    status: "Accredited",
  },
  {
    id: "CLUB-04",
    name: "Banks Athletics Club (Bankoch)",
    region: "Federal Corporate",
    athletesCount: 110,
    verificationRate: 98.5,
    headCoach: "Yilma Berta",
    status: "Accredited",
  },
  {
    id: "CLUB-05",
    name: "Arada Athletics Club",
    region: "Addis Ababa City Administration",
    athletesCount: 64,
    verificationRate: 89.0,
    headCoach: "Gezahegne Abera",
    status: "Audit Required",
  },
  {
    id: "CLUB-06",
    name: "Sidama Coffee Athletics Club",
    region: "Sidama Region",
    athletesCount: 78,
    verificationRate: 96.1,
    headCoach: "Miruts Yifter",
    status: "Accredited",
  },
];

export default function ClubsPage() {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");

  const filteredClubs = CLUBS_DATA.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#0140A7] uppercase tracking-wider block">
            NATIONAL LEAGUE DIRECTORY
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Club &amp; Athlete Roster Hub
          </h1>
          <p className="text-xs mt-1" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
            Monitor accreditation, Fayda FAN verification rates, and rosters for all 48 Ethiopian athletics clubs.
          </p>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by club name or region..."
          className="rounded-xl px-4 py-2 text-xs border focus:outline-none w-full sm:w-64"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
            color: "inherit",
          }}
        />
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="rounded-2xl p-6 border shadow-sm space-y-4 flex flex-col justify-between"
            style={{
              backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
              borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
            }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#0140A7]">{club.id}</span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[9px] font-mono font-extrabold text-white"
                  style={{
                    backgroundColor: club.status === "Accredited" ? "#2E7D32" : "#F59E0B",
                  }}
                >
                  {club.status}
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-base">{club.name}</h3>
                <p className="text-xs" style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>
                  📍 {club.region}
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between py-1 border-b" style={{ borderColor: theme === "dark" ? "#21262D" : "#F1F3F5" }}>
                  <span style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>Registered Athletes:</span>
                  <span className="font-extrabold">{club.athletesCount}</span>
                </div>
                <div className="flex justify-between py-1 border-b" style={{ borderColor: theme === "dark" ? "#21262D" : "#F1F3F5" }}>
                  <span style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>FAN Verification Rate:</span>
                  <span className="font-mono font-extrabold text-[#0140A7]">{club.verificationRate}%</span>
                </div>
                <div className="flex justify-between py-1 border-b" style={{ borderColor: theme === "dark" ? "#21262D" : "#F1F3F5" }}>
                  <span style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>Head Coach:</span>
                  <span className="font-semibold">{club.headCoach}</span>
                </div>
              </div>
            </div>

            <button className="w-full py-2 rounded-xl text-xs font-extrabold border text-[#0140A7] hover:bg-[rgba(1,64,167,0.08)]">
              Inspect Club Roster →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

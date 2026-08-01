"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface ResultItem {
  rank: number;
  athleteName: string;
  club: string;
  bib: string;
  timeMark: string;
  reactionTime: string;
  windSpeed: string;
  status: "Gold" | "Silver" | "Bronze" | "Qualified" | "DNS" | "DQ";
  recordNote?: string;
}

// Event-specific results data
const EVENT_RESULTS: Record<string, ResultItem[]> = {
  "5000m Men Final": [
    {
      rank: 1,
      athleteName: "Kenenisa Bekele",
      club: "Defense Athletics Club",
      bib: "BIB-101",
      timeMark: "12:54.12",
      reactionTime: "0.142s",
      windSpeed: "+0.8 m/s",
      status: "Gold",
      recordNote: "Championship Record (CR)",
    },
    {
      rank: 2,
      athleteName: "Yomif Kejelcha",
      club: "Oromia Athletics Club",
      bib: "BIB-104",
      timeMark: "12:55.80",
      reactionTime: "0.150s",
      windSpeed: "+0.8 m/s",
      status: "Silver",
    },
    {
      rank: 3,
      athleteName: "Hagos Gebrhiwet",
      club: "Tigray Athletics Club",
      bib: "BIB-108",
      timeMark: "12:56.04",
      reactionTime: "0.138s",
      windSpeed: "+0.8 m/s",
      status: "Bronze",
    },
    {
      rank: 4,
      athleteName: "Telahun Haile",
      club: "Sidama Coffee Athletics",
      bib: "BIB-112",
      timeMark: "13:01.45",
      reactionTime: "0.161s",
      windSpeed: "+0.8 m/s",
      status: "Qualified",
    },
    {
      rank: 5,
      athleteName: "Muktar Edris",
      club: "Ethio Electric Athletics",
      bib: "BIB-115",
      timeMark: "13:04.90",
      reactionTime: "0.155s",
      windSpeed: "+0.8 m/s",
      status: "Qualified",
    },
  ],
  "100m Women Final": [
    {
      rank: 1,
      athleteName: "Almaz Ayana",
      club: "Oromia Athletics Club",
      bib: "BIB-201",
      timeMark: "10.92",
      reactionTime: "0.128s",
      windSpeed: "+0.4 m/s",
      status: "Gold",
      recordNote: "National Record (NR)",
    },
    {
      rank: 2,
      athleteName: "Tirunesh Dibaba",
      club: "Defense Athletics Club",
      bib: "BIB-205",
      timeMark: "11.04",
      reactionTime: "0.135s",
      windSpeed: "+0.4 m/s",
      status: "Silver",
    },
    {
      rank: 3,
      athleteName: "Genzebe Dibaba",
      club: "Banks Athletics Club",
      bib: "BIB-208",
      timeMark: "11.18",
      reactionTime: "0.142s",
      windSpeed: "+0.4 m/s",
      status: "Bronze",
    },
    {
      rank: 4,
      athleteName: "Gudaf Tsegay",
      club: "Sidama Coffee Athletics",
      bib: "BIB-212",
      timeMark: "11.35",
      reactionTime: "0.150s",
      windSpeed: "+0.4 m/s",
      status: "Qualified",
    },
    {
      rank: 5,
      athleteName: "Tadu Nare",
      club: "Ethio Electric Athletics",
      bib: "BIB-215",
      timeMark: "11.52",
      reactionTime: "0.155s",
      windSpeed: "+0.4 m/s",
      status: "Qualified",
    },
  ],
  "10,000m Men Final": [
    {
      rank: 1,
      athleteName: "Berihu Aregawi",
      club: "Sidama Coffee Athletics",
      bib: "BIB-301",
      timeMark: "26:34.87",
      reactionTime: "0.145s",
      windSpeed: "+1.1 m/s",
      status: "Gold",
      recordNote: "Championship Record (CR)",
    },
    {
      rank: 2,
      athleteName: "Haile Gebrselassie",
      club: "Oromia Athletics Club",
      bib: "BIB-304",
      timeMark: "26:45.20",
      reactionTime: "0.148s",
      windSpeed: "+1.1 m/s",
      status: "Silver",
    },
    {
      rank: 3,
      athleteName: "Tewodros Seyoum",
      club: "Defense Athletics Club",
      bib: "BIB-308",
      timeMark: "26:52.15",
      reactionTime: "0.140s",
      windSpeed: "+1.1 m/s",
      status: "Bronze",
    },
    {
      rank: 4,
      athleteName: "Abadi Hadis",
      club: "Ethio Electric Athletics",
      bib: "BIB-312",
      timeMark: "27:01.50",
      reactionTime: "0.158s",
      windSpeed: "+1.1 m/s",
      status: "Qualified",
    },
    {
      rank: 5,
      athleteName: "Zersenay Tadese",
      club: "Banks Athletics Club",
      bib: "BIB-315",
      timeMark: "27:15.65",
      reactionTime: "0.152s",
      windSpeed: "+1.1 m/s",
      status: "Qualified",
    },
  ],
};

export default function ResultsPage() {
  const { theme } = useTheme();
  const [selectedEvent, setSelectedEvent] = useState("5000m Men Final");

  const results = EVENT_RESULTS[selectedEvent] || EVENT_RESULTS["5000m Men Final"];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#0140A7] uppercase tracking-wider block">
            FINISHLYNX LIVE DATA FEED
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Official Championship Results Portal
          </h1>
          <p className="text-xs mt-1" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
            Certified photo-finish timings, wind gauge records, and World Athletics qualification marks.
          </p>
        </div>

        <button className="rounded-xl px-4 py-2.5 text-xs font-extrabold text-white shadow-md transition-all active:scale-95 flex items-center gap-2 bg-[#0140A7] hover:bg-[#0A4870]">
          Export Results Bulletin (PDF / CSV)
        </button>
      </div>

      {/* Selector & Feed Info */}
      <div
        className="p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
          borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
        }}
      >
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold shrink-0">Select Event:</label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="rounded-xl px-3 py-1.5 text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-[#0140A7]"
            style={{
              backgroundColor: theme === "dark" ? "#21262D" : "#F7F8FA",
              borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
              color: "inherit",
            }}
          >
            <option value="5000m Men Final">5000m Men Final (Live)</option>
            <option value="100m Women Final">100m Women Final (Official)</option>
            <option value="10,000m Men Final">10,000m Men Final (Official)</option>
          </select>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono font-bold">
          <span className="text-[#2E7D32]">WIND: +0.8 m/s (VALID)</span>
          <span className="text-[#0140A7]">TEMP: 22°C</span>
          <span className="text-[#E6A500]">CAMERA: OPTIOJ-902 SYNCED</span>
        </div>
      </div>

      {/* Results Table */}
      <div
        className="rounded-2xl border overflow-hidden shadow-sm"
        style={{
          backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
          borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
        }}
      >
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: theme === "dark" ? "#30363D" : "#D9DEE5" }}>
          <h3 className="font-extrabold text-sm">{selectedEvent} Standings</h3>
          <span className="text-[10px] font-mono font-bold text-[#2E7D32]">
            OFFICIAL FINISH LYNX VERIFIED
          </span>
        </div>

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
                <th className="p-4">Rank</th>
                <th className="p-4">BIB &amp; Athlete</th>
                <th className="p-4">Club / Region</th>
                <th className="p-4">Mark / Time</th>
                <th className="p-4">Reaction</th>
                <th className="p-4">Status / Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: theme === "dark" ? "#30363D" : "#F1F3F5" }}>
              {results.map((res) => (
                <tr key={res.rank} className="hover:bg-[var(--bg-surface-variant)] transition-colors">
                  <td className="p-4 font-mono font-extrabold text-sm">
                    {res.rank === 1 ? "1" : res.rank === 2 ? "2" : res.rank === 3 ? "3" : res.rank}
                  </td>
                  <td className="p-4">
                    <p className="font-extrabold">{res.athleteName}</p>
                    <p className="text-[10px] font-mono text-[#0140A7]">{res.bib}</p>
                  </td>
                  <td className="p-4 font-medium">{res.club}</td>
                  <td className="p-4 font-mono font-extrabold text-sm text-[#0140A7]">
                    {res.timeMark}
                  </td>
                  <td className="p-4 font-mono">{res.reactionTime}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[9px] font-mono font-extrabold text-white"
                        style={{
                          backgroundColor:
                            res.status === "Gold"
                              ? "#E6A500"
                              : res.status === "Silver"
                                ? "#8B9098"
                                : res.status === "Bronze"
                                  ? "#C98F00"
                                  : "#2E7D32",
                        }}
                      >
                        {res.status}
                      </span>
                      {res.recordNote && (
                        <span className="text-[10px] font-bold text-[#D32F2F] font-mono">
                          {res.recordNote}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

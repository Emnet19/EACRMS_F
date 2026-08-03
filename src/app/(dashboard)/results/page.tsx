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
  const [exportOpen, setExportOpen] = useState(false);

  const results = EVENT_RESULTS[selectedEvent] || EVENT_RESULTS["5000m Men Final"];

  const exportCSV = () => {
    const rows = [
      ["Rank", "BIB", "Athlete", "Club", "Mark/Time", "Reaction", "Wind", "Status", "Notes"],
      ...results.map((r) => [
        r.rank,
        r.bib,
        r.athleteName,
        r.club,
        r.timeMark,
        r.reactionTime,
        r.windSpeed,
        r.status,
        r.recordNote || "",
      ]),
    ];
    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedEvent.replace(/[^\w]+/g, "-")}-results.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setExportOpen(false);
  };

  const exportPDF = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    const rowsHtml = results
      .map(
        (r) => `
        <tr>
          <td class="rank">${r.rank}</td>
          <td>${r.bib}</td>
          <td><strong>${r.athleteName}</strong></td>
          <td>${r.club}</td>
          <td class="time">${r.timeMark}</td>
          <td>${r.reactionTime}</td>
          <td>${r.windSpeed}</td>
          <td>${r.status}${r.recordNote ? `<br/><span class="note">${r.recordNote}</span>` : ""}</td>
        </tr>`
      )
      .join("");
    win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${selectedEvent} - Official Results</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, Helvetica, sans-serif; color: #1D1D1F; padding: 32px; }
    .header { display: flex; align-items: center; gap: 14px; border-bottom: 3px solid #0140A7; padding-bottom: 16px; margin-bottom: 24px; }
    .header img { width: 56px; height: 56px; object-fit: contain; }
    .header h1 { font-size: 22px; font-weight: 800; }
    .header p { font-size: 12px; color: #555B63; margin-top: 2px; }
    .meta { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; font-size: 12px; }
    .meta span { background: #F1F5F9; border: 1px solid #E2E8F0; padding: 6px 12px; border-radius: 8px; font-weight: 700; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    thead th { background: #0140A7; color: #fff; text-align: left; padding: 10px 12px; font-size: 11px; text-transform: uppercase; }
    tbody td { padding: 10px 12px; border-bottom: 1px solid #E2E8F0; }
    tbody tr:nth-child(even) { background: #F8FAFC; }
    td.rank { font-weight: 800; }
    td.time { font-weight: 800; color: #0140A7; font-family: monospace; }
    .note { font-size: 10px; color: #B91C1C; }
    .footer { margin-top: 24px; font-size: 11px; color: #555B63; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <img src="/logo.png" alt="EAF Logo" />
    <div>
      <h1>Ethiopian Athletics Federation</h1>
      <p>Official Championship Results Bulletin - FinishLynx Certified</p>
    </div>
  </div>
  <h2 style="font-size: 16px; margin-bottom: 12px;">${selectedEvent}</h2>
  <div class="meta">
    <span>WIND: +0.8 M/S (VALID)</span>
    <span>TEMP: 22°C</span>
    <span>CAMERA: OPTIOJ-902 SYNCED</span>
    <span>DATE: ${new Date().toLocaleDateString()}</span>
  </div>
  <table>
    <thead>
      <tr><th>Rank</th><th>BIB</th><th>Athlete</th><th>Club / Region</th><th>Mark / Time</th><th>Reaction</th><th>Wind</th><th>Status / Notes</th></tr>
    </thead>
    <tbody>${rowsHtml}</tbody>
  </table>
  <p class="footer">Generated by EACRMS Federation Executive Portal • Ethiopian Athletics Federation Digital Security Standards</p>
</body>
</html>`);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      setExportOpen(false);
    }, 400);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-extrabold text-[#0140A7] tracking-widest uppercase block mb-1">
            FINISHLYNX LIVE DATA FEED
          </span>
          <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
            Official Championship Results Portal
          </h1>
          <p className="text-xs font-semibold mt-0.5" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
            Certified photo-finish timings, wind gauge records, and World Athletics qualification marks.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => setExportOpen((v) => !v)}
            className="bg-gradient-to-r from-[#0140A7] to-[#0A4870] hover:shadow-lg text-white font-extrabold rounded-2xl px-5 py-3 text-xs active:scale-[0.98] transition-all cursor-pointer hover:scale-[1.01] flex items-center gap-2"
          >
            <span>⬇</span> Export Results Bulletin
            <span className="text-[10px] opacity-80">▾</span>
          </button>

          {exportOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setExportOpen(false)} />
              <div
                className="absolute right-0 top-full mt-2 z-20 w-64 rounded-2xl border shadow-xl overflow-hidden animate-fadeIn"
                style={{
                  backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                }}
              >
                <button
                  onClick={exportPDF}
                  className="w-full text-left px-4 py-3.5 text-xs font-extrabold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"
                >
                  <span className="h-8 w-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center text-sm">📄</span>
                  <span>
                    Export as PDF
                    <span className="block text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                      Opens the bulletin for print / save as PDF
                    </span>
                  </span>
                </button>
                <div className="h-px" style={{ backgroundColor: theme === "dark" ? "#30363D" : "#D9DEE5" }} />
                <button
                  onClick={exportCSV}
                  className="w-full text-left px-4 py-3.5 text-xs font-extrabold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"
                >
                  <span className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-sm">⬇</span>
                  <span>
                    Download CSV
                    <span className="block text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                      Saves a spreadsheet-ready file to your device
                    </span>
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Selector & Feed Info */}
      <div
        className="p-5 rounded-3xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{
          backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
          borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
        }}
      >
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold shrink-0 text-[#64748B] dark:text-[#94A3B8]">Select Event:</label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="rounded-2xl px-4 py-2 text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-[#0140A7] shadow-xs cursor-pointer"
            style={{
              backgroundColor: theme === "dark" ? "#1E293B" : "#F8FAFC",
              borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.5)" : "rgba(226, 232, 240, 0.8)",
              color: "inherit",
            }}
          >
            <option value="5000m Men Final">5000m Men Final (Live)</option>
            <option value="100m Women Final">100m Women Final (Official)</option>
            <option value="10,000m Men Final">10,000m Men Final (Official)</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono font-extrabold">
          <span className="text-[#10B981] bg-emerald-500/10 px-2.5 py-1 rounded-lg">WIND: +0.8 M/S (VALID)</span>
          <span className="text-[#0140A7] dark:text-[#3B82F6] bg-blue-500/10 px-2.5 py-1 rounded-lg">TEMP: 22°C</span>
          <span className="text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-lg">CAMERA: OPTIOJ-902 SYNCED</span>
        </div>
      </div>

      {/* Results Table */}
      <div
        className="rounded-3xl border overflow-hidden shadow-sm"
        style={{
          backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
          borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
        }}
      >
        <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
          <h3 className="font-extrabold text-sm text-[var(--text-primary)]">{selectedEvent} Standings</h3>
          <span className="text-[9px] font-mono font-extrabold text-[#10B981] bg-emerald-500/10 px-2.5 py-1 rounded-lg">
            OFFICIAL FINISH LYNX VERIFIED
          </span>
        </div>

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
                <th className="p-4 font-bold">Rank</th>
                <th className="p-4 font-bold">BIB &amp; Athlete</th>
                <th className="p-4 font-bold">Club / Region</th>
                <th className="p-4 font-bold">Mark / Time</th>
                <th className="p-4 font-bold">Reaction</th>
                <th className="p-4 font-bold">Status / Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
              {results.map((res) => (
                <tr key={res.rank} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 font-mono font-extrabold text-sm">
                    {res.rank === 1 ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-amber-950 font-black text-xs shadow-xs">1</span>
                    ) : res.rank === 2 ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-300 text-slate-800 font-black text-xs shadow-xs">2</span>
                    ) : res.rank === 3 ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#CD7F32] text-white font-black text-xs shadow-xs">3</span>
                    ) : (
                      <span className="pl-2">{res.rank}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <p className="font-extrabold text-[var(--text-primary)]">{res.athleteName}</p>
                    <p className="text-[10px] font-mono font-semibold text-[#0140A7] dark:text-[#3B82F6] mt-0.5">{res.bib}</p>
                  </td>
                  <td className="p-4 font-bold text-[var(--text-primary)]">{res.club}</td>
                  <td className="p-4 font-mono font-black text-sm text-[#0140A7] dark:text-[#3B82F6]">
                    {res.timeMark}
                  </td>
                  <td className="p-4 font-mono font-semibold text-[#64748B] dark:text-[#94A3B8]">{res.reactionTime}</td>
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
                                  ? "#CD7F32"
                                  : "#10B981",
                        }}
                      >
                        {res.status}
                      </span>
                      {res.recordNote && (
                        <span className="text-[9px] font-mono font-extrabold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">
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

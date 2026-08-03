"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface RaceEvent {
  id: string;
  name: string;
  category: "Track" | "Field" | "Road";
  scheduledTime: string;
  venue: string;
  status: "Scheduled" | "Live In-Progress" | "Completed";
  entriesCount: number;
  windSpeed?: string;
  timingDevice: string;
}

const EVENTS: RaceEvent[] = [
  {
    id: "EVT-101",
    name: "100m Men Final",
    category: "Track",
    scheduledTime: "14:30 EAT Today",
    venue: "Addis Ababa Stadium",
    status: "Live In-Progress",
    entriesCount: 8,
    windSpeed: "+1.2 m/s",
    timingDevice: "FinishLynx OptiOj-902",
  },
  {
    id: "EVT-102",
    name: "5000m Women Heat 1",
    category: "Track",
    scheduledTime: "15:15 EAT Today",
    venue: "Addis Ababa Stadium",
    status: "Scheduled",
    entriesCount: 16,
    windSpeed: "0.0 m/s",
    timingDevice: "FinishLynx OptiOj-902",
  },
  {
    id: "EVT-103",
    name: "3000m Steeplechase Men",
    category: "Track",
    scheduledTime: "16:00 EAT Today",
    venue: "Addis Ababa Stadium",
    status: "Scheduled",
    entriesCount: 12,
    windSpeed: "+0.8 m/s",
    timingDevice: "FinishLynx OptiOj-902",
  },
  {
    id: "EVT-104",
    name: "Half Marathon National Championship",
    category: "Road",
    scheduledTime: "06:00 EAT Tomorrow",
    venue: "Meskel Square Circuit",
    status: "Scheduled",
    entriesCount: 140,
    timingDevice: "RFID Transponder Array",
  },
];

export default function EventsPage() {
  const { theme } = useTheme();
  const [eventsList, setEventsList] = useState<RaceEvent[]>(EVENTS);
  const [newEventName, setNewEventName] = useState("");
  const [newEventCategory, setNewEventCategory] = useState<"Track" | "Field" | "Road">("Track");
  const [newEventVenue, setNewEventVenue] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventTime, setNewEventTime] = useState("");
  const [newEventEntries, setNewEventEntries] = useState("");
  const [newEventTiming, setNewEventTiming] = useState("FinishLynx OptiOj-902");
  const [isAdding, setIsAdding] = useState(false);
  const [seedingEvent, setSeedingEvent] = useState<RaceEvent | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventName) return;

    const created: RaceEvent = {
      id: `EVT-${Math.floor(100 + Math.random() * 900)}`,
      name: newEventName,
      category: newEventCategory,
      scheduledTime: `${newEventTime || "17:00"} EAT • ${newEventDate || "Today"}`,
      venue: newEventVenue || "Addis Ababa Stadium",
      status: "Scheduled",
      entriesCount: parseInt(newEventEntries || "8", 10),
      windSpeed: "+0.0 m/s",
      timingDevice: newEventTiming,
    };

    setEventsList([created, ...eventsList]);
    setCreateSuccess(
      `Event "${created.name}" created successfully as ${created.id} at ${created.venue}. It is now shown at the top of the schedule below.`
    );
    setNewEventName("");
    setNewEventVenue("");
    setNewEventDate("");
    setNewEventTime("");
    setNewEventEntries("");
    setIsAdding(false);
    setTimeout(() => setCreateSuccess(null), 6000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#0140A7] uppercase tracking-wider block">
            COMPETITION CONTROL DESK
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Events Setup &amp; Seeding Control Panel
          </h1>
          <p className="text-xs mt-1" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
            Manage heat lane assignments, FinishLynx photo-finish links, and wind speed compliance.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-xl px-4 py-2.5 text-xs font-extrabold text-white shadow-md transition-all active:scale-95 flex items-center gap-2"
          style={{ backgroundColor: "#0140A7" }}
        >
          <span>➕</span> {isAdding ? "Cancel Setup" : "Create New Track Event"}
        </button>
      </div>

      {/* Creation Success Banner */}
      {createSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[#10B981] text-xs font-bold flex items-center gap-2.5 animate-fadeIn shadow-sm">
          <span>✅</span> {createSuccess}
        </div>
      )}

      {/* Add Event Form Modal / Expandable */}
      {isAdding && (
        <form
          onSubmit={handleCreateEvent}
          className="p-6 rounded-2xl border shadow-lg space-y-4 animate-fadeIn"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
          }}
        >
          <h3 className="font-extrabold text-base">New Championship Race Event</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold block mb-1">Event Title *</label>
              <input
                type="text"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                placeholder="e.g. 800m Men Semi-Final"
                required
                className="w-full rounded-xl px-4 py-2 text-xs border focus:outline-none"
                style={{
                  backgroundColor: theme === "dark" ? "#21262D" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                  color: "inherit",
                }}
              />
            </div>
            <div>
              <label className="text-xs font-bold block mb-1">Category *</label>
              <select
                value={newEventCategory}
                onChange={(e) => setNewEventCategory(e.target.value as "Track" | "Field" | "Road")}
                className="w-full rounded-xl px-4 py-2 text-xs border focus:outline-none"
                style={{
                  backgroundColor: theme === "dark" ? "#21262D" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                  color: "inherit",
                }}
              >
                <option value="Track">Track Event</option>
                <option value="Field">Field Event</option>
                <option value="Road">Road Race</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold block mb-1">Venue *</label>
              <input
                type="text"
                value={newEventVenue}
                onChange={(e) => setNewEventVenue(e.target.value)}
                placeholder="e.g. Addis Ababa Stadium"
                required
                className="w-full rounded-xl px-4 py-2 text-xs border focus:outline-none"
                style={{
                  backgroundColor: theme === "dark" ? "#21262D" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                  color: "inherit",
                }}
              />
            </div>
            <div>
              <label className="text-xs font-bold block mb-1">Number of Entries *</label>
              <input
                type="number"
                min={1}
                max={140}
                value={newEventEntries}
                onChange={(e) => setNewEventEntries(e.target.value)}
                placeholder="e.g. 8"
                required
                className="w-full rounded-xl px-4 py-2 text-xs border focus:outline-none"
                style={{
                  backgroundColor: theme === "dark" ? "#21262D" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                  color: "inherit",
                }}
              />
            </div>
            <div>
              <label className="text-xs font-bold block mb-1">Date *</label>
              <input
                type="date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                required
                className="w-full rounded-xl px-4 py-2 text-xs border focus:outline-none"
                style={{
                  backgroundColor: theme === "dark" ? "#21262D" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                  color: "inherit",
                }}
              />
            </div>
            <div>
              <label className="text-xs font-bold block mb-1">Start Time (EAT) *</label>
              <input
                type="time"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
                required
                className="w-full rounded-xl px-4 py-2 text-xs border focus:outline-none"
                style={{
                  backgroundColor: theme === "dark" ? "#21262D" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                  color: "inherit",
                }}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold block mb-1">Timing Device *</label>
              <select
                value={newEventTiming}
                onChange={(e) => setNewEventTiming(e.target.value)}
                className="w-full rounded-xl px-4 py-2 text-xs border focus:outline-none"
                style={{
                  backgroundColor: theme === "dark" ? "#21262D" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                  color: "inherit",
                }}
              >
                <option value="FinishLynx OptiOj-902">FinishLynx OptiOj-902</option>
                <option value="FinishLynx Camera 02">FinishLynx Camera 02</option>
                <option value="RFID Transponder Array">RFID Transponder Array</option>
                <option value="Manual Stopwatch Backup">Manual Stopwatch Backup</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-md"
            style={{ backgroundColor: "#2E7D32" }}
          >
            Save Event &amp; Seed Lanes
          </button>
        </form>
      )}

      {/* Hardware Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="p-4 rounded-2xl border flex items-center gap-3"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
          }}
        >
          <div className="h-10 w-10 rounded-xl bg-[rgba(46,125,50,0.12)] text-[#2E7D32] flex items-center justify-center font-bold text-lg">
            📷
          </div>
          <div>
            <p className="font-extrabold text-xs">FinishLynx Primary</p>
            <p className="text-[10px] font-mono text-[#2E7D32]">CONNECTED (10,000 FPS)</p>
          </div>
        </div>

        <div
          className="p-4 rounded-2xl border flex items-center gap-3"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
          }}
        >
          <div className="h-10 w-10 rounded-xl bg-[rgba(1,64,167,0.12)] text-[#0140A7] flex items-center justify-center font-bold text-lg">
            💨
          </div>
          <div>
            <p className="font-extrabold text-xs">Ultrasonic Wind Gauge</p>
            <p className="text-[10px] font-mono text-[#0140A7]">+1.2 m/s (COMPLIANT)</p>
          </div>
        </div>

        <div
          className="p-4 rounded-2xl border flex items-center gap-3"
          style={{
            backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
          }}
        >
          <div className="h-10 w-10 rounded-xl bg-[rgba(230,165,0,0.15)] text-[#E6A500] flex items-center justify-center font-bold text-xs">
            TIMER
          </div>
          <div>
            <p className="font-extrabold text-xs">False Start Gun System</p>
            <p className="text-[10px] font-mono text-[#C98F00]">ARMED (0.100s LIMIT)</p>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div
        className="rounded-3xl border overflow-hidden shadow-sm animate-fadeIn"
        style={{
          backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
          borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
        }}
      >
        <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
          <div>
            <h3 className="font-extrabold text-sm text-[var(--text-primary)]">Championship Event Schedule</h3>
            <p className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8] mt-0.5">Manage live events, camera linkages, and run assignments</p>
          </div>
          <span className="text-[9px] font-mono font-extrabold text-[#0140A7] bg-[rgba(1,64,167,0.08)] px-2.5 py-1 rounded-lg">
            WORLD ATHLETICS RULE 163 CERTIFIED
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
                <th className="p-4 font-bold">Event Code &amp; Title</th>
                <th className="p-4 font-bold">Venue &amp; Time</th>
                <th className="p-4 font-bold">Entries</th>
                <th className="p-4 font-bold">Timing Feed</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 text-right font-bold">Seeding</th>
              </tr>
            </thead>
            <tbody className="divide-y animate-fadeIn" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
              {eventsList.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="p-4">
                    <p className="font-extrabold text-[var(--text-primary)]">{evt.name}</p>
                    <p className="text-[10px] font-mono text-[#0140A7] dark:text-[#3B82F6] font-semibold mt-0.5">{evt.id} &bull; {evt.category}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-[var(--text-primary)]">{evt.venue}</p>
                    <p className="text-[10px] font-semibold mt-0.5" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
                      {evt.scheduledTime}
                    </p>
                  </td>
                  <td className="p-4 font-bold">{evt.entriesCount} Athletes</td>
                  <td className="p-4 font-mono text-[11px] text-[#64748B] dark:text-[#94A3B8]">{evt.timingDevice}</td>
                  <td className="p-4">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[9px] font-mono font-extrabold text-white"
                      style={{
                        backgroundColor:
                          evt.status === "Live In-Progress"
                            ? "#10B981"
                            : evt.status === "Completed"
                              ? "#3B82F6"
                              : "#0140A7",
                      }}
                    >
                      {evt.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSeedingEvent(evt)}
                      className="px-3.5 py-2 bg-gradient-to-r from-[#0140A7] to-[#0A4870] hover:shadow-md text-white border-0 rounded-xl text-xs font-extrabold cursor-pointer hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
                    >
                      Seed Lanes &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lane Seeding Modal */}
      {seedingEvent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-md animate-fadeIn">
          <div
            className="rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border transition-all"
            style={{
              backgroundColor: theme === "dark" ? "#131B2E" : "#FFFFFF",
              borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.6)" : "rgba(226, 232, 240, 0.8)",
            }}
          >
            <div className="flex justify-between items-start mb-6 border-b pb-4" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-16 rounded-xl bg-gradient-to-br from-[#0140A7] to-[#0A4870] flex items-center justify-center text-white text-xs font-mono font-extrabold tracking-wider shadow-sm">
                    SEEDING
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text-primary)]">{seedingEvent.name}</h2>
                    <p className="text-[10px] font-extrabold text-[#0140A7] dark:text-[#3B82F6] mt-0.5 tracking-wider uppercase">WORLD ATHLETICS LANE ASSIGNMENT ALGORITHM</p>
                  </div>
                </div>
                <p className="text-xs font-semibold mt-2.5" style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>
                  {seedingEvent.venue} &bull; {seedingEvent.scheduledTime} &bull; {seedingEvent.entriesCount} Entries
                </p>
              </div>
              <button
                onClick={() => setSeedingEvent(null)}
                className="text-xl hover:opacity-70 transition-opacity p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[var(--text-primary)] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Lane Grid Track Visualization */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                    <span className="h-5 w-5 rounded-lg bg-[#0140A7] text-white flex items-center justify-center text-[10px] font-extrabold">1</span>
                    Championship Running Track Seeding
                  </h3>
                  <span className="text-[9px] font-mono font-extrabold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">FASTEST TO CENTER</span>
                </div>

                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-wide">WORLD ATHLETICS STANDARD RULE 166</p>
                  <p className="text-xs font-semibold text-[var(--text-primary)] mt-0.5">Fastest athletes seeded to center lanes (4 and 5) for optimal straightline wind and competitor drafting visual control.</p>
                </div>

                {/* ── Visual terracotta track lanes ── */}
                <div className="rounded-2xl border overflow-hidden p-3 bg-slate-900/10 dark:bg-slate-950/40 space-y-1.5" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
                  {[
                    { lane: 1, name: "S. Barega", mark: "13:02.10", active: false },
                    { lane: 2, name: "L. Girma", mark: "12:59.88", active: false },
                    { lane: 3, name: "Y. Kejelcha", mark: "12:55.80", active: false },
                    { lane: 4, name: "K. Bekele", mark: "12:54.12", active: true },
                    { lane: 5, name: "H. Gebrselassie", mark: "12:54.90", active: true },
                    { lane: 6, name: "H. Gebrhiwet", mark: "12:56.04", active: false },
                    { lane: 7, name: "T. Haile", mark: "13:01.45", active: false },
                    { lane: 8, name: "M. Edris", mark: "13:04.90", active: false },
                  ].map((item) => (
                    <div
                      key={item.lane}
                      className={`relative flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all ${
                        item.active
                          ? "bg-[#A63F2C] border-amber-400 text-white shadow-md shadow-amber-500/10 scale-[1.01]"
                          : "bg-[#872D1E] border-[#A13A28] text-white/90"
                      }`}
                    >
                      {/* Lane line indicator */}
                      <div className="absolute inset-x-0 top-0 h-[1px] border-t border-dashed border-white/20 pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 h-[1px] border-b border-dashed border-white/20 pointer-events-none" />

                      <div className="flex items-center gap-3 relative z-10">
                        <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-mono font-black ${
                          item.active ? "bg-amber-400 text-amber-950" : "bg-white/20 text-white"
                        }`}>
                          {item.lane}
                        </span>
                        <div>
                          <span className="font-extrabold text-xs tracking-wide">{item.name}</span>
                          {item.active && (
                            <span className="ml-2 text-[8px] font-mono font-extrabold text-amber-300 uppercase tracking-widest bg-amber-950/50 px-1.5 py-0.5 rounded">FASTEST SEED</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 relative z-10">
                        <span className="font-mono text-xs font-extrabold bg-black/25 px-2 py-0.5 rounded text-white/95">{item.mark}</span>
                        <span className="text-[10px] opacity-70">🏃</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware / Timing Status grid */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                  <span className="h-5 w-5 rounded-lg bg-[#10B981] text-white flex items-center justify-center text-[10px] font-extrabold">2</span>
                  Seeding Hardware Integration
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Photo Finish status */}
                  <div
                    className="p-4 rounded-2xl border shadow-xs flex flex-col justify-between"
                    style={{
                      backgroundColor: theme === "dark" ? "rgba(30, 41, 59, 0.2)" : "#F8FAFC",
                      borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold text-[#64748B] dark:text-[#94A3B8] uppercase">Photo-finish Camera</span>
                      <span className="flex items-center gap-1.5 text-[9px] font-mono font-extrabold text-[#10B981] bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        SYNCED
                      </span>
                    </div>
                    <p className="text-xs font-mono font-extrabold text-[var(--text-primary)] mt-1">{seedingEvent.timingDevice}</p>
                  </div>

                  {/* Wind speed gauge status */}
                  <div
                    className="p-4 rounded-2xl border shadow-xs flex flex-col justify-between"
                    style={{
                      backgroundColor: theme === "dark" ? "rgba(30, 41, 59, 0.2)" : "#F8FAFC",
                      borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold text-[#64748B] dark:text-[#94A3B8] uppercase">Wind Monitor</span>
                      <span className="flex items-center gap-1.5 text-[9px] font-mono font-extrabold text-[#3B82F6] bg-blue-500/10 px-2 py-0.5 rounded-full">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                        </span>
                        VALID
                      </span>
                    </div>
                    <p className="text-xs font-mono font-extrabold text-[var(--text-primary)] mt-1">{seedingEvent.windSpeed || "RFID Feed Active"}</p>
                  </div>

                  {/* False start status */}
                  <div
                    className="p-4 rounded-2xl border shadow-xs flex flex-col justify-between"
                    style={{
                      backgroundColor: theme === "dark" ? "rgba(30, 41, 59, 0.2)" : "#F8FAFC",
                      borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold text-[#64748B] dark:text-[#94A3B8] uppercase">Gun Control Unit</span>
                      <span className="flex items-center gap-1.5 text-[9px] font-mono font-extrabold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                        </span>
                        ARMED
                      </span>
                    </div>
                    <p className="text-xs font-mono font-extrabold text-[var(--text-primary)] mt-1">0.100s REACTION THRESHOLD</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t" style={{ borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.3)" : "rgba(226, 232, 240, 0.6)" }}>
                <button
                  onClick={() => {
                    setSeedingEvent(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-[#0140A7] to-[#0A4870] text-white py-3.5 rounded-2xl font-extrabold hover:shadow-lg transform active:scale-95 transition-all text-xs cursor-pointer"
                >
                  Execute Lane Seeding Algorithm
                </button>
                <button
                  onClick={() => setSeedingEvent(null)}
                  className="px-6 py-3.5 rounded-2xl font-extrabold transition-all text-xs border cursor-pointer active:scale-95"
                  style={{
                    backgroundColor: theme === "dark" ? "rgba(30, 41, 59, 0.3)" : "#FFFFFF",
                    borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
                    color: theme === "dark" ? "#F8FAFC" : "#0F172A",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

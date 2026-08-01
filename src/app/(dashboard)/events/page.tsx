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
  const [isAdding, setIsAdding] = useState(false);
  const [seedingEvent, setSeedingEvent] = useState<RaceEvent | null>(null);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventName) return;

    const created: RaceEvent = {
      id: `EVT-${Math.floor(100 + Math.random() * 900)}`,
      name: newEventName,
      category: newEventCategory,
      scheduledTime: "17:00 EAT Today",
      venue: "Addis Ababa Stadium",
      status: "Scheduled",
      entriesCount: 8,
      windSpeed: "+0.0 m/s",
      timingDevice: "FinishLynx Camera 02",
    };

    setEventsList([created, ...eventsList]);
    setNewEventName("");
    setIsAdding(false);
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
              <label className="text-xs font-bold block mb-1">Event Title</label>
              <input
                type="text"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                placeholder="e.g. 800m Men Semi-Final"
                className="w-full rounded-xl px-4 py-2 text-xs border focus:outline-none"
                style={{
                  backgroundColor: theme === "dark" ? "#21262D" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                  color: "inherit",
                }}
              />
            </div>
            <div>
              <label className="text-xs font-bold block mb-1">Category</label>
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
        className="rounded-2xl border overflow-hidden shadow-sm"
        style={{
          backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
          borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
        }}
      >
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: theme === "dark" ? "#30363D" : "#D9DEE5" }}>
          <h3 className="font-extrabold text-sm">Championship Event Schedule</h3>
          <span className="text-[10px] font-mono font-bold text-[#0140A7]">
            WORLD ATHLETICS RULE 163 CERTIFIED
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
                <th className="p-4">Event Code &amp; Title</th>
                <th className="p-4">Venue &amp; Time</th>
                <th className="p-4">Entries</th>
                <th className="p-4">Timing Feed</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Seeding</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: theme === "dark" ? "#30363D" : "#F1F3F5" }}>
              {eventsList.map((evt) => (
                <tr key={evt.id} className="hover:bg-[var(--bg-surface-variant)] transition-colors">
                  <td className="p-4">
                    <p className="font-extrabold">{evt.name}</p>
                    <p className="text-[10px] font-mono text-[#0140A7]">{evt.id} • {evt.category}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold">{evt.venue}</p>
                    <p className="text-[10px]" style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>
                      {evt.scheduledTime}
                    </p>
                  </td>
                  <td className="p-4 font-bold">{evt.entriesCount} Athletes</td>
                  <td className="p-4 font-mono text-[11px]">{evt.timingDevice}</td>
                  <td className="p-4">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[9px] font-mono font-extrabold text-white"
                      style={{
                        backgroundColor:
                          evt.status === "Live In-Progress"
                            ? "#2E7D32"
                            : evt.status === "Completed"
                              ? "#0288D1"
                              : "#0140A7",
                      }}
                    >
                      {evt.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSeedingEvent(evt)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold border text-[#0140A7] hover:bg-[rgba(1,64,167,0.08)] transition-all"
                    >
                      Seed Lanes →
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div
            className="rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
            style={{
              backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">{seedingEvent.name} - Lane Seeding</h2>
                <p className="text-sm mt-1" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
                  {seedingEvent.venue} • {seedingEvent.scheduledTime} • {seedingEvent.entriesCount} Athletes
                </p>
              </div>
              <button
                onClick={() => setSeedingEvent(null)}
                className="text-2xl hover:opacity-70 transition-opacity p-2 rounded-xl hover:bg-[#F7F8FA] dark:hover:bg-[#21262D]"
                style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold mb-3">Lane Assignment Algorithm</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-[#DCEBF6] dark:bg-[rgba(1,64,167,0.1)]">
                      <p className="text-xs font-bold text-[#0140A7] mb-1">WORLD ATHLETICS STANDARD</p>
                      <p className="text-sm">Lanes seeded by personal best times, fastest in center lanes (4-5)</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded border text-center font-bold">Lane 1</div>
                      <div className="p-2 rounded border text-center font-bold">Lane 2</div>
                      <div className="p-2 rounded border text-center font-bold">Lane 3</div>
                      <div className="p-2 rounded border text-center font-bold bg-[#FFF3CC] text-[#C98F00]">Lane 4 (FAST)</div>
                      <div className="p-2 rounded border text-center font-bold bg-[#FFF3CC] text-[#C98F00]">Lane 5 (FAST)</div>
                      <div className="p-2 rounded border text-center font-bold">Lane 6</div>
                      <div className="p-2 rounded border text-center font-bold">Lane 7</div>
                      <div className="p-2 rounded border text-center font-bold">Lane 8</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3">Timing System Configuration</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Photo-finish Camera:</span>
                      <span className="font-mono text-[#2E7D32]">{seedingEvent.timingDevice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wind Speed Monitor:</span>
                      <span className="font-mono text-[#0140A7]">{seedingEvent.windSpeed || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>False Start Detection:</span>
                      <span className="font-mono text-[#C98F00]">0.100s RULE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lane Assignment Status:</span>
                      <span className="font-bold text-[#F59E0B]">PENDING SEEDING</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t" style={{ borderColor: theme === "dark" ? "#30363D" : "#D9DEE5" }}>
                <button
                  onClick={() => {
                    // Simulate seeding process
                    setSeedingEvent(null);
                  }}
                  className="flex-1 bg-[#2E7D32] text-white py-3.5 rounded-xl font-extrabold hover:bg-[#1B5E20] transition-all shadow-lg"
                >
                  Execute Lane Seeding Algorithm
                </button>
                <button
                  onClick={() => setSeedingEvent(null)}
                  className="px-8 py-3.5 rounded-xl font-bold transition-all hover:bg-[#F7F8FA] dark:hover:bg-[#21262D]"
                  style={{
                    color: theme === "dark" ? "#8B949E" : "#555B63",
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

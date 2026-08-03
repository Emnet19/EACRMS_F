"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useData } from "@/context/DataContext";

const CLUB_NAMES = [
  "Addis Ababa Athletics Club",
  "Oromia Athletics Club",
  "Amhara Athletics Club",
  "Tigray Athletics Club",
  "Sidama Coffee Athletics",
  "Defense Athletics Club",
  "Ethio Electric Athletics",
  "Banks Athletics Club",
  "Mugher Cement Athletics Club",
  "CBE Athletics Club",
  "Ethiopian Police Athletics Club",
  "Armed Forces Athletics Club",
  "Fedele Athletics Club",
  "National Tobacco Athletics Club",
];

const CLUB_ADDRESSES = [
  "Addis Ababa Stadium, Addis Ababa",
  "Bahir Dar Stadium, Bahir Dar",
  "Hawassa International Stadium, Hawassa",
  "Dire Dawa Stadium, Dire Dawa",
  "Mekelle Stadium, Mekelle",
  "Gondar Stadium, Gondar",
  "Jimma Stadium, Jimma",
  "Harar Stadium, Harar",
  "Meskel Square Circuit, Addis Ababa",
  "Millennium Hall, Addis Ababa",
  "National Athletics Training Center, Sululta",
];

export default function ClubRegistrationPage() {
  const { theme } = useTheme();
  const { addClub } = useData();
  const router = useRouter();
  const [formData, setFormData] = useState({
    clubName: "",
    region: "",
    headCoach: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
  });
  const [clubNameMode, setClubNameMode] = useState<"select" | "other">("select");
  const [addressMode, setAddressMode] = useState<"select" | "other">("select");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add club to context
    addClub({
      name: formData.clubName,
      region: formData.region,
      headCoach: formData.headCoach,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      address: formData.address,
    });

    router.push("/clubs");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => router.back()}
            className="h-10 w-10 rounded-xl flex items-center justify-center transition-all hover:bg-[#DCEBF6] dark:hover:bg-[rgba(1,64,167,0.1)]"
          >
            <span className="text-xl">←</span>
          </button>
          <div className="h-10 w-10 rounded-xl bg-[#0140A7] flex items-center justify-center text-white text-xs font-bold">
            CLUB
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Register New Club</h1>
          </div>
        </div>
        <p className="text-sm ml-[88px]" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
          Add a new athletics club to the national league directory
        </p>
      </div>

      {/* Form Card */}
      <div
        className="rounded-2xl p-6 shadow-lg"
        style={{
          backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold mb-2">Club Name *</label>
            <select
              value={clubNameMode === "other" ? "__other__" : formData.clubName}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "__other__") {
                  setClubNameMode("other");
                  setFormData({ ...formData, clubName: "" });
                } else {
                  setClubNameMode("select");
                  setFormData({ ...formData, clubName: val });
                }
              }}
              required
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent transition-all"
              style={{
                backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
              }}
            >
              <option value="">Select Club Name...</option>
              {CLUB_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
              <option value="__other__">Other (type a new club name)...</option>
            </select>
            {clubNameMode === "other" && (
              <input
                type="text"
                value={formData.clubName}
                onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                required
                className="w-full mt-2 px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                }}
                placeholder="e.g., Oromia Athletics Club"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Region *</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent transition-all"
              style={{
                backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
              }}
            >
              <option value="">Select Region</option>
              <option value="Addis Ababa City Administration">Addis Ababa City Administration</option>
              <option value="Afar Region">Afar Region</option>
              <option value="Amhara Region">Amhara Region</option>
              <option value="Benishangul-Gumuz Region">Benishangul-Gumuz Region</option>
              <option value="Dire Dawa City Administration">Dire Dawa City Administration</option>
              <option value="Gambela Region">Gambela Region</option>
              <option value="Harari Region">Harari Region</option>
              <option value="Oromia Region">Oromia Region</option>
              <option value="Sidama Region">Sidama Region</option>
              <option value="Somali Region">Somali Region</option>
              <option value="Southern Nations, Nationalities, and Peoples Region">Southern Nations, Nationalities, and Peoples Region</option>
              <option value="Tigray Region">Tigray Region</option>
              <option value="Federal Corporate">Federal Corporate</option>
              <option value="National Defense">National Defense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Head Coach *</label>
            <input
              type="text"
              name="headCoach"
              value={formData.headCoach}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent transition-all"
              style={{
                backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
              }}
              placeholder="Full name of head coach"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold mb-2">Contact Email *</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                }}
                placeholder="club@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Contact Phone *</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                }}
                placeholder="+251 9XX XXX XXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Club Address *</label>
            <select
              value={addressMode === "other" ? "__other__" : formData.address}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "__other__") {
                  setAddressMode("other");
                  setFormData({ ...formData, address: "" });
                } else {
                  setAddressMode("select");
                  setFormData({ ...formData, address: val });
                }
              }}
              required
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent transition-all"
              style={{
                backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
              }}
            >
              <option value="">Select Club Address...</option>
              {CLUB_ADDRESSES.map((address) => (
                <option key={address} value={address}>
                  {address}
                </option>
              ))}
              <option value="__other__">Other (type a custom address)...</option>
            </select>
            {addressMode === "other" && (
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="w-full mt-2 px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                }}
                placeholder="Full club address"
              />
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#0140A7] text-white py-3.5 rounded-xl font-extrabold hover:bg-[#0A4870] transition-all shadow-lg"
            >
              Register Club
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3.5 rounded-xl font-bold transition-all hover:bg-[#F7F8FA] dark:hover:bg-[#21262D]"
              style={{
                color: theme === "dark" ? "#8B949E" : "#555B63",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useData } from "@/context/DataContext";

interface ClubRegistrationFormProps {
  onClose: () => void;
}

export default function ClubRegistrationForm({ onClose }: ClubRegistrationFormProps) {
  const { theme } = useTheme();
  const { addClub } = useData();
  const [formData, setFormData] = useState({
    clubName: "",
    region: "",
    headCoach: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
  });

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

    alert("Club registered successfully!");
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div
        className="rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        style={{
          backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
          border: `1px solid ${theme === "dark" ? "#30363D" : "#D0D7DE"}`,
        }}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-lg bg-[#0140A7] flex items-center justify-center text-white text-sm">
                🏢
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Register New Club</h2>
            </div>
            <p className="text-sm" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
              Add a new athletics club to the national league directory
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl hover:opacity-70 transition-opacity p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Club Name *</label>
            <input
              type="text"
              name="clubName"
              value={formData.clubName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent transition-all"
              style={{
                backgroundColor: theme === "dark" ? "#0D1117" : "#F6F8FA",
                borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
              }}
              placeholder="e.g., Oromia Athletics Club"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Region *</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent transition-all"
              style={{
                backgroundColor: theme === "dark" ? "#0D1117" : "#F6F8FA",
                borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
              }}
            >
              <option value="">Select Region</option>
              <option value="Addis Ababa">Addis Ababa City Administration</option>
              <option value="Afar">Afar Region</option>
              <option value="Amhara">Amhara Region</option>
              <option value="Benishangul-Gumuz">Benishangul-Gumuz Region</option>
              <option value="Dire Dawa">Dire Dawa City Administration</option>
              <option value="Gambela">Gambela Region</option>
              <option value="Harari">Harari Region</option>
              <option value="Oromia">Oromia Region</option>
              <option value="Sidama">Sidama Region</option>
              <option value="Somali">Somali Region</option>
              <option value="Southern Nations">Southern Nations, Nationalities, and Peoples Region</option>
              <option value="Tigray">Tigray Region</option>
              <option value="Federal Corporate">Federal Corporate</option>
              <option value="National Defense">National Defense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Head Coach *</label>
            <input
              type="text"
              name="headCoach"
              value={formData.headCoach}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent transition-all"
              style={{
                backgroundColor: theme === "dark" ? "#0D1117" : "#F6F8FA",
                borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
              }}
              placeholder="Full name of head coach"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Contact Email *</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F6F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
                }}
                placeholder="club@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Contact Phone *</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F6F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
                }}
                placeholder="+251 9XX XXX XXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Club Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0140A7] focus:border-transparent transition-all"
              style={{
                backgroundColor: theme === "dark" ? "#0D1117" : "#F6F8FA",
                borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
              }}
              placeholder="Full club address"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#0140A7] text-white py-3 rounded-lg font-semibold hover:bg-[#0A4870] transition-all"
            >
              Register Club
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg font-semibold border hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              style={{
                borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
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

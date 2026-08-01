"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useData } from "@/context/DataContext";

interface MemberRegistrationFormProps {
  onClose: () => void;
}

export default function MemberRegistrationForm({ onClose }: MemberRegistrationFormProps) {
  const { theme } = useTheme();
  const { addAthlete, clubs } = useData();
  const [step, setStep] = useState<"club" | "fayda" | "otp" | "details">("club");
  const [selectedClubId, setSelectedClubId] = useState("");
  const [faydaId, setFaydaId] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    temporaryPassword: "",
    athleteName: "",
    discipline: "",
  });

  const handleClubSelect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClubId) {
      alert("Please select a club first");
      return;
    }
    setStep("fayda");
  };

  const handleFaydaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Verifying Fayda ID:", faydaId);
    alert(`OTP sent to the phone number associated with Fayda ID: ${faydaId}`);
    setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp);
    alert("OTP verified successfully!");
    setStep("details");
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add athlete to context
    addAthlete({
      name: formData.athleteName,
      discipline: formData.discipline,
      faydaId,
      status: "Active",
      email: formData.email,
      phone: formData.phone,
      clubId: selectedClubId,
    });

    alert("Athlete registered successfully! Temporary password has been set.");
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
        className="rounded-2xl p-6 max-w-lg w-full shadow-xl"
        style={{
          backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
          border: `1px solid ${theme === "dark" ? "#30363D" : "#D0D7DE"}`,
        }}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-lg bg-[#E6A500] flex items-center justify-center text-white text-xs font-bold">
                ATH
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Register Athlete</h2>
            </div>
            <p className="text-sm" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
              {step === "fayda" && "Verify athlete identity with Fayda ID"}
              {step === "otp" && "Enter the verification code sent to athlete"}
              {step === "details" && "Complete athlete account setup"}
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

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shadow-md transition-all ${step === "club" ? "bg-gradient-to-br from-[#E6A500] to-[#C98F00] text-white scale-110" : ["fayda", "otp", "details"].includes(step) ? "bg-[#2E7D32] text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
              {["fayda", "otp", "details"].includes(step) ? "✓" : "1"}
            </div>
            <span className="text-xs font-bold">Club</span>
          </div>
          <div className="flex-1 h-1 mx-2 rounded-full" style={{ backgroundColor: ["fayda", "otp", "details"].includes(step) ? "#2E7D32" : theme === "dark" ? "#30363D" : "#E5E7EB" }} />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shadow-md transition-all ${step === "fayda" ? "bg-gradient-to-br from-[#E6A500] to-[#C98F00] text-white scale-110" : ["otp", "details"].includes(step) ? "bg-[#2E7D32] text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
              {["otp", "details"].includes(step) ? "✓" : "2"}
            </div>
            <span className="text-xs font-bold">Fayda ID</span>
          </div>
          <div className="flex-1 h-1 mx-2 rounded-full" style={{ backgroundColor: ["otp", "details"].includes(step) ? "#2E7D32" : theme === "dark" ? "#30363D" : "#E5E7EB" }} />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shadow-md transition-all ${step === "otp" ? "bg-gradient-to-br from-[#E6A500] to-[#C98F00] text-white scale-110" : step === "details" ? "bg-[#2E7D32] text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
              {step === "details" ? "✓" : "3"}
            </div>
            <span className="text-xs font-bold">OTP</span>
          </div>
          <div className="flex-1 h-1 mx-2 rounded-full" style={{ backgroundColor: step === "details" ? "#2E7D32" : theme === "dark" ? "#30363D" : "#E5E7EB" }} />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shadow-md transition-all ${step === "details" ? "bg-gradient-to-br from-[#E6A500] to-[#C98F00] text-white scale-110" : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
              4
            </div>
            <span className="text-xs font-bold">Details</span>
          </div>
        </div>

        {/* Step 0: Club Selection */}
        {step === "club" && (
          <form onSubmit={handleClubSelect} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Select Club *</label>
              <select
                value={selectedClubId}
                onChange={(e) => setSelectedClubId(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#E6A500] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F6F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
                }}
              >
                <option value="">Choose a club...</option>
                {clubs.map((club) => (
                  <option key={club.id} value={club.id}>
                    {club.name} ({club.region})
                  </option>
                ))}
              </select>
              <p className="text-xs mt-2" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
                Select the club this athlete will be registered under
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#E6A500] to-[#C98F00] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Continue →
            </button>
          </form>
        )}

        {/* Step 1: Fayda ID */}
        {step === "fayda" && (
          <form onSubmit={handleFaydaSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2.5">Fayda National ID *</label>
              <input
                type="text"
                value={faydaId}
                onChange={(e) => setFaydaId(e.target.value)}
                required
                className="w-full px-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#E6A500] focus:border-transparent font-mono text-lg transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F9FAFB",
                  borderColor: theme === "dark" ? "#30363D" : "#E5E7EB",
                }}
                placeholder="FAN-XXXX-XXXX-XXXX"
              />
              <p className="text-xs mt-3 flex items-start gap-2" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
                <span className="font-bold text-[#E6A500]">INFO:</span>
                <span>Enter the athlete's biometric Fayda National ID. An OTP will be sent to the registered phone number.</span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#E6A500] to-[#C98F00] text-white py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-[1.02] transition-all"
            >
              Send OTP →
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2.5 text-center">Enter OTP Code *</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                className="w-full px-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#E6A500] focus:border-transparent font-mono text-3xl text-center tracking-[0.5em] transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F9FAFB",
                  borderColor: theme === "dark" ? "#30363D" : "#E5E7EB",
                }}
                placeholder="000000"
              />
              <p className="text-xs mt-3 text-center flex items-center justify-center gap-2" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
                <span className="font-bold text-[#E6A500]">SMS:</span>
                <span>Enter the 6-digit code sent to the athlete's phone</span>
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep("club")}
                className="px-8 py-3.5 rounded-xl font-bold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                style={{
                  borderColor: theme === "dark" ? "#30363D" : "#E5E7EB",
                }}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#E6A500] to-[#C98F00] text-white py-3.5 rounded-xl font-bold hover:shadow-lg transform hover:scale-[1.02] transition-all"
              >
                Verify OTP →
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Registration Details */}
        {step === "details" && (
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Athlete Name *</label>
              <input
                type="text"
                name="athleteName"
                value={formData.athleteName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#E6A500] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F6F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
                }}
                placeholder="Full name of athlete"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Discipline *</label>
              <select
                name="discipline"
                value={formData.discipline}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#E6A500] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F6F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
                }}
              >
                <option value="">Select Discipline</option>
                <option value="Sprints">Sprints (100m, 200m, 400m)</option>
                <option value="Middle Distance">Middle Distance (800m, 1500m)</option>
                <option value="Long Distance">Long Distance (3000m, 5000m, 10000m)</option>
                <option value="Marathon">Marathon</option>
                <option value="Hurdles">Hurdles</option>
                <option value="Jumps">Jumps (High, Long, Triple, Pole)</option>
                <option value="Throws">Throws (Shot, Discus, Hammer, Javelin)</option>
                <option value="Combined Events">Combined Events (Decathlon, Heptathlon)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#E6A500] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F6F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
                }}
                placeholder="athlete@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#E6A500] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F6F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
                }}
                placeholder="+251 9XX XXX XXX"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Temporary Password *</label>
              <input
                type="text"
                name="temporaryPassword"
                value={formData.temporaryPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#E6A500] focus:border-transparent font-mono transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F6F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D0D7DE",
                }}
                placeholder="Set temporary password"
              />
              <p className="text-xs mt-2" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
                This password is temporary. The athlete will be required to change it on first login.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep("otp")}
                className="px-8 py-3.5 rounded-xl font-bold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                style={{
                  borderColor: theme === "dark" ? "#30363D" : "#E5E7EB",
                }}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#E6A500] to-[#C98F00] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Complete Registration
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

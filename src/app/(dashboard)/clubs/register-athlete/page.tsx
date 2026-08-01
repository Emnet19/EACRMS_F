"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useData } from "@/context/DataContext";

export default function AthleteRegistrationPage() {
  const { theme } = useTheme();
  const { addAthlete, clubs } = useData();
  const router = useRouter();
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
    if (!selectedClubId) return;
    setStep("fayda");
  };

  const handleFaydaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (faydaId.replace(/\s+/g, '').length < 16) {
      return;
    }
    console.log("Verifying Fayda ID:", faydaId);
    setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6 || otp === "000000" || otp === "0000") {
      return;
    }
    console.log("Verifying OTP:", otp);
    setStep("details");
  };

  const formatFaydaId = (value: string) => {
    // Remove all non-alphanumeric characters
    const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

    // Add dashes every 4 characters
    const formatted = cleaned.match(/.{1,4}/g)?.join('-') || cleaned;

    return formatted.substring(0, 19); // FAN-XXXX-XXXX-XXXX format (19 chars with dashes)
  };

  const handleFaydaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatFaydaId(e.target.value);
    setFaydaId(formatted);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setOtp(value);
    }
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
          <div className="h-10 w-10 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white text-xs font-bold">
            ATHLETE
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Register Athlete Member</h1>
          </div>
        </div>
        <p className="text-sm ml-[88px]" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
          {step === "club" && "Select the club for this athlete"}
          {step === "fayda" && "Verify athlete identity with Fayda ID"}
          {step === "otp" && "Enter the verification code sent to athlete"}
          {step === "details" && "Complete athlete account setup"}
        </p>
      </div>

      {/* Step Indicator */}
      <div
        className="rounded-2xl p-5 shadow-lg"
        style={{
          backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold shadow-md transition-all ${step === "club" ? "bg-[#2E7D32] text-white scale-110" : ["fayda", "otp", "details"].includes(step) ? "bg-[#2E7D32] text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
              {["fayda", "otp", "details"].includes(step) ? "✓" : "1"}
            </div>
            <span className="text-xs font-bold">Club</span>
          </div>
          <div className="flex-1 h-1 mx-2 rounded-full" style={{ backgroundColor: ["fayda", "otp", "details"].includes(step) ? "#2E7D32" : theme === "dark" ? "#30363D" : "#D9DEE5" }} />
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold shadow-md transition-all ${step === "fayda" ? "bg-[#2E7D32] text-white scale-110" : ["otp", "details"].includes(step) ? "bg-[#2E7D32] text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
              {["otp", "details"].includes(step) ? "✓" : "2"}
            </div>
            <span className="text-xs font-bold">Fayda ID</span>
          </div>
          <div className="flex-1 h-1 mx-2 rounded-full" style={{ backgroundColor: ["otp", "details"].includes(step) ? "#2E7D32" : theme === "dark" ? "#30363D" : "#D9DEE5" }} />
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold shadow-md transition-all ${step === "otp" ? "bg-[#2E7D32] text-white scale-110" : step === "details" ? "bg-[#2E7D32] text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
              {step === "details" ? "✓" : "3"}
            </div>
            <span className="text-xs font-bold">OTP</span>
          </div>
          <div className="flex-1 h-1 mx-2 rounded-full" style={{ backgroundColor: step === "details" ? "#2E7D32" : theme === "dark" ? "#30363D" : "#D9DEE5" }} />
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold shadow-md transition-all ${step === "details" ? "bg-[#2E7D32] text-white scale-110" : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
              4
            </div>
            <span className="text-xs font-bold">Details</span>
          </div>
        </div>

        {/* Step 1: Club Selection */}
        {step === "club" && (
          <form onSubmit={handleClubSelect} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2">Select Club *</label>
              <select
                value={selectedClubId}
                onChange={(e) => setSelectedClubId(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                }}
              >
                <option value="">Choose a club...</option>
                {clubs.map((club) => (
                  <option key={club.id} value={club.id}>
                    {club.name} ({club.region})
                  </option>
                ))}
              </select>
              <p className="text-xs mt-2" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
                Select the club this athlete will be registered under
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2E7D32] text-white py-3.5 rounded-xl font-extrabold hover:bg-[#1B5E20] transition-all shadow-lg"
            >
              Continue →
            </button>
          </form>
        )}

        {/* Step 2: Fayda ID */}
        {step === "fayda" && (
          <form onSubmit={handleFaydaSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2.5">Fayda National ID *</label>
              <input
                type="text"
                value={faydaId}
                onChange={handleFaydaChange}
                required
                className="w-full px-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent font-mono text-lg transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                }}
                placeholder="FAN-XXXX-XXXX-XXXX"
                maxLength={19}
              />
              <p className="text-xs mt-3 flex items-start gap-2" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
                <span className="font-bold text-[#0140A7]">INFO:</span>
                <span>Enter the athlete's biometric Fayda National ID. An OTP will be sent to the registered phone number.</span>
              </p>
              {faydaId && faydaId.replace(/\s+/g, '').length < 16 && (
                <p className="text-xs mt-2 text-[#D32F2F] flex items-center gap-1">
                  <span className="font-bold">WARNING:</span>
                  <span>Fayda ID must be at least 16 characters long</span>
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("club")}
                className="px-8 py-3.5 rounded-xl font-bold transition-all hover:bg-[#F7F8FA] dark:hover:bg-[#21262D]"
                style={{
                  color: theme === "dark" ? "#8B949E" : "#555B63",
                }}
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={faydaId.replace(/\s+/g, '').length < 16}
                className="flex-1 bg-[#2E7D32] text-white py-3.5 rounded-xl font-extrabold hover:bg-[#1B5E20] transition-all shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Send OTP →
              </button>
            </div>
          </form>
        )}

        {/* Step 3: OTP Verification */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2.5 text-center">Enter OTP Code *</label>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                required
                maxLength={6}
                className="w-full px-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent font-mono text-3xl text-center tracking-[0.5em] transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                }}
                placeholder="123456"
              />
              <p className="text-xs mt-3 text-center flex items-center justify-center gap-2" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
                <span className="font-bold text-[#0140A7]">SMS:</span>
                <span>Enter the 6-digit code sent to the athlete's phone</span>
              </p>
              {otp && (otp.length !== 6 || otp === "000000" || otp === "0000") && (
                <p className="text-xs mt-2 text-[#D32F2F] text-center flex items-center justify-center gap-1">
                  <span className="font-bold">ERROR:</span>
                  <span>Please enter a valid 6-digit OTP code</span>
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("fayda")}
                className="px-8 py-3.5 rounded-xl font-bold transition-all hover:bg-[#F7F8FA] dark:hover:bg-[#21262D]"
                style={{
                  color: theme === "dark" ? "#8B949E" : "#555B63",
                }}
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={otp.length !== 6 || otp === "000000" || otp === "0000"}
                className="flex-1 bg-[#2E7D32] text-white py-3.5 rounded-xl font-extrabold hover:bg-[#1B5E20] transition-all shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Verify OTP →
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Registration Details */}
        {step === "details" && (
          <form onSubmit={handleDetailsSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2">Athlete Name *</label>
              <input
                type="text"
                name="athleteName"
                value={formData.athleteName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                }}
                placeholder="Full name of athlete"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Discipline *</label>
              <select
                name="discipline"
                value={formData.discipline}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
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
              <label className="block text-sm font-bold mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                }}
                placeholder="athlete@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                }}
                placeholder="+251 9XX XXX XXX"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Temporary Password *</label>
              <input
                type="text"
                name="temporaryPassword"
                value={formData.temporaryPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent font-mono transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                  borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
                }}
                placeholder="Set temporary password"
              />
              <p className="text-xs mt-2" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
                This password is temporary. The athlete will be required to change it on first login.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep("otp")}
                className="px-8 py-3.5 rounded-xl font-bold transition-all hover:bg-[#F7F8FA] dark:hover:bg-[#21262D]"
                style={{
                  color: theme === "dark" ? "#8B949E" : "#555B63",
                }}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#2E7D32] text-white py-3.5 rounded-xl font-extrabold hover:bg-[#1B5E20] transition-all shadow-lg"
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

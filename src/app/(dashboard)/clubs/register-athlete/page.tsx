"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useData } from "@/context/DataContext";

interface FaydaProfile {
  fullName: string;
  fanId: string;
  dateOfBirth: string;
  sex: string;
  nationality: string;
  region: string;
  parentName: string;
  discipline: string;
}

const FAYDA_PROFILES: FaydaProfile[] = [
  {
    fullName: "Aman Woldesenbet",
    fanId: "",
    dateOfBirth: "2003-04-17",
    sex: "Male",
    nationality: "Ethiopian",
    region: "Oromia",
    parentName: "Woldesenbet Tulu",
    discipline: "Long Distance",
  },
  {
    fullName: "Rahel Girma",
    fanId: "",
    dateOfBirth: "2005-09-02",
    sex: "Female",
    nationality: "Ethiopian",
    region: "Amhara",
    parentName: "Girma Alemu",
    discipline: "Middle Distance",
  },
  {
    fullName: "Binyam Tsegaye",
    fanId: "",
    dateOfBirth: "2001-11-23",
    sex: "Male",
    nationality: "Ethiopian",
    region: "Addis Ababa",
    parentName: "Tsegaye Kebede",
    discipline: "Sprints",
  },
  {
    fullName: "Selamawit Desta",
    fanId: "",
    dateOfBirth: "2004-06-30",
    sex: "Female",
    nationality: "Ethiopian",
    region: "Tigray",
    parentName: "Desta Hailu",
    discipline: "Marathon",
  },
];

function fetchFaydaProfile(faydaId: string): FaydaProfile {
  const hash = faydaId.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const profile = FAYDA_PROFILES[hash % FAYDA_PROFILES.length];
  return { ...profile, fanId: faydaId };
}

export default function AthleteRegistrationPage() {
  const { theme } = useTheme();
  const { addAthlete, clubs } = useData();
  const router = useRouter();
  const [step, setStep] = useState<"club" | "fayda" | "otp" | "details">("club");
  const [selectedClubId, setSelectedClubId] = useState("");
  const [faydaId, setFaydaId] = useState("");
  const [otp, setOtp] = useState("");
  const [faydaProfile, setFaydaProfile] = useState<FaydaProfile | null>(null);
  const [registrationDone, setRegistrationDone] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    temporaryPassword: "",
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
    setFaydaProfile(fetchFaydaProfile(faydaId));
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

    if (!faydaProfile) return;

    // Add athlete to context
    addAthlete({
      name: faydaProfile.fullName,
      discipline: faydaProfile.discipline,
      faydaId,
      status: "Active",
      email: formData.email,
      phone: formData.phone,
      clubId: selectedClubId,
    });

    setRegistrationDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetRegistration = () => {
    setRegistrationDone(false);
    setStep("club");
    setSelectedClubId("");
    setFaydaId("");
    setOtp("");
    setFaydaProfile(null);
    setFormData({ email: "", phone: "", temporaryPassword: "" });
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
          <div className="h-10 rounded-xl px-2.5 bg-[#2E7D32] flex items-center justify-center text-white text-[8px] font-bold tracking-tight leading-none">
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
        {registrationDone ? (
          <div className="flex flex-col items-center justify-center text-center py-8 space-y-6 animate-fadeIn">
            <div className="h-24 w-24 rounded-full bg-[rgba(46,125,50,0.12)] flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white flex items-center justify-center text-4xl shadow-lg">
                ✓
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
                Athlete Registration Successful
              </h2>
              <p className="text-xs mt-1.5" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
                The athlete has been verified against the Fayda registry and added to the club roster.
              </p>
            </div>

            <div
              className="w-full max-w-md rounded-2xl border p-5 text-left space-y-3"
              style={{
                backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
              }}
            >
              {[
                ["Full Name", faydaProfile?.fullName],
                ["Fayda National ID", faydaId],
                ["Club", clubs.find((c) => c.id === selectedClubId)?.name],
                ["Discipline", faydaProfile?.discipline],
                ["Email", formData.email],
                ["Phone", formData.phone],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 text-xs">
                  <span className="font-bold opacity-60">{label}</span>
                  <span className="font-extrabold text-right text-[var(--text-primary)]">{value}</span>
                </div>
              ))}
              <div className="pt-2 border-t flex items-center justify-between gap-4 text-xs" style={{ borderColor: theme === "dark" ? "#30363D" : "#D9DEE5" }}>
                <span className="font-bold opacity-60">Status</span>
                <span className="rounded-full px-2.5 py-0.5 font-mono font-extrabold text-[10px] text-white bg-[#2E7D32]">ACTIVE</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <button
                onClick={() => router.push("/clubs")}
                className="flex-1 bg-[#2E7D32] text-white py-3.5 rounded-xl font-extrabold hover:bg-[#1B5E20] transition-all shadow-lg"
              >
                Return to Club Roster →
              </button>
              <button
                onClick={resetRegistration}
                className="flex-1 py-3.5 rounded-xl font-extrabold transition-all border"
                style={{
                  backgroundColor: theme === "dark" ? "rgba(30, 41, 59, 0.3)" : "#FFFFFF",
                  borderColor: theme === "dark" ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
                  color: theme === "dark" ? "#F8FAFC" : "#0F172A",
                }}
              >
                Register Another Athlete
              </button>
            </div>
          </div>
        ) : (
          <>
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
            {/* Fayda Verified Identity Card */}
            {faydaProfile && (
              <div
                className="rounded-2xl border-2 border-[#2E7D32] overflow-hidden"
                style={{
                  backgroundColor: theme === "dark" ? "#0D1117" : "#F7F8FA",
                }}
              >
                <div
                  className="px-4 py-2.5 bg-[#2E7D32] text-white flex items-center justify-between"
                >
                  <span className="text-[10px] font-mono font-extrabold tracking-widest uppercase">FAYDA Verified Identity</span>
                  <span className="text-[9px] font-mono font-extrabold bg-white/20 px-2 py-0.5 rounded-full">✓ VERIFIED</span>
                </div>
                <div className="p-4 flex flex-col sm:flex-row gap-4">
                  <div className="shrink-0">
                    <div
                      className="h-16 w-16 rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white flex items-center justify-center font-black text-xl"
                    >
                      {faydaProfile.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-extrabold text-base text-[var(--text-primary)]">{faydaProfile.fullName}</p>
                        <p className="text-[10px] font-mono font-bold text-[#2E7D32] mt-0.5">{faydaProfile.fanId}</p>
                      </div>
                      <span className="rounded-full px-2.5 py-1 text-[9px] font-mono font-extrabold bg-[rgba(46,125,50,0.12)] text-[#2E7D32]">
                        {faydaProfile.sex}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                      <p><span className="font-semibold opacity-60">DATE OF BIRTH:</span> <span className="font-bold text-[var(--text-primary)]">{faydaProfile.dateOfBirth}</span></p>
                      <p><span className="font-semibold opacity-60">NATIONALITY:</span> <span className="font-bold text-[var(--text-primary)]">{faydaProfile.nationality}</span></p>
                      <p><span className="font-semibold opacity-60">REGION:</span> <span className="font-bold text-[var(--text-primary)]">{faydaProfile.region}</span></p>
                      <p><span className="font-semibold opacity-60">DISCIPLINE:</span> <span className="font-bold text-[var(--text-primary)]">{faydaProfile.discipline}</span></p>
                      <p className="col-span-2"><span className="font-semibold opacity-60">PARENT NAME:</span> <span className="font-bold text-[var(--text-primary)]">{faydaProfile.parentName}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
          </>
        )}
      </div>
    </div>
  );
}

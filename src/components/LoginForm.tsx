"use client";

import React, { useState } from "react";
import { useAuth, DEMO_USERS, User } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export function LoginForm() {
  const { login } = useAuth();
  const { theme } = useTheme();

  const [selectedUser, setSelectedUser] = useState<User>(DEMO_USERS[0]);
  const [password, setPassword] = useState("Admin@2026");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      login(selectedUser);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 shadow-xl border transition-colors space-y-6 max-w-lg mx-auto w-full"
      style={{
        backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
        borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
      }}
    >
      <div className="border-b pb-4" style={{ borderColor: theme === "dark" ? "#30363D" : "#D9DEE5" }}>
        <span className="text-xs font-mono font-bold text-[#0140A7] uppercase tracking-wider block">
          AUTHENTICATION GATEWAY
        </span>
        <h2 className="text-xl font-extrabold mt-1">Official Federation Sign In</h2>
        <p className="text-xs mt-1" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
          Select your official role or enter your credentials to access control panels.
        </p>
      </div>

      {/* Quick Select Preset Official Credentials */}
      <div className="space-y-2">
        <label className="text-xs font-bold block" style={{ color: theme === "dark" ? "#C9D1D9" : "#555B63" }}>
          Select Official Role (Demo Presets):
        </label>
        <div className="grid grid-cols-1 gap-2.5">
          {DEMO_USERS.map((u) => {
            const isSelected = selectedUser.id === u.id;
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => setSelectedUser(u)}
                className="flex items-center justify-between p-3.5 rounded-2xl border text-left text-xs transition-all"
                style={{
                  backgroundColor: isSelected
                    ? theme === "dark"
                      ? "#0A4870"
                      : "#DCEBF6"
                    : theme === "dark"
                      ? "#21262D"
                      : "#F7F8FA",
                  borderColor: isSelected ? "#0140A7" : theme === "dark" ? "#30363D" : "#D9DEE5",
                  color: isSelected ? "#0140A7" : "inherit",
                }}
              >
                <div>
                  <p className="font-extrabold text-sm">{u.name}</p>
                  <p className="text-xs opacity-80 font-mono mt-0.5">{u.email}</p>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-mono font-bold text-white shadow-sm"
                  style={{ backgroundColor: isSelected ? "#0140A7" : "#8B9098" }}
                >
                  {u.role}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold block mb-1.5" style={{ color: theme === "dark" ? "#C9D1D9" : "#555B63" }}>
            Official Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Enter password..."
            className="w-full rounded-xl px-4 py-3 text-xs border focus:outline-none transition-colors"
            style={{
              backgroundColor: theme === "dark" ? "#21262D" : "#F7F8FA",
              borderColor: theme === "dark" ? "#30363D" : "#D9DEE5",
              color: "inherit",
            }}
          />
        </div>

        {error && (
          <div className="p-3 rounded-xl text-xs font-semibold text-[#D32F2F] bg-[rgba(211,47,47,0.1)] border border-[rgba(211,47,47,0.2)] text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-2xl text-xs font-extrabold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          style={{ backgroundColor: "#0140A7" }}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Authenticating Official Security Token...
            </>
          ) : (
            `Sign In as ${selectedUser.name} →`
          )}
        </button>
      </form>

      {/* Security Footer */}
      <div
        className="p-3 rounded-xl text-xs text-center border font-mono"
        style={{
          backgroundColor: theme === "dark" ? "#21262D" : "#FFF3CC",
          borderColor: theme === "dark" ? "#30363D" : "#E6A500",
          color: theme === "dark" ? "#C9D1D9" : "#C98F00",
        }}
      >
        🔒 Protected under Ethiopian Athletics Federation Digital Security Standards.
      </div>
    </div>
  );
}

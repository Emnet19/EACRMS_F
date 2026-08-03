"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "Federation Executive" | "Technical Official" | "Verification Auditor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

export const DEMO_PASSWORDS: Record<string, string> = {
  "admin@eaf.gov.et": "Admin@2026",
  "verification@eaf.gov.et": "Audit@2026",
  "technical@eaf.gov.et": "Tech@2026",
};

export const DEMO_USERS: User[] = [
  {
    id: "FED-001",
    name: "Abebe Bikila",
    email: "admin@eaf.gov.et",
    role: "Federation Executive",
    department: "Executive Directorate",
  },
  {
    id: "FED-002",
    name: "Derartu Tulu",
    email: "verification@eaf.gov.et",
    role: "Verification Auditor",
    department: "National ID Audit Dept",
  },
  {
    id: "FED-003",
    name: "Haile Gebrselassie",
    email: "technical@eaf.gov.et",
    role: "Technical Official",
    department: "Competition & Timing Desk",
  },
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.removeItem("eacrms_federation_user");
    const storedUser = sessionStorage.getItem("eacrms_federation_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
    sessionStorage.setItem("eacrms_federation_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("eacrms_federation_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

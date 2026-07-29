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
    const storedUser = localStorage.getItem("eacrms_federation_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    } else {
      // Default to demo user for easy access if not set
      setUser(DEMO_USERS[0]);
      localStorage.setItem("eacrms_federation_user", JSON.stringify(DEMO_USERS[0]));
    }
    setIsLoading(false);
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("eacrms_federation_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eacrms_federation_user");
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

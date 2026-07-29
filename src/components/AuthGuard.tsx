"use client";

import React from "react";
import { useAuth, UserRole } from "@/context/AuthContext";
import { LoginForm } from "@/components/LoginForm";
import { useTheme } from "@/context/ThemeContext";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-default)] text-[var(--text-primary)]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0140A7] border-t-transparent mb-4" />
        <p className="text-sm font-semibold tracking-wide">Authenticating Federation Credentials...</p>
      </div>
    );
  }

  // IF NOT AUTHENTICATED: Display the Login Form directly on the page!
  if (!isAuthenticated) {
    return (
      <div className="py-12 px-4 flex flex-col items-center justify-center min-h-[70vh] space-y-6">
        <div className="text-center space-y-2 max-w-md">
          <div
            className="h-14 w-14 mx-auto rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg mb-3"
            style={{ backgroundColor: "#0140A7" }}
          >
            EAF
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Ethiopian Athletics Federation
          </h1>
          <p className="text-xs" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
            EACRMS Executive Control &amp; Biometric Verification Portal
          </p>
        </div>

        <LoginForm />
      </div>
    );
  }

  // Role check
  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="p-8 text-center space-y-3">
        <h2 className="text-lg font-bold text-[#D32F2F]">Access Restricted</h2>
        <p className="text-xs">Your current role ({user.role}) does not have permission to view this control panel.</p>
      </div>
    );
  }

  return <>{children}</>;
}

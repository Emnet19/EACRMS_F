"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-default)] text-[var(--text-primary)]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0140A7] border-t-transparent mb-4" />
        <p className="text-sm font-semibold tracking-wide">Authenticating Federation Credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
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

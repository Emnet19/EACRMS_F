"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Club {
  id: string;
  name: string;
  region: string;
  athletesCount: number;
  verificationRate: number;
  headCoach: string;
  status: "Accredited" | "Audit Required";
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

export interface Athlete {
  id: string;
  name: string;
  discipline: string;
  faydaId: string;
  status: "Active" | "Retired";
  email?: string;
  phone?: string;
  clubId: string;
}

interface DataContextType {
  clubs: Club[];
  athletes: { [clubId: string]: Athlete[] };
  addClub: (club: Omit<Club, "id" | "athletesCount" | "verificationRate" | "status">) => void;
  addAthlete: (athlete: Omit<Athlete, "id">) => void;
  getClubById: (id: string) => Club | undefined;
  getAthletesByClub: (clubId: string) => Athlete[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_CLUBS: Club[] = [
  {
    id: "CLUB-01",
    name: "Oromia Athletics Club",
    region: "Oromia Region",
    athletesCount: 142,
    verificationRate: 99.2,
    headCoach: "Tolosa Kotu",
    status: "Accredited",
  },
  {
    id: "CLUB-02",
    name: "Defense Athletics Club (Mekelakeya)",
    region: "National Defense",
    athletesCount: 185,
    verificationRate: 100.0,
    headCoach: "Hussein Shibo",
    status: "Accredited",
  },
];

const INITIAL_ATHLETES: { [clubId: string]: Athlete[] } = {
  "CLUB-01": [
    { id: "ATH-001", name: "Almaz Ayana", discipline: "Long Distance", faydaId: "FAN-2024-001", status: "Active", clubId: "CLUB-01" },
    { id: "ATH-002", name: "Tirunesh Dibaba", discipline: "Middle Distance", faydaId: "FAN-2024-002", status: "Active", clubId: "CLUB-01" },
    { id: "ATH-003", name: "Kenenisa Bekele", discipline: "Long Distance", faydaId: "FAN-2024-003", status: "Active", clubId: "CLUB-01" },
    { id: "ATH-004", name: "Genzebe Dibaba", discipline: "Middle Distance", faydaId: "FAN-2024-004", status: "Active", clubId: "CLUB-01" },
    { id: "ATH-005", name: "Haile Gebrselassie", discipline: "Marathon", faydaId: "FAN-2024-005", status: "Retired", clubId: "CLUB-01" },
  ],
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [clubs, setClubs] = useState<Club[]>(INITIAL_CLUBS);
  const [athletes, setAthletes] = useState<{ [clubId: string]: Athlete[] }>(INITIAL_ATHLETES);

  const addClub = (clubData: Omit<Club, "id" | "athletesCount" | "verificationRate" | "status">) => {
    const newId = `CLUB-${String(clubs.length + 1).padStart(2, '0')}`;
    const newClub: Club = {
      ...clubData,
      id: newId,
      athletesCount: 0,
      verificationRate: 0,
      status: "Accredited",
    };

    setClubs(prev => [newClub, ...prev]);
    setAthletes(prev => ({ ...prev, [newId]: [] }));
  };

  const addAthlete = (athleteData: Omit<Athlete, "id">) => {
    const existingAthletes = athletes[athleteData.clubId] || [];
    const newId = `ATH-${String(Object.values(athletes).flat().length + 1).padStart(3, '0')}`;
    const newAthlete: Athlete = {
      ...athleteData,
      id: newId,
    };

    // Update athletes
    setAthletes(prev => ({
      ...prev,
      [athleteData.clubId]: [...existingAthletes, newAthlete],
    }));

    // Update club athlete count and verification rate
    setClubs(prev => prev.map(club => {
      if (club.id === athleteData.clubId) {
        const newCount = club.athletesCount + 1;
        return {
          ...club,
          athletesCount: newCount,
          verificationRate: Math.min(100, club.verificationRate + Math.random() * 2), // Simulate slight increase
        };
      }
      return club;
    }));
  };

  const getClubById = (id: string) => {
    return clubs.find(club => club.id === id);
  };

  const getAthletesByClub = (clubId: string) => {
    return athletes[clubId] || [];
  };

  return (
    <DataContext.Provider value={{
      clubs,
      athletes,
      addClub,
      addAthlete,
      getClubById,
      getAthletesByClub,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
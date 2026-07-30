"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PolicyPage() {
  const { theme } = useTheme();

  const policies = [
    {
      id: "EAF-001",
      title: "Athlete Registration & Verification",
      category: "Registration",
      description: "All athletes must complete digital verification through the Fayda National ID system to participate in official competitions.",
      status: "Active",
      statusColor: "#28A745",
      lastUpdated: "2024-01-15",
    },
    {
      id: "EAF-002",
      title: "Anti-Doping Compliance",
      category: "Health & Safety",
      description: "Mandatory anti-doping education and testing protocols for all registered athletes and coaching staff.",
      status: "Active",
      statusColor: "#28A745",
      lastUpdated: "2024-02-10",
    },
    {
      id: "EAF-003",
      title: "Club Accreditation Standards",
      category: "Club Management",
      description: "Minimum requirements for club facilities, coaching certifications, and athlete roster maintenance.",
      status: "Under Review",
      statusColor: "#FFC107",
      lastUpdated: "2024-03-05",
    },
    {
      id: "EAF-004",
      title: "Competition Eligibility Rules",
      category: "Competition",
      description: "Age categories, qualification standards, and transfer regulations for national and regional competitions.",
      status: "Active",
      statusColor: "#28A745",
      lastUpdated: "2024-01-20",
    },
    {
      id: "EAF-005",
      title: "Coaching Certification Requirements",
      category: "Education",
      description: "Mandatory certification levels and continuing education requirements for all coaching staff.",
      status: "Active",
      statusColor: "#28A745",
      lastUpdated: "2024-02-28",
    },
    {
      id: "EAF-006",
      title: "Data Privacy & Security",
      category: "Technology",
      description: "Protection of athlete personal information and biometric data in accordance with national privacy laws.",
      status: "Active",
      statusColor: "#28A745",
      lastUpdated: "2024-03-15",
    },
  ];

  const categories = ["All", "Registration", "Health & Safety", "Club Management", "Competition", "Education", "Technology"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPolicies = selectedCategory === "All"
    ? policies
    : policies.filter(policy => policy.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Policy & Compliance Hub</h1>
        <p className="text-sm mt-1" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
          Official policies, regulations, and compliance guidelines for Ethiopian athletics.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category
              ? "bg-[#0140A7] hover:bg-[#0A4870]"
              : "border-[#D0D7DE] hover:bg-[#F6F8FA]"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Key Information Card */}
      <Card className="border-[#0140A7] bg-gradient-to-r from-[#F6F8FA] to-white dark:from-[#161B22] dark:to-[#0D1117]">
        <CardHeader>
          <CardTitle className="text-[#0140A7] text-xl">Ethiopian Athletics Federation Standards</CardTitle>
          <CardDescription>
            Our policies ensure fair competition, athlete safety, and the integrity of Ethiopian athletics at all levels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0140A7]">{policies.length}</div>
              <div className="text-sm text-muted-foreground">Total Policies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#28A745]">
                {policies.filter(p => p.status === "Active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FFC107]">
                {policies.filter(p => p.status === "Under Review").length}
              </div>
              <div className="text-sm text-muted-foreground">Under Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0140A7]">6</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPolicies.map((policy) => (
          <Card key={policy.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold bg-[#F6F8FA] dark:bg-[#21262D] px-2 py-1 rounded">
                  {policy.id}
                </span>
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: policy.statusColor }}
                >
                  {policy.status}
                </span>
              </div>

              <div>
                <span className="text-xs font-medium text-[#0140A7] bg-[#DCEBF6] dark:bg-[rgba(1,64,167,0.2)] px-2 py-0.5 rounded">
                  {policy.category}
                </span>
                <h3 className="font-semibold mt-2 leading-tight">{policy.title}</h3>
                <p className="text-sm mt-1" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
                  {policy.description}
                </p>
              </div>

              <div className="pt-2 border-t" style={{ borderColor: theme === "dark" ? "#30363D" : "#E5E7EB" }}>
                <p className="text-xs" style={{ color: theme === "dark" ? "#8B949E" : "#6B7280" }}>
                  Last updated: {policy.lastUpdated}
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full text-[#0140A7] border-[#0140A7] hover:bg-[#F6F8FA]"
                size="sm"
              >
                View Policy Details →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
          <CardDescription>
            Important documents and guidelines for athletes, coaches, and club administrators.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-semibold">📋 Registration Guide</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Step-by-step athlete registration process
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-semibold">🏆 Competition Rules</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Official competition regulations and standards
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-semibold">🎓 Coach Handbook</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Certification requirements and best practices
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
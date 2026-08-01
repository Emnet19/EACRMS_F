"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Policy {
  id: string;
  title: string;
  category: string;
  description: string;
  status: string;
  statusColor: string;
  lastUpdated: string;
  fullContent: string;
  requirements: string[];
}

export default function PolicyPage() {
  const { theme } = useTheme();
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const policies: Policy[] = [
    {
      id: "EAF-001",
      title: "Athlete Registration & Verification",
      category: "Registration",
      description: "All athletes must complete digital verification through the Fayda National ID system to participate in official competitions.",
      status: "Active",
      statusColor: "#2E7D32",
      lastUpdated: "2024-01-15",
      fullContent: "This policy establishes mandatory digital verification procedures for all athletes participating in Ethiopian Athletics Federation sanctioned events. The verification process ensures athlete identity authenticity and maintains competitive integrity across all levels of competition.",
      requirements: [
        "Valid Fayda National ID registration",
        "Biometric verification completion",
        "Club affiliation documentation",
        "Medical clearance certificate",
        "Age verification documents"
      ]
    },
    {
      id: "EAF-002",
      title: "Anti-Doping Compliance",
      category: "Health & Safety",
      description: "Mandatory anti-doping education and testing protocols for all registered athletes and coaching staff.",
      status: "Active",
      statusColor: "#2E7D32",
      lastUpdated: "2024-02-10",
      fullContent: "The Ethiopian Athletics Federation maintains strict anti-doping standards in accordance with WADA guidelines. All athletes and coaching staff must complete mandatory education programs and submit to regular testing protocols.",
      requirements: [
        "Annual anti-doping education certification",
        "Random drug testing compliance",
        "Therapeutic Use Exemption (TUE) applications when needed",
        "Whereabouts program participation for elite athletes",
        "Coach education on prohibited substances"
      ]
    },
    {
      id: "EAF-003",
      title: "Club Accreditation Standards",
      category: "Club Management",
      description: "Minimum requirements for club facilities, coaching certifications, and athlete roster maintenance.",
      status: "Under Review",
      statusColor: "#F59E0B",
      lastUpdated: "2024-03-05",
      fullContent: "Athletic clubs must meet specific accreditation standards to participate in federation activities. These standards ensure quality training environments and proper athlete development programs.",
      requirements: [
        "Certified coaching staff (minimum Level 2)",
        "Adequate training facilities and equipment",
        "Updated athlete roster management",
        "Financial transparency and reporting",
        "Safety protocols and emergency procedures"
      ]
    },
    {
      id: "EAF-004",
      title: "Competition Eligibility Rules",
      category: "Competition",
      description: "Age categories, qualification standards, and transfer regulations for national and regional competitions.",
      status: "Active",
      statusColor: "#2E7D32",
      lastUpdated: "2024-01-20",
      fullContent: "Competition eligibility rules ensure fair participation across all age groups and competitive levels. These regulations maintain the integrity of Ethiopian athletics competitions.",
      requirements: [
        "Age verification and category compliance",
        "Qualification time standards achievement",
        "Club transfer regulations (12-month waiting period)",
        "Academic eligibility for student athletes",
        "Medical fitness certification"
      ]
    },
    {
      id: "EAF-005",
      title: "Coaching Certification Requirements",
      category: "Education",
      description: "Mandatory certification levels and continuing education requirements for all coaching staff.",
      status: "Active",
      statusColor: "#2E7D32",
      lastUpdated: "2024-02-28",
      fullContent: "All coaching personnel must maintain current certification levels and participate in ongoing professional development to ensure high-quality athlete training and development.",
      requirements: [
        "Level 1 certification (entry level)",
        "Level 2 certification (club coaching)",
        "Level 3 certification (national level)",
        "Annual continuing education (20 hours minimum)",
        "Background check and child protection training"
      ]
    },
    {
      id: "EAF-006",
      title: "Data Privacy & Security",
      category: "Technology",
      description: "Protection of athlete personal information and biometric data in accordance with national privacy laws.",
      status: "Active",
      statusColor: "#2E7D32",
      lastUpdated: "2024-03-15",
      fullContent: "The protection of athlete personal and biometric data is paramount. All data collection, storage, and processing must comply with Ethiopian privacy laws and international standards.",
      requirements: [
        "Encrypted data storage and transmission",
        "Limited access on need-to-know basis",
        "Regular security audits and updates",
        "Athlete consent for data processing",
        "Data retention and deletion policies"
      ]
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
      <div
        className="rounded-3xl p-8 shadow-2xl border-2 border-[#0140A7] bg-gradient-to-br from-[#DCEBF6] via-white to-[#F7F8FA] dark:from-[#0A1A2E] dark:via-[#161B22] dark:to-[#0D1117] relative overflow-hidden"
        style={{
          boxShadow: theme === "dark"
            ? "0 25px 50px -12px rgba(1, 64, 167, 0.4), 0 0 0 1px rgba(1, 64, 167, 0.3)"
            : "0 25px 50px -12px rgba(1, 64, 167, 0.25), 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(1, 64, 167, 0.2)"
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0140A7] to-[#0A4870] opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>

        <div className="relative z-10">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-[#0140A7] mb-2 tracking-tight">Ethiopian Athletics Federation Standards</h2>
            <p className="text-sm leading-relaxed" style={{ color: theme === "dark" ? "#C9D1D9" : "#555B63" }}>
              Our policies ensure fair competition, athlete safety, and the integrity of Ethiopian athletics at all levels.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-[#0140A7] mb-1">{policies.length}</div>
              <div className="text-xs font-bold uppercase tracking-wide" style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>Total Policies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-[#2E7D32] mb-1">
                {policies.filter(p => p.status === "Active").length}
              </div>
              <div className="text-xs font-bold uppercase tracking-wide" style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>Active</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-[#F59E0B] mb-1">
                {policies.filter(p => p.status === "Under Review").length}
              </div>
              <div className="text-xs font-bold uppercase tracking-wide" style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>Under Review</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-[#0140A7] mb-1">6</div>
              <div className="text-xs font-bold uppercase tracking-wide" style={{ color: theme === "dark" ? "#8B949E" : "#8B9098" }}>Categories</div>
            </div>
          </div>
        </div>
      </div>

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
                className="w-full text-[#0140A7] border-[#0140A7] hover:bg-[#DCEBF6]"
                size="sm"
                onClick={() => setSelectedPolicy(policy)}
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
                <div className="font-semibold">Registration Guide</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Step-by-step athlete registration process
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-semibold">Competition Rules</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Official competition regulations and standards
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-semibold">Coach Handbook</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Certification requirements and best practices
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Policy Detail Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div
            className="rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
            style={{
              backgroundColor: theme === "dark" ? "#161B22" : "#FFFFFF",
            }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold bg-[#DCEBF6] dark:bg-[rgba(1,64,167,0.2)] px-3 py-1 rounded">
                    {selectedPolicy.id}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: selectedPolicy.statusColor }}
                  >
                    {selectedPolicy.status}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight">{selectedPolicy.title}</h2>
                <p className="text-sm mt-2" style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}>
                  Category: {selectedPolicy.category} • Last updated: {selectedPolicy.lastUpdated}
                </p>
              </div>
              <button
                onClick={() => setSelectedPolicy(null)}
                className="text-2xl hover:opacity-70 transition-opacity p-2 rounded-xl hover:bg-[#F7F8FA] dark:hover:bg-[#21262D]"
                style={{ color: theme === "dark" ? "#8B949E" : "#555B63" }}
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3">Policy Overview</h3>
                <p className="text-sm leading-relaxed" style={{ color: theme === "dark" ? "#C9D1D9" : "#1D1D1F" }}>
                  {selectedPolicy.fullContent}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">Requirements & Standards</h3>
                <ul className="space-y-2">
                  {selectedPolicy.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="h-2 w-2 rounded-full bg-[#0140A7] mt-2 flex-shrink-0"></span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-4 border-t" style={{ borderColor: theme === "dark" ? "#30363D" : "#D9DEE5" }}>
                <Button
                  onClick={() => setSelectedPolicy(null)}
                  className="flex-1 bg-[#0140A7] text-white hover:bg-[#0A4870] font-extrabold"
                >
                  Close Policy Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
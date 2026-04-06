"use client";

import { useState, useCallback } from "react";
import { Target } from "@/lib/types";
import TargetTable from "@/components/vulnscope/targets/target-table";

// Mock data for initial targets
const MOCK_TARGETS: Target[] = [
  {
    id: "1",
    name: "DVWA",
    type: "dvwa",
    url: "http://localhost:8000",
    ipAddress: "127.0.0.1",
    port: 8000,
    tags: ["vulnerable", "testing", "lab"],
    environment: "lab",
    status: "active",
    riskLevel: "critical",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-20"),
  },
  {
    id: "2",
    name: "Production API",
    type: "url",
    url: "https://api.example.com",
    ipAddress: "192.168.1.10",
    port: 443,
    tags: ["api", "production"],
    environment: "production",
    status: "active",
    riskLevel: "high",
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-20"),
  },
  {
    id: "3",
    name: "Staging Web App",
    type: "url",
    url: "https://staging.example.com",
    tags: ["web", "staging"],
    environment: "staging",
    status: "active",
    riskLevel: "medium",
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-18"),
  },
  {
    id: "4",
    name: "Legacy Server",
    type: "ip",
    url: "192.168.1.50",
    ipAddress: "192.168.1.50",
    port: 22,
    tags: ["legacy", "internal"],
    environment: "development",
    status: "unreachable",
    riskLevel: "high",
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2025-01-20"),
  },
];

export default function TargetsPage() {
  const [targets, setTargets] = useState<Target[]>(MOCK_TARGETS);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTarget = useCallback(
    async (newTarget: Omit<Target, "id" | "createdAt" | "updatedAt">) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const target: Target = {
          ...newTarget,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setTargets((prev) => [target, ...prev]);
      } catch (error) {
        console.error("Failed to add target:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleEditTarget = useCallback(
    async (id: string, updates: Partial<Target>) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        setTargets((prev) =>
          prev.map((target) =>
            target.id === id
              ? {
                  ...target,
                  ...updates,
                  updatedAt: new Date(),
                }
              : target
          )
        );
      } catch (error) {
        console.error("Failed to edit target:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleDeleteTarget = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setTargets((prev) => prev.filter((target) => target.id !== id));
    } catch (error) {
      console.error("Failed to delete target:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Targets</h1>
        <p className="text-sm text-dimtext mt-2">
          Manage and monitor all your security testing targets
        </p>
      </div>

      <TargetTable
        targets={targets}
        onAddTarget={handleAddTarget}
        onEditTarget={handleEditTarget}
        onDeleteTarget={handleDeleteTarget}
        isLoading={isLoading}
      />
    </div>
  );
}

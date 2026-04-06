/**
 * Zustand Dashboard Store
 * Manages dashboard data state (vulnerabilities, scans, etc.)
 */

import { create } from "zustand";
import {
  Vulnerability,
  Scan,
  Target,
  DashboardStats,
} from "@/lib/types";

interface DashboardStore {
  // Data
  vulnerabilities: Vulnerability[];
  scans: Scan[];
  targets: Target[];
  stats: DashboardStats | null;

  // Loading states
  isLoadingVulnerabilities: boolean;
  isLoadingScans: boolean;
  isLoadingTargets: boolean;

  // Filters
  selectedSeverity: string[];
  selectedStatus: string[];
  selectedTarget: string | null;

  // Actions
  setVulnerabilities: (vulns: Vulnerability[]) => void;
  setScans: (scans: Scan[]) => void;
  setTargets: (targets: Target[]) => void;
  setStats: (stats: DashboardStats) => void;

  setLoadingVulnerabilities: (loading: boolean) => void;
  setLoadingScans: (loading: boolean) => void;
  setLoadingTargets: (loading: boolean) => void;

  setSeverityFilter: (severities: string[]) => void;
  setStatusFilter: (statuses: string[]) => void;
  setTargetFilter: (targetId: string | null) => void;

  // Computed
  filteredVulnerabilities: () => Vulnerability[];
}

export const useDashboard = create<DashboardStore>((set, get) => ({
  vulnerabilities: [],
  scans: [],
  targets: [],
  stats: null,

  isLoadingVulnerabilities: false,
  isLoadingScans: false,
  isLoadingTargets: false,

  selectedSeverity: [],
  selectedStatus: [],
  selectedTarget: null,

  setVulnerabilities: (vulns) => set({ vulnerabilities: vulns }),
  setScans: (scans) => set({ scans }),
  setTargets: (targets) => set({ targets }),
  setStats: (stats) => set({ stats }),

  setLoadingVulnerabilities: (loading) =>
    set({ isLoadingVulnerabilities: loading }),
  setLoadingScans: (loading) => set({ isLoadingScans: loading }),
  setLoadingTargets: (loading) => set({ isLoadingTargets: loading }),

  setSeverityFilter: (severities) => set({ selectedSeverity: severities }),
  setStatusFilter: (statuses) => set({ selectedStatus: statuses }),
  setTargetFilter: (targetId) => set({ selectedTarget: targetId }),

  filteredVulnerabilities: () => {
    const state = get();
    return state.vulnerabilities.filter((vuln) => {
      const matchesSeverity =
        state.selectedSeverity.length === 0 ||
        state.selectedSeverity.includes(vuln.severity);

      const matchesStatus =
        state.selectedStatus.length === 0 ||
        state.selectedStatus.includes(vuln.status);

      const matchesTarget =
        !state.selectedTarget || vuln.targetId === state.selectedTarget;

      return matchesSeverity && matchesStatus && matchesTarget;
    });
  },
}));

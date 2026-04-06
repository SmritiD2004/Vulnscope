/**
 * Dashboard Home Page
 * Main control center with stats and overview
 */

"use client";

import React from "react";
import { Zap, Bug, AlertCircle, FileText, TrendingUp, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: number;
  color: "amber" | "red" | "blue" | "green";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color,
}) => {
  const colorClasses = {
    amber: "bg-amber-900/10 border-amber-700 text-amber-400",
    red: "bg-red-900/10 border-red-700 text-red-400",
    blue: "bg-blue-900/10 border-blue-700 text-blue-400",
    green: "bg-green-900/10 border-green-700 text-green-400",
  };

  return (
    <Card className={`border ${colorClasses[color]} p-6 space-y-4`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted">{title}</h3>
        <div className="p-2 bg-bg-primary rounded">{icon}</div>
      </div>

      <div>
        <p className="text-3xl font-bold text-primary">{value}</p>
        {subtitle && (
          <p className="text-xs text-dimtext mt-1">{subtitle}</p>
        )}
      </div>

      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs ${trend > 0 ? "text-red-400" : "text-green-400"}`}>
          <TrendingUp size={14} />
          {trend > 0 ? "+" : ""}{trend}% from last week
        </div>
      )}
    </Card>
  );
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-4xl tracking-wide text-primary">
          Dashboard
        </h1>
        <p className="text-muted mt-2">
          Welcome back! Here's your security overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Active Scans"
          value={2}
          subtitle="Currently running"
          icon={<Zap size={20} className="text-amber-400" />}
          color="amber"
        />
        <StatCard
          title="Critical Findings"
          value={7}
          subtitle="Require immediate action"
          icon={<AlertCircle size={20} className="text-red-400" />}
          trend={3}
          color="red"
        />
        <StatCard
          title="Total Vulnerabilities"
          value={34}
          subtitle="Across all targets"
          icon={<Bug size={20} className="text-blue-400" />}
          trend={-5}
          color="blue"
        />
        <StatCard
          title="Reports Generated"
          value={12}
          subtitle="This month"
          icon={<FileText size={20} className="text-blue-400" />}
          color="blue"
        />
        <StatCard
          title="AI Fixes Accepted"
          value={18}
          subtitle="68% acceptance rate"
          icon={<Check size={20} className="text-green-400" />}
          color="green"
        />
        <StatCard
          title="Avg MTTR"
          value="2.4h"
          subtitle="Mean time to remediate"
          icon={<TrendingUp size={20} className="text-green-400" />}
          color="green"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Scans */}
        <Card className="border border-slate-600 bg-surface p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-primary mb-4">
            Recent Scans
          </h2>
          <div className="space-y-3">
            {[
              {
                name: "DVWA Web App",
                status: "Completed",
                findings: 12,
                time: "2 hours ago",
              },
              {
                name: "Metasploitable",
                status: "Running",
                findings: 8,
                time: "15 mins ago",
              },
              {
                name: "Production API",
                status: "Completed",
                findings: 3,
                time: "1 day ago",
              },
            ].map((scan, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded bg-bg-primary border border-slate-600 hover:border-border-accent transition"
              >
                <div>
                  <p className="font-medium text-primary">{scan.name}</p>
                  <p className="text-xs text-dimtext">{scan.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-dimtext">{scan.findings} findings</span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      scan.status === "Running"
                        ? "bg-amber-900/30 text-amber-400"
                        : "bg-green-900/30 text-green-400"
                    }`}
                  >
                    {scan.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="border border-slate-600 bg-surface p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">
            Quick Actions
          </h2>
          <div className="space-y-2">
            {[
              { label: "New Scan", icon: "🚀" },
              { label: "Add Target", icon: "🎯" },
              { label: "View Reports", icon: "📄" },
              { label: "AI Remediation", icon: "✨" },
            ].map((action, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 p-3 rounded bg-bg-primary border border-slate-600 hover:border-border-accent hover:shadow-[0_0_12px_rgba(232,124,30,0.15)] transition text-left"
              >
                <span>{action.icon}</span>
                <span className="text-sm font-medium text-primary">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

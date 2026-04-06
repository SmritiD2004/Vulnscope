"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Play, Pause, Trash2, Eye } from "lucide-react";

export default function ScansPage() {
  const [scans] = useState([
    {
      id: "1",
      name: "Production Web App Scan",
      target: "https://example.com",
      status: "completed",
      startedAt: "2024-01-15T10:30:00Z",
      duration: "45m",
      findings: 12,
    },
    {
      id: "2",
      name: "Internal Network Scan",
      target: "192.168.1.0/24",
      status: "running",
      startedAt: "2024-01-15T14:20:00Z",
      duration: "15m",
      findings: 3,
    },
  ]);

  const statusColors = {
    completed: "bg-green-500/20 text-green-400 border-green-500/30",
    running: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    failed: "bg-red-500/20 text-red-400 border-red-500/30",
    queued: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Scans</h1>
          <p className="text-dimtext mt-1">Manage and monitor security scans</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Scan
        </Button>
      </div>

      {/* Scans List */}
      <Card>
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Recent Scans</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50">
                <th className="px-6 py-4 text-left font-semibold text-white">Scan Name</th>
                <th className="px-6 py-4 text-left font-semibold text-white">Target</th>
                <th className="px-6 py-4 text-left font-semibold text-white">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-white">Started</th>
                <th className="px-6 py-4 text-left font-semibold text-white">Duration</th>
                <th className="px-6 py-4 text-left font-semibold text-white">Findings</th>
                <th className="px-6 py-4 text-right font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan) => (
                <tr key={scan.id} className="border-b border-slate-700 hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{scan.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-dimtext font-mono">{scan.target}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded border inline-block capitalize ${statusColors[scan.status as keyof typeof statusColors]}`}>
                      {scan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-dimtext">
                      {new Date(scan.startedAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-dimtext">{scan.duration}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-white">{scan.findings}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {scan.status === "running" && (
                        <button className="p-2 hover:bg-slate-700 rounded transition-colors text-blue-400 hover:text-blue-300">
                          <Pause className="h-4 w-4" />
                        </button>
                      )}
                      {scan.status === "queued" && (
                        <button className="p-2 hover:bg-slate-700 rounded transition-colors text-green-400 hover:text-green-300">
                          <Play className="h-4 w-4" />
                        </button>
                      )}
                      <button className="p-2 hover:bg-slate-700 rounded transition-colors text-amber-400 hover:text-amber-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded transition-colors text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
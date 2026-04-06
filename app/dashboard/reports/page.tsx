"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText, Calendar } from "lucide-react";

export default function ReportsPage() {
  const [reports] = useState([
    {
      id: "1",
      title: "Production Web App Security Assessment",
      scanType: "Comprehensive Scan",
      target: "https://example.com",
      date: "2024-01-15T10:30:00Z",
      findings: {
        critical: 2,
        high: 4,
        medium: 6,
        low: 3
      },
      status: "completed"
    },
    {
      id: "2",
      title: "Internal Network Vulnerability Scan",
      scanType: "Network Scan",
      target: "192.168.1.0/24",
      date: "2024-01-14T14:20:00Z",
      findings: {
        critical: 1,
        high: 2,
        medium: 5,
        low: 8
      },
      status: "completed"
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-dimtext mt-1">View and download security assessment reports</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Reports List */}
      <Card>
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Recent Reports</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50">
                <th className="px-6 py-4 text-left font-semibold text-white">Report Title</th>
                <th className="px-6 py-4 text-left font-semibold text-white">Scan Type</th>
                <th className="px-6 py-4 text-left font-semibold text-white">Target</th>
                <th className="px-6 py-4 text-left font-semibold text-white">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-white">Findings</th>
                <th className="px-6 py-4 text-right font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-slate-700 hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{report.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-dimtext bg-slate-700/50 px-2.5 py-1 rounded">
                      {report.scanType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-dimtext font-mono">{report.target}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-dimtext">
                      <Calendar className="h-4 w-4" />
                      {new Date(report.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {report.findings.critical > 0 && (
                        <span className="text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">
                          {report.findings.critical} Critical
                        </span>
                      )}
                      {report.findings.high > 0 && (
                        <span className="text-xs bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded">
                          {report.findings.high} High
                        </span>
                      )}
                      {report.findings.medium > 0 && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded">
                          {report.findings.medium} Medium
                        </span>
                      )}
                      {report.findings.low > 0 && (
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">
                          {report.findings.low} Low
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-slate-700 rounded transition-colors text-blue-400 hover:text-blue-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded transition-colors text-green-400 hover:text-green-300">
                        <Download className="h-4 w-4" />
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
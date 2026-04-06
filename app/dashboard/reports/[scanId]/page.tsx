"use client";

import { useState } from "react";
import { Download, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SeverityBadge } from "@/components/vulnscope/findings/severity-badge";
import { CVSSMeter } from "@/components/vulnscope/findings/cvss-meter";

interface ReportPageProps {
  params: {
    scanId: string;
  };
}

// Mock report data
const MOCK_REPORT = {
  id: "scan-1",
  url: "https://api.example.com",
  startedAt: "2025-01-20T14:30:00Z",
  completedAt: "2025-01-20T14:35:00Z",
  duration: "5m 30s",
  findings: [
    {
      id: "vuln-1",
      title: "SQL Injection in Login Form",
      description: "Authentication bypass through SQL injection in login endpoint",
      severity: "critical" as const,
      cvss: 9.8,
      endpoint: "/login",
      method: "POST",
      parameters: ["username", "password"],
      owasp: "A03:2021 - Injection",
      source: "sqlmap",
      exploitability: "high",
      vulnerable: `$query = "SELECT * FROM users WHERE email='" . $_GET['email'] . "'";`,
      fixed: `$stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s", $_GET['email']);
$stmt->execute();`,
      remediation:
        "Use parameterized queries and prepared statements to prevent SQL injection attacks.",
      evidence: [
        {
          type: "request",
          content:
            "POST /login with payload: username=admin' OR '1'='1&password=anything",
        },
      ],
    },
    {
      id: "vuln-2",
      title: "Missing Authentication on API Endpoint",
      description: "API endpoint exposes sensitive user data without authentication checks",
      severity: "critical" as const,
      cvss: 9.1,
      endpoint: "/api/users/all",
      method: "GET",
      owasp: "A01:2021 - Broken Access Control",
      source: "nikto",
      exploitability: "high",
      vulnerable: `app.get('/api/users', (req, res) => {
  const users = db.all();
  res.json(users);
});`,
      fixed: `app.get('/api/users', authMiddleware, (req, res) => {
  const users = db.all();
  res.json(users);
});`,
      remediation: "Implement JWT or OAuth2 authentication on all API endpoints.",
      evidence: [{ type: "request", content: "Successfully accessed /api/users without auth" }],
    },
    {
      id: "vuln-3",
      title: "Reflected Cross-Site Scripting (XSS)",
      description: "User input is reflected in response without proper sanitization",
      severity: "high" as const,
      cvss: 7.5,
      endpoint: "/api/search?q=",
      method: "GET",
      parameters: ["q"],
      owasp: "A03:2021 - Injection",
      source: "burp-suite",
      exploitability: "high",
      vulnerable: `<div>Results for: {{ query }}</div>`,
      fixed: `<div>Results for: {{ query | escape }}</div>`,
      remediation:
        "Always escape user input when rendering in HTML context using appropriate encoding libraries.",
      evidence: [
        {
          type: "request",
          content: "GET /api/search?q=<script>alert('XSS')</script>",
        },
      ],
    },
  ],
};

export default function ReportPage({ params }: ReportPageProps) {
  const [selectedVuln, setSelectedVuln] = useState<(typeof MOCK_REPORT.findings)[0] | null>(
    MOCK_REPORT.findings[0]
  );
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const criticalCount = MOCK_REPORT.findings.filter((f) => f.severity === "critical").length;
  const highCount = MOCK_REPORT.findings.filter((f) => f.severity === "high").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Security Audit Report</h1>
        <p className="text-sm text-dimtext mt-2">Scan ID: {params.scanId}</p>
      </div>

      {/* Summary card */}
      <Card className="p-8 border-slate-700" style={{ backgroundImage: 'linear-gradient(to right, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.3) 100%)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left: Target info */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-dimtext uppercase mb-1">Target</p>
              <p className="text-lg font-mono text-white break-all">{MOCK_REPORT.url}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-dimtext uppercase mb-1">Scan Date</p>
                <p className="text-sm text-white">
                  {new Date(MOCK_REPORT.startedAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-dimtext uppercase mb-1">Duration</p>
                <p className="text-sm text-white">{MOCK_REPORT.duration}</p>
              </div>
            </div>
          </div>

          {/* Right: Statistics */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "Total Findings",
                value: MOCK_REPORT.findings.length,
                color: "text-white",
              },
              { label: "Critical", value: criticalCount, color: "text-red-400" },
              { label: "High", value: highCount, color: "text-orange-400" },
              { label: "Exploitable", value: "All", color: "text-yellow-400" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 text-center"
              >
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-dimtext">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-slate-700">
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Copy className="h-4 w-4" />
            Copy Summary
          </Button>
        </div>
      </Card>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Findings list */}
        <div className="lg:col-span-1 space-y-2">
          <h2 className="text-lg font-bold text-white mb-4">Findings ({MOCK_REPORT.findings.length})</h2>
          {MOCK_REPORT.findings.map((finding) => (
            <button
              key={finding.id}
              onClick={() => setSelectedVuln(finding)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedVuln?.id === finding.id
                  ? "border-blue-500/50 bg-blue-900/20"
                  : "border-slate-700 bg-slate-900/50 hover:border-slate-600"
              }`}
            >
              <SeverityBadge severity={finding.severity} size="sm" showIcon={true} />
              <p className="font-semibold text-white mt-2 text-sm line-clamp-2">
                {finding.title}
              </p>
              <p className="text-xs text-dimtext mt-1">{finding.endpoint}</p>
            </button>
          ))}
        </div>

        {/* Right: Finding details */}
        {selectedVuln && (
          <div className="lg:col-span-2 space-y-4">
            {/* Finding header */}
            <Card className="p-6 border-slate-700 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedVuln.title}</h2>
                  <p className="text-dimtext text-sm mt-2">{selectedVuln.description}</p>
                </div>
                <SeverityBadge severity={selectedVuln.severity} size="lg" showIcon={true} />
              </div>

              {/* Quick info */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                <div>
                  <p className="text-xs font-semibold text-dimtext uppercase mb-1">CVSS Score</p>
                  <CVSSMeter score={selectedVuln.cvss} showLabel={false} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-dimtext uppercase mb-1">Endpoint</p>
                  <p className="text-sm font-mono text-white break-all">{selectedVuln.endpoint}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-dimtext uppercase mb-1">Source</p>
                  <p className="text-sm text-white capitalize">{selectedVuln.source}</p>
                </div>
              </div>
            </Card>

            {/* Code comparison */}
            <Card className="p-6 border-slate-700 space-y-4">
              <h3 className="text-lg font-bold text-white">AI-Generated Fix</h3>

              {/* Vulnerable code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-red-400">Vulnerable Code</p>
                  <span className="text-xs px-2 py-1 rounded bg-red-900/50 text-red-400 border border-red-500/30">
                    BEFORE
                  </span>
                </div>
                <pre className="bg-[#1e1e1e] border border-red-500/30 rounded p-4 text-sm text-red-400/80 overflow-x-auto">
                  <code>{selectedVuln.vulnerable}</code>
                </pre>
              </div>

              {/* Fixed code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-green-400">Fixed Code</p>
                  <button
                    onClick={() => handleCopyCode(selectedVuln.fixed)}
                    className="text-xs px-2 py-1 rounded bg-green-900/50 text-green-400 border border-green-500/30 hover:bg-green-900/70 transition-colors flex items-center gap-1"
                  >
                    <Copy className="h-3 w-3" />
                    {copiedCode === selectedVuln.fixed ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="bg-[#1e1e1e] border border-green-500/30 rounded p-4 text-sm text-green-400/80 overflow-x-auto">
                  <code>{selectedVuln.fixed}</code>
                </pre>
              </div>

              {/* Remediation */}
              <div className="pt-4 border-t border-slate-700">
                <p className="text-sm font-semibold text-white mb-2">Remediation Guidance</p>
                <p className="text-sm text-dimtext">{selectedVuln.remediation}</p>
              </div>
            </Card>

            {/* Evidence section */}
            <Card className="p-6 border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Detection Evidence</h3>
              <div className="space-y-3">
                {selectedVuln.evidence.map((ev, idx) => (
                  <div key={idx} className="p-4 rounded bg-slate-900/50 border border-slate-700">
                    <p className="text-xs font-semibold text-dimtext uppercase mb-2">
                      {ev.type}
                    </p>
                    <pre className="text-xs text-dimtext font-mono overflow-x-auto">
                      {ev.content}
                    </pre>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

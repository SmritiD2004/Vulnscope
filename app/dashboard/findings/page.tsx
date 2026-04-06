"use client";

import { useState } from "react";
import { Vulnerability } from "@/lib/types";
import FindingsDataTable from "@/components/vulnscope/findings/findings-data-table";
import { Card } from "@/components/ui/card";

// Mock vulnerability data
const MOCK_FINDINGS: Vulnerability[] = [
  {
    id: "vuln-1",
    title: "Reflected Cross-Site Scripting (XSS)",
    description: "User input is reflected in response without proper sanitization",
    severity: "high",
    cvss: 7.5,
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:N",
    cwe: "CWE-79",
    owasp: { category: "A03:2021 - Injection", id: "A03", description: "Cross-Site Scripting" },
    endpoint: "/api/search?q=<script>alert(1)</script>",
    method: "GET",
    parameters: ["q"],
    evidence: [
      {
        type: "request",
        content: "GET /api/search?q=<script>alert(1)</script>",
        timestamp: new Date("2025-01-20"),
        tool: "burp-suite",
      },
    ],
    discoveredAt: new Date("2025-01-20"),
    discoveredBy: "burp-suite",
    status: "open",
    exploitability: "high",
    impact: "Session hijacking, credential theft, malware distribution",
    remediation: "Implement proper output encoding and input validation",
    references: ["https://owasp.org/www-community/attacks/xss/"],
    scanId: "scan-1",
    targetId: "target-1",
  },
  {
    id: "vuln-2",
    title: "SQL Injection in Login Form",
    description: "Authentication bypass through SQL injection in login endpoint",
    severity: "critical",
    cvss: 9.8,
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
    cwe: "CWE-89",
    owasp: { category: "A03:2021 - Injection", id: "A03", description: "SQL Injection" },
    endpoint: "/login",
    method: "POST",
    parameters: ["username", "password"],
    evidence: [
      {
        type: "request",
        content: "POST /login\nusername=admin' OR '1'='1&password=anything",
        timestamp: new Date("2025-01-20"),
        tool: "sqlmap",
      },
    ],
    discoveredAt: new Date("2025-01-20"),
    discoveredBy: "sqlmap",
    status: "open",
    exploitability: "high",
    impact: "Complete database compromise, unauthorized access, data breach",
    remediation: "Use parameterized queries and prepared statements",
    references: ["https://owasp.org/www-community/attacks/SQL_Injection"],
    scanId: "scan-1",
    targetId: "target-1",
  },
  {
    id: "vuln-3",
    title: "Missing Authentication on API Endpoint",
    description: "API endpoint exposes sensitive user data without authentication checks",
    severity: "critical",
    cvss: 9.1,
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N",
    cwe: "CWE-306",
    owasp: { category: "A01:2021 - Broken Access Control", id: "A01", description: "Missing Authentication" },
    endpoint: "/api/users/all",
    method: "GET",
    evidence: [
      {
        type: "request",
        content: "GET /api/users/all",
        timestamp: new Date("2025-01-19"),
        tool: "nikto",
      },
    ],
    discoveredAt: new Date("2025-01-19"),
    discoveredBy: "nikto",
    status: "fixed",
    exploitability: "high",
    impact: "Exposure of all user personal information and credentials",
    remediation: "Implement JWT or OAuth2 authentication",
    references: ["https://owasp.org/www-project-api-security/"],
    scanId: "scan-1",
    targetId: "target-1",
  },
  {
    id: "vuln-4",
    title: "Weak Password Policy",
    description: "Application allows passwords shorter than 8 characters",
    severity: "medium",
    cvss: 5.3,
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N",
    cwe: "CWE-521",
    owasp: { category: "A07:2021 - Identification and Authentication Failures", id: "A07", description: "Weak Passwords" },
    endpoint: "/register",
    method: "POST",
    parameters: ["password"],
    evidence: [
      {
        type: "request",
        content: "Successfully registered with password: '12345'",
        timestamp: new Date("2025-01-18"),
        tool: "burp-suite",
      },
    ],
    discoveredAt: new Date("2025-01-18"),
    discoveredBy: "burp-suite",
    status: "ignored",
    exploitability: "medium",
    impact: "Account takeover through brute force attacks",
    remediation: "Enforce minimum 12-character passwords with complexity requirements",
    references: ["https://owasp.org/www-community/vulnerabilities/Weak_Password_Requirements"],
    scanId: "scan-1",
    targetId: "target-1",
  },
  {
    id: "vuln-5",
    title: "Missing Security Headers",
    description: "Application does not implement security headers like CSP, X-Frame-Options",
    severity: "medium",
    cvss: 5.3,
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N",
    cwe: "CWE-693",
    owasp: { category: "A01:2021 - Broken Access Control", id: "A01", description: "Security Headers" },
    endpoint: "/*",
    method: "GET",
    evidence: [
      {
        type: "response",
        content: "Missing: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options",
        timestamp: new Date("2025-01-17"),
        tool: "nikto",
      },
    ],
    discoveredAt: new Date("2025-01-17"),
    discoveredBy: "nikto",
    status: "open",
    exploitability: "medium",
    impact: "Increased risk of clickjacking and MIME type sniffing attacks",
    remediation: "Add security headers: CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff",
    references: ["https://owasp.org/www-project-secure-headers/"],
    scanId: "scan-1",
    targetId: "target-1",
  },
  {
    id: "vuln-6",
    title: "Information Disclosure in Error Messages",
    description: "Detailed error messages expose internal application structure",
    severity: "low",
    cvss: 3.7,
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N",
    cwe: "CWE-209",
    owasp: { category: "A01:2021 - Broken Access Control", id: "A01", description: "Information Disclosure" },
    endpoint: "/api/data/invalid",
    method: "GET",
    evidence: [
      {
        type: "response",
        content: "Error: Database connection failed at ../db/connection.js:42",
        timestamp: new Date("2025-01-16"),
        tool: "nmap",
      },
    ],
    discoveredAt: new Date("2025-01-16"),
    discoveredBy: "nmap",
    status: "false-positive",
    exploitability: "low",
    impact: "Attackers gain insights about technology stack and architecture",
    remediation: "Implement generic error messages in production",
    references: ["https://owasp.org/www-community/Information_Exposure_Through_An_Error_Message"],
    scanId: "scan-1",
    targetId: "target-1",
  },
  {
    id: "vuln-7",
    title: "Insecure Direct Object Reference (IDOR)",
    description: "User can access other users' data by modifying ID parameter",
    severity: "high",
    cvss: 8.1,
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N",
    cwe: "CWE-639",
    owasp: { category: "A01:2021 - Broken Access Control", id: "A01", description: "IDOR" },
    endpoint: "/api/profile/123",
    method: "GET",
    parameters: ["id"],
    evidence: [
      {
        type: "request",
        content: "GET /api/profile/1 returns user 1's data\nGET /api/profile/2 returns user 2's data without auth check",
        timestamp: new Date("2025-01-15"),
        tool: "burp-suite",
      },
    ],
    discoveredAt: new Date("2025-01-15"),
    discoveredBy: "burp-suite",
    status: "open",
    exploitability: "high",
    impact: "Unauthorized access to other users' profiles and personal information",
    remediation: "Implement proper authorization checks on all API endpoints",
    references: ["https://owasp.org/www-community/attacks/Insecure_Direct_Object_References"],
    scanId: "scan-1",
    targetId: "target-1",
  },
  {
    id: "vuln-8",
    title: "Outdated Dependencies",
    description: "Application uses outdated npm packages with known vulnerabilities",
    severity: "medium",
    cvss: 6.5,
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:N/A:N",
    cwe: "CWE-1104",
    owasp: { category: "A06:2021 - Vulnerable and Outdated Components", id: "A06", description: "Outdated Libraries" },
    endpoint: "/",
    method: "GET",
    evidence: [
      {
        type: "request",
        content: "npm audit: express@4.16.0 has 15 vulnerabilities",
        timestamp: new Date("2025-01-14"),
        tool: "nmap",
      },
    ],
    discoveredAt: new Date("2025-01-14"),
    discoveredBy: "npm-audit",
    status: "open",
    exploitability: "medium",
    impact: "Remote code execution through dependency vulnerabilities",
    remediation: "Update all dependencies to latest stable versions",
    references: ["https://www.npmjs.com/"],
    scanId: "scan-1",
    targetId: "target-1",
  },
];

export default function FindingsPage() {
  const [selectedFinding, setSelectedFinding] = useState<Vulnerability | null>(null);

  const handleViewDetails = (finding: Vulnerability) => {
    setSelectedFinding(finding);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Findings</h1>
        <p className="text-sm text-dimtext mt-2">
          Review and manage all discovered vulnerabilities across your scans
        </p>
      </div>

      {/* Findings Table */}
      <FindingsDataTable
        findings={MOCK_FINDINGS}
        onViewDetails={handleViewDetails}
      />

      {/* Details Modal */}
      {selectedFinding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-3xl my-8">
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white">{selectedFinding.title}</h2>
                    <p className="text-sm text-dimtext mt-2">{selectedFinding.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedFinding(null)}
                    className="text-dimtext hover:text-white transition-colors text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded border border-slate-700">
                  <p className="text-xs font-semibold text-dimtext uppercase mb-1">Severity</p>
                  <p className="text-lg font-bold capitalize text-white">{selectedFinding.severity}</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded border border-slate-700">
                  <p className="text-xs font-semibold text-dimtext uppercase mb-1">CVSS Score</p>
                  <p className="text-lg font-bold text-white">{selectedFinding.cvss.toFixed(1)}/10</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded border border-slate-700">
                  <p className="text-xs font-semibold text-dimtext uppercase mb-1">Status</p>
                  <p className="text-lg font-bold capitalize text-white">{selectedFinding.status}</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded border border-slate-700">
                  <p className="text-xs font-semibold text-dimtext uppercase mb-1">OWASP Category</p>
                  <p className="text-lg font-bold text-white">{selectedFinding.owasp.category}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase mb-2">Endpoint</h3>
                  <p className="font-mono text-sm bg-slate-950 p-3 rounded border border-slate-700 text-white break-all">
                    {selectedFinding.method && (
                      <span className="text-blue-400">{selectedFinding.method} </span>
                    )}
                    {selectedFinding.endpoint}
                  </p>
                </div>

                {selectedFinding.remediation && (
                  <div>
                    <h3 className="text-sm font-semibold text-white uppercase mb-2">Remediation</h3>
                    <p className="text-sm text-dimtext bg-slate-950 p-3 rounded border border-slate-700">
                      {selectedFinding.remediation}
                    </p>
                  </div>
                )}

                {selectedFinding.exploitability && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white uppercase mb-2">Exploitability</h3>
                      <p className="text-sm capitalize text-dimtext">{selectedFinding.exploitability}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white uppercase mb-2">Impact</h3>
                      <p className="text-sm text-dimtext">{selectedFinding.impact}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setSelectedFinding(null)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export interface ResearchRef {
  tag:   string;
  label: string;
}

export interface ResearchDomain {
  num:          string;
  title:        string;
  summary:      string;
  designImpact: string;
  refs:         ResearchRef[];
}

export const RESEARCH_DOMAINS: ResearchDomain[] = [
  {
    num: "3.1",
    title: "SQL Injection Detection",
    summary: "Research has moved through three phases: rule-based blacklists, ML classifiers (Naive Bayes, SVM, CNN-BiLSTM), and deep learning. A 2022 systematic review of 36 papers found that comprehensive parameter coverage — testing all input vectors, not just visible form fields — is the critical factor in detection completeness.",
    designImpact: "SQLMap is integrated for systematic multi-payload testing (error-based, time-based blind, boolean-based, union-based) across all identified parameters — directly reflecting the research finding that coverage depth beats manual spot-checking.",
    refs: [
      { tag: "[2]", label: "Misquitta 2023" },
      { tag: "[3]", label: "Hosam 2021" },
      { tag: "[4]", label: "Gandhi 2021" },
      { tag: "[5]", label: "Alghawazi 2022" },
    ],
  },
  {
    num: "3.2",
    title: "Cross-Site Scripting (XSS)",
    summary: "AI-driven tools and WAFs perform best for reflected XSS. Stored XSS remains difficult to detect automatically because it requires chained requests — injecting in one request and triggering it via another user's session. Hybrid approaches combining URL-level and DOM-level analysis reduce false positives significantly.",
    designImpact: "Nikto handles automated header detection (CSP, X-Frame-Options) while Burp Suite handles manual payload injection. This hybrid approach mirrors what the literature shows works best for reflected XSS in black-box assessments.",
    refs: [
      { tag: "[6]", label: "Zhang 2023" },
      { tag: "[7]", label: "Kissoon 2024" },
    ],
  },
  {
    num: "3.3",
    title: "Automated Pentest Frameworks",
    summary: "A 2023 IEEE review found structured, automated reporting is the weakest component in most student implementations. A 2025 IJSRCSEIT paper described a complete Nmap + Nikto + Metasploit + Python pipeline — the closest published architecture to VulnScope. A 2020 ResearchGate study showed Metasploit automation reduces human error and improves repeatability.",
    designImpact: "The Python report generator directly solves the gap identified in the literature. One command, one PDF — no manual report writing. This is VulnScope's primary contribution over a standard tool exercise.",
    refs: [
      { tag: "[8]", label: "IEEE ICITISEE 2023" },
      { tag: "[9]", label: "ResearchGate 2020" },
      { tag: "[10]", label: "IJSRCSEIT 2025" },
    ],
  },
  {
    num: "3.4",
    title: "API & Modern Web Security",
    summary: "OWASP API Security Top 10 (2023) shows injection vulnerabilities are equally prevalent in API-driven apps as in traditional form-based interfaces. The OWASP WSTG recommends exhaustive parameter coverage including HTTP headers, query strings, and cookies — frequently neglected in standard assessments.",
    designImpact: "Burp Suite Intruder is used to fuzz URL query parameters and HTTP headers (Referer, User-Agent) — not just HTML form fields. This reflects the API security research finding that injection increasingly appears in non-form input vectors.",
    refs: [
      { tag: "[11]", label: "OWASP API 2023" },
      { tag: "[12]", label: "GraphQL Cheat Sheet" },
      { tag: "[13]", label: "OWASP WSTG v4.2" },
    ],
  },
];

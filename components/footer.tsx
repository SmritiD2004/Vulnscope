"use client";

import Link from "next/link";
import { GITHUB_URL } from "@/lib/constants";
import { Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-700" style={{ backgroundImage: "linear-gradient(to bottom, rgb(15,23,42) 0%, rgb(3,7,18) 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-bold text-lg tracking-tight">
              <span className="text-blue-400">Vuln</span>
              <span className="text-purple-400">Scope</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Automated vulnerability scanning with AI-powered fixes. Scan, analyze, and remediate in seconds.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition w-fit"
            >
              <Code size={18} />
              GitHub
            </a>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard" className="text-slate-400 hover:text-blue-400 transition text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="#features" className="text-slate-400 hover:text-blue-400 transition text-sm">
                  Features
                </a>
              </li>
              <li>
                <Link href="/docs" className="text-slate-400 hover:text-blue-400 transition text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <a href="#pricing" className="text-slate-400 hover:text-blue-400 transition text-sm">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#blog" className="text-slate-400 hover:text-blue-400 transition text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#security" className="text-slate-400 hover:text-blue-400 transition text-sm">
                  Security
                </a>
              </li>
              <li>
                <a href="#api" className="text-slate-400 hover:text-blue-400 transition text-sm">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#status" className="text-slate-400 hover:text-blue-400 transition text-sm">
                  Status Page
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#privacy" className="text-slate-400 hover:text-blue-400 transition text-sm">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-slate-400 hover:text-blue-400 transition text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#cookies" className="text-slate-400 hover:text-blue-400 transition text-sm">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-blue-400 transition text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>
              © 2025 VulnScope. Cybersecurity meets automation.
            </p>
            <p>
              Built with Next.js, TypeScript, and cutting-edge security tooling.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

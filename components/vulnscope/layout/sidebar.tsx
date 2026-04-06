/**
 * Dashboard Sidebar Component
 * Navigation menu for dashboard pages
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Target, Zap, Bug, FileText, Settings } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <BarChart3 size={18} />,
  },
  {
    label: "Targets",
    href: "/dashboard/targets",
    icon: <Target size={18} />,
  },
  {
    label: "Scans",
    href: "/dashboard/scans",
    icon: <Zap size={18} />,
    badge: 2,
  },
  {
    label: "Findings",
    href: "/dashboard/findings",
    icon: <Bug size={18} />,
    badge: 12,
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: <FileText size={18} />,
  },
];

const settingsNavItems: NavItem[] = [
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings size={18} />,
  },
];

export const Sidebar: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({
  isOpen = true,
  onClose,
}) => {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-bg-primary border-r border-slate-600 overflow-y-auto transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <nav className="p-4 space-y-1">
        {/* Main Nav */}
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={onClose}>
              <div
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition border ${
                  isActive
                    ? "bg-amber-900/30 text-amber-400 border-amber-700"
                    : "text-muted hover:bg-surface border-slate-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-900/40 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-4 border-t border-slate-600" />

        {/* Settings Nav */}
        {settingsNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={onClose}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition border ${
                  isActive
                    ? "bg-amber-900/30 text-amber-400 border-amber-700"
                    : "text-muted hover:bg-surface border-slate-600"
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

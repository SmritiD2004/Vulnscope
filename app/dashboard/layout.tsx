/**
 * Dashboard Layout
 * Wraps all dashboard pages with sidebar and top navigation
 */

"use client";

import React, { useState } from "react";
import { TopNav } from "@/components/vulnscope/layout/top-nav";
import { Sidebar } from "@/components/vulnscope/layout/sidebar";

// This layout completely replaces the root layout for dashboard routes
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-bg-primary">
      {/* Top Navigation - Fixed */}
      <TopNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto md:ml-64">
          <div className="p-6 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

/**
 * Dashboard Top Navigation Component
 * Header bar with profile, notifications, and quick actions
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Menu,
  LogOut,
  Settings,
  User,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/store/useAuth";

interface TopNavProps {
  onMenuClick?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-bg-primary border-b border-slate-600 h-16">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Logo & Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-surface rounded transition"
          >
            <Menu size={20} />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-amber-500 to-amber-700 rounded flex items-center justify-center">
              <Zap size={18} className="text-amber-100" />
            </div>
            <span className="font-display text-lg tracking-wider hidden sm:inline">
              VulnScope
            </span>
          </Link>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-4">
          {/* New Scan Button */}
          <Button
            size="sm"
            className="hidden sm:inline-flex bg-amber-600 hover:bg-amber-700"
          >
            <Zap size={16} className="mr-1" />
            New Scan
          </Button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 hover:bg-surface rounded transition"
            >
              <Bell size={20} className="text-primary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-surface border border-slate-600 rounded-lg shadow-xl p-4 space-y-3">
                <h3 className="font-semibold text-primary">Notifications</h3>
                <div className="text-sm text-dimtext bg-bg-primary border border-slate-600 rounded p-2">
                  🎯 Scan completed: Web App (3 new findings)
                </div>
                <div className="text-sm text-dimtext bg-bg-primary border border-slate-600 rounded p-2">
                  ✨ AI fix approved for SQL Injection
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-surface rounded transition"
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                <span className="text-amber-100 text-xs font-bold">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
              <span className="text-sm font-medium text-primary hidden sm:inline">
                {user?.name || "User"}
              </span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface border border-slate-600 rounded-lg shadow-xl py-2">
                <button className="w-full px-4 py-2 text-sm text-primary hover:bg-bg-primary flex items-center gap-2 transition">
                  <User size={16} />
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-sm text-primary hover:bg-bg-primary flex items-center gap-2 transition">
                  <Settings size={16} />
                  Settings
                </button>
                <div className="my-1 border-t border-slate-600" />
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-sm text-red-400 hover:bg-bg-primary flex items-center gap-2 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Bell, Shield, Database, Globe, User } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoScan: false,
    emailReports: true,
    darkMode: true,
    twoFactor: false,
    dataRetention: 90,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    // Save settings logic would go here
    console.log("Settings saved:", settings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-dimtext mt-1">Configure your VulnScope preferences</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card className="p-6 border-slate-600">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-white">Email Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange("notifications", e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-surface text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-white">Auto-scan Completion</label>
              <input
                type="checkbox"
                checked={settings.autoScan}
                onChange={(e) => handleSettingChange("autoScan", e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-surface text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6 border-slate-600">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-green-400" />
            <h2 className="text-lg font-semibold text-white">Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-white">Two-Factor Authentication</label>
              <input
                type="checkbox"
                checked={settings.twoFactor}
                onChange={(e) => handleSettingChange("twoFactor", e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-surface text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-white">Dark Mode</label>
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange("darkMode", e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-surface text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6 border-slate-600">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Data Management</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-white">Data Retention (days)</label>
              <select
                value={settings.dataRetention}
                onChange={(e) => handleSettingChange("dataRetention", parseInt(e.target.value))}
                className="px-3 py-1 bg-surface border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={30}>30 days</option>
                <option value={90}>90 days</option>
                <option value={365}>1 year</option>
                <option value={0}>Forever</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-white">Email Reports</label>
              <input
                type="checkbox"
                checked={settings.emailReports}
                onChange={(e) => handleSettingChange("emailReports", e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-surface text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>

        {/* Account */}
        <Card className="p-6 border-slate-600">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-white">Account</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-white">Username</label>
              <input
                type="text"
                defaultValue="security-admin"
                className="px-3 py-1 bg-surface border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-white">Email</label>
              <input
                type="email"
                defaultValue="admin@example.com"
                className="px-3 py-1 bg-surface border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
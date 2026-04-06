"use client";

import { useState } from "react";
import { Target, TargetType, EnvironmentLabel } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface AddTargetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (target: Omit<Target, "id" | "createdAt" | "updatedAt">) => void;
  isLoading?: boolean;
}

const targetTypes: TargetType[] = ["url", "ip", "domain", "dvwa", "metasploitable"];
const environments: EnvironmentLabel[] = ["production", "staging", "development", "lab"];
const riskLevels = ["critical", "high", "medium", "low"] as const;

export default function AddTargetModal({
  isOpen,
  onClose,
  onAdd,
  isLoading = false,
}: AddTargetModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "url" as TargetType,
    url: "",
    ipAddress: "",
    port: "",
    tags: "",
    environment: "development" as EnvironmentLabel,
    status: "active" as const,
    riskLevel: "medium" as const,
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Target name is required";
    }

    if (!formData.url.trim()) {
      newErrors.url = "URL is required";
    }

    if (formData.type === "ip" && formData.ipAddress && !/^(\d{1,3}\.){3}\d{1,3}$/.test(formData.ipAddress)) {
      newErrors.ipAddress = "Invalid IP address";
    }

    if (formData.port && isNaN(Number(formData.port))) {
      newErrors.port = "Port must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    onAdd({
      name: formData.name,
      type: formData.type,
      url: formData.url,
      ipAddress: formData.ipAddress || undefined,
      port: formData.port ? Number(formData.port) : undefined,
      tags: tagsArray,
      environment: formData.environment,
      status: "active",
      riskLevel: formData.riskLevel as "critical" | "high" | "medium" | "low",
      credentials: formData.username
        ? {
            username: formData.username,
            password: formData.password,
            authType: "basic",
          }
        : undefined,
    });

    // Reset form
    setFormData({
      name: "",
      type: "url",
      url: "",
      ipAddress: "",
      port: "",
      tags: "",
      environment: "development",
      status: "active",
      riskLevel: "medium",
      username: "",
      password: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-950 z-10">
          <h2 className="text-lg font-bold text-white">Add New Target</h2>
          <button
            onClick={onClose}
            className="text-dimtext hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Target Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">Target Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="My Web App"
              className="w-full px-3 py-2 bg-surface border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
          </div>

          {/* Target Type */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">Target Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-surface border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {targetTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* URL */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">URL/Hostname *</label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full px-3 py-2 bg-surface border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            {errors.url && <p className="text-xs text-red-400">{errors.url}</p>}
          </div>

          {/* IP Address */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">IP Address</label>
            <input
              type="text"
              name="ipAddress"
              value={formData.ipAddress}
              onChange={handleChange}
              placeholder="192.168.1.1"
              className="w-full px-3 py-2 bg-surface border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            {errors.ipAddress && <p className="text-xs text-red-400">{errors.ipAddress}</p>}
          </div>

          {/* Port */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">Port</label>
            <input
              type="text"
              name="port"
              value={formData.port}
              onChange={handleChange}
              placeholder="80, 443, 8080"
              className="w-full px-3 py-2 bg-surface border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            {errors.port && <p className="text-xs text-red-400">{errors.port}</p>}
          </div>

          {/* Environment */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">Environment *</label>
            <select
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-surface border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {environments.map((env) => (
                <option key={env} value={env}>
                  {env.charAt(0).toUpperCase() + env.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Risk Level */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">Risk Level *</label>
            <select
              name="riskLevel"
              value={formData.riskLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-surface border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {riskLevels.map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="web, critical, api"
              className="w-full px-3 py-2 bg-surface border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>

          {/* Credentials Section */}
          <div className="pt-2 border-t border-slate-700">
            <p className="text-xs font-medium text-dimtext mb-3">Authentication (Optional)</p>

            <div className="space-y-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full px-3 py-2 bg-surface border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-3 py-2 bg-surface border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Target"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

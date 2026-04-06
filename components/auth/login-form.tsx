"use client";
/* eslint-disable */

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/store/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSuccess(true);
      await login(formData.email, formData.password);
      // Redirect to dashboard after successful login
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (error) {
      setSuccess(false);
      setErrors({
        general: error instanceof Error ? error.message : "Login failed. Please try again.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Login</h1>
          <p className="text-sm text-dimtext">Access your VulnScope dashboard</p>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="flex gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errors.general}</span>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="flex gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded text-sm text-green-400">
            <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Login successful! Redirecting...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dimtext" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-2 bg-surface border rounded text-white placeholder:text-dimtext focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all ${
                  errors.email
                    ? "border-red-500/50 focus:ring-red-500/50"
                    : "border-slate-600 focus:ring-blue-500/50"
                }`}
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-white">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dimtext" />
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2 bg-surface border rounded text-white placeholder:text-dimtext focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all ${
                  errors.password
                    ? "border-red-500/50 focus:ring-red-500/50"
                    : "border-slate-600 focus:ring-blue-500/50"
                }`}
                disabled={isLoading}
              />
            </div>
            {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-700 space-y-3">
          <p className="text-sm text-dimtext text-center">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
}

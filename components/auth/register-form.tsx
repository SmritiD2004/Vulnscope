"use client";/* eslint-disable */
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/store/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Lock, User, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

interface PasswordStrength {
  score: number;
  level: "weak" | "fair" | "good" | "strong";
  color: string;
  text: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    let score = 0;

    if (!pwd) return { score: 0, level: "weak", color: "bg-red-500", text: "No password" };

    // Length score
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;

    // Complexity checks
    if (/[a-z]/.test(pwd)) score += 1; // lowercase
    if (/[A-Z]/.test(pwd)) score += 1; // uppercase
    if (/[0-9]/.test(pwd)) score += 1; // numbers
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1; // special chars

    // Determine level
    let level: PasswordStrength["level"] = "weak";
    let color = "bg-red-500";
    let text = "Weak";

    if (score >= 5) {
      level = "strong";
      color = "bg-green-500";
      text = "Strong";
    } else if (score >= 4) {
      level = "good";
      color = "bg-blue-500";
      text = "Good";
    } else if (score >= 2) {
      level = "fair";
      color = "bg-yellow-500";
      text = "Fair";
    }

    return { score: Math.min(score, 7), level, color, text };
  }, [formData.password]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (passwordStrength.score < 3) {
      newErrors.password = "Password is too weak. Use uppercase, lowercase, numbers, and symbols";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      await register(formData.email, formData.password, formData.name);
      // Redirect to dashboard after successful registration
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (error) {
      setSuccess(false);
      setErrors({
        general: error instanceof Error ? error.message : "Registration failed. Please try again.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-sm text-dimtext">Join VulnScope and start scanning</p>
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
            <span>Account created! Redirecting...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-white">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dimtext" />
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full pl-10 pr-4 py-2 bg-surface border rounded text-white placeholder:text-dimtext focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all ${
                  errors.name
                    ? "border-red-500/50 focus:ring-red-500/50"
                    : "border-slate-600 focus:ring-blue-500/50"
                }`}
                disabled={isLoading}
              />
            </div>
            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
          </div>

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

          {/* Password Field with Strength Meter */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-white">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dimtext" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2 bg-surface border rounded text-white placeholder:text-dimtext focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all ${
                  errors.password
                    ? "border-red-500/50 focus:ring-red-500/50"
                    : "border-slate-600 focus:ring-blue-500/50"
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dimtext hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Password Strength Meter */}
            {formData.password && (
              <div className="space-y-1.5">
                <div className="flex gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1 rounded-full transition-all ${
                        i < passwordStrength.score
                          ? passwordStrength.color
                          : "bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-xs font-medium ${
                  passwordStrength.color === "bg-green-500"
                    ? "text-green-400"
                    : passwordStrength.color === "bg-blue-500"
                      ? "text-blue-400"
                      : passwordStrength.color === "bg-yellow-500"
                        ? "text-yellow-400"
                        : "text-red-400"
                }`}>
                  Strength: {passwordStrength.text}
                </p>
              </div>
            )}

            {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-white">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dimtext" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2 bg-surface border rounded text-white placeholder:text-dimtext focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all ${
                  errors.confirmPassword
                    ? "border-red-500/50 focus:ring-red-500/50"
                    : "border-slate-600 focus:ring-blue-500/50"
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dimtext hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-400">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-700 space-y-3">
          <p className="text-sm text-dimtext text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
}

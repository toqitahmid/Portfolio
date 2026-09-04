"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import { Button } from "@heroui/react";


const AuthPage = () => {
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Custom Hardcoded Checks
    const ALLOWED_EMAIL = "toqi@gmail.com";
    const ALLOWED_PASSWORD = "Toqi-99@";

    if (formData.email !== ALLOWED_EMAIL) {
      setErrorMessage("Invalid email address.");
      return; // Block execution
    }

    if (formData.password !== ALLOWED_PASSWORD) {
      setErrorMessage("Incorrect password.");
      return; // Block execution
    }

    // If both checks pass, proceed with sign-in / sign-up
    setLoading(true);

    try {
      if (isSignIn) {
        const { error } = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          setErrorMessage(
            error.message || "Failed to sign in. Check your credentials.",
          );
        }
      } else {
        const { error } = await authClient.signUp.email({
          email: formData.email,
          name: formData.name,
          password: formData.password,
        });

        if (error) {
          setErrorMessage(error.message || "Failed to sign up.");
        }
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const toggleAuthMode = () => {
    setIsSignIn((prev) => !prev);
    setErrorMessage("");
    setFormData({ name: "", email: "", password: "" });
  };

  if (isSessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-400">
        Loading session...
      </div>
    );
  }

  // Authenticated State (Shows Sign Out)
  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent px-4 py-12">
        <div className="w-full max-w-md space-y-6 bg-transparent p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome, {session.user?.name || session.user?.email}!
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You are currently signed in as{" "}
            <span className="font-semibold">{session.user?.email}</span>.
          </p>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 rounded-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
          <Link href='/ui/post'>
          <Button className='w-full h-12'>Add Project</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Unauthenticated State (Form)
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 py-12 transition-colors duration-200">
      <div className="w-full max-w-md space-y-8 bg-transparent p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm transition-colors duration-200">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {isSignIn ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isSignIn
              ? "Enter your credentials to access your account"
              : "Sign up today and get started in minutes"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-xl backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setIsSignIn(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isSignIn
                ? "bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignIn(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              !isSignIn
                ? "bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 text-sm text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800">
            {errorMessage}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input (Sign Up Only) */}
          {!isSignIn && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required={!isSignIn}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/30 dark:bg-gray-800/30 border border-gray-300/60 dark:border-gray-700/60 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-white/30 dark:bg-gray-800/30 border border-gray-300/60 dark:border-gray-700/60 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              {isSignIn && (
                <a
                  href="#forgot-password"
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 bg-white/30 dark:bg-gray-800/30 border border-gray-300/60 dark:border-gray-700/60 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200 mt-6 disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : isSignIn
                ? "Sign In"
                : "Create Account"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch Auth Mode Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={toggleAuthMode}
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline focus:outline-none"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

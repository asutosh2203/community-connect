"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirects
import { Mail, Lock, HeartHandshake, Loader2, AlertCircle } from "lucide-react";
import MessageBox from "@/components/MessageBox";

export default function LoginPage() {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  const router = useRouter(); // Initialize router for redirection

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("http://localhost:8008/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        setMessage({
          text: "Login successful! Redirecting...",
          type: "success",
        });
        // On successful login, the httpOnly cookie is set by the backend.
        // We just need to redirect the user to the protected dashboard.
        setTimeout(() => {
          router.push("/dashboard"); // Redirect to the dashboard
        }, 1000); // Wait 1 second to show the success message
      } else {
        // Handle errors from the server (e.g., 401 Unauthorized, 400 Bad Request)
        setMessage({
          text: data.error || "Login failed. Please check your credentials.",
          type: "error",
        });
        setLoading(false);
      }
    } catch (error) {
      // Handle network errors
      setMessage({
        text: "Could not connect to the server. Please try again.",
        type: "error",
      });
      setLoading(false);
    }
  };

  const inputFieldClasses =
    "block w-full h-10 rounded-sm border-gray-300 text-black pl-10 shadow-sm focus-within:border-0 focus-within:ring-0 sm:text-sm";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <Link
          href="/"
          className="flex items-center justify-center space-x-2 text-3xl font-extrabold text-indigo-600 mb-6"
        >
          <HeartHandshake className="h-8 w-8" />
          <span>CommunityConnect</span>
        </Link>

        {/* Form Card */}
        <div className="w-full rounded-xl bg-white p-8 shadow-xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Message Box */}
            {message && (
              <MessageBox message={message.text} type={message.type} />
            )}

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputFieldClasses}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className={inputFieldClasses}
                />
              </div>

              {/* Optional: Forgot Password Link */}
              <div className="text-right text-sm mt-1">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-lg bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

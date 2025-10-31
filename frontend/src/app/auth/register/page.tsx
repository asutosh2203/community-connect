"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  User,
  Phone,
  Loader2,
} from "lucide-react";
import MessageBox from "@/components/MessageBox";
import Header from "@/components/Header";

export default function RegisterPage() {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Simple validation
    if (password.length < 10) {
      setMessage({
        text: "Password must be at least 10 characters long.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          phoneNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        setMessage({
          text: "Registration successful! You can now log in.",
          type: "success",
        });
        // Clear form
        setName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
      } else {
        // Handle errors from the server (e.g., 409 Conflict, 400 Bad Request)
        setMessage({
          text: data.error || "Registration failed. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      // Handle network errors
      setMessage({
        text: "Could not connect to the server. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputFieldClasses =
    "block w-full h-10 rounded-sm border-gray-300 text-black pl-10 shadow-sm focus-within:border-0 focus-within:ring-0 sm:text-sm";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center h-[84vh]">
        <div className="w-full max-w-md">
          {/* Form Card */}
          <div className="w-full rounded-xl bg-white p-8 shadow-2xl">
            <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
              Create your Account
            </h2>
            <p className="text-center text-sm text-gray-600 mb-6">
              Already have one?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in here
              </Link>
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Message Box */}
              {message && (
                <MessageBox message={message.text} type={message.type} />
              )}

              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Test User"
                    className={inputFieldClasses}
                  />
                </div>
              </div>

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
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 10 characters"
                    className={inputFieldClasses}
                  />
                </div>
              </div>

              {/* Phone Number Input (Optional) */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number{" "}
                  <span className="text-xs text-gray-500">(Optional)</span>
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="1234567890"
                    className={inputFieldClasses}
                  />
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
                    "Create Account"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

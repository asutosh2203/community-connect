"use client";
/**
 * Community Connect Landing Page
 */
import Link from "next/link";
import {
  Map,
  Users,
  HeartHandshake,
  Zap,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import Logo from "@/components/Logo";

// Main App Component (Landing Page)
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
      <Header />

      {/* Main Content */}
      <main>
        {/* 2. Hero Section */}
        <section className="relative bg-white pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-32">
          {/* Background Gradient */}
          <div
            className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>

          <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Get Local Help.
              <br className="hidden sm:inline" />
              Connect Your Neighbourhood.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-600">
              From needing a hand moving furniture to finding a local tutor,
              CommunityConnect links you directly with neighbours offering
              skills and resources right around the corner.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/auth/register"
                className="flex w-full items-center justify-center space-x-2 rounded-xl bg-indigo-600 px-8 py-3 text-lg font-bold text-white shadow-xl transition duration-200 hover:bg-indigo-700 hover:shadow-lg sm:w-auto"
              >
                <span>Join Your Community</span>
                <Users className="w-5 h-5" />
              </Link>
              <Link
                href="#how-it-works"
                className="flex w-full items-center justify-center space-x-2 rounded-xl border border-gray-300 bg-white px-8 py-3 text-lg font-bold text-gray-700 shadow-md transition duration-200 hover:bg-gray-100 sm:w-auto"
              >
                <span>See How It Works</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Mock Map Visualization */}
            <div className="mt-16 sm:mt-24">
              <div className="rounded-3xl bg-white p-4 sm:p-6 shadow-2xl shadow-indigo-200/50 ring-1 ring-gray-900/10">
                {/* Map Header */}
                <div className="flex items-center justify-between mb-3 px-2">
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="font-semibold text-gray-700">
                      LIVE: Your Area
                    </span>
                  </div>
                  <span className="text-sm font-medium text-indigo-600">
                    Filters
                  </span>
                </div>
                {/* "Map" area */}
                <div className="relative h-64 w-full rounded-2xl bg-indigo-50/70 sm:h-96 flex items-center justify-center overflow-hidden">
                  <Map className="h-24 w-24 text-indigo-300 opacity-50" />
                  <p className="absolute text-lg font-semibold text-indigo-700">
                    [Live Map Visualization]
                  </p>

                  {/* Floating Mock Pins */}
                  <div className="absolute top-1/4 left-1/4 p-2 bg-white rounded-full shadow-lg">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="absolute top-1/2 left-3/4 p-2 bg-white rounded-full shadow-lg">
                    <Zap className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div className="absolute bottom-1/4 left-1/2 p-2 bg-white rounded-full shadow-lg">
                    <HeartHandshake className="w-5 h-5 text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Value Proposition / How It Works */}
        <section id="how-it-works" className="bg-gray-50 py-24 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl text-center">
              Simple, Secure, Local.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 text-center">
              Our map-driven platform streamlines finding and providing local
              services in three easy steps.
            </p>

            <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
              {/* Step 1 */}
              <div className="rounded-xl bg-white p-8 text-center shadow-lg border-t-4 border-indigo-500">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-5 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Pin Your Need
                </h3>
                <p className="mt-2 text-gray-600">
                  Post a Request (e.g., <b>Need a tutor</b>) or an Offer (e.g.,{" "}
                  <b>I offer tool rental</b>) right on your local map.
                </p>
              </div>
              {/* Step 2 */}
              <div className="rounded-xl bg-white p-8 text-center shadow-lg border-t-4 border-indigo-500">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-5 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Get Matched
                </h3>
                <p className="mt-2 text-gray-600">
                  Nearby members see your pin instantly. Accept the best offer
                  or chat to coordinate the details live.
                </p>
              </div>
              {/* Step 3 */}
              <div className="rounded-xl bg-white p-8 text-center shadow-lg border-t-4 border-indigo-500">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-5 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Connect & Complete
                </h3>
                <p className="mt-2 text-gray-600">
                  Close the loop, provide honest ratings, and help build a
                  trustworthy community economy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Features Section (The Resume Talk) */}
        <section id="features" className="bg-white py-24 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Engineered for Trust and Efficiency
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600">
                We've packed in the high-end features a modern platform needs.
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              {/* Feature 1: Geospatial Real-Time */}
              <div className="flex items-start space-x-6 p-6">
                <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-red-100">
                  <Zap className="h-7 w-7 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Real-Time Event Coordination
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Instant updates via WebSockets for new requests and live
                    chat. Zero polling, minimal latency, and dedicated channels
                    for specific service coordinates.
                  </p>
                </div>
              </div>

              {/* Feature 2: Geospatial Queries */}
              <div className="flex items-start space-x-6 p-6">
                <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100">
                  <Map className="h-7 w-7 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Optimized Geospatial Search
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Utilizing PostGIS with PostgreSQL for lightning-fast radius
                    filtering, clustering, and distance calculation—find what
                    you need in under 100ms.
                  </p>
                </div>
              </div>

              {/* Feature 3: Data Visualization */}
              <div className="flex items-start space-x-6 p-6">
                <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-green-100">
                  <BarChart3 className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Service Heatmap Analytics
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Admins and power-users get a dashboard showing visual
                    heatmaps of active request density and trending service
                    categories across their zone.
                  </p>
                </div>
              </div>

              {/* Feature 4: AI Matching (The Forward Look) */}
              <div className="flex items-start space-x-6 p-6">
                <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-yellow-100">
                  <Users className="h-7 w-7 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    AI-Powered Suggestion Engine
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Intelligent matching recommends the top 3 best-fit providers
                    based on proximity, historical success rate, and skill tags
                    immediately upon request.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CTA Section */}
        <section className="bg-indigo-700">
          <div className="container mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl text-center">
              Ready to Connect?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-indigo-200 text-center">
              Stop scrolling and start doing. Join the platform built for real,
              local value and connect with your neighbours today.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href="/auth/register"
                className="flex items-center space-x-2 rounded-xl bg-white px-8 py-3 text-lg font-bold text-indigo-600 shadow-xl transition duration-200 hover:bg-gray-100 hover:shadow-lg"
              >
                <span>Sign Up Free</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Simple Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <Logo
            iconColor="white"
            iconSize={7}
            logoColor="white"
            logoSize="xl"
          />
          <p className="text-sm text-gray-400 mt-4 sm:mt-0">
            &copy; {new Date().getFullYear()} CommunityConnect. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

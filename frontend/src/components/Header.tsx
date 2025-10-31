"use client";

import {
  ChevronRight,
  HeartHandshakeIcon,
  Loader2,
  Menu,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useUser } from "@/context/UserContext";

type Props = {};

const Header = (props: Props) => {
  const { user, isLoading } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  //   useEffect(() => {}, [user, isLoading]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm shadow-sm">
      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 h-screen flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)} // close when clicking outside
        ></div>
      )}
      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-screen w-2/3 max-w-sm flex-col space-y-4 bg-linear-to-b from-violet-100 to-indigo-50 py-10 px-5 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full hidden"
        }`}
      >
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center justify-center space-x-2 text-2xl font-extrabold text-indigo-600 transition-transform hover:scale-105"
        >
          <Logo
            iconColor="indigo-600"
            iconSize={7}
            logoColor="indigo-600"
            logoSize="2xl"
          />
        </Link>
        <Link
          href="/#how-it-works"
          onClick={closeMobileMenu}
          className="rounded-lg px-3 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
        >
          How it works
        </Link>
        <Link
          href="/#features"
          onClick={closeMobileMenu}
          className="rounded-lg px-3 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
        >
          Features
        </Link>

        {!user && (
          <Link
            href="/auth/login"
            onClick={closeMobileMenu}
            className="rounded-lg px-3 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
          >
            Log In
          </Link>
        )}

        <Link
          href="/auth/register"
          onClick={closeMobileMenu}
          className="flex items-center justify-center space-x-1 rounded-lg bg-indigo-600 px-4 py-3 text-lg text-white font-semibold shadow-md transition duration-200 hover:bg-indigo-700"
        >
          <span>Get Started</span>
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center space-x-2 text-2xl font-extrabold text-indigo-600 transition-transform hover:scale-105"
        >
          <Logo
            iconColor="indigo-600"
            iconSize={7}
            logoColor="indigo-600"
            logoSize="2xl"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-4 md:flex">
          <Link
            href="#how-it-works"
            className="rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition duration-150 font-medium"
          >
            How it works
          </Link>
          <Link
            href="#features"
            className="rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition duration-150 font-medium"
          >
            Features
          </Link>

          <div className="w-px h-6 bg-gray-200"></div>

          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : !user ? (
            <>
              <Link
                href="/auth/login"
                className="rounded-lg px-4 py-2 text-indigo-600 font-semibold hover:bg-indigo-50 transition duration-200"
              >
                Log In
              </Link>
              <Link
                href="/auth/register"
                className="flex items-center space-x-1 rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold shadow-md transition duration-200 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span>Get Started</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </>
          ) : (
            <>
              <User />
              <Link
                href="/dashboard"
                className="flex items-center space-x-1 rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold shadow-md transition duration-200 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span>My Dashboard</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100 transition duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;

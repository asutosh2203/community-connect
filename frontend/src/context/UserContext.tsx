"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of your User data (matches the backend)
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Define the shape of the Context
interface UserContextType {
  user: User | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// --- This is the key component ---
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading by default

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/getme", {
        credentials: "include", // <-- CRITICAL: This sends the cookie
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Set the user in state
      } else {
        setUser(null); // No user is logged in
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
      setUser(null); // Error, so no user
    } finally {
      setIsLoading(false); // We're done loading, one way or another
    }
  };

  useEffect(() => {
    // This effect runs once when the app loads

    fetchUser();
  }, []); // The empty array [] means this runs ONCE on mount

  return (
    <UserContext.Provider value={{ user, isLoading, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// --- Custom Hook ---
// This is a clean way for components to get the user data
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

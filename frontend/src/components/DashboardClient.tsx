"use client";

import Header from "./Header";
import { Loader2, PlusCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

type Props = {};

const DashboardClient = (props: Props) => {
  const { user, isLoading } = useUser();

  useEffect(() => {}, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

//   if (!user) {
//     // This is a fallback, middleware should catch them first
//     return (
//       <div className="flex h-screen items-center justify-center">
//         You need to Login to view this page.
//         <button
//           onClick={() => {
//             window.location.replace("/auth/login");
//           }}
//         >
//           Log In
//         </button>
//       </div>
//     );
//   }

  return (
    <div className="flex h-screen flex-col">
      <Header isOnDashboard={true} />

      {/* This will be our main app layout */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-4 h-[calc(100vh-4rem)]">
        {/* Sidebar / Control Panel */}
        <div className="col-span-1 border-r border-gray-200 p-4 bg-gray-50 overflow-y-auto">
          <button className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-indigo-600 p-3 text-lg font-bold text-white shadow-md hover:bg-indigo-700">
            <PlusCircle className="h-6 w-6" />
            <span>Post a Request</span>
          </button>

          <hr className="my-6" />

          {/* Filters will go here */}
          <h3 className="text-xl font-semibold mb-4">Filters</h3>
          <p className="text-gray-600">[Search Bar Placeholder]</p>
          <p className="text-gray-600">[Radius Slider Placeholder]</p>

          {/* Live Feed will go here */}
          <h3 className="text-xl font-semibold mt-8 mb-4">Live Feed</h3>
          <p className="text-gray-600">[List of new requests placeholder]</p>
        </div>

        {/* Map Area */}
        <div className="col-span-3 bg-gray-200 flex items-center justify-center">
          <p className="text-2xl text-gray-500">[Map Component Will Go Here]</p>
        </div>
      </main>
    </div>
  );
};

export default DashboardClient;

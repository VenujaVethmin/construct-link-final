"use client";


import Navbar from "@/components/UserComponents/Navbar";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <main className="pb-24 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
        <Toaster
          theme="dark"
          position="top-right"
          expand={true}
          richColors
          toastOptions={{
            style: {
              background: "rgba(31, 41, 55, 0.8)",
              border: "1px solid rgba(75, 85, 99, 0.5)",
              backdropFilter: "blur(8px)",
              color: "white",
            },
            success: {
              style: {
                background: "rgba(31, 41, 55, 0.8)",
                border: "1px solid rgba(249, 115, 22, 0.5)", // orange-500 with opacity
                color: "white",
              },
              icon: "🎉",
            },
            error: {
              style: {
                background: "rgba(31, 41, 55, 0.8)",
                border: "1px solid rgba(239, 68, 68, 0.5)", // red-500 with opacity
                color: "white",
              },
              icon: "❌",
            },
          }}
        />
      </main>
    </div>
  );
}

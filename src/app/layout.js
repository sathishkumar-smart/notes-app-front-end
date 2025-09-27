"use client";

import './globals.css';
import NavbarMenu from "../components/molecules/NavbarMenu";
import { useRouter } from "next/navigation";
import { createRoot } from 'react-dom/client';


<link
  rel="stylesheet"
  href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
/>

/**
 * RootLayout Component
 * - Wraps all pages
 * - Renders Navbar only if user is logged in
 */
export default function RootLayout({ children }) {
  const router = useRouter();

  // Check if token exists (simple auth check)
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/auth/login");
  };

  return (
    <html lang="en">
      <body className="bg-primary-light text-gray-800 min-h-screen">
        {/* Show Navbar only if user is logged in */}
        {token && <NavbarMenu onLogout={handleLogout} />}

        {/* Page content */}
        <main className="pt-6 px-6 max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}

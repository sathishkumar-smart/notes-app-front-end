"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../../lib/axios";
import { useRouter } from "next/navigation";

/**
 * AccountPage Component
 * - Displays the currently logged-in user's account info
 * - Fetches data from backend using JWT token (/auth/me)
 * - Shows key user details in responsive cards
 */
export default function AccountPage() {
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  /**
   * Fetch the current logged-in user's info
   * - Redirects to login page if token missing or invalid
   */
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      const res = await axiosInstance.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user info:", err);
      localStorage.removeItem("access_token"); // Clear invalid token
      router.push("/auth/login"); // Redirect to login
    } finally {
      setLoading(false);
    }
  };

  // Fetch user info on mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Show loading indicator while fetching
  if (loading) return <p className="text-center mt-6">Loading account info...</p>;

  // Return nothing if user not available (extra safety)
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      {/* Responsive grid for user details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="bg-primary p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Name</h2>
          <p>{user.user_name}</p>
        </div>

        {/* Email */}
        <div className="bg-primary p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Email</h2>
          <p>{user.user_email}</p>
        </div>

        {/* Created On */}
        <div className="bg-primary p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Created On</h2>
          <p>{new Date(user.created_on).toLocaleDateString()}</p>
        </div>

        {/* Last Updated */}
        <div className="bg-primary p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Last Updated</h2>
          <p>{new Date(user.last_update).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

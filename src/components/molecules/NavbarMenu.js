"use client";

import { useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

/**
 * NavbarMenu Component
 * - Left: App title
 * - Right: Menu links + Logout styled as link
 */
export default function NavbarMenu({ onLogout }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    onLogout();
    setShowConfirm(false);
  };

  return (
    <nav className="bg-orange-500 p-4 flex justify-between items-center shadow-md">
      {/* Left: App title */}
      <div className="font-bold text-lg text-white">
        <Link href="/">Keep Notes</Link>
      </div>

      {/* Right: Menu links + Logout */}
      <div className="flex items-center space-x-6">
        <Link
          href="/"
          className="text-white hover:text-accent-yellow transition-colors"
        >
          Notes
        </Link>

        <Link
          href="auth/account"
          className="text-white hover:text-accent-yellow transition-colors"
        >
          Account
        </Link>

        <Link
          href="/about"
          className="text-white hover:text-accent-yellow transition-colors"
        >
          About
        </Link>

        {/* Logout as link */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowConfirm(true); // open confirmation modal
          }}
          className="bg-accent-yellow text-black px-3 py-1 rounded hover:bg-accent-orange transition-colors"
        >
          Logout
        </Link>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-accent-yellow hover:bg-accent-orange transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

NavbarMenu.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

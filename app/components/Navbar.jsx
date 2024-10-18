"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl">
        {/* Sign In Link */}

        {/* Navbar Brand (Logo) */}
        <Link href="/" className="flex items-center justify-center">
          <img
            src="/logo.png" // Update with your logo path
            alt="Logo"
            className="h-10"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-700 no-underline hover:text-blue-500">
            Home
          </Link>
          <Link href="/events" className="text-gray-700 no-underline hover:text-blue-500">
            Events
          </Link>
        </div>

        <Link href="/signin" className="text-blue-500 no-underline hover:text-blue-700">
          Sign In
        </Link>
      </div>
    </nav>
  );
}

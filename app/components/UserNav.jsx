"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    // Access localStorage only on the client
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    const logout = confirm("Are you sure you want to logout");
    if (logout) {
      localStorage.removeItem("user");
      router.push("/");
    }
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl">
        {/* Navbar Brand (Logo) */}
        <Link href="/user" className="flex items-center justify-center">
          <img
            src="/logo.png" // Update with your logo path
            alt="Logo"
            className="h-10"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link href="/user" className="flex items-center justify-center no-underline">
            Home Page
          </Link>
          <Link
            href={`/user/bookedByUser/${user?.id}`}
            className="text-gray-700 no-underline hover:text-blue-500"
          >
            Booked By You
          </Link>
          <Link href="/about" className="text-gray-700 no-underline hover:text-blue-500">
            Recommendation
          </Link>
        </div>

        <div
          onClick={handleLogout}
          className="text-blue-500 cursor-pointer hover:text-blue-700"
        >
          Sign Out
        </div>
      </div>
    </nav>
  );
}

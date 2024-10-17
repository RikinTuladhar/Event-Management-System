"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    function handleLogout(){
        alert("Log out")
        window.localStorage.removeItem("user")
        router.push("/")
    }
  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl">
        <div className="flex items-center">
          <Link href="/admin">
            <img
              src="/logo.png" // Replace with your logo path
              alt="Logo"
              className="h-10"
            />
          </Link>
        </div>
        {/* Center - Navigation Links */}
        <div className="flex space-x-8">
          <Link href="/admin" className="text-white hover:text-gray-300">
            Dashboard
          </Link>
          <Link href="/admin/edit-event" className="text-white hover:text-gray-300">
            Edit Event
          </Link>
          <Link href="/admin/booked-event" className="text-white hover:text-gray-300">
            Show Booked Event
          </Link>
        </div>

        {/* Right Side - Logo */}

        {/* Left Side - Logout */}
        <div className="text-white">
          <button onClick={handleLogout} className="transition hover:text-red-400">Logout</button>
        </div>
      </div>
    </nav>
  );
}

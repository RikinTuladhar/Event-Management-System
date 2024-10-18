import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function MyComponent() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gray-100">
        {/* Hero Section with Image */}
        <section className="relative w-full h-screen">
          <img
            src="/path/to/your-hero-image.jpg"
            alt="Event Management System"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <h1 className="text-5xl font-bold text-center text-white">
              Welcome to Our Event Management System
            </h1>
          </div>
        </section>

        {/* About Section */}
        <section className="px-10 py-16 text-center bg-white">
          <h2 className="mb-6 text-4xl font-semibold">What We Do</h2>
          <p className="max-w-4xl mx-auto text-lg text-gray-600">
            Our event management system makes it easy for you to manage, book,
            and participate in events effortlessly. From conferences and
            concerts to private gatherings, we provide a seamless experience for
            organizers and participants. Explore our events and enjoy a
            hassle-free management system tailored just for you!
          </p>
        </section>

        {/* Call-to-Action Button */}
        <section className="flex items-center justify-center py-20 bg-gray-200">
          <Link href="/events">
            <button className="px-8 py-4 text-lg font-semibold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600">
              Check Out Events
            </button>
          </Link>
        </section>
      </div>
    </>
  );
}

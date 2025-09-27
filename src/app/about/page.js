"use client";

/**
 * AboutPage Component
 * - Provides details about the Keep Notes app
 * - Styled to match the sticky-note theme
 * - Responsive and professional layout
 */
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-primary-dark">About Keep Notes</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1: Overview */}
        <div className="bg-primary p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold mb-3">Overview</h2>
          <p className="text-gray-800">
            Keep Notes is a modern, lightweight note-taking application built with
            Next.js 15 and FastAPI, following atomic design principles.
          </p>
        </div>

        {/* Card 2: Features */}
        <div className="bg-primary p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold mb-3">Features</h2>
          <ul className="list-disc pl-5 text-gray-800 space-y-1">
            <li>Create, edit, and delete notes easily</li>
            <li>Rich, responsive user interface</li>
            <li>JWT authentication for secure access</li>
            <li>Reusable atomic components for fast development</li>
          </ul>
        </div>

        {/* Card 3: Design Philosophy */}
        <div className="bg-primary p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold mb-3">Design Philosophy</h2>
          <p className="text-gray-800">
            The app follows an atomic design approach: atoms, molecules, and organisms
            are reusable to ensure maintainability and scalability.
          </p>
        </div>

        {/* Card 4: Tech Stack */}
        <div className="bg-primary p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
          <p className="text-gray-800">
            Frontend: Next.js 15 + TailwindCSS <br />
            Backend: FastAPI + MySQL/MongoDB <br />
            Authentication: JWT <br />
            Styling: Sticky-note inspired theme
          </p>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Clue
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Next.js + MongoDB + Vercel
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/login"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg transition duration-150 transform hover:scale-105"
              >
                View Login Page
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Tech Stack
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="mr-2">⚡</span>
                  Next.js 16 (App Router)
                </li>
                <li className="flex items-center">
                  <span className="mr-2">⚛️</span>
                  React 19
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🍃</span>
                  MongoDB + Mongoose
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🎨</span>
                  Tailwind CSS
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📘</span>
                  TypeScript
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                API Routes
              </h2>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p className="font-mono text-sm">GET /api/users</p>
                <p className="font-mono text-sm">POST /api/users</p>
                <p className="font-mono text-sm">GET /api/users/[id]</p>
                <p className="font-mono text-sm">PUT /api/users/[id]</p>
                <p className="font-mono text-sm">DELETE /api/users/[id]</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Getting Started
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Configure your MongoDB connection in .env.local</li>
              <li>Run the development server: npm run dev</li>
              <li>Test the API routes at /api/users</li>
              <li>Deploy to Vercel with one click</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}

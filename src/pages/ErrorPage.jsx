import { Link, useRouteError } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-900 p-6 rounded-full">
            <AlertTriangle size={64} className="text-red-300" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-white mb-4">Oops!</h1>

        <h2 className="text-2xl font-semibold text-gray-300 mb-4">
          Something went wrong
        </h2>

        <p className="text-gray-400 mb-2">
          {error?.statusText || error?.message || "Page not found"}
        </p>

        {error?.status && (
          <p className="text-gray-500 mb-8">Error Code: {error.status}</p>
        )}

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-2">Oops! Page Not Found</h2>
      <p className="text-gray-600 mt-2">The page you are looking for doesn't exist or has been moved.</p>
      
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 transition duration-300"
      >
        Go Back Home
      </Link>
      
    </div>
  );
}
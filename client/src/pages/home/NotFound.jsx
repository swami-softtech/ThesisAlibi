import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-sm px-4">
      <h1 className="text-8xl md:text-9xl font-bold text-indigo-500">404</h1>

      <div className="h-1 w-16 rounded bg-indigo-500 my-5 md:my-7" />

      <p className="text-2xl md:text-3xl font-bold text-gray-800">
        Page Not Found
      </p>

      <p className="mt-4 max-w-md text-center text-sm md:text-base text-gray-500">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <div className="mt-6 flex items-center gap-4">
        <Link
          to="/"
          className="rounded-md bg-gray-800 px-7 py-2.5 text-white transition-all hover:bg-black active:scale-95"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="text-center px-6 bg-background">
      <h1 className="text-9xl font-bold text-secondary-foreground">404</h1>
      <p className="text-2xl mt-4 text-gray-600">Page Not Found</p>
      <p className="mt-2 text-gray-500">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

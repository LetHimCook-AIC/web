import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full p-6 bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl font-semibold mb-4">Oops! Page Not Found</p>
        <p className="text-lg mb-8">
          It seems the page you are looking for doesn't exist or has been moved.
          Please check the URL or return to the homepage.
        </p>
        <Button asChild className="px-4 py-2  text-white rounded-md">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
      <div className="absolute bottom-4 text-sm text-gray-600">
        <p>© 2024 JobSage. All rights reserved.</p>
      </div>
    </main>
  );
};

export default NotFound;

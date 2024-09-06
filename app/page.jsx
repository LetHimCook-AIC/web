import React from "react";
import { cn } from "@/lib/utils";
import Skeleton from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen dark:text-gray-200 p-6 w-full">
      <div className="flex flex-col justify-center items-center mb-8 text-center">
        <h1 className="text-5xl font-bold mb-2">CrotVitae</h1>
        <p className="text-xl font-semibold mb-5">
          <span className="underline">AI-powered</span> job preparation platform
        </p>
        <p className="w-1/2">
          Transform your career with AI-driven insights that make your CV and
          LinkedIn profiles shine. Stand out to global recruiters with a profile
          that highlights your top achievements and skills, powered by advanced
          artificial intelligence.
        </p>
      </div>

      <Button asChild className="shadow-lg w-1/3">
        <Link href="/cv-scan">Rate your CV now!</Link>
      </Button>
    </main>
  );
}

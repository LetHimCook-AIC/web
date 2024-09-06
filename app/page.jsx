import React from "react";
import { cn } from "@/lib/utils";
import Skeleton from "@/components/Skeleton";

export default function Home() {
  return (
    <main
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen"
      )}
    >
      <Skeleton />
    </main>
  );
}

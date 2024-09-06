import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SidebarComponent from "@/components/SidebarComponent";
import { cn } from "@/lib/utils";

const jakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "JobSage",
  description: "AI Powered Job Preparation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          jakartaSans.className,
          "flex w-screen min-h-screen bg-neutral-100 dark:bg-neutral-800"
        )}
      >
        <SidebarComponent />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { StoreProvider } from "@/store/StoreProvider";

export const metadata: Metadata = {
  title: "Study War Room — 30-Day Command Center",
  description:
    "A 30-day study command center for landing a 10 LPA AI/ML engineering role. Track DSA, GenAI, job applications, and daily progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 min-h-screen overflow-y-auto">
              {children}
            </main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}

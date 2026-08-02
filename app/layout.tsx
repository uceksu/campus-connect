import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from '@vercel/analytics/next';
import { PwaRegistry } from "@/components/PwaRegistry";
import { AddToHomeScreen } from "@/components/AddToHomeScreen";
import { getMaintenanceMode } from "@/lib/actions/settings";
import { auth } from "@/auth";
import MaintenanceView from "@/components/MaintenanceView";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KSU UCE Portal",
  description: "Campus Connect Portal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenanceOn = await getMaintenanceMode();
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "SUPER_ADMIN";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <PwaRegistry />
          <Navbar />
          <main className="flex-1">
            {isMaintenanceOn && !isAdmin ? (
              <MaintenanceView />
            ) : (
              children
            )}
          </main>
          {(!isMaintenanceOn || isAdmin) && <Footer />}
          {(!isMaintenanceOn || isAdmin) && <AddToHomeScreen />}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
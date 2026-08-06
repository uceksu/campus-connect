import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { PwaRegistry } from "@/components/PwaRegistry";
import { AddToHomeScreen } from "@/components/AddToHomeScreen";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getMaintenanceMode, getAdminPortalVisibility, getSiteLogo } from "@/lib/actions/settings";
import { auth } from "@/auth";
import MaintenanceView from "@/components/MaintenanceView";
import NextTopLoader from "nextjs-toploader";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const logo = await getSiteLogo();
  const iconUrl = logo || "/icon.png";

  return {
    metadataBase: new URL("https://ksuconnectuce.vercel.app"),
    title: "KSU UCE Portal",
    description: "Campus Connect Portal for UCE KSU",
    icons: {
      icon: iconUrl,
      shortcut: iconUrl,
      apple: iconUrl,
    },
    openGraph: {
      title: "KSU UCE Portal",
      description: "Campus Connect Portal for UCE KSU",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: logo || "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "KSU UCE Campus Connect",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "KSU UCE Portal",
      description: "Campus Connect Portal for UCE KSU",
      images: [logo || "/opengraph-image.png"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenanceOn = await getMaintenanceMode();
  const isAdminPortalVisible = await getAdminPortalVisibility();
  const siteLogo = await getSiteLogo();
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "SUPER_ADMIN";
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-YCQKVK38P2";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {gaId && gaId !== "G-XXXXXXXXXX" && <GoogleAnalytics gaId={gaId} />}
        <ThemeProvider>
          <NextTopLoader color="#456be5" height={3} showSpinner={false} />
          <PwaRegistry />
          <Navbar isAdminVisible={isAdminPortalVisible} isMaintenanceOn={isMaintenanceOn} isAdmin={isAdmin} siteLogo={siteLogo} />
          <main className="flex-1">
            {isMaintenanceOn && !isAdmin ? (
              <MaintenanceView />
            ) : (
              children
            )}
          </main>
          {(!isMaintenanceOn || isAdmin) && <Footer />}
          {(!isMaintenanceOn || isAdmin) && <AddToHomeScreen />}
          <ThemeToggle />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

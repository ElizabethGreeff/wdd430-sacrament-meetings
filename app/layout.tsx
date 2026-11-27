import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavLinks from "@/components/NavLinks";
import AuthControls from "@/components/AuthControls";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
});

const host =
  process.env.VERCEL_ENV === "production"
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL
    : process.env.VERCEL_URL;
const siteUrl = host ? `https://${host}` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sacrament Meeting Planner | Sunrise Ward",
    template: "%s | Sacrament Meeting Planner",
  },
  description:
    "Plan, view and print sacrament meeting programs for the Sunrise Ward.",
  openGraph: {
    siteName: "Sacrament Meeting Planner",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans antialiased min-h-screen flex flex-col bg-parchment text-ink`}
      >
        <Header />
        {/* NavLinks reads the URL and AuthControls reads the session, so both
            must sit inside a Suspense boundary. */}
        <Suspense
          fallback={<nav aria-label="Main navigation" className="h-14 bg-forest" />}
        >
          <NavLinks>
            <AuthControls />
          </NavLinks>
        </Suspense>
        <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

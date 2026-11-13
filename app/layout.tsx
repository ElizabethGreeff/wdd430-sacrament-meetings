import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavLinks from "@/components/NavLinks";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Sacrament Meeting Planner",
  description: "Plan and view sacrament meeting agendas",
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
        {/* NavLinks reads the current URL (usePathname), which is only known
            at request time, so it must sit inside a Suspense boundary. */}
        <Suspense
          fallback={<nav aria-label="Main navigation" className="h-14 bg-forest" />}
        >
          <NavLinks />
        </Suspense>
        <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

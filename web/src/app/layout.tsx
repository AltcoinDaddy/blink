import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blink — Outreach Copilot | OKX.AI Agent",
  description:
    "AI-powered outreach copilot that writes hyper-personalized cold emails, roasts bad pitches, and helps you land meetings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-[#0a0a0f] text-gray-100 font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}

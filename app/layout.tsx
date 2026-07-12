import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SITE_URL } from "./site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const description =
  "A universe of impact. Isaiah Ferguson is a developer and Coding Advocate at CodeStack Academy within the San Joaquin County Office of Education — building software, mentoring emerging developers, and connecting the Stockton community with careers in technology.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Isaiah Ferguson — Developer · Coding Advocate · Mentor",
  description,
  keywords: [
    "Isaiah Ferguson",
    "Coding Advocate",
    "CodeStack Academy",
    "SJCOE",
    "software developer",
    "Stockton",
    "C#",
    "Next.js",
    "mentor",
  ],
  authors: [{ name: "Isaiah Ferguson" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Isaiah Ferguson — A Universe of Impact",
    description,
    siteName: "Isaiah Ferguson",
  },
  twitter: {
    card: "summary_large_image",
    title: "Isaiah Ferguson — A Universe of Impact",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#05060f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

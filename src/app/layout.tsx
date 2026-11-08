/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";
import { Doto, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { portfolio } from "~/portfolio.config";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const profileImage = portfolio.handles.github
  ? `https://github.com/${portfolio.handles.github}.png`
  : new URL("/opengraph-image", SITE_URL).toString();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: portfolio.name,
  description: portfolio.description,
  openGraph: {
    title: portfolio.name,
    description: portfolio.tagline,
    url: SITE_URL,
    siteName: portfolio.name,
    type: "website",
    images: [
      {
        url: profileImage,
        width: 1200,
        height: 630,
        alt: `${portfolio.name} portfolio preview`,
      },
    ],
  },
  ...(portfolio.googleSiteVerification
    ? { verification: { google: portfolio.googleSiteVerification } }
    : {}),
  twitter: {
    card: "summary_large_image",
    title: portfolio.name,
    description: portfolio.tagline,
    site: `@${portfolio.handles.x}`,
    creator: `@${portfolio.handles.x}`,
    images: [profileImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${doto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col dark:bg-black dark:text-zinc-50 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

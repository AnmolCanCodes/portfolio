/* eslint-disable react-refresh/only-export-components */
import type { Metadata, Viewport } from "next";
import { Doto, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE_ALT, DEFAULT_TITLE, OG_IMAGE_URL, SITE_URL } from "@/lib/site";
import { portfolio } from "~/portfolio.config";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PersonJsonLd } from "@/components/PersonJsonLd";

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

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Anmol Gupta",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: portfolio.name,
  alternates: {
    canonical: "/",
  },
  authors: [{ name: portfolio.name }],
  icons: {
    icon: "/avatar.png",
    shortcut: "/avatar.png",
    apple: "/avatar.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: portfolio.name,
    locale: "en_IN",
    type: "website",
    images: [{
      url: OG_IMAGE_URL,
      width: 1200,
      height: 630,
      alt: DEFAULT_OG_IMAGE_ALT,
    }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@stateful_anmol",
    site: "@stateful_anmol",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  ...(portfolio.googleSiteVerification ? { verification: { google: portfolio.googleSiteVerification } } : {}),
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
        <PersonJsonLd />
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

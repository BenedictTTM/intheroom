import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import GrainOverlay from "@/components/GrainOverlay";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.intheroom.site"),
  title: {
    default: "In The Room Church",
    template: "%s | In The Room Church",
  },
  description: "A Global Community of Teenagers dedicated to spreading the Gospel of Jesus Christ through faith, love, and discipleship.",
  keywords: [
    "Church", "Teenagers", "Youth Ministry", "Gospel", "Jesus Christ",
    "In The Room", "Global Church", "Christian Youth", "Teen Church",
    "Discipleship", "Outreach", "Worship",
  ],
  authors: [{ name: "In The Room Church" }],
  creator: "In The Room Church",
  publisher: "In The Room Church",
  alternates: {
    canonical: "https://www.intheroom.site",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.intheroom.site",
    title: "In The Room Church",
    description: "A Global Community of Teenagers dedicated to spreading the Gospel of Jesus Christ.",
    siteName: "In The Room Church",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "In The Room Church — A Global Community of Teenagers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "In The Room Church",
    description: "A Global Community of Teenagers dedicated to spreading the Gospel of Jesus Christ.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Add your Google Search Console verification token here once you have it:
  // verification: { google: "YOUR_VERIFICATION_TOKEN" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="antialiased bg-background text-primary selection:bg-accent selection:text-surface">
        <SmoothScroll>
          <GrainOverlay />
          <CustomCursor />
          <Navigation />
          <main className="relative z-10 flex min-h-screen flex-col">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}

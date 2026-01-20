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
  weight: ["200", "300", "400", "500", "600"], // Extralight to Semibold
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"], // Light to Bold
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.intheroom.site"),
  title: {
    default: "In The Room Church",
    template: "%s | In The Room Church",
  },
  description: "A Global Community of Teenagers dedicated to spreading the Gospel of Jesus Christ.",
  keywords: ["Church", "Teenagers", "Youth Ministry", "Gospel", "Jesus Christ", "In The Room", "Global Church"],
  authors: [{ name: "In The Room Church" }],
  creator: "In The Room Church",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.intheroom.site",
    title: "In The Room Church",
    description: "A Global Community of Teenagers dedicated to spreading the Gospel of Jesus Christ.",
    siteName: "In The Room Church",
    images: [
      {
        url: "/opengraph-image.png", // Ensure this image exists in public folder or update path
        width: 1200,
        height: 630,
        alt: "In The Room Church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "In The Room Church",
    description: "A Global Community of Teenagers dedicated to spreading the Gospel of Jesus Christ.",
    images: ["/twitter-image.png"], // Ensure this image exists
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "In The Room Church",
  url: "https://www.intheroom.site",
  logo: "https://www.intheroom.site/logo.png",
  sameAs: [
    "https://www.instagram.com/intheroom.global", // Update with actual social links
    "https://www.youtube.com/@intheroom.global",
  ],
  description: "A Global Community of Teenagers dedicated to spreading the Gospel of Jesus Christ.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

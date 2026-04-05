import { Metadata } from "next";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";

export const metadata: Metadata = {
  title: "Home",
  description: "In The Room is a global community of teenagers dedicated to spreading the Gospel of Jesus Christ through faith, love, and discipleship.",
  alternates: {
    canonical: "https://www.intheroom.site",
  },
  openGraph: {
    title: "In The Room Church",
    description: "A global community of teenagers dedicated to spreading the Gospel of Jesus Christ.",
    url: "https://www.intheroom.site",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  "@id": "https://www.intheroom.site/#church",
  name: "In The Room Church",
  url: "https://www.intheroom.site",
  logo: "https://www.intheroom.site/logo.png",
  description: "A global community of teenagers dedicated to spreading the Gospel of Jesus Christ through faith, love, and discipleship.",
  sameAs: [
    "https://www.instagram.com/intheroom.global",
    "https://www.youtube.com/@intheroom.global",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col">
        <Hero />
        <Manifesto />
      </div>
    </>
  );
}

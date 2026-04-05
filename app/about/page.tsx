import { Metadata } from "next";
import AboutChapters from "@/components/AboutChapters";

export const metadata: Metadata = {
    title: "About",
    description: "Learn about In The Room Church — our mission to reconcile hearts back to God by discipling teenagers and spreading the Gospel through schools and communities worldwide.",
    alternates: {
        canonical: "https://www.intheroom.site/about",
    },
    openGraph: {
        title: "About | In The Room Church",
        description: "Our mission is to reconcile hearts back to God through discipleship, outreach, and Gospel-centred community for teenagers.",
        url: "https://www.intheroom.site/about",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://www.intheroom.site/about#page",
    url: "https://www.intheroom.site/about",
    name: "About In The Room Church",
    description: "Our mission is to reconcile hearts back to God through discipleship, outreach, and Gospel-centred community for teenagers.",
    isPartOf: { "@id": "https://www.intheroom.site/#church" },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.intheroom.site" },
            { "@type": "ListItem", position: 2, name: "About", item: "https://www.intheroom.site/about" },
        ],
    },
};

export default function AboutPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="pt-24">
                <AboutChapters />
            </div>
        </>
    );
}

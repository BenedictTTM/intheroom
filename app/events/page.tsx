import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import EventsTimeline, { Event } from "@/components/EventsTimeline";

const prisma = new PrismaClient();

export const metadata: Metadata = {
    title: "Events & Gatherings",
    description: "Browse upcoming and past In The Room Church gatherings — outreaches, discipleship meetings, and worship events for teenagers worldwide.",
    alternates: {
        canonical: "https://www.intheroom.site/events",
    },
    openGraph: {
        title: "Events & Gatherings | In The Room Church",
        description: "Browse upcoming and past In The Room Church gatherings — outreaches, discipleship meetings, and worship events for teenagers worldwide.",
        url: "https://www.intheroom.site/events",
    },
};

export default async function EventsPage() {
    const events = await prisma.event.findMany({
        orderBy: { day: "asc" },
        include: { images: true },
    });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "In The Room Church Gatherings",
        url: "https://www.intheroom.site/events",
        itemListElement: (events as Event[]).map((event, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Event",
                name: event.title,
                description: event.description,
                url: `https://www.intheroom.site/events/${event.id}`,
                organizer: {
                    "@type": "Organization",
                    name: "In The Room Church",
                    url: "https://www.intheroom.site",
                },
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <EventsTimeline events={events} />
        </>
    );
}

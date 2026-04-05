
import { MetadataRoute } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://www.intheroom.site";

    // Fetch all event IDs for dynamic routes
    let eventEntries: MetadataRoute.Sitemap = [];
    try {
        const events = await prisma.event.findMany({
            select: { id: true, updatedAt: true },
        });
        eventEntries = events.map((event) => ({
            url: `${baseUrl}/events/${event.id}`,
            lastModified: event.updatedAt,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }));
    } catch {
        // Silently skip if DB unavailable during static build
    }

    return [
        {
            url: baseUrl,
            lastModified: new Date("2026-01-01"),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date("2026-01-01"),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/events`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: new Date("2026-01-01"),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        ...eventEntries,
    ];
}

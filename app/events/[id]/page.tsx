import { events } from "@/data/events";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return events.map((event) => ({
        id: event.id.toString(),
    }));
}

export default async function EventPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const event = events.find((e) => e.id.toString() === id);

    if (!event) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background px-4 py-24 md:px-24 md:py-32">
            <div className="mx-auto max-w-7xl">
                <Link
                    href="/events"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-light uppercase tracking-widest text-primary/60 transition-colors hover:text-accent"
                >
                    <ArrowLeft size={16} />
                    Back to Events
                </Link>

                <div className="mb-16">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <span className="font-sans text-6xl font-extralight leading-none text-accent md:text-9xl">
                                {event.date}
                            </span>
                            <span className="font-serif text-2xl italic text-secondary md:text-4xl">
                                {event.month}
                            </span>
                        </div>
                        <h1 className="mt-4 font-serif text-4xl font-light text-primary md:text-6xl">
                            {event.title}
                        </h1>
                        <p className="max-w-2xl font-sans text-lg font-light text-primary/80 md:text-xl">
                            {event.description}
                        </p>
                        <span className="font-sans text-sm tracking-widest text-accent/60">
                            {event.time}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {event.images.map((img, index) => (
                        <div
                            key={index}
                            className="relative aspect-[4/3] w-full overflow-hidden rounded-sm"
                        >
                            <Image
                                src={img}
                                alt={`${event.title} photo ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

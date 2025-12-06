"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";

import { events } from "@/data/events";
import Link from "next/link";

export default function EventsTimeline() {
    return (
        <div className="min-h-screen bg-background px-4 py-24 md:px-24 md:py-32">
            <div className="mx-auto max-w-3xl">
                <h1 className="mb-16 font-serif text-4xl font-light text-primary md:mb-24 md:text-6xl lg:text-8xl">
                    Gatherings
                </h1>

                <div className="relative border-l border-border pl-6 md:pl-16">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group relative mb-16 last:mb-0"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[29px] top-8 h-3 w-3 rounded-full bg-border transition-colors duration-500 group-hover:bg-accent md:-left-[69px]" />

                            {/* Event Card */}
                            <Link href={`/events/${event.id}`}>
                                <div className="relative overflow-hidden rounded-sm border border-border bg-surface/30 p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5 cursor-pointer">
                                    <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                                        {/* Date */}
                                        <div className="flex flex-col">
                                            <span className="font-sans text-5xl font-extralight leading-none text-accent/80 transition-colors group-hover:text-accent md:text-8xl">
                                                {event.date}
                                            </span>
                                            <span className="font-serif text-xl italic text-secondary">
                                                {event.month}
                                            </span>
                                        </div>

                                        {/* Details */}
                                        <div className="flex flex-1 flex-col gap-2 md:pt-4">
                                            <h3 className="font-serif text-2xl text-primary md:text-3xl">
                                                {event.title}
                                            </h3>
                                            <p className="font-sans text-base font-light text-primary/60 md:text-lg">
                                                {event.description}
                                            </p>
                                            <span className="mt-2 font-sans text-sm tracking-widest text-accent/60">
                                                {event.time}
                                            </span>
                                        </div>

                                        {/* Add to Calendar Action */}
                                        <button
                                            className="mt-4 flex h-12 w-12 items-center justify-center rounded-full border border-border text-primary/40 transition-all hover:border-accent hover:text-accent md:mt-0"
                                            aria-label="Add to calendar"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                // Add calendar logic here
                                            }}
                                        >
                                            <CalendarPlus size={20} />
                                        </button>
                                    </div>

                                    {/* Image Gallery Preview */}
                                    {event.images && event.images.length > 0 && (
                                        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 scrollbar-hide pointer-events-none">
                                            {event.images.slice(0, 3).map((img, i) => (
                                                <div
                                                    key={i}
                                                    className="relative h-40 w-64 flex-shrink-0 overflow-hidden rounded-sm md:h-48 md:w-72"
                                                >
                                                    <Image
                                                        src={img}
                                                        alt={`${event.title} image ${i + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ))}
                                            {event.images.length > 3 && (
                                                <div className="flex h-40 w-40 items-center justify-center bg-surface/50 text-primary/60 md:h-48">
                                                    +{event.images.length - 3} more
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State / Footer Quote */}
                <div className="mt-32 text-center">
                    <p className="font-serif text-2xl italic text-primary/40">
                        "Come, all you who are weary."
                    </p>
                </div>
            </div>
        </div>
    );
}

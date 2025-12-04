"use client";

import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";

const events = [
    {
        id: 1,
        date: "24",
        month: "December",
        title: "Midnight Mass",
        description: "A service of light and silence.",
        time: "23:00",
    },
    {
        id: 2,
        date: "29",
        month: "December",
        title: "Community Meal",
        description: "Open table. Everyone welcome.",
        time: "18:00",
    },
    {
        id: 3,
        date: "05",
        month: "January",
        title: "Epiphany Service",
        description: "Celebrating the revelation.",
        time: "10:00",
    },
    {
        id: 4,
        date: "12",
        month: "January",
        title: "Silent Retreat",
        description: "A day of guided contemplation.",
        time: "09:00 - 16:00",
    },
];

export default function EventsTimeline() {
    return (
        <div className="min-h-screen bg-background px-8 py-32 md:px-24">
            <div className="mx-auto max-w-3xl">
                <h1 className="mb-24 font-serif text-6xl font-light text-primary md:text-8xl">
                    Gatherings
                </h1>

                <div className="relative border-l border-border pl-8 md:pl-16">
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
                            <div className="absolute -left-[37px] top-8 h-3 w-3 rounded-full bg-border transition-colors duration-500 group-hover:bg-accent md:-left-[69px]" />

                            {/* Event Card */}
                            <div className="relative overflow-hidden rounded-sm border border-border bg-surface/30 p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5">
                                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                                    {/* Date */}
                                    <div className="flex flex-col">
                                        <span className="font-sans text-8xl font-extralight leading-none text-accent/80 transition-colors group-hover:text-accent">
                                            {event.date}
                                        </span>
                                        <span className="font-serif text-xl italic text-secondary">
                                            {event.month}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="flex flex-1 flex-col gap-2 md:pt-4">
                                        <h3 className="font-serif text-3xl text-primary">
                                            {event.title}
                                        </h3>
                                        <p className="font-sans text-lg font-light text-primary/60">
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
                                    >
                                        <CalendarPlus size={20} />
                                    </button>
                                </div>
                            </div>
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

"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
    "/images/church-interior-1.jpg",
    "/images/church-detail-1.jpg",
    "/images/church-detail-2.jpg",
    "/images/church-atmosphere-1.jpg",
    "/images/church-atmosphere-2.jpg",
    "/images/church-atmosphere-3.jpg",
    "/images/church-atmosphere-4.jpg",
];

export default function AboutChapters() {
    const galleryRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray(".gallery-item");

            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: galleryRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: () => "+=" + (galleryRef.current?.offsetWidth || 0),
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-background">
            {/* Chapter 01: We Believe */}
            <section className="flex min-h-screen flex-col justify-center px-8 py-24 md:px-24">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    <div className="flex flex-col justify-center">
                        <h2 className="font-serif text-5xl font-light leading-tight text-primary md:text-7xl lg:text-8xl">
                            "Reconciling hearts back to God."
                        </h2>
                        <div className="mt-8 border-l border-accent/30 pl-6">
                            <p className="font-serif text-xl italic text-secondary">
                                "And all of this is a gift from God, who brought us back to himself through Christ. And God has given us this task of reconciling people to him."
                            </p>
                            <p className="mt-4 font-sans text-xs tracking-widest text-accent/60">
                                2 CORINTHIANS 5:18 NLT
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-8">
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                            Chapter 01 — What We Do
                        </span>
                        <p className="font-sans text-xl font-light leading-relaxed text-primary/80 md:text-2xl">
                            The scriptures tell us that the day of our Lord Jesus is returning near. So what do we do?
                        </p>
                        <p className="font-sans text-xl font-light leading-relaxed text-primary/80 md:text-2xl">
                            We disciple teenagers. We go around preaching the gospel to schools and universities. Through our programs, outreaches, events, and discipleship meetings, we seek one thing: for the hearts of teenagers to be reconciled back to God.
                        </p>
                    </div>
                </div>
            </section>

            {/* Chapter 02: Our Space (Horizontal Scroll) */}
            <section ref={galleryRef} className="relative flex h-screen w-full overflow-hidden bg-surface">
                <div className="absolute top-12 left-12 z-10">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                        Chapter 02 — Our Space
                    </span>
                </div>
                <div className="flex h-full w-[700vw]"> {/* Width depends on number of images */}
                    {galleryImages.map((src, i) => (
                        <div key={i} className="gallery-item relative flex h-full w-screen items-center justify-center p-12">
                            <div className="relative h-[80vh] w-full max-w-[90vw] overflow-hidden border border-border bg-background md:max-w-[60vw]">
                                <Image
                                    src={src}
                                    alt={`Gallery image ${i + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-1000 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-8 opacity-0 transition-opacity duration-300 hover:opacity-100">
                                    <p className="font-serif text-lg italic text-primary">Sanctuary detail {i + 1}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Chapter 03: Our People */}
            <section className="min-h-screen px-8 py-24 md:px-24">
                <div className="mb-24">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                        Chapter 03 — Our People
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-24 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        { src: "/images/people-1.jpg", quote: "I came broken. I stay because here, silence is allowed." },
                        { src: "/images/people-2.jpg", quote: "No performance. Just presence. This is where I breathe." },
                        { src: "/images/people-3.jpg", quote: "Found by grace in the middle of my mess." },
                    ].map((person, i) => (
                        <div key={i} className="group relative flex flex-col gap-8">
                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface grayscale transition-all duration-500 group-hover:grayscale-0">
                                <Image
                                    src={person.src}
                                    alt={`Community member ${i + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <p className="font-serif text-3xl leading-tight text-primary">
                                        {person.quote}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

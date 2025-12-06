"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]); // Parallax for text
    const opacity = useTransform(scrollY, [0, 500], [1, 0]); // Fade out text

    const scrollToContent = () => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    };



    return (
        <section
            ref={containerRef}
            className="relative h-[120vh] w-full overflow-hidden bg-background"
        >
            {/* Video/Image Background */}
            {/* Video/Image Background */}
            <div className="absolute inset-0 z-0">
                {/* Mobile Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/faithmonti/A04A0012.jpg"
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark Overlay for Mobile */}
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Desktop Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 hidden h-full w-full object-cover md:block"
                >
                    {/* Placeholder video - replace with actual asset */}
                    <source
                        src="https://cdn.coverr.co/videos/coverr-sun-shining-through-church-windows-5626/1080p.mp4"
                        type="video/mp4"
                    />
                </video>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
            </div>

            {/* Content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 flex h-screen flex-col items-center justify-center text-center px-4"
            >
                <h1 className="font-sans text-[15vw] font-bold leading-none tracking-tighter text-white sm:text-[200px] lg:text-[280px] drop-shadow-lg">
                    Emmanuel
                </h1>
                <p className="mt-8 font-sans text-xl font-medium tracking-tight text-white/90 sm:text-3xl drop-shadow-md">
                    A church for the seeking and the found.
                </p>
            </motion.div>

            {/* Enter CTA */}
            <motion.button
                onClick={scrollToContent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-sm font-light uppercase tracking-[0.2em] text-primary/60 transition-colors hover:text-accent"
            >
                <span>Enter</span>
                <ArrowDown className="h-4 w-4 animate-bounce" />
            </motion.button>
        </section>
    );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";

const LETTER_ANIMATION = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: i * 0.05,
            duration: 1,
            ease: [0.2, 0.65, 0.3, 0.9] as const,
        },
    }),
};

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);


    // Parallax effects
    const yParallax = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);
    const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);

    // Mouse parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 50, stiffness: 400 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Combine scroll and mouse parallax for Y axis
    const combinedY = useTransform([yParallax, springY], ([latestY, latestSpringY]: any[]) => latestY + latestSpringY);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = clientX / innerWidth - 0.5;
        const y = clientY / innerHeight - 0.5;
        mouseX.set(x * 20); // Move 20px
        mouseY.set(y * 20);
    };

    const scrollToContent = () => {
        const vh = window.innerHeight;
        window.scrollTo({ top: vh, behavior: "smooth" });
    };

    const title = "In The Room";
    const letters = title.split("");

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative h-[110vh] w-full overflow-hidden bg-primary"
        >
            {/* Background Layer */}
            <motion.div
                style={{ scale }}
                className="absolute inset-0 z-0"
            >
                {/* Image Background (Visible on all screens, covered by video on desktop if loaded) */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/faithmonti/A04A0012.jpg"
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                </div>

                {/* Desktop Video */}
                <div className="hidden md:block absolute inset-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onPlaying={() => setIsVideoLoaded(true)}
                        className={`h-full w-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? "opacity-90" : "opacity-0"}`}
                    >
                        <source
                            src="https://res.cloudinary.com/dsriwu6yn/video/upload/f_auto,q_auto/v1768935568/IN_THE_ROOM_FINAL_1_l4twki.mp4"
                            type="video/mp4"
                        />
                    </video>
                    {!isVideoLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                            <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                        </div>
                    )}
                </div>

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/90" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
            </motion.div>

            {/* Content Layer */}
            <motion.div
                style={{ y: combinedY, opacity, x: springX }}
                className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center"
            >
                <div className="overflow-hidden">
                    <motion.h1
                        className="font-sans text-[18vw] font-bold leading-[0.85] tracking-tighter text-surface mix-blend-overlay sm:text-[200px] lg:text-[220px]"
                        initial="hidden"
                        animate="visible"
                    >
                        {letters.map((char, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={LETTER_ANIMATION}
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-12 overflow-hidden"
                >
                </motion.div>
            </motion.div>

            {/* Floating CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2"
            >
                <button
                    onClick={scrollToContent}
                    className="group flex flex-col items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-surface/70 transition-colors hover:text-accent"
                >
                    <span className="relative">
                        Enter
                        <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                    </span>
                    <div className="flex h-12 w-6 items-start justify-center rounded-full border border-surface/20 p-1">
                        <motion.div
                            animate={{ y: [0, 24, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="h-1.5 w-1.5 rounded-full bg-accent"
                        />
                    </div>
                </button>
            </motion.div>
        </section>
    );
}

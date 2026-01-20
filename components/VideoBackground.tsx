"use client";

import { useState, useEffect } from "react";

export default function VideoBackground() {
    const [shouldRenderVideo, setShouldRenderVideo] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        // Only load video on larger screens to save bandwidth on mobile
        const checkScreenSize = () => {
            if (window.innerWidth >= 768) { // md breakpoint
                setShouldRenderVideo(true);
            } else {
                setShouldRenderVideo(false);
            }
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    if (!shouldRenderVideo) return null;

    return (
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
    );
}

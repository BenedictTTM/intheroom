"use client";

import { useEffect, useRef } from "react";

export default function GrainOverlay() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            // Generate noise
            const imageData = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(imageData.data.buffer);
            const len = buffer32.length;

            for (let i = 0; i < len; i++) {
                if (Math.random() < 0.04) { // 4% noise density
                    // Monochrome noise (gray)
                    const val = Math.random() * 255;
                    buffer32[i] = (255 << 24) | (val << 16) | (val << 8) | val;
                }
            }

            ctx.putImageData(imageData, 0, 0);

            // Vignette
            const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 1.2);
            gradient.addColorStop(0, "rgba(0,0,0,0)");
            gradient.addColorStop(1, "rgba(0,0,0,0.35)"); // 35% soft black radial

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-50 h-full w-full mix-blend-overlay opacity-40"
        />
    );
}

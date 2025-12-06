'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface GalleryGridProps {
    images: string[];
    className?: string;
}

export function GalleryGrid({ images, className }: GalleryGridProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <div className={cn("columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4", className)}>
                {images.map((src, index) => (
                    <motion.div
                        key={src}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => setSelectedImage(src)}
                    >
                        <Image
                            src={src}
                            alt={`Gallery image ${index + 1}`}
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </motion.div>
                ))}
            </div>

            {/* Simple Lightbox */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <Image
                            src={selectedImage}
                            alt="Selected gallery image"
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}

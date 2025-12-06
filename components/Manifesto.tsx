"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
    return (
        <section className="relative min-h-screen w-full bg-background px-4 py-24 md:px-24 md:py-32">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-24 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="font-sans text-4xl font-extralight uppercase tracking-tighter text-primary md:text-6xl lg:text-9xl"
                    >
                        In The <br /> <span className="text-accent">Room</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-md"
                    >
                        <p className="font-serif text-xl italic leading-relaxed text-secondary">
                            "Let us think of ways to motivate one another to acts of love and good works."
                        </p>
                        <p className="mt-2 font-sans text-xs tracking-widest text-accent/60">
                            HEBREWS 10:24-25 NLT
                        </p>
                    </motion.div>
                </div>

                {/* Body */}
                <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
                    <div className="col-span-1 md:col-span-4">
                        <span className="block h-[1px] w-full bg-border" />
                        <span className="mt-4 block font-sans text-xs uppercase tracking-[0.2em] text-accent">
                            Who We Are
                        </span>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="col-span-1 md:col-span-8"
                    >
                        <p className="font-sans text-xl font-light leading-relaxed text-primary md:text-4xl">
                            It's a community of teenagers who have given their lives to be a
                            vessel of the gospel of the Lord Jesus Christ.
                        </p>
                        <p className="mt-12 font-sans text-lg font-light leading-relaxed text-primary/60 md:text-2xl">
                            A community that promotes faith, love, and hope, inspiring one
                            another to adopt the life of Christ. We do not neglect our meeting
                            together, especially now that the day of His return is drawing near.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroProps {
    onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
    return (
        <section className="relative min-h-[90vh] flex items-center bg-white pt-24 pb-16">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
                    }}
                    className="z-10 lg:col-span-5 flex flex-col items-start"
                >
                    <motion.span
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-brown uppercase tracking-[0.2em] text-[10px] font-bold mb-6 block"
                    >
                        AI-POWERED CUSTOMIZATION
                    </motion.span>

                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-5xl lg:text-[4rem] font-sans font-light mb-6 text-charcoal leading-[1.1] tracking-tight"
                    >
                        Design Your <br />
                        <span className="font-serif italic font-medium">Perfect</span> Piece
                    </motion.h1>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-gray-500 text-sm max-w-[400px] mb-10 leading-relaxed font-light"
                    >
                        Experience the pinnacle of AI-guided luxury. Craft a bespoke masterpiece that reflects your unique love story with our precision jewelry finder technology.
                    </motion.p>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="flex gap-4"
                    >
                        <button
                            onClick={onStart}
                            className="bg-[#EDD2BC] text-[#733004] px-8 py-3.5 rounded-full tracking-[0.15em] uppercase text-[10px] font-bold hover:bg-[#733004] hover:text-white transition-colors duration-300 shadow-sm"
                        >
                            Start Jewelry Finder
                        </button>
                        <button
                            className="border border-gray-200 text-charcoal px-8 py-3.5 rounded-full tracking-[0.15em] uppercase text-[10px] font-bold hover:border-charcoal transition-colors duration-300"
                        >
                            View Gallery
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                    className="lg:col-span-7 relative"
                >
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#0a0a0a]">
                        <Image
                            src="/images/hero.png" // Re-using existing image but fitting it luxuriously
                            alt="Luxury Ring"
                            fill
                            className="object-contain p-12"
                            priority
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

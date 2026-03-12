"use client";

import { CheckCircle2, ShieldCheck, Diamond, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function WhyUseFinder() {
    const benefits = [
        {
            icon: <Sparkles className="w-5 h-5" />,
            title: "AI Precision",
            description: "Sophisticated algorithms matching your style preference perfectly with over 10,000 combinations."
        },
        {
            icon: <Diamond className="w-5 h-5" />,
            title: "Ethical Diamonds",
            description: "Every stone is hand-selected and conflict-free certified, ensuring beauty with a clear conscience."
        },
        {
            icon: <CheckCircle2 className="w-5 h-5" />,
            title: "Bespoke Fitting",
            description: "Custom measurements ensuring a lifetime of comfort and elegance, tailored for your unique shape."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="mb-16 max-w-2xl">
                    <h2 className="text-4xl font-sans font-medium text-charcoal mb-4">Why Use the Design Lab</h2>
                    <p className="text-charcoal font-light leading-relaxed">
                        Our AI combines heritage craftsmanship with modern technology to curate your ideal design based on personality and preference.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.15, duration: 0.8, ease: "easeOut" }}
                            className="bg-[#FAFAFA] p-10 rounded-2xl flex flex-col items-start border border-gray-50 hover:shadow-lg transition-shadow duration-500 group"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-[#733004] group-hover:scale-110 transition-transform duration-300">
                                {benefit.icon}
                            </div>
                            <h3 className="text-lg font-sans font-medium mb-3 text-charcoal">{benefit.title}</h3>
                            <p className="text-charcoal text-sm leading-relaxed font-light">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function TrustSection() {
    return (
        <section className="py-24 bg-[#14120E] text-white">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
                    }}
                    className="flex flex-col justify-center"
                >
                    <motion.span
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                        }}
                        className="text-[#733004] uppercase tracking-[0.2em] text-[10px] font-bold mb-6 block"
                    >
                        CENTURIES OF EXCELLENCE
                    </motion.span>

                    <motion.h2
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                        }}
                        className="text-4xl lg:text-5xl font-sans font-light mb-8 leading-[1.2]"
                    >
                        <span className="font-serif italic font-medium">Master Craftsmanship</span><br />
                        in Every Detail
                    </motion.h2>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                        }}
                        className="text-white/80 font-light leading-relaxed mb-12 max-w-md"
                    >
                        Our master jewelers combine age-old techniques with cutting-edge 3D modeling. Each piece undergoes a rigorous 24-point inspection process before reaching your hands.
                    </motion.p>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                        }}
                        className="grid grid-cols-2 gap-y-10 gap-x-8"
                    >
                        <div>
                            <div className="text-[#733004] font-sans font-medium text-2xl mb-1">20+</div>
                            <div className="text-[10px] uppercase tracking-widest text-white/60">MASTER ARTISANS</div>
                        </div>
                        <div>
                            <div className="text-[#733004] font-sans font-medium text-2xl mb-1">GIA</div>
                            <div className="text-[10px] uppercase tracking-widest text-white/60">CERTIFIED DIAMONDS</div>
                        </div>
                        <div>
                            <div className="text-[#733004] font-sans font-medium text-2xl mb-1">100%</div>
                            <div className="text-[10px] uppercase tracking-widest text-white/60">RECYCLED GOLD</div>
                        </div>
                        <div>
                            <div className="text-[#733004] font-sans font-medium text-2xl mb-1">Lifetime</div>
                            <div className="text-[10px] uppercase tracking-widest text-white/60">WARRANTY</div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="grid grid-cols-2 gap-4 h-full min-h-[500px]"
                >
                    <div className="flex flex-col gap-4">
                        <div className="relative h-1/2 w-full rounded-2xl overflow-hidden bg-gray-900 border border-white/5">
                            <Image src="/images/hero.png" alt="Craftsmanship detail" fill className="object-cover opacity-80" />
                        </div>
                        <div className="relative h-1/2 w-full rounded-2xl overflow-hidden bg-gray-900 border border-white/5">
                            <Image src="/images/hero.png" alt="Craftsmanship detail" fill className="object-cover opacity-80" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-12">
                        <div className="relative h-1/2 w-full rounded-2xl overflow-hidden bg-gray-900 border border-white/5">
                            <Image src="/images/hero.png" alt="Craftsmanship detail" fill className="object-cover opacity-80" />
                        </div>
                        <div className="relative h-1/2 w-full rounded-2xl overflow-hidden bg-gray-900 border border-white/5">
                            <Image src="/images/hero.png" alt="Craftsmanship detail" fill className="object-cover opacity-80" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

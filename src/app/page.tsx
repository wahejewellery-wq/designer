"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AiDesignLab from "@/components/RingFinder";
import { WhyUseFinder, TrustSection } from "@/components/InfoSections";
import { jewelryItems } from "@/lib/data";
import { JewelryItem } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const [showFinder, setShowFinder] = useState(false);
  const finderRef = useRef<HTMLDivElement>(null);

  const startFinder = () => {
    setShowFinder(true);
    setTimeout(() => {
      finderRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="min-h-screen">
      <Header onLogoClick={() => setShowFinder(false)} />

      {!showFinder ? (
        <>
          <Hero onStart={startFinder} />

          <section className="py-24 bg-[#FDFaf8] overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="flex justify-between items-end mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <h2 className="text-4xl font-sans font-medium text-charcoal mb-3">Featured Designs</h2>
                  <p className="text-gray-500 font-light">Explore our most coveted seasonal pieces</p>
                </motion.div>

                <div className="hidden md:flex gap-3">
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white transition-colors group">
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-charcoal transition-colors transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white transition-colors group">
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-charcoal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6"
              >
                {jewelryItems.slice(0, 4).map((item) => (
                  <motion.div
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } }
                    }}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden rounded-2xl mb-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                      />
                      <div className="absolute bottom-4 right-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#733004] rounded-sm shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
                        {item.style.split(' ')[0]} {/* Simple tag extraction */}
                      </div>
                    </div>
                    <h3 className="text-charcoal font-sans font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm font-light mt-1">{item.style} • Starting at ₹15,0000</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <WhyUseFinder />
          <TrustSection />
        </>
      ) : (
        <div ref={finderRef} className="pt-20">
          <AiDesignLab />
          <WhyUseFinder />
          <TrustSection />
        </div>
      )}

      <footer className="py-16 bg-white border-t border-gray-100 text-sm font-light text-gray-500">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <h1 className="text-xl font-serif tracking-[0.1em] uppercase text-charcoal flex flex-col items-start mb-6">
                <span className="text-[10px] tracking-[0.3em] font-bold text-[#A65A1F]">WAHE</span>
                <span className="text-lg">Ai Design Lab</span>
              </h1>
              <p className="mb-6 max-w-xs leading-relaxed">Crafting the future of jewelry through artificial intelligence and generational expertise.</p>
            </div>

            <div>
              <h4 className="text-charcoal font-medium mb-6 uppercase tracking-widest text-[10px]">Experience</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-charcoal transition-colors">Virtual Jewelry Finder</a></li>
                <li><a href="#" className="hover:text-charcoal transition-colors">Live Consultation</a></li>
                <li><a href="#" className="hover:text-charcoal transition-colors">Jewelry Care</a></li>
                <li><a href="#" className="hover:text-charcoal transition-colors">Style Guide</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-charcoal font-medium mb-6 uppercase tracking-widest text-[10px]">Collections</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-charcoal transition-colors">Engagement Rings</a></li>
                <li><a href="#" className="hover:text-charcoal transition-colors">Wedding Bands</a></li>
                <li><a href="#" className="hover:text-charcoal transition-colors">Fine Jewelry</a></li>
                <li><a href="#" className="hover:text-charcoal transition-colors">Gift Ideas</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-charcoal font-medium mb-6 uppercase tracking-widest text-[10px]">Newsletter</h4>
              <p className="mb-4">Subscribe to receive the latest design updates and luxury insights.</p>
              <div className="flex">
                <input type="email" placeholder="Email" className="bg-gray-50 px-4 py-2 w-full outline-none focus:border-gray-300 border border-transparent transition-colors" />
                <button className="bg-[#EDD2BC] text-charcoal px-4 hover:bg-brown hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between pt-8 border-t border-gray-100 text-[10px] uppercase tracking-widest">
            <p>© {new Date().getFullYear()} WAHE AI DESIGN LAB. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-charcoal transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-charcoal transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

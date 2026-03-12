"use client";

import Link from "next/link";
import { Search, Menu, User } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header({ onLogoClick }: { onLogoClick?: () => void }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? "bg-white/95 backdrop-blur-md border-gray-100 py-2" : "bg-transparent border-transparent py-4 text-charcoal"
            }`}>
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <button className="lg:hidden p-2">
                    <Menu className="w-5 h-5 text-charcoal" />
                </button>

                <div className="flex items-center gap-12">
                    <Link
                        href="/"
                        onClick={(e) => {
                            if (onLogoClick) {
                                e.preventDefault();
                                onLogoClick();
                            }
                        }}
                        className="flex items-center gap-3 group cursor-pointer relative z-[60]"
                    >
                        <div className="text-brown transition-transform duration-500 group-hover:scale-110">
                            {/* Simple stand-in for the WAHE logo icon */}
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-sans font-bold tracking-[0.1em] uppercase text-charcoal leading-none">
                                WAHE <span className="text-[#A65A1F] font-light">Ai Design Lab</span>
                            </h1>
                            <span className="text-[8px] tracking-[0.4em] uppercase text-gray-400 font-bold mt-1"></span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center space-x-8 text-[10px] uppercase tracking-[0.1em] font-medium text-gray-500">
                        <Link href="#" className="hover:text-charcoal transition-colors">Collections</Link>
                        <Link href="#" className="hover:text-charcoal transition-colors">Jewelry Finder</Link>
                        <Link href="#" className="hover:text-charcoal transition-colors">Craftsmanship</Link>
                        <Link href="#" className="hover:text-charcoal transition-colors">About</Link>
                    </nav>
                </div>

                <div className="hidden lg:flex items-center space-x-6 text-charcoal">
                    <div className="relative group">
                        <input type="text" placeholder="Search jewelry..." className="bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white transition-all pl-10 pr-4 py-2 rounded-full text-xs outline-none w-48 group-hover:bg-white group-hover:border-gray-200" />
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    <Link href="#" className="bg-brown text-white px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-semibold hover:bg-charcoal transition-colors">
                        Consultation
                    </Link>

                    <button className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-brown hover:bg-brown hover:text-white transition-colors">
                        <User className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}

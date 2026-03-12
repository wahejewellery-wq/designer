"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { JewelryItem } from "@/types";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
    item: JewelryItem;
    index: number;
}

export default function ProductCard({ item, index }: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white overflow-hidden border border-gray-100 hover:border-gold/30 transition-all duration-500 shadow-sm hover:shadow-xl"
        >
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-beige/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest text-[#733004] font-bold">
                    {item.style}
                </div>
            </div>

            <div className="p-8 text-center">
                <h3 className="text-xl font-serif text-charcoal mb-2 group-hover:text-[#733004] transition-colors">
                    {item.name}
                </h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
                    {item.shape} • {item.carat} • {item.goldColor}
                </p>
                <div className="text-lg font-serif text-charcoal mb-6">
                    {typeof item.price === "number"
                        ? `₹${item.price.toLocaleString("en-IN")}`
                        : item.price}
                </div>

                <a
                    href={item.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal hover:text-[#733004] transition-colors duration-300"
                >
                    <span>View on Shopify</span>
                    <ArrowRight className="w-3 h-3" />
                </a>
            </div>
        </motion.div>
    );
}

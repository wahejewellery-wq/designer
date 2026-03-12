"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft, Loader, Upload, Image as ImageIcon } from "lucide-react";
import { FinderState, DiamondShape, CaratRange, GoldColor, JewelryStyle, BudgetRange, JewelryItem, Category } from "@/types";
import { jewelryItems } from "@/lib/data";
import ProductCard from "./ProductCard";

const STEPS = [
    { id: 1, title: "What are you looking for?" },
    { id: 2, title: "Choose Diamond Shape" },
    { id: 3, title: "Select Carat Range" },
    { id: 4, title: "Choose Gold Color" },
    { id: 5, title: "Choose Style" },
    { id: 6, title: "Budget Range (optional)" },
];

const CATEGORIES: Category[] = ["Ring", "Earring", "Necklace", "Bangle", "Mangalsutra", "Not Sure"];
const CATEGORY_IMAGES: Record<string, string> = {
    "Ring": "/images/categories/ring.png",
    "Earring": "/images/categories/earring.png",
    "Necklace": "/images/categories/necklace.png",
    "Bangle": "/images/categories/bangle.png",
    "Mangalsutra": "/images/categories/mangalsutra.png",
    "Not Sure": "/images/shapes/not_sure.png"
};
const SHAPES: DiamondShape[] = ["Round", "Pear", "Princess", "Heart", "Oval", "Emerald", "Marquise", "Cushion", "Not Sure"];
const SHAPE_IMAGES: Record<string, string> = {
    "Round": "/images/shapes/covers/round.png",
    "Pear": "/images/shapes/covers/pear.png",
    "Princess": "/images/shapes/covers/princess.png",
    "Heart": "/images/shapes/covers/heart.png",
    "Oval": "/images/shapes/covers/oval.png",
    "Emerald": "/images/shapes/covers/emerald.png",
    "Marquise": "/images/shapes/covers/marquise.png",
    "Cushion": "/images/shapes/covers/cushion.png",
    "Not Sure": "/images/shapes/not_sure.png"
};
const CARATS: CaratRange[] = ["0.5 - 1 carat", "1 - 2 carat", "2 - 3 carat", "Not Sure"];
const COLORS: GoldColor[] = ["Yellow Gold", "White Gold", "Rose Gold", "Not Sure"];
const COLOR_METALLICS: Record<string, string> = {
    "Yellow Gold": "linear-gradient(135deg, #F1D196 0%, #ffffff 50%, #F1D196 100%)",
    "Rose Gold": "linear-gradient(135deg, #F5CAAD 0%, #ffffff 50%, #F5CAAD 100%)",
    "White Gold": "linear-gradient(135deg, #D5D1D2 0%, #ffffff 50%, #D5D1D2 100%)"
};
const STYLES: JewelryStyle[] = ["Solitaire", "Hidden Halo", "Halo", "Pave", "Three Stone", "Not Sure"];
const STYLE_IMAGES: Record<string, string> = {
    "Solitaire": "/images/styles/solitaire.png",
    "Hidden Halo": "/images/styles/hidden_halo.png",
    "Halo": "/images/styles/halo.png",
    "Pave": "/images/styles/pave.png",
    "Three Stone": "/images/styles/three_stone.png",
    "Not Sure": "/images/shapes/not_sure.png"
};
const BUDGETS: BudgetRange[] = ["Under ₹50,000", "₹50,000 - ₹1,00,000", "₹1,00,000 - ₹2,00,000", "Above ₹2,00,000", "Not Sure"];

export default function AiDesignLab() {
    const [state, setState] = useState<FinderState>({ step: 1 });
    const [isFinding, setIsFinding] = useState(false);
    const [results, setResults] = useState<JewelryItem[] | null>(null);
    const [uploadImage, setUploadImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setState(prev => ({ ...prev, category: "Not Sure" })); // Default to Not Sure if searching by image
                // Auto-trigger search if we want, or let them click? 
                // Let's take them to a preview/confirm step or just search immediately if it's the only thing they do.
            };
            reader.readAsDataURL(file);
        }
    };

    const nextStep = () => {
        if (state.step < 6) {
            setState(prev => ({ ...prev, step: prev.step + 1 }));
        } else {
            findJewelry();
        }
    };

    const prevStep = () => {
        setState(prev => ({ ...prev, step: Math.max(1, prev.step - 1) }));
    };

    const findJewelry = async () => {
        setIsFinding(true);
        try {
            let body;
            let headers = {};

            if (uploadImage) {
                const formData = new FormData();
                formData.append('image', uploadImage);
                if (state.category) formData.append('category', state.category);
                body = formData;
                // No need to set Content-Type, fetch will set it correctly with boundary
            } else {
                body = JSON.stringify({
                    category: state.category,
                    shape: state.shape,
                    carat: state.carat,
                    goldColor: state.goldColor
                });
                headers = { 'Content-Type': 'application/json' };
            }

            const response = await fetch('/api/recommend', {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (response.ok) {
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    setResults(data.results);
                } else {
                    setResults(jewelryItems.slice(0, 3)); // Fallback
                }
            } else {
                setResults(jewelryItems.slice(0, 3)); // Fallback if API fails
            }
        } catch (error) {
            console.error("Error fetching ML recommendations:", error);
            setResults(jewelryItems.slice(0, 3));
        } finally {
            setIsFinding(false);
        }
    };

    const resetFinder = () => {
        setState({ step: 1 });
        setResults(null);
    };

    const renderStep = () => {
        switch (state.step) {
            case 1:
                return (
                    <div className="space-y-12">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            {CATEGORIES.map(category => (
                                <OptionCard
                                    key={category}
                                    label={category}
                                    imageUrl={CATEGORY_IMAGES[category]}
                                    selected={state.category === category && !uploadImage}
                                    onClick={() => {
                                        setUploadImage(null);
                                        setImagePreview(null);
                                        setState(prev => ({ ...prev, category }));
                                        nextStep();
                                    }}
                                />
                            ))}
                        </div>

                        <div className="relative pt-12 border-t border-brown/10">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-beige px-6 text-[10px] uppercase tracking-[0.3em] font-bold text-brown/40">
                                OR SEARCH BY PHOTO
                            </div>

                            <div className="max-w-xl mx-auto mt-4">
                                <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${imagePreview ? "border-brown bg-brown/5" : "border-brown/10 hover:border-brown/30 bg-brown/[0.02] hover:bg-brown/[0.05]"}`}>
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {imagePreview ? (
                                            <div className="relative w-40 h-40 group">
                                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg shadow-lg" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                                    <Upload className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <ImageIcon className="w-12 h-12 mb-4 text-brown/20" />
                                                <p className="mb-2 text-sm text-brown font-medium">Upload a Reference Image</p>
                                                <p className="text-xs text-brown-light italic">Find similar products from our collection</p>
                                            </>
                                        )}
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </label>

                                {imagePreview && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-8 flex justify-center"
                                    >
                                        <button
                                            onClick={findJewelry}
                                            className="beige-button px-12 py-4"
                                            disabled={isFinding}
                                        >
                                            {isFinding ? <Loader className="w-5 h-5 animate-spin mx-auto" /> : "Find Matches for this Photo"}
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4 md:px-0">
                        {SHAPES.map((shape, idx) => (
                            <OptionCard
                                key={`${shape}-${idx}`}
                                label={shape}
                                imageUrl={SHAPE_IMAGES[shape]}
                                selected={state.shape === shape}
                                onClick={() => { setState(prev => ({ ...prev, shape })); nextStep(); }}
                            />
                        ))}
                    </div>
                );
            case 3:
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto px-4">
                        {CARATS.map(carat => (
                            <OptionCard
                                key={carat}
                                label={carat}
                                selected={state.carat === carat}
                                onClick={() => { setState(prev => ({ ...prev, carat })); nextStep(); }}
                            />
                        ))}
                    </div>
                );
            case 4:
                return (
                    <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto px-4">
                        {COLORS.map(color => (
                            <OptionCard
                                key={color}
                                label={color}
                                fullBackground={COLOR_METALLICS[color]}
                                selected={state.goldColor === color}
                                onClick={() => { setState(prev => ({ ...prev, goldColor: color })); nextStep(); }}
                            />
                        ))}
                    </div>
                );
            case 5:
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
                        {STYLES.map(style => (
                            <OptionCard
                                key={style}
                                label={style}
                                imageUrl={STYLE_IMAGES[style]}
                                selected={state.style === style}
                                onClick={() => { setState(prev => ({ ...prev, style: style })); nextStep(); }}
                            />
                        ))}
                    </div>
                );
            case 6:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {BUDGETS.map(budget => (
                            <OptionCard
                                key={budget}
                                label={budget}
                                selected={state.budget === budget}
                                onClick={() => setState(prev => ({ ...prev, budget }))}
                            />
                        ))}
                        <div className="col-span-full mt-8 flex justify-center">
                            <button
                                onClick={findJewelry}
                                className="beige-button w-full md:w-auto px-12"
                                disabled={isFinding}
                            >
                                {isFinding ? <Loader className="w-5 h-5 animate-spin mx-auto" /> : "Find My Perfect Piece"}
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (results) {
        return (
            <section className="py-24 bg-beige">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-brown-light uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Recommended for You</span>
                        <h2 className="text-4xl font-serif text-brown">Your Perfect Matches</h2>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.15 }
                            }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto"
                    >
                        {results.map((item, idx) => (
                            <ProductCard key={item.id} item={item} index={idx} />
                        ))}
                    </motion.div>

                    <div className="mt-24 text-center border-t border-brown/10 pt-16">
                        <h3 className="text-2xl font-serif text-charcoal mb-4">Not perfect yet?</h3>
                        <button
                            onClick={resetFinder}
                            className="outline-brown-button"
                        >
                            Try Different Preferences
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 luxury-gradient min-h-[70vh] flex flex-col justify-center">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={prevStep}
                            className={state.step === 1 ? "invisible" : "flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-brown/40 hover:text-brown"}
                        >
                            <ArrowLeft className="w-3 h-3" />
                            <span>Back</span>
                        </button>
                        <div className="text-[10px] uppercase font-bold tracking-widest text-brown">
                            Step {state.step} of 6
                        </div>
                    </div>

                    <div className="w-full h-[2px] bg-brown/10">
                        <motion.div
                            className="h-full bg-brown"
                            initial={{ width: "16%" }}
                            animate={{ width: `${(state.step / 6) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <motion.div
                    key={state.step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-serif text-charcoal mb-4">
                        {STEPS.find(s => s.id === state.step)?.title}
                    </h2>
                    <p className="text-charcoal font-light italic">
                        Select the option that resonates with your vision.
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={state.step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

const OptionCard = ({ label, icon, imageUrl, fullBackground, selected, onClick, description }: any) => {
    const isImageCard = !!imageUrl || !!fullBackground;

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`group relative overflow-hidden flex flex-col items-center justify-center transition-all duration-300 border rounded-sm w-[200px] h-[200px] ${selected
                ? "border-brown shadow-lg ring-1 ring-brown/30 bg-brown/5"
                : "border-beige shadow-sm hover:border-brown hover:shadow-md bg-white"
                }`}
        >
            {isImageCard ? (
                <>
                    <div className="absolute inset-0">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={label}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div
                                className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                                style={{ background: fullBackground }}
                            />
                        )}
                        <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-charcoal/0 transition-colors" />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-brown text-white/90 p-2 rounded-full shadow-xl">
                            <Check size={20} />
                        </div>
                    </div>

                    {/* Text Label with high visibility */}
                    <div className="relative z-10 w-full h-full flex items-end justify-center p-2">
                        <span className={`w-full py-1.5 px-2 backdrop-blur-md transition-all duration-300 shadow-sm rounded-sm ${selected
                            ? "bg-brown text-white"
                            : "bg-white/90 text-charcoal group-hover:bg-brown group-hover:text-white"
                            }`}>
                            {label}
                        </span>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center text-center">
                    {icon && <div className="mb-4">{icon}</div>}
                    {description && <p className="text-xs text-brown/60 mb-2">{description}</p>}
                    <span className={`text-lg transition-colors tracking-wide ${selected ? "text-brown font-semibold" : "text-charcoal group-hover:text-brown"
                        }`}>
                        {label}
                    </span>
                    {selected && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-3 text-brown"
                        >
                            <Check size={20} />
                        </motion.div>
                    )}
                </div>
            )}
        </motion.button>
    );
};

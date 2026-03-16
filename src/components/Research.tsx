"use client";

import { motion } from "framer-motion";
import researchData from "../data/research.json";
import { Link } from "react-router-dom";

interface ResearchItem {
    title: string;
    description: string;
    image?: string;
    tags?: string[];
}

interface ResearchProps {
    id?: string;
}

const Research: React.FC<ResearchProps> = ({ id }) => {
    const { research } = researchData as { research: ResearchItem[] };

    return (
        <section id={id} className="py-20 bg-black text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">FEATURED</h2>
                        <h2 className="text-6xl font-bold">RESEARCH</h2>
                    </div>
                    <div className="w-full h-0.5 bg-zinc-800 mt-4"></div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
                    {research.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800"
                        >
                            <Link to={`/research/${index}`}>
                                <motion.div whileHover={{ scale: 1.03 }} className="relative aspect-video">
                                    <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                                </motion.div>

                                <div className="p-4">
                                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-400 mb-4 text-sm line-clamp-2">{item.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags?.slice(0, 3).map((tag, tIdx) => (
                                            <span key={tIdx} className="bg-zinc-800 text-white text-xs py-1 px-2 rounded">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="mt-4 bg-green-600 h-1 w-full rounded"></div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Research;

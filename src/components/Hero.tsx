'use client'

import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    const handleScroll = () => {
        const section = document.getElementById("qr-input-section");

        if (section) {
            section.scrollIntoView({behavior: "smooth"})
        }
    }

    return (
        <motion.section
            className=" w-full py-40 bg-[#f8f8f8]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8}}
        >
            <div className="max-w-6xl h-[60vh] mx-auto px-4 sm:px-6 md:px-10 flex justify-center items-center">
                <div className="text-center flex-col">
                    <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold m-6">QR Code Generator</h1>
                    <p className="m-4 text-xl sm:text-3xl">Easily create free custom QR codes to promote your website, share content, and drive more sales.</p>

                    <Button
                        onClick={handleScroll}
                        className="group mt-6 py-8 rounded-4xl text-xl cursor-pointer overflow-hidden relative"
                    >
                        <span className="px-6 sm:px-10 md:px-20 py-6 md:py-10 flex justify-center items-center">
                            <span className="transform transition-transform duration-300 group-hover:-translate-x-2">
                                Create QR Code
                            </span>
                            <ArrowRight size={36} className="text-white font-bold transform transition-transform duration-300 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                        </span>    
                    </Button>
                </div>
            </div>
        </motion.section>
    )
}

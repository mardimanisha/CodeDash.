'use client'
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from "lucide-react";


export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    })
    return (
        <motion.header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
            scrolled ? 'bg-white/80 backdrop-blur shadow-sm' : 'bg-transparent'}`}
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{duration: 0.4}}
        >
            <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-3 flex justify-between items-center">
                <Link href="/" className="text-xl sm:text-3xl font-bold tracking-tight">
                    CodeDash<span className="text-primary">.</span>
                </Link>

                {/* Desktop: Buttons */}
                <div className="hidden md:flex space-x-2 sm:space-x-4">
                    <Link href="auth/login">
                        <Button variant="ghost" size="lg" className="sm:size-default cursor-pointer">Login</Button>
                    </Link>
                    <Link href="auth/signup">
                        <Button size="lg" className="sm:size-default cursor-pointer">Sign Up</Button>
                    </Link>
                </div>

                {/* Mobile: Hamburger Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent className="p-6">
                            <div className="flex flex-col space-y-4 mt-8">
                                <Link href="/auth/login">
                                    <Button variant="outline" className="w-full cursor-pointer">Login</Button>
                                </Link>
                                <Link href="/auth/signup">
                                    <Button className="w-full cursor-pointer">Sign Up</Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.header>
    )
}

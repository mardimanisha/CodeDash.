'use client'
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { supabase } from "@/lib/supabaseClient";
import AuthModal from "./AuthModal";


export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const {user} = useAuth();

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    })

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    }

    return (
        <>
            <motion.header className={`fixed top-0 left-0 w-screen z-50 transition-colors duration-300 ${
                scrolled ? 'bg-white/80 backdrop-blur shadow-sm' : 'bg-transparent'}`}
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{duration: 0.4}}
            >
                <div className="max-w-8xl mx-auto px-8 sm:px-12 md:px-16 lg:px-24 py-2 md:py-4 lg:py-6 flex justify-between items-center">
                    <Link href="/" className="text-xl sm:text-3xl font-bold tracking-tight">
                        CodeDash<span className="text-primary">.</span>
                    </Link>

                    {/* Desktop: Buttons */}
                    <div className="hidden md:flex space-x-2 sm:space-x-4">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center gap-2 text-lg cursor-pointer px-3 focus-visible:outline-none focus-visible:ring-0">
                                        <span className="p-3 rounded-full border-1 hover:bg-gray-800/10 transition-colors duration-300">
                                            <User className="w-4 h-4"/>
                                        </span>
                                        <span className="tracking-wide">{ user.user_metadata?.name || user.email}</span>
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : ( 
                            <>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="sm:size-default cursor-pointer text-sm hover:bg-primary transition-colors duration-200 ease-in-out hover:text-white"
                                    onClick={() => setModalOpen(true)}
                                >
                                    Login
                                </Button>
                                <Button
                                    size="sm"
                                    className="sm:size-default cursor-pointer text-sm hover:scale-105 transition-transform duration-200 ease-in-out"
                                    onClick={() => setModalOpen(true)}
                                >
                                    Sign Up
                                </Button>                           
                            </>
                        )}
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
                                    {user ? (
                                        <>
                                            <div className="flex items-center gap-2 px-2 text-sm">
                                                <User className="w-4 h-4" />
                                                <span>{user.user_metadata?.name || user.email}</span>
                                            </div>
                                            <Button variant="outline" className="w-full" onClick={handleLogout}>
                                                Logout
                                            </Button>
                                        </>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="outline" 
                                                    className="w-full cursor-pointer"
                                                    onClick={() => setModalOpen(true)}
                                                >
                                                    Login
                                                </Button>
                                            
                                                <Button 
                                                    className="w-full cursor-pointer"
                                                    onClick={() => setModalOpen(true)}
                                                >
                                                    Sign Up
                                                </Button>
                                            </>
                                        )
                                    }
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </motion.header>

            {/* Auth Modal */}
            <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    )
}
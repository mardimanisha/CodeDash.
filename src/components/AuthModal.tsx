'use client'
import { useEffect, useMemo } from "react";
import {Auth} from '@supabase/auth-ui-react'
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

type Props = {
    open: boolean;
    onClose: () => void;
}

export default function AuthModal({ open, onClose }: Props) {

    const supabase = useMemo(() => getSupabaseClient(), [])
    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                onClose();
            }
        })

        return () => listener.subscription.unsubscribe()
    }, [onClose, supabase])


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="px-4 py-6 sm:px-6 sm:py-8 sm:max-w-md rounded-2xl sm:rounded-3xl shadow-xl animate-in fade-in-90 slide-in-from-top-1 duration-300">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-center">Login or Sign Up</DialogTitle>
                    <DialogDescription className="text-center mb-4 text-muted-foreground">
                        Sign in with Google or email to continue
                    </DialogDescription>
                </DialogHeader>
                <Auth
                    supabaseClient={supabase}
                    providers={['google']}
                    appearance={{ theme: ThemeSupa }}
                    theme="light"
                />
            </DialogContent>
        </Dialog>
    )
}

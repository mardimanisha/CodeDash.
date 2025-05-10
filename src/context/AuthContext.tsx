'use client'

import { supabase } from "@/lib/supabaseClient";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    session: Session | null;
    user: Session['user'] | null;
}

export const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
        };

        fetchSession();

        const { data: listener } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
            setSession(session);

            // Optionally trigger a reload on logout (fallback)
            if (event === 'SIGNED_OUT') {
                setTimeout(() => window.location.reload(), 100);
            }
        });

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const value: AuthContextType = {
        session,
        user: session?.user ?? null,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

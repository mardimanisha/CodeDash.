'use client'

import { supabase } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState } from "react"

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
        supabase.auth.getSession().then(({ data: { session } }) => setSession(session));

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })

        return () => listener?.subscription.unsubscribe();
    }, []);

    const value: AuthContextType = {
        session,
        user: session?.user ?? null,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
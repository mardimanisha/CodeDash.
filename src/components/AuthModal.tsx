import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import {Auth} from '@supabase/auth-ui-react'
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabaseClient";

type Props = {
    open: boolean;
    onClose: () => void;
}

export default function AuthModal({ open, onClose }: Props) {
    const [modalOpen, setModalOpen] = useState(open);

    useEffect(() => {
        setModalOpen(open);
    }, [open])

    const handleClose = () => {
        setModalOpen(false);
        onClose();
    }

    return (
        <Dialog open={modalOpen} onOpenChange={handleClose}>
            <DialogContent className="p-8 max-w-lg">
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
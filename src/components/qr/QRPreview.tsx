'use client'

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import QRCode from "react-qr-code";
import { QrCode } from "lucide-react";
import {motion} from 'framer-motion'

type Props = {
    content: string | File | null;
    qrValue: string;
    isGenerating: boolean;
    generated: boolean;
}

export default function QRPreview({  qrValue, isGenerating, generated }: Props) {
    
    return (
        <div>
            <p className='mb-16 text-center lg:text-left text-xl sm:text-2xl md:text-3xl font-medium'>QR Code Preview</p>
            <Card className="p-12 shadow-xl">
                <CardContent className="flex flex-col items-center gap-7">
                    {isGenerating ? (
                        <div className="border-2 p-8 my-4 rounded-xl text-gray-500 animate-pulse">
                            Generating...
                        </div>
                    ) : qrValue && generated ? (
                            <motion.div
                                initial={{ opacity: 0, y: -40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="border-2 border-neutral-300 p-8 my-4 rounded-xl"
                            >
                                <QRCode value={qrValue} size={180} />
                            </motion.div>
                        ) : (
                            <div className="text-center">
                                <div className="border-2 border-neutral-300 p-8 my-4 rounded-xl">
                                    <QrCode size={180} />
                                </div>
                                <div className="text-gray-400 ">Enter content to preview QR</div>  
                            </div> 
                    )}
                    
                    <Button disabled={!qrValue || !generated} className="cursor-pointer">Download</Button>
                </CardContent>
            </Card>
        </div>
    )
}

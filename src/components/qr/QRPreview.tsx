'use client'

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { QRCodeCanvas } from "qrcode.react";
import { QrCode } from "lucide-react";
import {motion} from 'framer-motion'
import { useRef } from "react";



type Props = {
    content: string | File | null;
    qrValue: string;
    isGenerating: boolean;
    generated: boolean;
}

export default function QRPreview({ qrValue, isGenerating, generated }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qr-code.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    
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
                                <QRCodeCanvas
                                    value={qrValue}
                                    includeMargin={true}
                                    size={180}
                                    ref={canvasRef}
                                />
                            </motion.div>
                        ) : (
                            <div className="text-center">
                                <div className="border-2 border-neutral-300 p-8 my-4 rounded-xl">
                                    <QrCode size={180} />
                                </div>
                                <div className="text-gray-400 ">Enter content to preview QR</div>  
                            </div> 
                    )}
                    
                    <Button
                        disabled={!qrValue || !generated}
                        className="cursor-pointer"
                        onClick={handleDownload}
                    >
                        Download
                    </Button>

                </CardContent>
            </Card>
        </div>
    )
}

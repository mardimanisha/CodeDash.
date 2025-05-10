'use client'

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Dialog, DialogContent} from "./ui/dialog";
import { Button } from "./ui/button";
import QRCode from "react-qr-code";
import { useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

type DownloadDialogProps = {
    qrValue: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function DownloadDialog({ qrValue, open, setOpen }: DownloadDialogProps) {
    const qrRef = useRef(null);
    const [success, setSuccess] = useState(false);

    const handleDownload = async (format: 'png' | 'jpeg' | 'pdf') => {
        const qrElement = qrRef.current;
        if (!qrElement) {
            console.log("QR Element not found")
            return;
        }

        try {
            const canvas = await html2canvas(qrElement);

            if (format === 'pdf') {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF();
                pdf.addImage(imgData, "PNG", 20, 20, 160, 160);
                pdf.save("qr-code.pdf");
            } else {
                const dataUrl = canvas.toDataURL(`image/${format}`, 1.0);
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = `qr-code.${format}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setOpen(false);
            }, 2000)
        } catch (error) {
            console.error("Download failed:", error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="space-y-6">
                <div className="flex justify-center">
                    <div ref={qrRef} className="bg-white p-8 rounded border-1">
                        <QRCode value={qrValue} size={180} />
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <p className="text-lg font-medium">Download QR Code as: </p>
                    
                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={() => handleDownload('png')}
                            className="cursor-pointer"
                        >
                            PNG
                        </Button>
                        <Button
                            onClick={() => handleDownload('jpeg')}
                            className="cursor-pointer"
                        >
                            JPEG
                        </Button>
                        <Button
                            onClick={() => handleDownload('pdf')}
                            className="cursor-pointer"
                        >
                            PDF
                        </Button>
                    </div>
                </div>

                {success && (
                    <div className="flex items-center justify-center text-green-600 gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <p className="font-medium">Download successful!</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

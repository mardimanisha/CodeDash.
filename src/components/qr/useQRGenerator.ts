import { useState } from "react";

export function useQRGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrValue, setQRValue] = useState<string>("");
  const [generated, setGenerated] = useState(false);

  const generateQR = async (content: string | File | null) => {
    setIsGenerating(true);
    setGenerated(false);
    setQRValue("");

    setTimeout(() => {
      if (typeof content === "string") {
        setQRValue(content.trim());
      } else if (content instanceof File) {
        const fileType = content.type;

        if (fileType.startsWith("image/") || fileType === "application/pdf") {
          const objectUrl = URL.createObjectURL(content);
          setQRValue(objectUrl);

          URL.revokeObjectURL(objectUrl);
        } else {
          console.warn("Unsupported file type for QR code.");
          setQRValue("");
        }
      } else {
        setQRValue("");
      }

      setIsGenerating(false);
      setGenerated(true);
    }, 1200);
  };

  return {
    isGenerating,
    qrValue,
    generated,
    generateQR,
  };
}

import { useAuth } from "@/context/AuthContext";
import { uploadFile } from "@/lib/uploadFile";
import { useState } from "react";

export function useQRGenerator() {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrValue, setQRValue] = useState<string>("");
  const [generated, setGenerated] = useState(false);

  const generateQR = async (content: string | File | null) => {
    setIsGenerating(true);
    setGenerated(false);
    setQRValue("");

    if (!content) {
      setIsGenerating(false);
      return;
    }

    if (typeof content === "string") {
      setQRValue(content.trim());
    } else if (content instanceof File && user?.id) {
      try {
        const publicUrl = await uploadFile(content, user.id);
        setQRValue(publicUrl);
      } catch (error) {
        console.error("Upload failed", error);
        setQRValue("");
      }
    }

    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 1000);
  };

  return {
    isGenerating,
    qrValue,
    generated,
    generateQR,
  };
}

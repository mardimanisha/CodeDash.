'use client'
import { motion } from 'framer-motion';
import QRContentTypeSelector from './QRContentTypeSelector';
import { useState } from 'react';
import QRContentInput from './QRContentInput';
import QRPreview from './QRPreview';
import { useQRGenerator } from './useQRGenerator';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '../AuthModal';

export default function QRInputSection() {
    const { session } = useAuth();
    const [selectedType, setSelectedType] = useState<'text' | 'url' | 'image' | 'pdf' | 'email'>('text');
    const [content, setContent] = useState<string | File | null>('')
    const [showAuthModal, setShowAuthModal] = useState(false);

    const { qrValue, isGenerating, generated, generateQR } = useQRGenerator();
    
    const handleGenerate = () => {
        if (!session?.user) {
            setShowAuthModal(true);
            return;
        }

        generateQR(content);
    }

    return (
        <motion.section
            id="qr-input-section"
            className='w-full py-10'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{duration: 0.8}}
        >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
                <h2 className='text-center text-2xl sm:text-4xl md:text-5xl lg:text-left font-bold mb-20'> Create your own QR code in seconds</h2>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
                    {/* Left - Inputs */}
                    <div>
                        <p className='mb-16 text-center lg:text-left text-xl sm:text-2xl md:text-3xl font-medium'>Select content type</p>
                        <QRContentTypeSelector
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                        />

                        <div className='mt-16'>
                            <QRContentInput
                                selectedType={selectedType}
                                content={content}
                                setContent={setContent}
                                onGenerate={handleGenerate}
                            />
                        </div>
                    </div>

                    <QRPreview
                        content={content}
                        qrValue={qrValue}
                        isGenerating={isGenerating}
                        generated={generated}
                    />
                </div>
            </div>

            {/* Auth Modal */}
            <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </motion.section>
    )
}

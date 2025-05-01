import React from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Input } from '../ui/input';

type Props = {
    selectedType: string;
    content: string | File | null;
    setContent: (val: string | File | null) => void;
    onGenerate: () => void;
}

export default function QRContentInput({ selectedType, content, setContent, onGenerate }: Props) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setContent(file);
    }

    return (
        <div className='space-y-16'>
            <h3 className='font-medium text-center lg:text-left text-2xl sm:text-3xl md:text-4xl'>Enter Content</h3>
            <div className='space-y-6'>
                <p className='text-xl md:text-2xl'>
                    {selectedType === 'text' && 'Text'}
                    {selectedType === 'url' && 'URL / Website'}
                    {selectedType === 'image' && 'Upload your Image (jpg, jpeg, png)'}
                    {selectedType === 'pdf' && 'Upload your PDF'}
                    { selectedType === 'email' && 'Email Address'}
                    <span>*</span>
                </p>

                {selectedType === 'text' && (
                    <Textarea
                        placeholder="Enter text here..."
                        value={typeof content === 'string' ? content : ''}
                        onChange={(e) => setContent(e.target.value)}
                    />
                )}
            
                {selectedType === 'url' || selectedType === 'email' ? (
                    <Input
                        type="url"
                        placeholder={`Enter ${selectedType}`}
                        value={typeof content === 'string' ? content : ''}
                        onChange={(e) => setContent(e.target.value)}
                    />
                ) : null}

                {selectedType === 'image' && (
                    <Input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileChange}
                    />
                )}

                {selectedType === 'pdf' && (
                    <Input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                )}

            </div>
           

            <Button
                onClick={onGenerate}
                className='!rounded-3xl cursor-pointer text-md w-full lg:max-w-40 hover:scale-105 transition-transform duration-200 ease-in-out'
            >
                Create
            </Button>
        </div>
    )
}

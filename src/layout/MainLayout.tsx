'use client';
import { useEffect, useState } from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  
      useEffect(() => {
          const timer = setTimeout(() => setIsLoading(false), 1500);
          return () => clearTimeout(timer);
      })
  
      if (isLoading) {
          return (
              <div className="h-screen flex items-center justify-center bg-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
              </div>
          )
      }

  return <>{children}</>;
}

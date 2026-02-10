'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Services from './components/Services';
import Partners from './components/Partners';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 200);
          return 100;
        }
        return prev + Math.random() * 25;
      });
    }, 100);

    const timeout = setTimeout(() => setLoadingProgress(100), 1500);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col flex-1">
      {/* Main Content */}
      <div className={`relative z-10 flex flex-col min-h-screen transition-opacity duration-500 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Header />
        <main className="flex-1">
          <Hero />
          <Services />
          <Partners />
        </main>
        <Footer />
      </div>

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="mb-12">
              <div className="flex items-center justify-center space-x-8 mb-6">
                <Image src="/logo_fpt_text_black.webp" alt="FPT Software Japan" width={192} height={128} className="h-16 w-auto object-contain" priority />
                <Image src="/logo.png" alt="FSG Logo" width={128} height={128} className="h-16 w-auto object-contain" priority />
              </div>
              <p className="text-sm text-gray-400">FPTソフトウェアジャパン株式会社</p>
              <p className="text-lg text-gray-700 font-semibold mt-2">パブリック・ファイナンスサービス開発事業本部</p>
            </div>
            <div className="mb-6">
              <div className="w-48 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${Math.min(loadingProgress, 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useContent } from '../../hooks/useContent';

export default function About() {
  const { t, themeColor } = useLanguage();
  const { content, loading } = useContent();
  const [showFptModal, setShowFptModal] = useState(false);
  const [loadingImages, setLoadingImages] = useState<{ [key: number]: boolean }>({});
  const [imagePreloadStarted, setImagePreloadStarted] = useState(false);
  
  // Get FPT images from content instead of hardcoded
  const fptImages = useMemo(() => {
    if (!content || !content.slides || !content.slides.fpt) {
      return [
        '/slides/Slide4.jpg', 
        '/slides/Slide5.jpg', 
        '/slides/Slide6.jpg', 
        '/slides/Slide7.jpg', 
        '/slides/Slide8.jpg', 
        '/slides/Slide9.jpg'
      ];
    }
    return content.slides.fpt;
  }, [content]);

  // Preload images in background after page load
  useEffect(() => {
    if (!loading && content && !imagePreloadStarted) {
      const timer = setTimeout(() => {
        setImagePreloadStarted(true);
        // Preload first few images silently using createElement
        fptImages.slice(0, 3).forEach((imagePath: string) => {
          if (typeof window !== 'undefined') {
            const img = document.createElement('img');
            img.src = imagePath;
            img.style.display = 'none';
            document.body.appendChild(img);
            // Remove after loading
            img.onload = () => document.body.removeChild(img);
            img.onerror = () => document.body.removeChild(img);
          }
        });
      }, 2000); // Wait 2 seconds after page load

      return () => clearTimeout(timer);
    }
  }, [loading, content, fptImages, imagePreloadStarted]);

  const handleImageLoadStart = (index: number) => {
    setLoadingImages(prev => ({ ...prev, [index]: true }));
  };

  const handleImageLoadComplete = (index: number) => {
    setLoadingImages(prev => ({ ...prev, [index]: false }));
  };

  const handleImageError = (index: number) => {
    setLoadingImages(prev => ({ ...prev, [index]: false }));
  };

  // Initialize loading state when modal opens
  useEffect(() => {
    if (showFptModal) {
      const initialLoadingState: { [key: number]: boolean } = {};
      fptImages.forEach((_: string, index: number) => {
        initialLoadingState[index] = true;
      });
      setLoadingImages(initialLoadingState);
    }
  }, [showFptModal, fptImages]);

  if (loading || !content) {
    return (
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">コンテンツを読み込み中...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20">      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.about.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <button
              onClick={() => setShowFptModal(true)}
              className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors"
            >
              FPTソフトウェアジャパン
            </button>
            {content.about.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Global Experience */}
          <div className="text-center p-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
              themeColor === 'emerald' ? 'bg-emerald-100' : 'bg-blue-100'
            }`}>
              <svg className={`w-8 h-8 ${themeColor === 'emerald' ? 'text-emerald-600' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">グローバルな経験</h3>
            <p className="text-gray-600">
              金融・公共分野における大規模プロジェクトの実績
            </p>
          </div>

          {/* Strong Human Resources */}
          <div className="text-center p-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
              themeColor === 'emerald' ? 'bg-green-100' : 'bg-green-100'
            }`}>
              <svg className={`w-8 h-8 ${themeColor === 'emerald' ? 'text-green-600' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">強力な人材基盤</h3>
            <p className="text-gray-600">
              33,000人以上の従業員、2,000人以上の金融専門家、200人以上のSalesforce専門家
            </p>
          </div>

          {/* Cost Optimization */}
          <div className="text-center p-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
              themeColor === 'emerald' ? 'bg-teal-100' : 'bg-purple-100'
            }`}>
              <svg className={`w-8 h-8 ${themeColor === 'emerald' ? 'text-teal-600' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">コスト最適化</h3>
            <p className="text-gray-600">
              オンサイトとオフショアのハイブリッドモデル
            </p>
          </div>

          {/* Continuous Innovation */}
          <div className="text-center p-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
              themeColor === 'emerald' ? 'bg-orange-100' : 'bg-orange-100'
            }`}>
              <svg className={`w-8 h-8 ${themeColor === 'emerald' ? 'text-orange-600' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">継続的なイノベーション</h3>
            <p className="text-gray-600">
              AI、クラウド、先端技術の活用
            </p>
          </div>
        </div>
      </div>

      {/* FPT Modal */}
      {showFptModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowFptModal(false)}
        >
          <div 
            className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-900">
                FPTソフトウェアジャパン - 会社紹介
              </h3>
              <button 
                onClick={() => setShowFptModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {fptImages.map((imagePath: string, index: number) => (
                <div key={index} className="relative w-full h-[700px] rounded-lg overflow-hidden shadow-lg">
                  {loadingImages[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                      <div className="flex flex-col items-center space-y-4">
                        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
                          themeColor === 'emerald' ? 'border-emerald-600' : 'border-blue-600'
                        }`}></div>
                        <p className={`text-sm font-medium ${
                          themeColor === 'emerald' ? 'text-emerald-600' : 'text-blue-600'
                        }`}>
                          画像を読み込み中...
                        </p>
                      </div>
                    </div>
                  )}
                  <Image
                    src={imagePath}
                    alt={`FPT Software Japan slide ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    onLoad={() => handleImageLoadComplete(index)}
                    onError={() => handleImageError(index)}
                  />
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t text-center">
              <button 
                onClick={() => setShowFptModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

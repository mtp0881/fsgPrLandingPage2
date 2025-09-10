'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../../hooks/useContent';

export default function Hero() {
  const { t, themeColor } = useLanguage();
  const { content, loading } = useContent();

  if (loading || !content) {
    return (
      <section className="min-h-screen mx-3 my-3 relative overflow-hidden pt-16 rounded-3xl shadow-2xl">
        {/* Craft.do background */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://www.craft.do/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FheroBg-blur-small.e33d9b5e.png&w=1920&q=75')`
            }}
          >
          </div>
          <div className="absolute inset-0 bg-white/10"></div>
        </div>
        
        {/* Skeleton content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-12 flex items-center min-h-screen">
          <div className="text-center w-full">
            {/* Title skeleton */}
            <div className="mb-8">
              <div className="h-16 bg-gray-300/50 rounded-lg mb-4 animate-pulse"></div>
              <div className="h-16 bg-gray-300/50 rounded-lg animate-pulse"></div>
            </div>
            
            {/* Subtitle skeleton */}
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="h-6 bg-gray-300/50 rounded mb-3 animate-pulse"></div>
              <div className="h-6 bg-gray-300/50 rounded mb-3 animate-pulse"></div>
              <div className="h-6 bg-gray-300/50 rounded w-3/4 mx-auto animate-pulse"></div>
            </div>
            
            {/* Buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <div className="h-14 w-40 bg-gray-300/50 rounded-lg animate-pulse"></div>
              <div className="h-14 w-40 bg-gray-300/50 rounded-lg animate-pulse"></div>
            </div>
            
            {/* Stats skeleton */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300/50 rounded animate-pulse"></div>
                <div className="h-6 w-32 bg-gray-300/50 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300/50 rounded animate-pulse"></div>
                <div className="h-6 w-32 bg-gray-300/50 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen mx-3 my-3 relative overflow-hidden pt-16 rounded-3xl shadow-2xl">
      {/* Exact Craft.do background using their actual image */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        {/* Base background with Craft.do's actual background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://www.craft.do/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FheroBg-blur-small.e33d9b5e.png&w=1920&q=75')`
          }}
        >
        </div>
        
        {/* White overlay for better text readability */}
        <div className="absolute inset-0 bg-white/10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-12 flex items-center min-h-screen">
        <div className="text-center w-full">
          {/* Main heading - Craft.do style */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
            <span className="block text-gray-900 mb-2">
              FSG事業部
            </span>
            <span className="block text-gray-900">
              デジタル変革のパートナー
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto font-normal">
            {content.hero.subtitle}
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-sm border border-gray-100">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">19年以上の実績</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-sm border border-gray-100">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">金融・公共特化</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-sm border border-gray-100">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Salesforce認定</span>
            </div>
          </div>

          {/* Visual representation */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
              
              {/* Section headers */}
              <div className="flex justify-center items-center gap-8 mb-4">
                <div className="flex items-center gap-2 text-center">
                  <span className="text-sm font-bold text-gray-700">🚀 コアコンピタンス</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-2 text-center">
                  <span className="text-sm font-bold text-gray-700">🔑 戦略プログラム</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Core Competencies */}
                <div className="text-center p-4 rounded-xl border border-green-100 relative overflow-hidden">
                  {/* Background image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('/images/bank.jpg')`
                    }}
                  ></div>
                  <div className="relative z-10 pt-16">
                    <h4 className="font-bold text-white text-sm drop-shadow-lg bg-black/50 px-2 py-1 rounded inline-block">{content.hero.domains?.finance || '金融サービス'}</h4>
                  </div>
                </div>
                
                <div className="text-center p-4 rounded-xl border border-red-100 relative overflow-hidden">
                  {/* Background image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('/images/public.jpg')`
                    }}
                  ></div>
                  <div className="relative z-10 pt-16">
                    <h4 className="font-bold text-white text-sm drop-shadow-lg bg-black/50 px-2 py-1 rounded inline-block">{content.hero.domains?.public || '公共サービス'}</h4>
                  </div>
                </div>

                {/* Strategic Programs */}
                <div className="text-center p-4 rounded-xl border border-purple-100 relative overflow-hidden">
                  {/* Background image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('/images/legacy.png')`
                    }}
                  ></div>
                  <div className="relative z-10 pt-16">
                    <h4 className="font-bold text-white text-sm drop-shadow-lg bg-black/50 px-2 py-1 rounded inline-block">{content.hero.domains?.legacy || 'レガシーモダナイゼーション'}</h4>
                  </div>
                </div>
                
                <div className="text-center p-4 rounded-xl border border-blue-100 relative overflow-hidden">
                  {/* Background image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('/images/sale.jpg')`
                    }}
                  ></div>
                  <div className="relative z-10 pt-16">
                    <h4 className="font-bold text-white text-sm drop-shadow-lg bg-black/50 px-2 py-1 rounded inline-block">{content.hero.domains?.salesforce || 'Salesforceプログラム'}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

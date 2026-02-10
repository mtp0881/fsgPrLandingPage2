'use client';

import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t, isJapanese } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src="/images/hero-bg.png" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-emerald-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        {/* Logos */}
        <div className="flex items-center justify-center space-x-6 mb-8">
          <Image src="/logo_fpt_text_black.webp" alt="FPT Software" width={180} height={60} className="h-12 w-auto brightness-0 invert" priority />
          <div className="w-px h-10 bg-white/30" />
          <Image src="/logo.png" alt="FSG" width={60} height={60} className="h-12 w-auto brightness-0 invert" priority />
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          {isJapanese ? (
            <>
              <span className="lg:inline hidden">パブリック・ファイナンスサービス<br />開発事業本部</span>
              <span className="lg:hidden">{t('hero.title')}</span>
            </>
          ) : t('hero.title')}
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(isJapanese
            ? ['金融・公共特化', 'Salesforce認定', '全国15拠点']
            : ['Finance & Public Sector', 'Salesforce Certified', '15 Locations Nationwide']
          ).map((pill, i) => (
            <span key={i} className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm">
              {pill}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors shadow-lg shadow-emerald-500/25"
        >
          {t('hero.cta')}
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

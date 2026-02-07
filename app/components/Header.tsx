'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t, isJapanese } = useLanguage();
  const pathname = usePathname();
  const isContactPage = pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: isJapanese ? 'コアサービス' : 'Core Services', target: 'services' },
    { label: isJapanese ? '戦略プログラム' : 'Strategic Program', target: 'strategic-program' },
    { label: t('nav.organization'), target: 'organization' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'pt-1' : 'pt-3'}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg' : 'bg-white/60 backdrop-blur-md rounded-2xl'
      }`}>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 shrink-0">
            <Image src="/logo_fpt_text_black.webp" alt="FPT Software" width={120} height={40} className="h-8 w-auto" priority />
            <Image src="/logo.png" alt="FSG" width={40} height={40} className="h-8 w-auto" priority />
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {isContactPage ? (
              <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">
                {isJapanese ? 'ホーム' : 'Home'}
              </Link>
            ) : (
              navItems.map((item, i) =>
                <button key={i} onClick={() => scrollTo(item.target)} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">
                  {item.label}
                </button>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center bg-gray-100 rounded-full p-0.5">
              <button onClick={() => setLanguage('ja')} className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${language === 'ja' ? 'bg-white shadow text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}>
                JA
              </button>
              <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${language === 'en' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                EN
              </button>
            </div>
            <Link href="/contact" className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
              {isJapanese ? 'お問い合わせ' : 'Contact Us'}
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 mt-2">
            <div className="pt-3 space-y-1">
              {isContactPage ? (
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 rounded-lg">
                  {isJapanese ? 'ホーム' : 'Home'}
                </Link>
              ) : (
                navItems.map((item, i) =>
                  <button key={i} onClick={() => scrollTo(item.target)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 rounded-lg">
                    {item.label}
                  </button>
                )
              )}
              <div className="flex items-center space-x-2 px-4 pt-2">
                <button onClick={() => { setLanguage('ja'); setIsMenuOpen(false); }} className={`px-3 py-1 text-xs rounded-full ${language === 'ja' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100'}`}>JA</button>
                <button onClick={() => { setLanguage('en'); setIsMenuOpen(false); }} className={`px-3 py-1 text-xs rounded-full ${language === 'en' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>EN</button>
              </div>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block mx-4 mt-2 px-4 py-2 bg-emerald-600 text-white text-sm text-center font-medium rounded-lg">
                {isJapanese ? 'お問い合わせ' : 'Contact Us'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

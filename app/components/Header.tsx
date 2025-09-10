'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t, themeColor } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Khi scroll quá 20px thì header sẽ di chuyển lên sát
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Overlay mờ để che khoảng hở khi scroll */}
      {isScrolled && (
        <div className="fixed top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/80 to-transparent z-40 backdrop-blur-sm"></div>
      )}
      
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out px-4 ${
        isScrolled ? 'pt-1' : 'pt-12'
      }`}>
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg shadow-black/5 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center space-x-4">
                <img 
                  src="/logo_fpt_text_black.webp" 
                  alt="FPT Software" 
                  className="h-8 w-auto transition-opacity group-hover:opacity-80"
                />
                <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                <img 
                  src="/logo.png" 
                  alt="FSG - Finance Services Group" 
                  className="h-8 w-auto transition-opacity group-hover:opacity-80"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <button 
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  const headerHeight = 80;
                  const elementPosition = aboutSection.offsetTop - headerHeight;
                  window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              {t('nav.about')}
            </button>
            <button 
              onClick={() => {
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  const headerHeight = 80;
                  const elementPosition = servicesSection.offsetTop - headerHeight;
                  window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              {t('nav.services')}
            </button>
            <button 
              onClick={() => {
                const globalSection = document.getElementById('global-network');
                if (globalSection) {
                  const headerHeight = 80;
                  const elementPosition = globalSection.offsetTop - headerHeight;
                  window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              {t('nav.global')}
            </button>
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const headerHeight = 80;
                  const elementPosition = contactSection.offsetTop - headerHeight;
                  window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              {t('nav.contact')}
            </button>
          </nav>

          {/* Language Switcher & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-gray-50 rounded-full p-1">
              <button
                onClick={() => setLanguage('jp')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  language === 'jp'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                JP
              </button>
              <button
                onClick={() => setLanguage('vn')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  language === 'vn'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                VN
              </button>
            </div>
            
            {/* Admin Login Button */}
            <Link
              href="/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-all text-xs font-medium"
            >
              管理者ログイン
            </Link>
            
            {/* CTA Button */}
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const headerHeight = 80;
                  const elementPosition = contactSection.offsetTop - headerHeight;
                  window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors w-40 flex items-center justify-center"
            >
              {t('nav.consultation')}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    const headerHeight = 80;
                    const elementPosition = aboutSection.offsetTop - headerHeight;
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    });
                  }
                  setIsMenuOpen(false);
                }}
                className={`text-gray-700 transition-colors text-left ${themeColor === 'emerald' ? 'hover:text-emerald-600' : 'hover:text-blue-600'}`}
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    const headerHeight = 80;
                    const elementPosition = servicesSection.offsetTop - headerHeight;
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    });
                  }
                  setIsMenuOpen(false);
                }}
                className={`text-gray-700 transition-colors text-left ${themeColor === 'emerald' ? 'hover:text-emerald-600' : 'hover:text-blue-600'}`}
              >
                {t('nav.services')}
              </button>
              <button
                onClick={() => {
                  const globalSection = document.getElementById('global-network');
                  if (globalSection) {
                    const headerHeight = 80;
                    const elementPosition = globalSection.offsetTop - headerHeight;
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    });
                  }
                  setIsMenuOpen(false);
                }}
                className={`text-gray-700 transition-colors text-left ${themeColor === 'emerald' ? 'hover:text-emerald-600' : 'hover:text-blue-600'}`}
              >
                {t('nav.global')}
              </button>
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    const headerHeight = 80;
                    const elementPosition = contactSection.offsetTop - headerHeight;
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    });
                  }
                  setIsMenuOpen(false);
                }}
                className={`text-gray-700 transition-colors text-left ${themeColor === 'emerald' ? 'hover:text-emerald-600' : 'hover:text-blue-600'}`}
              >
                {t('nav.contact')}
              </button>
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-center bg-gray-100 rounded-lg p-1 mx-4">
                <button
                  onClick={() => {
                    setLanguage('jp');
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    language === 'jp'
                      ? `${themeColor === 'emerald' ? 'bg-emerald-600' : 'bg-blue-600'} text-white`
                      : `text-gray-600 ${themeColor === 'emerald' ? 'hover:text-emerald-600' : 'hover:text-blue-600'}`
                  }`}
                >
                  JP
                </button>
                <button
                  onClick={() => {
                    setLanguage('vn');
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    language === 'vn'
                      ? `${themeColor === 'emerald' ? 'bg-emerald-600' : 'bg-blue-600'} text-white`
                      : `text-gray-600 ${themeColor === 'emerald' ? 'hover:text-emerald-600' : 'hover:text-blue-600'}`
                  }`}
                >
                  VN
                </button>
              </div>
              
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    const headerHeight = 80; // Chiều cao của header
                    const elementPosition = contactSection.offsetTop - headerHeight;
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    });
                  }
                  setIsMenuOpen(false);
                }}
                className={`text-white px-6 py-2 rounded-lg transition-colors text-center mx-4 block ${
                  themeColor === 'emerald' 
                    ? 'bg-emerald-600 hover:bg-emerald-700' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {t('nav.consultation')}
              </button>

              {/* Mobile Admin Login */}
              <Link
                href="/admin"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className={`text-gray-600 hover:text-gray-800 px-6 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors text-center mx-4 block ${
                  themeColor === 'emerald' 
                    ? 'hover:text-emerald-600 hover:border-emerald-300' 
                    : 'hover:text-blue-600 hover:border-blue-300'
                }`}
              >
                管理者ログイン
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  );
}

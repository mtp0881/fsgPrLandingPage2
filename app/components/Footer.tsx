'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import footerData from '@/data/footer.json';

export default function Footer() {
  const { t, isJapanese } = useLanguage();
  const pathname = usePathname();

  const socialIcons: Record<string, React.ReactNode> = {
    facebook: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    ),
    linkedin: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
    twitter: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    ),
    youtube: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    ),
    mail: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
    ),
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Section */}
      {pathname !== '/contact' && (
      <div className="relative border-b border-slate-800 overflow-hidden">
        <Image src="/images/background.webp" alt="" fill className="object-cover opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">
            {isJapanese ? footerData.cta.title_ja : footerData.cta.title_en}
          </h3>
          <Link
            href={footerData.cta.contactUrl}
            className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
          >
            {isJapanese ? 'お問い合わせ' : 'Contact Us'}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
      </div>
      )}

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Image src="/logo_fpt_text_black.webp" alt="FPT" width={100} height={32} className="h-6 w-auto brightness-0 invert" />
              <Image src="/logo.png" alt="FSG" width={32} height={32} className="h-6 w-auto brightness-0 invert" />
            </div>
            <h3 className="text-sm font-semibold mb-1">
              {isJapanese ? footerData.company.name_ja : footerData.company.name_en}
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              {isJapanese ? footerData.company.address_ja : footerData.company.address_en}
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-2">
              {footerData.socialMedia.map((social) => {
                const isExternal = social.url.startsWith('http');
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                    title={social.name}
                  >
                    {socialIcons[social.icon]}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Business Domains */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              {isJapanese ? '事業領域' : 'Business Domains'}
            </h4>
            <ul className="space-y-2">
              {[
                { ja: 'コアサービス', en: 'Core Services', target: 'services' },
                { ja: '戦略プログラム', en: 'Strategic Program', target: 'strategic-program' },
                { ja: '組織図', en: 'Organization', target: 'organization' },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={`/#${item.target}`}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {isJapanese ? item.ja : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              {isJapanese ? 'クイックリンク' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link, i) => {
                const isExternal = link.url.startsWith('http');
                return (
                  <li key={i}>
                    {isExternal ? (
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-sm transition-colors">
                        {isJapanese ? link.label_ja : link.label_en}
                      </a>
                    ) : (
                      <Link href={link.url} className="text-slate-400 hover:text-white text-sm transition-colors">
                        {isJapanese ? link.label_ja : link.label_en}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              {isJapanese ? '認証・認定' : 'Certifications'}
            </h4>
            <ul className="space-y-2">
              {footerData.certifications.map((cert, i) => (
                <li key={i}>
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    {cert.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Legal + Copyright */}
        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">{footerData.company.copyright}</p>
          <div className="flex flex-wrap items-center gap-4">
            {footerData.legalLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
                {isJapanese ? link.label_ja : link.label_en}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

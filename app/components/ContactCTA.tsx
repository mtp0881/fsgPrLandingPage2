'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

export default function ContactCTA() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('contact.title')}</h2>
        <p className="text-emerald-100 text-lg mb-8">{t('contact.subtitle')}</p>
        <Link
          href="/contact"
          className="inline-flex items-center px-8 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors shadow-lg"
        >
          {t('contact.cta')}
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

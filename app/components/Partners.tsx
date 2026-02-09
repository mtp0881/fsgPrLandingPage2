'use client';

import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

const partners = [
  { name: 'NTT Data', logo: '/partners/ntt-data--600.png' },
  { name: 'Fujitsu', logo: '/partners/fujitsu.png' },
  { name: 'Deutsche Bank', logo: '/partners/deutsche-bank.png' },
  { name: 'Symphony', logo: '/partners/symphony.png' },
  { name: 'DocMagic', logo: '/partners/docmagic.png' },
  { name: 'Closing Exchange', logo: '/partners/closing exchange.png' },
];

export default function Partners() {
  const { t } = useLanguage();

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('partners.title')}</h2>
          <p className="text-lg text-gray-600">{t('partners.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, i) => (
            <div key={i} className="flex items-center justify-center p-6 bg-gray-50 rounded-xl h-24">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={140}
                height={60}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

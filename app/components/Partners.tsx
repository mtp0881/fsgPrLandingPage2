'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../hooks/useContent';
import Image from 'next/image';
import { optimizeImageUrl } from './ImageOptimizer';

export default function Partners() {
  const { t, themeColor } = useLanguage();
  const { content, loading, error } = useContent();

  // Fallback partners if no content is available
  const fallbackMainPartners = [
    {
      name: 'NTT Data',
      logo: '/partners/ntt-data--600.png',
      width: 200,
      height: 100
    },
    {
      name: 'Partner 596797',
      logo: '/partners/596797.png',
      width: 160,
      height: 80
    },
    {
      name: 'Fujitsu',
      logo: '/partners/fujitsu.webp',
      width: 180,
      height: 90
    }
  ];

  const fallbackSecondaryPartners = [
    {
      name: 'Deutsche Bank',
      logo: '/partners/deutsche-bank.webp',
      width: 120,
      height: 60
    },
    {
      name: 'Closing Exchange',
      logo: '/partners/closing exchange.webp',
      width: 120,
      height: 60
    },
    {
      name: 'DocMagic',
      logo: '/partners/docmagic.webp',
      width: 120,
      height: 60
    },
    {
      name: 'Symphony',
      logo: '/partners/symphony.webp',
      width: 120,
      height: 60
    },
    {
      name: 'Item LV2',
      logo: '/partners/item_lv2.webp',
      width: 120,
      height: 60
    }
  ];

  // Use content data if available, otherwise use fallback
  const mainPartners = content?.partners?.main_partners || fallbackMainPartners;
  const secondaryPartners = content?.partners?.secondary_partners || fallbackSecondaryPartners;

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
              themeColor === 'emerald' ? 'border-emerald-600' : 'border-blue-600'
            }`}></div>
          </div>
        </div>
      </section>
    );
  }

  const partnersContent = content?.partners || {};

  return (
    <section className="py-16">      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {partnersContent.title || t('partners.title')}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {partnersContent.subtitle || t('partners.subtitle')}
          </p>
        </div>

        {/* Main Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-items-center mb-12">
          {mainPartners.map((partner: any, index: number) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center h-32 w-full"
            >
              <div className="relative flex items-center justify-center w-full h-full">
                <Image
                  src={optimizeImageUrl(partner.logo, partner.width || 200, 85)}
                  alt={partner.name || `Partner ${index + 1}`}
                  width={partner.width || 200}
                  height={partner.height || 100}
                  className="object-contain transition-transform duration-300 hover:scale-105 max-w-full max-h-full"
                  style={{ maxWidth: '90%', maxHeight: '90%' }}
                  loading="lazy"
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjb2KMuD2MgtbNWjhjWeSGJsrGgCordzPqzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
                />
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch justify-items-center">
          {secondaryPartners.map((partner: any, index: number) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center h-20 w-full"
            >
              <div className="relative flex items-center justify-center w-full h-full">
                <Image
                  src={optimizeImageUrl(partner.logo, partner.width || 120, 80)}
                  alt={partner.name || `Secondary Partner ${index + 1}`}
                  width={partner.width || 120}
                  height={partner.height || 60}
                  className="object-contain transition-transform duration-300 hover:scale-105 max-w-full max-h-full"
                  style={{ maxWidth: '85%', maxHeight: '85%' }}
                  loading="lazy"
                  quality={80}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjb2KMuD2MgtbNWjhjWeSGJsrGgCordzPqzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Partners Text */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            {partnersContent.additional || t('partners.additional')}
          </p>
        </div>
      </div>
    </section>
  );
}

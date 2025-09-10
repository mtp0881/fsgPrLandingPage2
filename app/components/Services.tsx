'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import Image from 'next/image';

export default function Services() {
  const { t, themeColor } = useLanguage();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const serviceImages = {
    finance: ['/slides/Slide12.jpg', '/slides/Slide13.jpg'],
    legacy: ['/slides/Slide18.jpg', '/slides/Slide19.jpg', '/slides/Slide20.jpg'],
    public: ['/slides/Slide15.jpg', '/slides/Slide16.jpg'],
    salesforce: ['/slides/Slide22.jpg', '/slides/Slide23.jpg', '/slides/Slide24.jpg', '/slides/Slide25.jpg', '/slides/Slide26.jpg', '/slides/Slide27.jpg'],
    fpt: ['/slides/Slide4.jpg', '/slides/Slide5.jpg', '/slides/Slide6.jpg', '/slides/Slide7.jpg', '/slides/Slide8.jpg', '/slides/Slide9.jpg']
  };
  
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-3-6h6" />
        </svg>
      ),
      title: t('services.finance.title'),
      description: t('services.finance.desc'),
      features: [t('features.banking_systems'), t('features.insurance_systems'), t('features.securities_systems'), t('features.payment_systems')],
      stats: t('services.finance.stats'),
      expertise: t('services.finance.expertise'),
      domain: "finance",
      category: "core",
      categoryLabel: "コア分野"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: t('services.public.title'),
      description: t('services.public.desc'),
      features: [t('features.government_systems'), t('features.education_systems'), t('features.smart_city'), t('features.public_infrastructure')],
      stats: t('services.public.stats'),
      expertise: t('services.public.expertise'),
      domain: "public",
      category: "core",
      categoryLabel: "コア分野"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: t('services.legacy.title'),
      description: t('services.legacy.desc'),
      features: [t('features.cobol_migration'), t('features.db_migration'), t('features.system_modernization'), t('features.legacy_assessment')],
      stats: t('services.legacy.stats'),
      expertise: t('services.legacy.expertise'),
      domain: "legacy",
      category: "strategic",
      categoryLabel: "戦略プログラム"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: t('services.salesforce.title'),
      description: t('services.salesforce.desc'),
      features: [t('features.sales_cloud'), t('features.service_cloud'), t('features.mulesoft_integration'), t('features.data_cloud')],
      stats: t('services.salesforce.stats'),
      expertise: t('services.salesforce.expertise'),
      domain: "salesforce",
      category: "strategic",
      categoryLabel: "戦略プログラム"
    }
  ];

  const coreServices = services.filter(service => service.category === 'core');
  const strategicPrograms = services.filter(service => service.category === 'strategic');

  return (
    <section id="services" className="py-20 relative">      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <div className={`w-3 h-8 rounded-full mr-4 ${
                themeColor === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500'
              }`}></div>
              <h3 className="text-2xl font-bold text-gray-900">コアコンピタンス</h3>
            </div>
            <p className="text-gray-600 mb-8">私たちは<strong>2つの主要分野</strong>に注力しています：</p>
            <div className="grid grid-cols-1 gap-6">
              {coreServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-2 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0 transition-colors duration-300 ${
                      themeColor === 'emerald' 
                        ? 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                        : 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                    }`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      
                      {service.stats && (
                        <div className={`mb-3 text-center py-2 px-3 rounded-lg ${
                          themeColor === 'emerald'
                            ? 'bg-gradient-to-r from-emerald-50 to-green-50'
                            : 'bg-gradient-to-r from-blue-50 to-indigo-50'
                        }`}>
                          <span 
                            className={`text-sm font-semibold ${
                              themeColor === 'emerald' ? 'text-emerald-800' : 'text-blue-800'
                            }`}
                            dangerouslySetInnerHTML={{ __html: service.stats }}
                          />
                        </div>
                      )}
                      
                      {service.expertise && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 font-medium">{service.expertise}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div className={`w-20 h-1 rounded-full ${
                          service.domain === 'finance' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                          'bg-gradient-to-r from-red-400 to-rose-500'
                        }`}></div>
                        <button 
                          onClick={() => setSelectedService(service.domain)}
                          className={`font-medium py-1 px-3 rounded-lg transition-colors duration-200 text-white text-sm ${
                            themeColor === 'emerald' 
                              ? 'bg-emerald-600 hover:bg-emerald-700' 
                              : 'bg-gray-600 hover:bg-gray-700'
                          }`}
                        >
                          詳細
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center mb-6">
              <div className={`w-3 h-8 rounded-full mr-4 ${
                themeColor === 'emerald' ? 'bg-purple-500' : 'bg-indigo-500'
              }`}></div>
              <h3 className="text-2xl font-bold text-gray-900">戦略プログラム</h3>
            </div>
            <p className="text-gray-600 mb-8">企業の競争力向上を支援する<strong>2つの戦略プログラム</strong>：</p>
            <div className="grid grid-cols-1 gap-6">
              {strategicPrograms.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-2 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0 transition-colors duration-300 ${
                      service.domain === 'legacy'
                        ? 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
                        : 'bg-cyan-100 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white'
                    }`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      
                      {service.stats && (
                        <div className={`mb-3 text-center py-2 px-3 rounded-lg ${
                          service.domain === 'legacy'
                            ? 'bg-gradient-to-r from-purple-50 to-violet-50'
                            : 'bg-gradient-to-r from-cyan-50 to-blue-50'
                        }`}>
                          <span 
                            className={`text-sm font-semibold ${
                              service.domain === 'legacy' ? 'text-purple-800' : 'text-cyan-800'
                            }`}
                            dangerouslySetInnerHTML={{ __html: service.stats }}
                          />
                        </div>
                      )}
                      
                      {service.expertise && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 font-medium">{service.expertise}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div className={`w-20 h-1 rounded-full ${
                          service.domain === 'legacy' ? 'bg-gradient-to-r from-purple-400 to-violet-500' :
                          'bg-gradient-to-r from-blue-400 to-cyan-500'
                        }`}></div>
                        <button 
                          onClick={() => setSelectedService(service.domain)}
                          className={`font-medium py-1 px-3 rounded-lg transition-colors duration-200 text-white text-sm ${
                            service.domain === 'legacy'
                              ? 'bg-purple-600 hover:bg-purple-700'
                              : 'bg-cyan-600 hover:bg-cyan-700'
                          }`}
                        >
                          詳細
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Modal */}
        {selectedService && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedService(null)}
          >
            <div 
              className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-900">
                  {t(`services.${selectedService}.title`)} - {t('services.modal_title')}
                </h3>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {serviceImages[selectedService as keyof typeof serviceImages]?.map((imagePath, index) => (
                  <div key={index} className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={imagePath}
                      alt={`${selectedService} slide ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t text-center">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  {t('services.close_modal')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

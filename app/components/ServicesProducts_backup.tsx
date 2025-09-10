'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useContent } from '../../hooks/useContent';

export default function ServicesProducts() {
  const { t, themeColor } = useLanguage();
  const { content, loading } = useContent();
  const [activeTab, setActiveTab] = useState<'services' | 'products'>('services');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});

  // Listen for external tab changes
  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail.tab);
    };

    window.addEventListener('changeServicesProductsTab', handleTabChange as EventListener);
    
    return () => {
      window.removeEventListener('changeServicesProductsTab', handleTabChange as EventListener);
    };
  }, []);

  // Handle image loading
  const handleImageLoadStart = (imagePath: string) => {
    setLoadingImages(prev => ({ ...prev, [imagePath]: true }));
  };

  const handleImageLoadComplete = (imagePath: string) => {
    setLoadingImages(prev => ({ ...prev, [imagePath]: false }));
  };

  // Initialize loading state when modal opens
  useEffect(() => {
    if (selectedService) {
      const images = serviceImages[selectedService as keyof typeof serviceImages] || [];
      const initialLoadingState: { [key: string]: boolean } = {};
      images.forEach((imagePath: string) => {
        initialLoadingState[imagePath] = true;
      });
      setLoadingImages(initialLoadingState);
    }
  }, [selectedService]);
  
  const serviceImages = {
    finance: content?.slides?.finance || ['/slides/Slide12.jpg', '/slides/Slide13.jpg'],
    legacy: content?.slides?.legacy || ['/slides/Slide18.jpg', '/slides/Slide19.jpg', '/slides/Slide20.jpg'],
    public: content?.slides?.public || ['/slides/Slide15.jpg', '/slides/Slide16.jpg'],
    salesforce: content?.slides?.salesforce || ['/slides/Slide22.jpg', '/slides/Slide23.jpg', '/slides/Slide24.jpg', '/slides/Slide25.jpg', '/slides/Slide26.jpg', '/slides/Slide27.jpg'],
    fpt: content?.slides?.fpt || ['/slides/Slide4.jpg', '/slides/Slide5.jpg', '/slides/Slide6.jpg', '/slides/Slide7.jpg', '/slides/Slide8.jpg', '/slides/Slide9.jpg']
  };

  if (loading || !content) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">コンテンツを読み込み中...</p>
          </div>
        </div>
      </section>
    );
  }
  
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-3-6h6" />
        </svg>
      ),
      title: content.services.finance.title,
      description: content.services.finance.desc,
      features: [t('features.banking_systems'), t('features.insurance_systems'), t('features.securities_systems'), t('features.payment_systems')],
      stats: content.services.finance.stats,
      expertise: content.services.finance.expertise,
      domain: "finance",
      category: "core"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: content.services.public.title,
      description: content.services.public.desc,
      features: [t('features.government_systems'), t('features.education_systems'), t('features.smart_city'), t('features.public_infrastructure')],
      stats: content.services.public.stats,
      expertise: content.services.public.expertise,
      domain: "public",
      category: "core"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: content.services.legacy.title,
      description: content.services.legacy.desc,
      features: [t('features.cobol_migration'), t('features.db_migration'), t('features.system_modernization'), t('features.legacy_assessment')],
      stats: content.services.legacy.stats,
      expertise: content.services.legacy.expertise,
      domain: "legacy",
      category: "strategic"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: content.services.salesforce.title,
      description: content.services.salesforce.desc,
      features: [t('features.sales_cloud'), t('features.service_cloud'), t('features.mulesoft_integration'), t('features.data_cloud')],
      stats: content.services.salesforce.stats,
      expertise: content.services.salesforce.expertise,
      domain: "salesforce",
      category: "strategic"
    }
  ];

  const coreServices = services.filter(service => service.category === 'core');
  const strategicPrograms = services.filter(service => service.category === 'strategic');

  const products = [
    {
      name: content?.products?.finance?.name || t('products.finance.name'),
      description: content?.products?.finance?.desc || t('products.finance.desc'),
      features: [
        content?.products?.finance?.feature1 || t('products.finance.feature1'), 
        content?.products?.finance?.feature2 || t('products.finance.feature2'), 
        content?.products?.finance?.feature3 || t('products.finance.feature3'), 
        content?.products?.finance?.feature4 || t('products.finance.feature4')
      ],
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-3-6h6',
      bgColor: 'from-green-100 to-emerald-100',
      iconColor: 'bg-green-600'
    },
    {
      name: content?.products?.legacy?.name || t('products.legacy.name'),
      description: content?.products?.legacy?.desc || t('products.legacy.desc'),
      features: [
        content?.products?.legacy?.feature1 || t('products.legacy.feature1'), 
        content?.products?.legacy?.feature2 || t('products.legacy.feature2'), 
        content?.products?.legacy?.feature3 || t('products.legacy.feature3'), 
        content?.products?.legacy?.feature4 || t('products.legacy.feature4')
      ],
      icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
      bgColor: 'from-purple-100 to-violet-100',
      iconColor: 'bg-purple-600'
    },
    {
      name: content?.products?.public?.name || t('products.public.name'),
      description: content?.products?.public?.desc || t('products.public.desc'),
      features: [
        content?.products?.public?.feature1 || t('products.public.feature1'), 
        content?.products?.public?.feature2 || t('products.public.feature2'), 
        content?.products?.public?.feature3 || t('products.public.feature3'), 
        content?.products?.public?.feature4 || t('products.public.feature4')
      ],
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      bgColor: 'from-red-100 to-rose-100',
      iconColor: 'bg-red-600'
    },
    {
      name: content?.products?.salesforce?.name || t('products.salesforce.name'),
      description: content?.products?.salesforce?.desc || t('products.salesforce.desc'),
      features: [
        content?.products?.salesforce?.feature1 || t('products.salesforce.feature1'), 
        content?.products?.salesforce?.feature2 || t('products.salesforce.feature2'), 
        content?.products?.salesforce?.feature3 || t('products.salesforce.feature3'), 
        content?.products?.salesforce?.feature4 || t('products.salesforce.feature4')
      ],
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      bgColor: 'from-cyan-100 to-blue-100',
      iconColor: 'bg-cyan-600'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Headers */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative bg-gray-100 rounded-2xl p-2 shadow-inner">
              {/* Sliding background indicator */}
              <div 
                className={`absolute top-2 h-12 w-72 rounded-xl transition-all duration-300 ease-out shadow-sm ${
                  themeColor === 'emerald' ? 'bg-emerald-500' : 'bg-gray-600'
                } ${activeTab === 'services' ? 'left-2' : 'left-[296px]'}`}
              />
              
              <div className="relative flex">
                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 w-72 whitespace-nowrap relative z-10 ${
                    activeTab === 'services'
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  私たちのサービス
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 w-72 whitespace-nowrap relative z-10 ${
                    activeTab === 'products'
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  主要実績
                </button>
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {activeTab === 'services' ? content.services.subtitle : (content?.products?.subtitle || t('products.subtitle'))}
          </p>
        </div>

        {/* Services Tab Content */}
        {activeTab === 'services' && (
          <div className="space-y-16">
            {/* Core Competencies */}
            <div>
              <div className="flex items-center justify-center mb-8">
                <div className={`w-3 h-8 rounded-full mr-4 ${
                  themeColor === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500'
                }`}></div>
                <h3 className="text-3xl font-bold text-gray-900">🚀 コアコンピタンス</h3>
              </div>
              <p className="text-center text-gray-600 mb-12">私たちは<strong>2つの主要分野</strong>に注力しています：</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {coreServices.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-2 group flex flex-col h-full"
                  >
                    <div className={`flex items-center justify-center w-16 h-16 rounded-lg mb-6 transition-colors duration-300 ${
                      themeColor === 'emerald' 
                        ? 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                        : 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                    }`}>
                      {service.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">{service.description}</p>
                    
                    {service.stats && (
                      <div className={`mb-4 text-center py-3 px-3 rounded-lg ${
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
                        <p className="text-xs text-gray-500 font-medium text-center">{service.expertise}</p>
                      </div>
                    )}
                    
                    <ul className="space-y-2 mb-6 flex-grow">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                            themeColor === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500'
                          }`}></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-auto">
                      <div className={`w-full h-1 rounded-full mb-4 ${
                        service.domain === 'finance' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                        'bg-gradient-to-r from-red-400 to-rose-500'
                      }`}></div>
                      
                      <button 
                        onClick={() => setSelectedService(service.domain)}
                        className={`w-full font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-white ${
                          themeColor === 'emerald' 
                            ? 'bg-emerald-600 hover:bg-emerald-700' 
                            : 'bg-gray-600 hover:bg-gray-700'
                        }`}
                      >
                        {t('services.learn_more')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Programs */}
            <div>
              <div className="flex items-center justify-center mb-8">
                <div className={`w-3 h-8 rounded-full mr-4 ${
                  themeColor === 'emerald' ? 'bg-purple-500' : 'bg-indigo-500'
                }`}></div>
                <h3 className="text-3xl font-bold text-gray-900">🔑 戦略プログラム</h3>
              </div>
              <p className="text-center text-gray-600 mb-12">企業の競争力向上を支援する<strong>2つの戦略プログラム</strong>：</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {strategicPrograms.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-2 group flex flex-col h-full"
                  >
                    <div className={`flex items-center justify-center w-16 h-16 rounded-lg mb-6 transition-colors duration-300 ${
                      service.domain === 'legacy'
                        ? 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
                        : 'bg-cyan-100 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white'
                    }`}>
                      {service.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">{service.description}</p>
                    
                    {service.stats && (
                      <div className={`mb-4 text-center py-3 px-3 rounded-lg ${
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
                        <p className="text-xs text-gray-500 font-medium text-center">{service.expertise}</p>
                      </div>
                    )}
                    
                    <ul className="space-y-2 mb-6 flex-grow">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                            service.domain === 'legacy' ? 'bg-purple-500' : 'bg-cyan-500'
                          }`}></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-auto">
                      <div className={`w-full h-1 rounded-full mb-4 ${
                        service.domain === 'legacy' ? 'bg-gradient-to-r from-purple-400 to-violet-500' :
                        'bg-gradient-to-r from-blue-400 to-cyan-500'
                      }`}></div>
                      
                      <button 
                        onClick={() => setSelectedService(service.domain)}
                        className={`w-full font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-white ${
                          service.domain === 'legacy'
                            ? 'bg-purple-600 hover:bg-purple-700'
                            : 'bg-cyan-600 hover:bg-cyan-700'
                        }`}
                      >
                        {t('services.learn_more')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
                  
                  <button 
                    onClick={() => setSelectedService(service.domain)}
                    className={`w-full font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-white ${
                      themeColor === 'emerald' 
                        ? 'bg-emerald-600 hover:bg-emerald-700' 
                        : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    {t('services.learn_more')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products Tab Content */}
        {activeTab === 'products' && (
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
                {/* Product Header */}
                <div className={`h-48 bg-gradient-to-br ${product.bgColor} flex items-center justify-center`}>
                  <div className="text-center">
                    <div className={`w-20 h-20 ${product.iconColor} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={product.icon} />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-700">{product.name}</h4>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6 flex-grow">
                    <h4 className="font-medium text-gray-900 mb-2">{content?.products?.main_achievements || t('products.main_achievements')}:</h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Common Call to Action */}
        <div className="mt-16 text-center">
          <div className={`rounded-2xl p-8 ${
            themeColor === 'emerald' 
              ? 'bg-gradient-to-r from-emerald-50 to-green-100' 
              : 'bg-gradient-to-r from-blue-50 to-indigo-100'
          }`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {content?.products?.custom?.title || t('products.custom.title')}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {content?.products?.custom?.desc || t('products.custom.desc')}
            </p>
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
              className={`text-white px-8 py-3 rounded-lg transition-colors ${
                themeColor === 'emerald' 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {t('products.custom.contact')}
            </button>
          </div>
        </div>
        
        {/* Services Modal */}
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
                {serviceImages[selectedService as keyof typeof serviceImages]?.map((imagePath: string, index: number) => (
                  <div key={index} className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
                    {/* Loading Spinner */}
                    {loadingImages[imagePath] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`w-8 h-8 border-3 border-gray-300 border-t-3 rounded-full animate-spin ${
                            themeColor === 'emerald' ? 'border-t-emerald-500' : 'border-t-blue-500'
                          }`}></div>
                          <span className="text-sm text-gray-500">Loading...</span>
                        </div>
                      </div>
                    )}
                    <Image
                      src={imagePath}
                      alt={`${selectedService} slide ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      onLoadingComplete={() => handleImageLoadComplete(imagePath)}
                      priority={index === 0}
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

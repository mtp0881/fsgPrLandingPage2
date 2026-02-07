'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';
import publicServiceData from '@/data/public_service.json';
import financeServiceData from '@/data/finance_service.json';
import salesforceData from '@/data/salesforce.json';
import orgData from '@/data/organization.json';
import publicExamplesData from '@/data/public_svc_examples.json';
import financeExamplesData from '@/data/finance_svc_examples.json';

export default function Services() {
  const { t, isJapanese } = useLanguage();
  const { departments, members, structure } = orgData;
  const sortedMembers = [...members].sort((a, b) => a.order - b.order);
  const examples = (publicExamplesData as any).examples || [];
  const financeExamples = (financeExamplesData as any).examples || [];
  const [selectedExample, setSelectedExample] = useState<any>(null);
  const [selectedFinanceExample, setSelectedFinanceExample] = useState<any>(null);

  // Disable body scroll when a modal is open
  useEffect(() => {
    if (selectedExample || selectedFinanceExample) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedExample, selectedFinanceExample]);

  // Scroll-based full-width animation
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSections((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const id = entry.target.getAttribute('data-section') || '';
            if (entry.isIntersecting) {
              next.add(id);
            } else {
              next.delete(id);
            }
          });
          return next;
        });
      },
      { threshold: 0.08 }
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const expandStyle = (id: string): React.CSSProperties => {
    const isVisible = visibleSections.has(id);
    return {
      marginLeft: isVisible ? 'calc(-50vw + 50%)' : '0',
      marginRight: isVisible ? 'calc(-50vw + 50%)' : '0',
      borderRadius: isVisible ? '0' : '',
      transition: 'margin 0.6s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('services.title')}</h2>
          <p className="text-lg text-gray-600">{t('services.subtitle')}</p>
        </div>

        {/* Core Services - Vertical Layout */}
        <div className="space-y-8 mb-16">

          {/* ===== PUBLIC SERVICE ===== */}
          <div
            ref={(el) => { sectionRefs.current['public'] = el; }}
            data-section="public"
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            style={expandStyle('public')}
          >
            {/* Header */}
            <div className="relative px-6 pt-6 pb-3 lg:px-8 lg:pt-8 border-b border-gray-100 overflow-hidden">
              <Image src="/images/public.jpg" alt="" fill className="object-cover opacity-40" style={{ objectPosition: 'center 85%' }} />
              <div className="relative z-10">
              <div className="flex items-center gap-4 mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {isJapanese ? publicServiceData.service.name_ja : publicServiceData.service.name_en}
                  </h3>
                </div>
                <div className="ml-auto flex gap-2 flex-wrap justify-end">
                  {/* Đã xóa các nội dung: 45+ システム, 11 産業, 15 拠点, 143 人材 */}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-800 mt-1 leading-relaxed">
                {isJapanese
                  ? '日本全国15地域に拠点を持ち、中央官庁から自治体まで公共部門向けの包括的なIT支援を提供'
                  : 'Comprehensive IT support for public sector organizations across 15 regions in Japan'}
              </p>
              </div>
            </div>

            {/* Two-column layout: Map left, Info right */}
            <div className="px-6 py-5 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left: Map (2/5) */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Image
                      src={publicServiceData.staffPresence.mapImage}
                      alt={isJapanese ? '全国拠点マップ' : 'Nationwide locations map'}
                      width={700}
                      height={660}
                      className="w-full h-auto object-contain"
                    />
                    {[
                      { id: 'hokkaido', top: '15%', left: '77%', side: 'right' },
                      { id: 'aomori', top: '33%', left: '66%', side: 'right' },
                      { id: 'yamagata', top: '46%', left: '59%', side: 'left' },
                      { id: 'kanto_area', top: '62%', left: '62%', side: 'right' },
                      { id: 'shizuoka', top: '70%', left: '50%', side: 'right' },
                      { id: 'nagoya', top: '70%', left: '43%', side: 'left' },
                      { id: 'osaka', top: '74%', left: '33%', side: 'left' },
                      { id: 'hiroshima', top: '70%', left: '23%', side: 'left' },
                      { id: 'fukuoka', top: '76%', left: '12%', side: 'left' },
                    ].map((pin) => {
                      const loc = publicServiceData.staffPresence.locations.find((l) => l.id === pin.id);
                      if (!loc) return null;
                      const isLarge = loc.staff >= 20;
                      return (
                        <div key={pin.id} className="absolute transform -translate-x-1/2 -translate-y-full group" style={{ top: pin.top, left: pin.left }}>
                          <svg className="w-4 h-5 text-red-500 drop-shadow-md mx-auto cursor-pointer hover:text-red-600 transition-colors" viewBox="0 0 24 36" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0zm0 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
                          </svg>
                          <div className={`absolute top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity ${pin.side === 'right' ? 'left-full ml-0.5' : 'right-full mr-0.5 flex-row-reverse'}`}>
                            <div className={`w-0 h-0 ${pin.side === 'right' ? 'border-r-[5px] border-y-[4px] border-y-transparent' : 'border-l-[5px] border-y-[4px] border-y-transparent'} ${isLarge ? (pin.side === 'right' ? 'border-r-emerald-600' : 'border-l-emerald-600') : (pin.side === 'right' ? 'border-r-emerald-500' : 'border-l-emerald-500')}`} />
                            <div className="flex items-center gap-1 bg-emerald-600 text-white rounded-md shadow-md px-2 py-0.5 whitespace-nowrap">
                              <span className="text-xs font-bold text-white">{isJapanese ? loc.name_ja : loc.name_en}</span>
                              <span className="text-xs font-bold text-white">{loc.staff}</span>
                              <span className="text-xs font-bold text-white">{isJapanese ? '名' : ''}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    <div className="px-3 py-1 bg-emerald-50 rounded-lg flex items-center gap-1.5">
                      <span className="text-xs">🗾</span>
                      <span className="text-xs font-bold text-emerald-600">{publicServiceData.staffPresence.totalStaffJapan}{isJapanese ? '名' : ' staff'}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Info panels (3/5) */}
                <div className="lg:col-span-3 space-y-5">
                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '特徴' : 'Features'}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: '🗾', title_ja: '全国15地域展開', title_en: '15 Locations' },
                        { icon: '🏗️', title_ja: '多様な業界実績', title_en: 'Diverse Industries' },
                        { icon: '🔒', title_ja: '高度セキュリティ', title_en: 'Security' },
                        { icon: '📈', title_ja: '柔軟スケーリング', title_en: 'Scaling' },
                      ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                          <span className="text-base">{feat.icon}</span>
                          <span className="font-medium text-gray-700 text-xs">{isJapanese ? feat.title_ja : feat.title_en}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Industries */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '対象業界' : 'Industries'}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {publicServiceData.industries.map((industry) => (
                        <span key={industry.id} className="inline-flex items-center px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-sm hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                          <span className="mr-1">{industry.icon}</span>
                          <span className="font-medium text-gray-700">{isJapanese ? industry.name_ja : industry.name_en}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '技術スタック' : 'Technologies'}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {publicServiceData.technologies.map((tech, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-medium text-emerald-700">
                          {isJapanese ? tech.technology_ja : tech.technology_en}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Competencies */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '競争力' : 'Competencies'}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {publicServiceData.competencies.map((comp, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700">
                          {isJapanese ? comp.competency_ja : comp.competency_en}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Development Examples */}
            <div className="px-6 py-4 lg:px-8 bg-emerald-50/50 border-t border-gray-100">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '開発事例' : 'Development Examples'}</h4>
              <div className="flex flex-wrap gap-2">
                {examples.map((ex: any) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedExample(ex)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm font-medium text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400 transition-colors cursor-pointer"
                  >
                    <span className="text-xs">📋</span>
                    {isJapanese ? ex.projectName?.ja : ex.projectName?.en}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ===== FINANCE SERVICE ===== */}
          <div
            ref={(el) => { sectionRefs.current['finance'] = el; }}
            data-section="finance"
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            style={expandStyle('finance')}
          >
            {/* Header */}
            <div className="relative px-6 pt-6 pb-3 lg:px-8 lg:pt-8 border-b border-gray-100 overflow-hidden">
              <Image src="/images/bank.jpg" alt="" fill className="object-cover opacity-40" style={{ objectPosition: 'center 30%' }} />
              <div className="relative z-10">
              <div className="flex items-center gap-4 mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {isJapanese ? 'ファイナンスサービス' : financeServiceData.service.name}
                  </h3>
                </div> 
              </div>
              <p className="text-sm font-medium text-gray-800 mt-1 leading-relaxed">
                {isJapanese ? '銀行・証券・決済など金融機関向けITソリューションを提供' : 'Comprehensive IT solutions for banks, securities firms, and payment systems'}
              </p>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5 lg:px-8">
              {/* 4 Sectors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {financeServiceData.sectors.map((sector) => (
                  <div key={sector.id} className="group border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{sector.icon}</span>
                      <h4 className="font-bold text-gray-900 text-sm">
                        {isJapanese ? sector.name : sector.name_en}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {sector.services.map((service) => (
                        <span key={service.id} className="inline-flex items-center px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-default" title={isJapanese ? service.description_ja : service.description_en}>
                          {isJapanese ? service.name : (service.name_en || service.name)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technologies & Strengths */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? 'コア技術' : 'Core Technologies'}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {financeServiceData.technologies.map((tech, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700" title={isJapanese ? tech.description_ja : tech.description_en}>
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Strengths */}
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '強み' : 'Strengths'}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: '🏆', title_ja: '金融専門性', title_en: 'Expertise', desc_ja: financeServiceData.capabilities.expertise_ja, desc_en: financeServiceData.capabilities.expertise_en },
                      { icon: '🔗', title_ja: '統合ソリューション', title_en: 'Integration', desc_ja: financeServiceData.capabilities.integration_ja, desc_en: financeServiceData.capabilities.integration_en },
                      { icon: '🛡️', title_ja: 'コンプライアンス', title_en: 'Compliance', desc_ja: financeServiceData.capabilities.compliance_ja, desc_en: financeServiceData.capabilities.compliance_en },
                      { icon: '⏰', title_ja: '24/7サポート', title_en: '24/7 Support', desc_ja: financeServiceData.capabilities.support_ja, desc_en: financeServiceData.capabilities.support_en },
                    ].map((str, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2" title={isJapanese ? str.desc_ja : str.desc_en}>
                        <span className="text-base">{str.icon}</span>
                        <span className="font-medium text-gray-700 text-xs">{isJapanese ? str.title_ja : str.title_en}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Development Examples */}
            <div className="px-6 py-4 lg:px-8 bg-blue-50/50 border-t border-gray-100">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '開発事例' : 'Development Examples'}</h4>
              <div className="flex flex-wrap gap-2">
                {financeExamples.map((ex: any) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedFinanceExample(ex)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-100 hover:border-blue-400 transition-colors cursor-pointer"
                  >
                    <span className="text-xs">📋</span>
                    {isJapanese ? ex.projectName?.ja : ex.projectName?.en}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== SALESFORCE PROGRAM ===== */}
        <div id="strategic-program" className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('services.strategic_title')}</h3>
          <div
            ref={(el) => { sectionRefs.current['salesforce'] = el; }}
            data-section="salesforce"
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            style={expandStyle('salesforce')}
          >
            {/* Header */}
            <div className="relative px-6 pt-6 pb-3 lg:px-8 lg:pt-8 border-b border-gray-100 overflow-hidden">
              <Image src="/images/sale.jpg" alt="" fill className="object-cover opacity-40" style={{ objectPosition: 'center 35%' }} />
              <div className="relative z-10">
              <div className="flex items-center gap-4 mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {isJapanese ? 'Salesforce' : 'Salesforce'}
                  </h3>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-800 mt-1 leading-relaxed">
                {isJapanese ? 'CRM/SFA・Marketing領域をワンストップで支援する戦略プログラム' : 'Key program providing one-stop CRM/SFA & Marketing support'}
              </p>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5 lg:px-8">
              {/* Cloud Solutions */}
              <div className="mb-5">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? 'クラウドソリューション' : 'Cloud Solutions'}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {salesforceData.clouds.map((cloud) => (
                    <div key={cloud.id} className="group border border-gray-200 rounded-xl p-3 hover:border-sky-300 hover:shadow-sm transition-all text-center">
                      <span className="text-xl block mb-1.5">{cloud.icon}</span>
                      <h5 className="font-bold text-gray-900 text-xs mb-1.5">{cloud.name}</h5>
                      <div className="flex flex-wrap justify-center gap-1">
                        {cloud.capabilities.slice(0, 3).map((cap, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-sky-50 border border-sky-200 rounded text-[10px] text-sky-700">
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                {/* 人的リソース */}
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '人的リソース' : 'Human Resources'}</h4>
                  <div className="space-y-2">
                    {[
                      { icon: '👨‍💻', label_ja: 'Salesforceエンジニア・コンサルタント', label_en: 'Salesforce Engineers & Consultants', value: '200+' },
                      { icon: '🔧', label_ja: 'MuleSoftエンジニア', label_en: 'MuleSoft Engineers', value: '100+' },
                    ].map((res, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
                        <span className="text-base">{res.icon}</span>
                        <span className="text-xs font-medium text-gray-700 flex-1">{isJapanese ? res.label_ja : res.label_en}</span>
                        <span className="text-sm font-bold text-sky-700">{res.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 導入実績 */}
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '導入実績' : 'Implementation Track Record'}</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'Data Cloud', count: 13, icon: '📈' },
                      { name: 'MC Engagement', count: 60, icon: '💌' },
                      { name: 'MC Personalization', count: 6, icon: '🎨' },
                    ].map((impl, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
                        <span className="text-base">{impl.icon}</span>
                        <span className="text-xs font-medium text-gray-700 flex-1">{impl.name}</span>
                        <span className="text-sm font-bold text-sky-700">{impl.count}{isJapanese ? '社' : ' companies'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* 対応業界 */}
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '対応業界' : 'Target Industries'}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: '🏭', name_ja: '製造業', name_en: 'Manufacturing' },
                      { icon: '💰', name_ja: '金融機関', name_en: 'Financial' },
                      { icon: '🏬', name_ja: '流通・小売業', name_en: 'Distribution/Retail' },
                      { icon: '🏥', name_ja: '医療機関', name_en: 'Healthcare' },
                    ].map((ind, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <span className="text-base">{ind.icon}</span>
                        <span className="font-medium text-gray-700 text-xs">{isJapanese ? ind.name_ja : ind.name_en}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 対応プラットフォーム */}
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? 'マルチクラウド対応' : 'Multi-Cloud Support'}</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {salesforceData.platforms.map((platform) => (
                      <div key={platform.id} className="relative h-10 bg-gray-50 rounded-lg p-1.5" title={platform.name}>
                        <Image src={platform.icon} alt={platform.name} fill className="object-contain p-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== ORGANIZATION ===== */}
        <div id="organization" className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('org.title')}</h3>
          <div
            ref={(el) => { sectionRefs.current['organization'] = el; }}
            data-section="organization"
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            style={expandStyle('organization')}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-3 lg:px-8 lg:pt-8 border-b border-gray-100">
              <div className="flex items-center gap-4 mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{isJapanese ? '組織体制' : 'Organization'}</h3>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-800 mt-1 leading-relaxed">
                {isJapanese ? 'FSG事業部の部門・メンバー紹介' : 'FSG departments & team members'}
              </p>
            </div>

            {/* Body */}
            <div className="px-6 py-5 lg:px-8 space-y-8">

              {/* Members */}
              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{t('org.members')}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                  {sortedMembers.map((member) => (
                    <div key={member.id} className="bg-gray-50 rounded-xl p-3 text-center hover:shadow-md transition-shadow border border-gray-100">
                      <div className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-2 bg-gray-200">
                        {member.imageUrl ? (
                          <Image src={member.imageUrl} alt={member.name} width={56} height={56} className="w-full h-full object-cover" />
                        ) : null}
                      </div>
                      <h4 className="font-semibold text-gray-900 text-xs">{member.name}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">{isJapanese ? member.title_ja : member.title}</p>
                      <div className="flex flex-wrap justify-center gap-1 mt-1.5">
                        {member.departments.slice(0, 2).map(deptId => (
                          <span key={deptId} className="text-[9px] px-1.5 py-0.5 bg-violet-50 text-violet-700 rounded-full">{deptId}</span>
                        ))}
                        {member.departments.length > 2 && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-full">+{member.departments.length - 2}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Departments Grid */}
              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{t('org.departments')}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {departments.map((dept) => (
                    <div key={dept.id} className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
                      <div className="h-1" style={{ backgroundColor: dept.color }} />
                      <div className="p-3 flex flex-col flex-1">
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span className="text-lg">{dept.icon}</span>
                          <div>
                            <h5 className="font-bold text-gray-900 text-xs">{dept.name}</h5>
                            <p className="text-[10px] text-gray-500">{isJapanese ? dept.japaneseFullName : dept.fullName}</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-600 mb-1.5">{isJapanese ? dept.description_ja : dept.description_en}</p>
                        <div className="flex gap-1.5 mt-auto pt-2 overflow-x-auto border-t border-gray-50">
                          {dept.members.map((memberId) => {
                            const member = members.find(m => m.id === memberId);
                            if (!member) return null;
                            return (
                              <div key={memberId} className="shrink-0 w-7 h-7 rounded-full overflow-hidden bg-gray-200 ring-1 ring-white" title={member.name}>
                                <Image src={member.imageUrl} alt={member.name} width={28} height={28} className="w-full h-full object-cover" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Example Detail Modal */}
      {selectedExample && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedExample(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5 rounded-t-2xl">
              <button onClick={() => setSelectedExample(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h3 className="text-xl font-bold text-white pr-10">{isJapanese ? selectedExample.projectName?.ja : selectedExample.projectName?.en}</h3>
              {selectedExample.projectMetrics && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedExample.projectMetrics.projectSize && (
                    <span className="px-3 py-1 bg-white/15 border border-white/25 rounded-full text-white text-xs">
                      {typeof selectedExample.projectMetrics.projectSize === 'object'
                        ? `${selectedExample.projectMetrics.projectSize.value} ${selectedExample.projectMetrics.projectSize.unit || ''}`
                        : selectedExample.projectMetrics.projectSize}
                    </span>
                  )}
                  {selectedExample.projectMetrics.duration && (
                    <span className="px-3 py-1 bg-white/15 border border-white/25 rounded-full text-white text-xs">
                      {typeof selectedExample.projectMetrics.duration === 'object'
                        ? (isJapanese ? selectedExample.projectMetrics.duration.ja : selectedExample.projectMetrics.duration.en)
                        : selectedExample.projectMetrics.duration}
                    </span>
                  )}
                  {selectedExample.projectMetrics.teamSize && (
                    <span className="px-3 py-1 bg-white/15 border border-white/25 rounded-full text-white text-xs">
                      {typeof selectedExample.projectMetrics.teamSize === 'object'
                        ? (isJapanese ? selectedExample.projectMetrics.teamSize.ja : selectedExample.projectMetrics.teamSize.en)
                        : `${selectedExample.projectMetrics.teamSize} ${isJapanese ? '名' : 'members'}`}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Overview */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '概要' : 'Overview'}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{isJapanese ? selectedExample.overview?.ja : selectedExample.overview?.en}</p>
              </div>

              {/* Customer */}
              {selectedExample.customer && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '顧客' : 'Customer'}</h4>
                  <div className="text-sm text-gray-700">
                    {selectedExample.customer.type && <div>{selectedExample.customer.type}</div>}
                    {selectedExample.customer.base && <div>{selectedExample.customer.base}</div>}
                    {selectedExample.customer.businessContext && <div>{isJapanese ? selectedExample.customer.businessContext_ja || selectedExample.customer.businessContext : selectedExample.customer.businessContext_en || selectedExample.customer.businessContext}</div>}
                  </div>
                </div>
              )}

              {/* Scope */}
              {selectedExample.scope && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '対象範囲' : 'Scope'}</h4>
                  {typeof (isJapanese ? selectedExample.scope.ja : selectedExample.scope.en) === 'string' ? (
                    <p className="text-sm text-gray-600">{isJapanese ? selectedExample.scope.ja : selectedExample.scope.en}</p>
                  ) : Array.isArray(isJapanese ? selectedExample.scope.ja : selectedExample.scope.en) ? (
                    <ul className="space-y-1">
                      {(isJapanese ? selectedExample.scope.ja : selectedExample.scope.en).map((item: string, i: number) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                          <svg className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              )}

              {/* Business Needs */}
              {selectedExample.businessNeeds && selectedExample.businessNeeds.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? 'ビジネスニーズ' : 'Business Needs'}</h4>
                  <div className="space-y-2">
                    {selectedExample.businessNeeds.map((need: any, i: number) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{isJapanese ? (need.ja?.title || need.ja) : (need.en?.title || need.en)}</p>
                        {(need.ja?.description || need.en?.description) && (
                          <p className="text-xs text-gray-500 mt-1">{isJapanese ? need.ja?.description : need.en?.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges */}
              {selectedExample.challenges && selectedExample.challenges.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '課題' : 'Challenges'}</h4>
                  <div className="space-y-2">
                    {selectedExample.challenges.map((item: any, i: number) => (
                      <div key={i} className="p-3 bg-amber-50 rounded-lg">
                        <p className="text-sm text-gray-700">{isJapanese ? (item.ja?.title || item.ja || item) : (item.en?.title || item.en || item)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* expectations For FPT */}
              {selectedExample.expectationsForFPT && selectedExample.expectationsForFPT.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? 'FPTへの期待' : 'Expectations for FPT'}</h4>
                  <div className="space-y-2">
                    {selectedExample.expectationsForFPT.map((item: any, i: number) => (
                      <div key={i} className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">{isJapanese ? (item.ja?.title || item.ja) : (item.en?.title || item.en)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Solutions */}
              {selectedExample.solutions && selectedExample.solutions.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? 'ソリューション' : 'Solutions'}</h4>
                  <div className="space-y-2">
                    {selectedExample.solutions.map((item: any, i: number) => (
                      <div key={i} className="flex items-start p-3 bg-blue-50 rounded-lg">
                        <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-sm text-gray-700">{isJapanese ? (item.ja?.title || item.ja || item) : (item.en?.title || item.en || item)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {selectedExample.achievements && selectedExample.achievements.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '成果' : 'Achievements'}</h4>
                  <div className="space-y-2">
                    {selectedExample.achievements.map((item: any, i: number) => (
                      <div key={i} className="p-3 bg-emerald-50 rounded-lg">
                        <p className="text-sm text-emerald-800">{isJapanese ? (item.ja?.title || item.ja) : (item.en?.title || item.en)}</p>
                        {(item.ja?.description || item.en?.description) && (
                          <p className="text-xs text-emerald-600 mt-1">{isJapanese ? item.ja?.description : item.en?.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technology Stack */}
              {selectedExample.technologyStack && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '技術スタック' : 'Technology Stack'}</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedExample.technologyStack).map(([category, techs]: [string, any]) => (
                      <div key={category} className="px-3 py-1.5 bg-gray-50 rounded-lg">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase">{category}</span>
                        <p className="text-xs text-gray-700">{typeof techs === 'string' ? techs : Array.isArray(techs) ? techs.join(', ') : JSON.stringify(techs)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Finance Example Detail Modal */}
      {selectedFinanceExample && (() => {
        const ex = selectedFinanceExample;
        const results = ex.results ? (isJapanese ? ex.results.ja : ex.results.en) : null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedFinanceExample(null)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-700 to-blue-800 px-6 py-5 rounded-t-2xl">
                <button onClick={() => setSelectedFinanceExample(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h3 className="text-xl font-bold text-white pr-10">{isJapanese ? ex.projectName?.ja : ex.projectName?.en}</h3>
                <p className="text-blue-200 text-sm mt-1">{isJapanese ? ex.customer : ex.customerEn}</p>
                {ex.metrics && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {Object.entries(ex.metrics).map(([key, value]: [string, any]) => (
                      <span key={key} className="px-3 py-1 bg-white/15 border border-white/25 rounded-full text-white text-xs">
                        {key.replace(/([A-Z])/g, ' $1').trim()}: {value}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Overview */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '概要' : 'Overview'}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{isJapanese ? ex.overview?.ja : ex.overview?.en}</p>
                </div>

                {/* Business Needs */}
                {ex.businessNeeds && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? 'ビジネスニーズ' : 'Business Needs'}</h4>
                    <div className="space-y-2">
                      {(isJapanese ? ex.businessNeeds.ja : ex.businessNeeds.en)?.map((need: string, i: number) => (
                        <div key={i} className="flex items-start p-3 bg-gray-50 rounded-lg">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold mr-2 mt-0.5">{i + 1}</span>
                          <span className="text-sm text-gray-700">{need}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenges */}
                {ex.challenges && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '課題' : 'Challenges'}</h4>
                    <div className="space-y-2">
                      {(isJapanese ? ex.challenges.ja : ex.challenges.en)?.map((challenge: string, i: number) => (
                        <div key={i} className="p-3 bg-amber-50 rounded-lg">
                          <p className="text-sm text-gray-700">{challenge}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Solutions */}
                {ex.solutions && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? 'ソリューション' : 'Solutions'}</h4>
                    <div className="space-y-2">
                      {(isJapanese ? ex.solutions.ja : ex.solutions.en)?.map((solution: string, i: number) => (
                        <div key={i} className="flex items-start p-3 bg-blue-50 rounded-lg">
                          <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          <span className="text-sm text-gray-700">{solution}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {results && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '成果' : 'Results'}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(results).filter(([k]) => k !== 'summary' && k !== 'summ').map(([key, value]: [string, any]) => (
                        <div key={key} className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                          <p className="text-[10px] text-blue-500 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="text-sm font-bold text-gray-900">{value}</p>
                        </div>
                      ))}
                    </div>
                    {(results.summary || results.summ) && (
                      <p className="mt-3 text-sm text-gray-600 italic">{results.summary || results.summ}</p>
                    )}
                  </div>
                )}

                {/* Technology Stack */}
                {ex.technologyStack && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '技術スタック' : 'Technology Stack'}</h4>
                    <div className="flex flex-wrap gap-2">
                      {(isJapanese ? ex.technologyStack.ja : ex.technologyStack.en)?.map((tech: string, i: number) => (
                        <span key={i} className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}

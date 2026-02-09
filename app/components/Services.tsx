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
        <div className="space-y-16 mb-16">

          {/* ===== PUBLIC SERVICE ===== */}
          <div
            ref={(el) => { sectionRefs.current['public'] = el; }}
            data-section="public"
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-3 lg:px-8 lg:pt-8 border-b border-gray-100 bg-gradient-to-r from-[#131A3F] to-[#1e2a5e]">
              <h3 className="text-xl font-bold text-white">
                {isJapanese ? publicServiceData.service.name_ja : publicServiceData.service.name_en}
              </h3>
              <p className="text-sm text-gray-300 mt-1">
                {isJapanese
                  ? '日本全国15地域に拠点を持ち、中央官庁から自治体まで公共部門向けの包括的なIT支援を提供'
                  : 'Comprehensive IT support for public sector organizations across 15 regions in Japan'}
              </p>
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
                      { id: 'hokkaido', top: '13%', left: '73%', side: 'right' },
                      { id: 'aomori', top: '33%', left: '63%', side: 'right' },
                      { id: 'yamagata', top: '47%', left: '59%', side: 'right' },
                      { id: 'kanto_area', top: '66%', left: '61%', side: 'right' },
                      { id: 'shizuoka', top: '72%', left: '51%', side: 'right' },
                      { id: 'nagoya', top: '70%', left: '47%', side: 'left' },
                      { id: 'osaka', top: '74%', left: '31%', side: 'left' },
                      { id: 'hiroshima', top: '71%', left: '19%', side: 'left' },
                      { id: 'fukuoka', top: '75%', left: '11%', side: 'left' },
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
                        { title_ja: '全国15地域展開', title_en: '15 Locations' },
                        { title_ja: '多様な業界実績', title_en: 'Diverse Industries' },
                        { title_ja: '高度セキュリティ', title_en: 'Security' },
                        { title_ja: '柔軟スケーリング', title_en: 'Scaling' },
                      ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border-2 border-gray-200">
                          <span className="font-medium text-gray-700 text-xs">{isJapanese ? feat.title_ja : feat.title_en}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Industries */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '対象業界' : 'Industries'}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {publicServiceData.industries.map((industry) => (
                        <div key={industry.id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border-2 border-gray-200">
                          <span className="font-medium text-gray-700 text-xs">{isJapanese ? industry.name_ja : industry.name_en}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Development Examples */}
            <div className="px-6 py-4 lg:px-8 bg-gray-50/50 border-t-2 border-gray-200">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '開発事例' : 'Development Examples'}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {examples.map((ex: any) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedExample(ex)}
                    className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors cursor-pointer text-center"
                  >
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
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-3 lg:px-8 lg:pt-8 border-b border-gray-100 bg-gradient-to-r from-[#131A3F] to-[#1e2a5e]">
              <h3 className="text-xl font-bold text-white">
                {isJapanese ? 'ファイナンスサービス' : financeServiceData.service.name}
              </h3>
              <p className="text-sm text-gray-300 mt-1">
                {isJapanese ? '銀行・証券・決済など金融機関向けITソリューションを提供' : 'Comprehensive IT solutions for banks, securities firms, and payment systems'}
              </p>
            </div>

            {/* Body */}
            <div className="px-6 py-5 lg:px-8">
              {/* 4 Sectors Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {financeServiceData.sectors.map((sector) => (
                  <div key={sector.id} className="border-2 border-gray-200 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <h4 className="font-bold text-gray-900 text-sm">
                        {isJapanese ? sector.name : sector.name_en}
                      </h4>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      {sector.services.map((service) => (
                        <span key={service.id} className="inline-flex items-center px-2 py-1 bg-gray-50 border-2 border-gray-200 rounded-lg text-xs text-gray-700" title={isJapanese ? service.description_ja : service.description_en}>
                          {isJapanese ? service.name : (service.name_en || service.name)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Examples */}
            <div className="px-6 py-4 lg:px-8 bg-gray-50/50 border-t-2 border-gray-200">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '開発事例' : 'Development Examples'}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {financeExamples.map((ex: any) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedFinanceExample(ex)}
                    className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors cursor-pointer text-center"
                  >
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
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-3 lg:px-8 lg:pt-8 border-b border-gray-100 bg-gradient-to-r from-[#131A3F] to-[#1e2a5e]">
              <h3 className="text-xl font-bold text-white">
                {isJapanese ? 'Salesforce' : 'Salesforce'}
              </h3>
              <p className="text-sm text-gray-300 mt-1">
                {isJapanese ? 'CRM/SFA・Marketing領域をワンストップで支援する戦略プログラム' : 'Key program providing one-stop CRM/SFA & Marketing support'}
              </p>
            </div>

            {/* Body */}
            <div className="px-6 py-5 lg:px-8">
              {/* Top area: 2x2 grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Row 1 Left: Cloud Solutions */}
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? 'クラウドソリューション' : 'Cloud Solutions'}</h4>
                  <div className="flex flex-wrap gap-2">
                    {salesforceData.clouds.map((cloud) => (
                      <div key={cloud.id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border-2 border-gray-200">
                        <span className="font-medium text-gray-700 text-xs">{cloud.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 1 Right: Human Resources */}
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '人的リソース' : 'Human Resources'}</h4>
                  <div className="space-y-2">
                    {salesforceData.humanResources.map((res) => (
                      <div key={res.id} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 border-2 border-gray-200">
                        <span className="text-xs font-medium text-gray-700 flex-1">{isJapanese ? res.label_ja : res.label_en}</span>
                        <span className="text-xs font-bold text-sky-700">{res.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2 Left: Industries */}
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? '対応業界' : 'Target Industries'}</h4>
                  <div className="flex flex-wrap gap-2">
                    {salesforceData.industries.map((ind) => (
                      <div key={ind.id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border-2 border-gray-200">
                        <span className="font-medium text-gray-700 text-xs">{isJapanese ? ind.name_ja : ind.name_en}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2 Right: Multi-Cloud */}
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? 'マルチクラウド対応' : 'Multi-Cloud Support'}</h4>
                  <div className="flex flex-wrap gap-3">
                    {salesforceData.platforms.map((platform) => (
                      <div key={platform.id} className="relative w-10 h-10 bg-gray-50 rounded-lg p-1.5 border-2 border-gray-200" title={platform.name}>
                        <Image src={platform.icon} alt={platform.name} fill className="object-contain p-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t-2 border-gray-200 mt-6 pt-6">
                {/* グループ企業内における連携体制 */}
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{isJapanese ? salesforceData.collaboration.title_ja : salesforceData.collaboration.title_en}</h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {isJapanese ? salesforceData.collaboration.description_ja : salesforceData.collaboration.description_en}
                </p>

                {/* FPT ↔ NAC with chain icon */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="bg-[#0032A2] rounded-lg px-4 py-2 text-center flex-1 max-w-[200px]">
                    <span className="text-sm font-bold text-white block">{salesforceData.collaboration.partners[0].name}</span>
                    <span className="text-xs text-blue-200">{isJapanese ? salesforceData.collaboration.partners[0].domain_ja : salesforceData.collaboration.partners[0].domain_en}</span>
                  </div>
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <div className="bg-[#0032A2] rounded-lg px-4 py-2 text-center flex-1 max-w-[200px]">
                    <span className="text-sm font-bold text-white block">{salesforceData.collaboration.partners[1].name}</span>
                    <span className="text-xs text-blue-200">{isJapanese ? salesforceData.collaboration.partners[1].domain_ja : salesforceData.collaboration.partners[1].domain_en}</span>
                  </div>
                </div>

                {/* NACが提供するソリューション */}
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-700">{isJapanese ? 'NACが提供するソリューション' : 'Solutions provided by NAC'}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                    {salesforceData.collaboration.trackRecord.map((impl, i) => (
                      <div key={impl.id} className="p-4 text-center">
                        <span className="text-xs font-bold text-gray-900 block mb-1">{impl.name}</span>
                        {i < salesforceData.collaboration.trackRecord.length - 1 && (
                          <span className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 text-gray-300">›</span>
                        )}
                        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-center gap-2">
                          <span className="text-xs leading-4 text-gray-500">{isJapanese ? '導入サポート実績' : 'Implementation Record'}</span>
                          <span className="text-sm leading-4 font-bold text-sky-700">{impl.count}<span className="text-xs text-gray-500 font-normal ml-0.5">{isJapanese ? '社' : ' companies'}</span></span>
                        </div>
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
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-3 lg:px-8 lg:pt-8 border-b border-gray-100 bg-gradient-to-r from-[#131A3F] to-[#1e2a5e]">
              <h3 className="text-xl font-bold text-white">{isJapanese ? 'パブリック・ファイナンスサービス開発事業本部' : 'Public Finance Service Group'}</h3>
              <p className="text-sm text-gray-300 mt-1">{isJapanese ? 'FSG事業部の組織体制' : 'FSG Organization Structure'}</p>
            </div>

            {/* Body */}
            <div className="px-6 py-6 lg:px-8 space-y-8">

              {/* ── Tier 1: BOD ── */}
              <div>
                <div className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:shadow-md transition-shadow">
                  <div className="h-1.5" style={{ backgroundColor: '#131A3F' }} />
                  <div className="p-4">
                    <div className="mb-4 text-center">
                      <h5 className="font-bold text-gray-900 text-sm">{t('org.bod')}</h5>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                      {structure.level1_executives.map((memberId) => {
                        const member = members.find(m => m.id === memberId);
                        if (!member) return null;
                        return (
                          <div key={memberId} className="text-center w-[120px]">
                            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-2 ring-2 ring-[#131A3F]/20 bg-gray-200">
                              <Image src={member.imageUrl} alt={member.name} width={80} height={80} className="w-full h-full object-cover" />
                            </div>
                            <h5 className="font-bold text-gray-900 text-sm">{member.name}</h5>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Tier 2: Cross-functional Teams ── */}
              <div>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                  {(() => {
                    const crossFunctionalDivision = structure.divisional_structure.find(d => d.division === 'Cross-functional Teams');
                    const crossDeptIds = crossFunctionalDivision ? crossFunctionalDivision.departments : [];
                    return crossDeptIds.map((deptId) => {
                      const dept = departments.find(d => d.id === deptId);
                      if (!dept) return null;
                      return (
                        <div key={dept.id} className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow border-2 border-gray-200">
                          <div className="h-1.5" style={{ backgroundColor: dept.color }} />
                          <div className="p-3 text-center">
                            <div className="mb-3">
                              <h5 className="font-bold text-gray-900 text-xs">{dept.name}</h5>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2">
                              {dept.members.map((mId) => {
                                const m = members.find(mem => mem.id === mId);
                                if (!m) return null;
                                return (
                                  <div key={mId} className="text-center">
                                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 ring-1 ring-white mx-auto">
                                      <Image src={m.imageUrl} alt={m.name} width={36} height={36} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[10px] text-gray-600 mt-0.5 block">{m.name}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* ── Tier 3: Business Departments ── */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(() => {
                    const businessDivision = structure.divisional_structure.find(d => d.division === 'Business Departments');
                    const bizDeptIds = businessDivision ? businessDivision.departments : [];
                    return bizDeptIds.map((deptId) => {
                      const dept = departments.find(d => d.id === deptId);
                      if (!dept) return null;
                      const subDeptIds = (dept as any).subDepartments as string[] | undefined;
                      return (
                        <div key={dept.id} className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow border-2 border-gray-200 flex flex-col">
                          <div className="h-1.5" style={{ backgroundColor: dept.color }} />
                          <div className="p-3 flex flex-col flex-1 text-center">
                            {/* Dept header */}
                            <div className="mb-2">
                              <h5 className="font-bold text-gray-900 text-xs">{dept.name}</h5>
                              <p className="text-[10px] text-gray-500">{isJapanese ? dept.japaneseFullName : dept.fullName}</p>
                            </div>

                            {/* Members */}
                            <div className="flex justify-center gap-2 mb-3">
                              {dept.members.map((mId) => {
                                const m = members.find(mem => mem.id === mId);
                                if (!m) return null;
                                return (
                                  <div key={mId} className="text-center">
                                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 ring-1 ring-white mx-auto">
                                      <Image src={m.imageUrl} alt={m.name} width={36} height={36} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[10px] text-gray-600 mt-0.5 block">{m.name}</span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Description */}
                            <div className="mb-2 text-left">
                              <p className="text-[10px] font-semibold text-gray-500 uppercase">{t('org.description')}</p>
                              <p className="text-xs text-gray-600 leading-relaxed">{isJapanese ? dept.description_ja : dept.description_en}</p>
                            </div>

                            {/* Sub-departments */}
                            {subDeptIds && subDeptIds.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-gray-100 text-left">
                                {subDeptIds.map((subId) => {
                                  const subDept = departments.find(d => d.id === subId);
                                  if (!subDept) return null;
                                  return (
                                    <div key={subId} className="bg-gray-50 rounded-lg overflow-hidden border-2 border-gray-200">
                                      <div className="h-1" style={{ backgroundColor: dept.color }} />
                                      <div className="p-2">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <span className="font-bold text-gray-900 text-[10px]">{subDept.name}</span>
                                        </div>
                                        {subDept.members && subDept.members.length > 0 && (
                                          <div className="flex gap-1.5">
                                            {subDept.members.map((mId) => {
                                              const m = members.find(mem => mem.id === mId);
                                              if (!m) return null;
                                              return (
                                                <div key={mId} className="text-center">
                                                  <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 ring-1 ring-white mx-auto">
                                                    <Image src={m.imageUrl} alt={m.name} width={28} height={28} className="w-full h-full object-cover" />
                                                  </div>
                                                  <span className="text-[10px] text-gray-600 mt-0.5 block">{m.name}</span>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        )}
                                      </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* ── Nearshore ── */}
              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="text-lg">📍</span> {t('org.nearshore')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {orgData.organization.nearshore.locations.map((loc, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-gray-50 rounded-lg text-xs text-gray-700 border border-gray-100">
                      {isJapanese ? orgData.organization.nearshore.locations_ja[idx] : loc}
                    </span>
                  ))}
                  <span className="px-3 py-1.5 bg-blue-50 rounded-lg text-xs text-blue-700 border border-blue-100 font-medium">
                    👤 ~{orgData.organization.nearshore.headcount} {isJapanese ? '名' : 'members'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Unified Example Detail Modal */}
      {(selectedExample || selectedFinanceExample) && (() => {
        const ex = selectedExample || selectedFinanceExample;
        const close = () => { setSelectedExample(null); setSelectedFinanceExample(null); };

        // Normalize metrics badges
        const metricBadges: string[] = [];
        if (ex.projectMetrics) {
          if (ex.projectMetrics.projectSize) {
            metricBadges.push(typeof ex.projectMetrics.projectSize === 'object'
              ? `${ex.projectMetrics.projectSize.value} ${ex.projectMetrics.projectSize.unit || ''}`
              : ex.projectMetrics.projectSize);
          }
          if (ex.projectMetrics.duration) {
            metricBadges.push(typeof ex.projectMetrics.duration === 'object'
              ? (isJapanese ? ex.projectMetrics.duration.ja : ex.projectMetrics.duration.en)
              : ex.projectMetrics.duration);
          }
          if (ex.projectMetrics.teamSize) {
            metricBadges.push(typeof ex.projectMetrics.teamSize === 'object'
              ? (isJapanese ? ex.projectMetrics.teamSize.ja : ex.projectMetrics.teamSize.en)
              : `${ex.projectMetrics.teamSize} ${isJapanese ? '名' : 'members'}`);
          }
        }
        if (ex.metrics) {
          Object.entries(ex.metrics).forEach(([key, value]: [string, any]) => {
            metricBadges.push(`${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}`);
          });
        }

        // Helper: normalize list data from both formats
        // Public format: [{ja: string | {title, description}, en: ...}]
        // Finance format: {ja: string[], en: string[]}
        const getList = (data: any): string[] => {
          if (!data) return [];
          if (data.ja && Array.isArray(data.ja)) return (isJapanese ? data.ja : data.en) || [];
          if (Array.isArray(data)) return data.map((item: any) => {
            const val = isJapanese ? (item.ja?.title || item.ja || item) : (item.en?.title || item.en || item);
            return typeof val === 'string' ? val : JSON.stringify(val);
          });
          return [];
        };
        const getDesc = (data: any, i: number): string | null => {
          if (!data || !Array.isArray(data)) return null;
          const item = data[i];
          if (!item) return null;
          return (item.ja?.description || item.en?.description) ? (isJapanese ? item.ja?.description : item.en?.description) : null;
        };

        const overview = isJapanese ? ex.overview?.ja : ex.overview?.en;
        const scope = ex.scope ? (isJapanese ? ex.scope.ja : ex.scope.en) : null;
        const businessNeeds = getList(ex.businessNeeds);
        const challenges = getList(ex.challenges);
        const expectations = getList(ex.expectationsForFPT);
        const solutions = getList(ex.solutions);
        const achievements = getList(ex.achievements);
        const results = ex.results ? (isJapanese ? ex.results.ja : ex.results.en) : null;
        const techStack = ex.technologyStack;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={close}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="sticky top-0 px-6 py-5 rounded-t-2xl bg-cover bg-center text-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/images/jirei_bg.jpeg')" }}>
                <button onClick={close} className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h3 className="text-xl font-bold text-white">{isJapanese ? ex.projectName?.ja : ex.projectName?.en}</h3>
                {metricBadges.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {metricBadges.map((badge, i) => (
                      <span key={i} className="px-3 py-1 bg-white/15 border border-white/25 rounded-full text-white text-xs">{badge}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Overview */}
                {overview && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '概要' : 'Overview'}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{overview}</p>
                  </div>
                )}

                {/* Scope */}
                {scope && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '対象範囲' : 'Scope'}</h4>
                    {typeof scope === 'string' ? (
                      <p className="text-sm text-gray-600">{scope}</p>
                    ) : Array.isArray(scope) ? (
                      <div className="space-y-2">
                        {scope.map((item: string, i: number) => (
                          <div key={i} className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{item}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Business Needs */}
                {businessNeeds.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? 'ビジネスニーズ' : 'Business Needs'}</h4>
                    <div className="space-y-2">
                      {businessNeeds.map((need: string, i: number) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{need}</p>
                          {getDesc(ex.businessNeeds, i) && (
                            <p className="text-xs text-gray-500 mt-1">{getDesc(ex.businessNeeds, i)}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenges */}
                {challenges.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '課題' : 'Challenges'}</h4>
                    <div className="space-y-2">
                      {challenges.map((item: string, i: number) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expectations for FPT */}
                {expectations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? 'FPTへの期待' : 'Expectations for FPT'}</h4>
                    <div className="space-y-2">
                      {expectations.map((item: string, i: number) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Solutions */}
                {solutions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? 'ソリューション' : 'Solutions'}</h4>
                    <div className="space-y-2">
                      {solutions.map((item: string, i: number) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {achievements.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '成果' : 'Achievements'}</h4>
                    <div className="space-y-2">
                      {achievements.map((item: string, i: number) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{item}</p>
                          {getDesc(ex.achievements, i) && (
                            <p className="text-xs text-gray-500 mt-1">{getDesc(ex.achievements, i)}</p>
                          )}
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
                        <div key={key} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
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
                {techStack && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{isJapanese ? '技術スタック' : 'Technology Stack'}</h4>
                    <div className="flex flex-wrap gap-2">
                      {techStack.ja && Array.isArray(techStack.ja)
                        ? (isJapanese ? techStack.ja : techStack.en)?.map((tech: string, i: number) => (
                            <span key={i} className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg">{tech}</span>
                          ))
                        : Object.entries(techStack).map(([category, techs]: [string, any]) => (
                            <div key={category} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                              <span className="text-xs font-semibold text-gray-400 uppercase">{category}</span>
                              <p className="text-xs text-gray-700">{typeof techs === 'string' ? techs : Array.isArray(techs) ? techs.join(', ') : JSON.stringify(techs)}</p>
                            </div>
                          ))
                      }
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

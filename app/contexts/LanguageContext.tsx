'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Language = 'ja' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  themeColor: string;
  isJapanese: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  ja: {
    'nav.services': 'サービス',
    'nav.network': 'グローバル',
    'nav.partners': 'パートナー',
    'nav.contact': 'お問い合わせ',
    'nav.organization': '組織図',
    'nav.public_examples': '公共サービス事例',
    'nav.finance_examples': 'ファイナンス事例',
    'hero.title': 'パブリック・ファイナンスサービス開発事業本部',
    'hero.subtitle': '金融・公共の専門領域とSalesforce戦略プログラムで日本企業のDXを支援',
    'hero.cta': '詳細を見る',
    'services.title': 'コアサービス',
    'services.subtitle': '専門分野別のサービス',
    'services.view_examples': '事例を見る',
    'services.strategic_title': '戦略プログラム',
    'services.org_title': '組織について',
    'services.org_desc': 'パブリック・ファイナンスサービス開発事業本部の組織体制を紹介',
    'services.org_cta': '組織図を見る',
    'partners.title': '信頼されるパートナー',
    'partners.subtitle': '多くの企業様にご信頼いただいています',
    'contact.title': 'お問い合わせ',
    'contact.subtitle': 'お気軽にご相談ください',
    'contact.cta': '問い合わせフォームへ',
    'footer.domains_title': 'ビジネスドメイン',
    'common.back_home': 'ホームへ戻る',
    'common.loading': '読み込み中...',
    'common.view_details': '詳細を見る',
    'org.title': '組織図',
    'org.subtitle': 'Financial Services Group 組織体制',
    'org.overview': '組織概要',
    'org.structure': '組織構造',
    'org.members': 'メンバー紹介',
    'org.departments': '部門紹介',
    'org.bod': 'BOD',
    'org.crossFunctional': 'クロスファンクショナルチーム',
    'org.businessDepts': 'ビジネス部門',
    'org.bodDetails': '取締役会メンバー詳細',
    'org.nearshore': 'ニアショア',
    'org.clients': 'クライアント',
    'org.description': '概要',
    'contact.company': '会社名',
    'contact.name': 'お名前',
    'contact.email': 'メールアドレス',
    'contact.phone': '電話番号',
    'contact.category': 'カテゴリ',
    'contact.message': 'お問い合わせ内容',
    'contact.submit': '送信する',
    'contact.select_category': '選択してください',
    'contact.cat_finance': 'ファイナンスサービス',
    'contact.cat_public': 'パブリックサービス',
    'contact.cat_salesforce': 'Salesforceプログラム',
    'contact.cat_partnership': 'パートナーシップ',
    'contact.cat_recruitment': '採用について',
    'contact.cat_other': 'その他',
    'contact.success': 'お問い合わせありがとうございます。担当者よりご連絡いたします。',
    'examples.public_title': '公共サービス開発事例',
    'examples.public_subtitle': '行政防災公共インフラのシステム開発実績',
    'examples.finance_title': 'ファイナンスサービス開発事例',
    'examples.finance_subtitle': '銀行決済証券システムの開発実績',
    'examples.view': '詳細を見る',
    'examples.related': '関連事例',
    'examples.back_to_list': '一覧へ戻る',
    'examples.business_needs': 'ビジネスニーズ',
    'examples.scope': '開発スコープ',
    'examples.tech_stack': '技術スタック',
    'examples.achievements': '成果',
    'examples.challenges': '課題',
    'examples.solutions': 'ソリューション',
    'examples.results': '結果実績',
    'examples.contact_cta': 'この事例について詳しく知りたい方は',
  },
  en: {
    'nav.services': 'Services',
    'nav.network': 'Global',
    'nav.partners': 'Partners',
    'nav.contact': 'Contact',
    'nav.organization': 'Organization',
    'nav.public_examples': 'Public Services',
    'nav.finance_examples': 'Finance Services',
    'hero.title': 'Public Finance Service Group',
    'hero.subtitle': "Supporting Japanese enterprises' DX through Finance & Public sector expertise and Salesforce strategic program",
    'hero.cta': 'Learn More',
    'services.title': 'Core Services',
    'services.subtitle': 'Services by Specialization',
    'services.view_examples': 'View Examples',
    'services.strategic_title': 'Strategic Programs',
    'services.org_title': 'Our Organization',
    'services.org_desc': 'Learn about Public Finance Service Group organization structure',
    'services.org_cta': 'View Organization Chart',
    'partners.title': 'Trusted Partners',
    'partners.subtitle': 'Trusted by many leading companies',
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with us',
    'contact.cta': 'Go to Contact Form',
    'footer.domains_title': 'Business Domains',
    'common.back_home': 'Back to Home',
    'common.loading': 'Loading...',
    'common.view_details': 'View Details',
    'org.title': 'Organization Chart',
    'org.subtitle': 'Financial Services Group Structure',
    'org.overview': 'Overview',
    'org.structure': 'Organization Structure',
    'org.members': 'Team Members',
    'org.departments': 'Departments',
    'org.bod': 'BOD',
    'org.crossFunctional': 'Cross-functional Teams',
    'org.businessDepts': 'Business Departments',
    'org.bodDetails': 'Board of Directors Member Details',
    'org.nearshore': 'Nearshore',
    'org.clients': 'Clients',
    'org.description': 'Description',
    'contact.company': 'Company Name',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.category': 'Category',
    'contact.message': 'Message',
    'contact.submit': 'Submit',
    'contact.select_category': 'Please select',
    'contact.cat_finance': 'Finance Services',
    'contact.cat_public': 'Public Services',
    'contact.cat_salesforce': 'Salesforce Program',
    'contact.cat_partnership': 'Partnership',
    'contact.cat_recruitment': 'Recruitment',
    'contact.cat_other': 'Other',
    'contact.success': 'Thank you for your inquiry. We will get back to you shortly.',
    'examples.public_title': 'Public Service Development Examples',
    'examples.public_subtitle': 'System development track record for government and public infrastructure',
    'examples.finance_title': 'Finance Service Development Examples',
    'examples.finance_subtitle': 'Banking, payment, and securities system development track record',
    'examples.view': 'View Details',
    'examples.related': 'Related Examples',
    'examples.back_to_list': 'Back to List',
    'examples.business_needs': 'Business Needs',
    'examples.scope': 'Development Scope',
    'examples.tech_stack': 'Technology Stack',
    'examples.achievements': 'Achievements',
    'examples.challenges': 'Challenges',
    'examples.solutions': 'Solutions',
    'examples.results': 'Results',
    'examples.contact_cta': 'Want to learn more about this project?',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ja');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['ja', 'en'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  const isJapanese = language === 'ja';
  const themeColor = isJapanese ? 'emerald' : 'blue';

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, themeColor, isJapanese }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

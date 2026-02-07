'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactForm {
  company: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

export default function ContactPage() {
  const { t, isJapanese } = useLanguage();
  const [form, setForm] = useState<ContactForm>({
    company: '', name: '', email: '', phone: '', category: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});

  const categories = [
    { value: 'finance', label: t('contact.cat_finance') },
    { value: 'public', label: t('contact.cat_public') },
    { value: 'salesforce', label: t('contact.cat_salesforce') },
    { value: 'partnership', label: t('contact.cat_partnership') },
    { value: 'recruitment', label: t('contact.cat_recruitment') },
    { value: 'other', label: t('contact.cat_other') },
  ];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactForm, string>> = {};
    if (!form.company.trim()) newErrors.company = isJapanese ? '必須項目です' : 'Required';
    if (!form.name.trim()) newErrors.name = isJapanese ? '必須項目です' : 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = isJapanese ? '有効なメールアドレスを入力してください' : 'Valid email required';
    if (!form.category) newErrors.category = isJapanese ? '選択してください' : 'Please select';
    if (!form.message.trim()) newErrors.message = isJapanese ? '必須項目です' : 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-blue-900 to-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t('contact.title')}</h1>
            <p className="text-xl text-blue-200">{t('contact.subtitle')}</p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {isSubmitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{isJapanese ? 'ありがとうございます' : 'Thank You'}</h2>
                <p className="text-gray-600 mb-8">{t('contact.success')}</p>
                <Link href="/" className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                  {t('common.back_home')}
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.company')} <span className="text-red-500">*</span></label>
                    <input type="text" value={form.company} onChange={e => handleChange('company', e.target.value)} maxLength={100}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${errors.company ? 'border-red-300' : 'border-gray-300'}`} />
                    {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.name')} <span className="text-red-500">*</span></label>
                    <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} maxLength={50}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${errors.name ? 'border-red-300' : 'border-gray-300'}`} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.email')} <span className="text-red-500">*</span></label>
                    <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${errors.email ? 'border-red-300' : 'border-gray-300'}`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.phone')}</label>
                    <input type="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.category')} <span className="text-red-500">*</span></label>
                  <select value={form.category} onChange={e => handleChange('category', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${errors.category ? 'border-red-300' : 'border-gray-300'}`}>
                    <option value="">{t('contact.select_category')}</option>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.message')} <span className="text-red-500">*</span></label>
                  <textarea value={form.message} onChange={e => handleChange('message', e.target.value)} rows={6} maxLength={2000}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none ${errors.message ? 'border-red-300' : 'border-gray-300'}`} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {isSubmitting ? (isJapanese ? '送信中...' : 'Submitting...') : t('contact.submit')}
                </button>
              </form>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

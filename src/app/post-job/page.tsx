'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useCompanyPostings } from '@/context/CompanyPostingsContext';
import type { Industry } from '@/lib/types';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const INDUSTRIES: { value: Industry; labelKey: string }[] = [
  { value: 'auto', labelKey: 'auto' },
  { value: 'construction', labelKey: 'construction' },
  { value: 'textiles', labelKey: 'textiles' },
  { value: 'transport', labelKey: 'transport' },
  { value: 'retail', labelKey: 'retail' },
  { value: 'healthcare', labelKey: 'healthcare' },
];

export default function PostJobPage() {
  const { t } = useLanguage();
  const { addPosting } = useCompanyPostings();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    companyName: '',
    industry: 'auto' as Industry,
    role: '',
    location: '',
    skillsRequired: '',
    trainingProvided: '',
    salaryRange: '',
    duration: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPosting({
      companyName: form.companyName,
      industry: form.industry,
      role: form.role,
      location: form.location,
      skillsRequired: form.skillsRequired.split(',').map((s) => s.trim()).filter(Boolean),
      trainingProvided: form.trainingProvided,
      salaryRange: form.salaryRange,
      duration: form.duration,
      description: form.description,
    });
    setSubmitted(true);
    setTimeout(() => router.push('/matches'), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-24 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-10 w-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            {t('postSuccess')}
          </h1>
          <p className="mb-6 text-gray-600">
            {t('postSuccessDesc')}
          </p>
          <Link href="/matches" className="text-emerald-600 font-medium hover:underline">
            {t('viewMatches')} →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold text-emerald-700">{t('appName')}</Link>
          <div className="flex items-center gap-4">
            <Link href="/matches" className="text-sm text-gray-600 hover:text-emerald-600">
              {t('viewMatches')}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          {t('postApprenticeship')}
        </h1>
        <p className="mb-8 text-gray-600">
          {t('postApprenticeshipDesc')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('companyName')}</label>
            <input
              type="text"
              required
              value={form.companyName}
              onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="e.g. ABC Industries Pvt Ltd"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('industry')}</label>
            <select
              value={form.industry}
              onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value as Industry }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind.value} value={ind.value}>{t(ind.labelKey)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('role')}</label>
            <input
              type="text"
              required
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="e.g. Auto Mechanic Apprentice"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('location')}</label>
            <input
              type="text"
              required
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="e.g. Pune, Maharashtra"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('skillsRequired')}</label>
            <input
              type="text"
              value={form.skillsRequired}
              onChange={(e) => setForm((f) => ({ ...f, skillsRequired: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="e.g. 10th pass, willingness to learn, basic mechanics"
            />
            <p className="mt-1 text-xs text-gray-500">{t('skillsRequiredHint')}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('trainingProvided')}</label>
            <textarea
              required
              rows={3}
              value={form.trainingProvided}
              onChange={(e) => setForm((f) => ({ ...f, trainingProvided: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="e.g. Engine repair, electrical systems, diagnostics"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('salaryRange')}</label>
              <input
                type="text"
                required
                value={form.salaryRange}
                onChange={(e) => setForm((f) => ({ ...f, salaryRange: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="e.g. ₹8,000 - ₹12,000/month"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('duration')}</label>
              <input
                type="text"
                required
                value={form.duration}
                onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="e.g. 12 months"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('description')}</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="Brief description of the apprenticeship and what you offer"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              {t('submitPosting')}
            </button>
            <Link
              href="/"
              className="flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              {t('cancel')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

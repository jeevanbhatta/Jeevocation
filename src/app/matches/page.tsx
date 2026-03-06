'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCompanyPostings } from '@/context/CompanyPostingsContext';
import { getCandidatesForPosting } from '@/lib/matchCandidates';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import WhatsAppChat from '@/components/WhatsAppChat';

const INDUSTRY_KEYS: Record<string, string> = {
  auto: 'auto',
  construction: 'construction',
  textiles: 'textiles',
  transport: 'transport',
  retail: 'retail',
  healthcare: 'healthcare',
};

export default function MatchesPage() {
  const { t } = useLanguage();
  const { myPostings } = useCompanyPostings();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold text-emerald-700">{t('appName')}</Link>
          <div className="flex items-center gap-4">
            <Link href="/post-job" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
              {t('postJob')}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          {t('matchesTitle')}
        </h1>
        <p className="mb-8 text-gray-600">
          {t('matchesSubtitle')}
        </p>

        {myPostings.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center">
            <p className="mb-4 text-lg text-gray-600">{t('noPostings')}</p>
            <Link
              href="/post-job"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              {t('postApprenticeship')}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {myPostings.map((posting) => {
              const candidates = getCandidatesForPosting(posting);
              return (
                <div
                  key={posting.id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{posting.role}</h2>
                      <p className="text-gray-600">{posting.companyName}</p>
                      <p className="text-sm text-gray-500">
                        {posting.location} • {t(INDUSTRY_KEYS[posting.industry] || posting.industry)}
                      </p>
                      <p className="mt-1 text-sm font-medium text-emerald-600">
                        {posting.salaryRange} • {posting.duration}
                      </p>
                    </div>
                  </div>

                  {candidates.length === 0 ? (
                    <p className="rounded-lg bg-amber-50 p-4 text-amber-800">{t('noMatches')}</p>
                  ) : (
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-gray-700">{t('matchedCandidates')}</h3>
                      {candidates.map((c) => (
                        <div
                          key={c.name + c.location}
                          className="flex items-center justify-between rounded-lg border border-gray-100 bg-slate-50 px-4 py-3"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{c.name}</p>
                            <p className="text-sm text-gray-600">{c.location}</p>
                            <p className="text-xs text-gray-500">{c.education}</p>
                            <p className="text-xs text-gray-500">{c.skills}</p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                              {c.matchScore}% match
                            </span>
                            <button className="mt-2 block w-full rounded-lg border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50">
                              {t('contactCandidate')}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <WhatsAppChat />
    </div>
  );
}

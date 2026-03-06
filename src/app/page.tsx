'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useChat } from '@/context/ChatContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import WhatsAppChat from '@/components/WhatsAppChat';

const INDUSTRIES = [
  { key: 'auto', shortage: '35M', color: 'from-amber-500 to-orange-600' },
  { key: 'construction', shortage: '33M', color: 'from-stone-600 to-stone-800' },
  { key: 'textiles', shortage: '26M', color: 'from-rose-500 to-pink-600' },
  { key: 'transport', shortage: '18M', color: 'from-blue-500 to-indigo-600' },
  { key: 'retail', shortage: '17M', color: 'from-emerald-500 to-teal-600' },
  { key: 'healthcare', shortage: '13M', color: 'from-cyan-500 to-blue-600' },
] as const;

const STEPS = [
  { key: 'step1', descKey: 'step1Desc' },
  { key: 'step2', descKey: 'step2Desc' },
  { key: 'step3', descKey: 'step3Desc' },
  { key: 'step4', descKey: 'step4Desc' },
];

export default function Home() {
  const { t } = useLanguage();
  const { openChat } = useChat();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-emerald-700">{t('appName')}</h1>
          <div className="flex items-center gap-4">
            <a href="#how-it-works" className="hidden text-sm text-gray-600 hover:text-emerald-600 sm:block">
              {t('howItWorks')}
            </a>
            <a href="#industries" className="hidden text-sm text-gray-600 hover:text-emerald-600 sm:block">
              {t('industries')}
            </a>
            <a href="#for-companies" className="hidden text-sm text-gray-600 hover:text-emerald-600 sm:block">
              {t('forCompanies')}
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-emerald-600">
            {t('tagline')}
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            {t('heroTitle')}
          </h1>
          <p className="mb-10 text-lg text-gray-600 sm:text-xl">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={openChat}
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-[#20BD5A] hover:shadow-xl"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t('chatWithUs')}
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-600 px-8 py-4 font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              {t('getStarted')}
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-gray-100 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            {t('howItWorks')}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div
                key={s.key}
                className="relative rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm transition hover:shadow-md"
              >
                <span className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{t(s.key)}</h3>
                <p className="text-sm text-gray-600">{t(s.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
            {t('industries')}
          </h2>
          <p className="mb-12 text-center text-gray-600">{t('industrySubtitle')}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.key}
                className={`group rounded-2xl bg-gradient-to-br ${ind.color} p-6 text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl`}
              >
                <h3 className="text-xl font-bold">{t(ind.key)}</h3>
                <p className="mt-2 text-sm opacity-90">{t(`${ind.key}Shortage`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Companies */}
      <section id="for-companies" className="border-t border-gray-100 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{t('forCompanies')}</h2>
          <p className="mb-8 text-lg text-gray-600">{t('forCompaniesDesc')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/post-job" className="rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700">
              {t('postJob')}
            </Link>
            <Link href="/matches" className="rounded-full border-2 border-emerald-600 px-8 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50">
              {t('viewMatches')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {t('appName')}. Connecting rural talent with industry opportunity.</p>
        </div>
      </footer>

      <WhatsAppChat />
    </div>
  );
}

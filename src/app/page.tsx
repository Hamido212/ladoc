import { auth } from '@/lib/auth';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import {
  Eye,
  Users,
  FileDown,
  GraduationCap,
  User,
  Mail,
  FileText,
  Presentation,
  BookOpen,
  Receipt,
  ClipboardList,
  ArrowRight,
  Sparkles,
  PenLine,
} from 'lucide-react';

const TEMPLATE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  User,
  Mail,
  FileText,
  Presentation,
  BookOpen,
  Receipt,
  ClipboardList,
};

export default async function LandingPage() {
  let isLoggedIn = false;
  try {
    const session = await auth();
    isLoggedIn = !!session?.user;
  } catch {
    // Stale JWT cookie or missing AUTH_SECRET — treat as unauthenticated
  }
  const t = await getTranslations('landing');
  const tt = await getTranslations('templates');

  const features = [
    { icon: Eye, title: t('feature1'), desc: t('feature1Desc') },
    { icon: Users, title: t('feature2'), desc: t('feature2Desc') },
    { icon: FileDown, title: t('feature3'), desc: t('feature3Desc') },
  ];

  const templateCards = [
    { id: 'thesis', icon: 'GraduationCap', color: 'from-blue-500 to-blue-600' },
    { id: 'cv', icon: 'User', color: 'from-emerald-500 to-emerald-600' },
    { id: 'letter', icon: 'Mail', color: 'from-amber-500 to-amber-600' },
    { id: 'report', icon: 'FileText', color: 'from-violet-500 to-violet-600' },
    { id: 'presentation', icon: 'Presentation', color: 'from-rose-500 to-rose-600' },
    { id: 'book', icon: 'BookOpen', color: 'from-cyan-500 to-cyan-600' },
    { id: 'invoice', icon: 'Receipt', color: 'from-orange-500 to-orange-600' },
    { id: 'minutes', icon: 'ClipboardList', color: 'from-teal-500 to-teal-600' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PenLine className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              ladoc
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                {t('ctaDashboard')}
                <ArrowRight className="w-4 h-4 inline ml-1" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 sm:px-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {t('ctaLogin')}
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                >
                  {t('cta')}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-violet-50 to-white" />
        <div className="absolute top-20 -left-20 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-40 -right-20 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse [animation-delay:2s]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Dokumente neu gedacht
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4 sm:mb-6">
            {t('hero')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-500 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            {t('heroSub')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-full text-base sm:text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5 text-center"
              >
                {t('ctaDashboard')}
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-full text-base sm:text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5 text-center"
                >
                  {t('cta')}
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-8 py-3.5 sm:py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full text-base sm:text-lg hover:border-gray-300 hover:bg-gray-50 transition-all text-center"
                >
                  {t('ctaLogin')}
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 sm:p-8 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-violet-50 transition-all duration-300"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mb-4 sm:mb-5">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t('templatesTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {templateCards.map((tmpl) => {
              const Icon = TEMPLATE_ICONS[tmpl.icon] || FileText;
              return (
                <div
                  key={tmpl.id}
                  className="group relative bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:border-transparent hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${tmpl.color} flex items-center justify-center mb-3 sm:mb-4`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-sm mb-0.5 sm:mb-1">
                    {tt(tmpl.id)}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {tt(`${tmpl.id}Desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-600 to-violet-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            {t('hero')}
          </h2>
          <Link
            href={isLoggedIn ? '/dashboard' : '/register'}
            className="inline-flex items-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-white text-blue-600 font-semibold rounded-full text-base sm:text-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            {isLoggedIn ? t('ctaDashboard') : t('cta')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 bg-gray-900 text-center px-4">
        <p className="text-gray-400 text-xs sm:text-sm">
          {t('footer')}
        </p>
      </footer>
    </div>
  );
}

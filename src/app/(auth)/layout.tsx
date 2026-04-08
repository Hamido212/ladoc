import { Sparkles, Eye, Users, FileDown } from 'lucide-react';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left branding panel - hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-16">
            <Sparkles className="w-7 h-7 text-white/90" />
            <span className="text-2xl font-bold text-white">ladoc</span>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Professionelle Dokumente,<br />einfach erstellt.
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed max-w-md">
            Der moderne Dokumenten-Editor mit Typst-Power, Live-Vorschau und Echtzeit-Zusammenarbeit.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-blue-100">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
            <span className="text-sm">Live Typst-Vorschau in Echtzeit</span>
          </div>
          <div className="flex items-center gap-3 text-blue-100">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-sm">Gemeinsam bearbeiten mit Echtzeit-Sync</span>
          </div>
          <div className="flex items-center gap-3 text-blue-100">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <FileDown className="w-4 h-4" />
            </div>
            <span className="text-sm">Export als SVG, LaTeX oder Typst</span>
          </div>
        </div>
      </div>

      {/* Right form area */}
      <div className="relative flex-1 flex items-center justify-center bg-gray-50 px-6">
        <div className="absolute right-4 top-4">
          <LanguageSwitcher variant="pill" />
        </div>
        {children}
      </div>
    </div>
  );
}

import { ShieldCheck, Download } from 'lucide-react';
import garantiaPDF from '@/imports/pdf/Política de Garantía.pdf';

export function TrustSection() {
  return (
    <section className="py-16 bg-[#262626] px-6 border-y border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#5C00FF]/20 border border-[#5C00FF]/30 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#5C00FF]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#E2DCD6] mb-1">Garantía de Calidad</h3>
              <p className="text-sm text-[#E2DCD6]/60">Productos certificados y probados</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-16 bg-white/10"></div>

          <a
            href={garantiaPDF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#5C00FF]/30 hover:bg-[#5C00FF]/10 transition-colors group"
          >
            <Download className="w-5 h-5 text-[#5C00FF] group-hover:translate-y-0.5 transition-transform" />
            <span className="text-[#E2DCD6] font-medium">Descargar Política de Garantía (PDF)</span>
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-black text-[#5C00FF] mb-2">12 meses</div>
            <div className="text-sm text-[#E2DCD6]/60">Garantía extendida</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#5C00FF] mb-2">30 días</div>
            <div className="text-sm text-[#E2DCD6]/60">Devolución gratuita</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#5C00FF] mb-2">98%</div>
            <div className="text-sm text-[#E2DCD6]/60">Satisfacción del cliente</div>
          </div>
        </div>
      </div>
    </section>
  );
}

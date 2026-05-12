import image_vista_general_minidisco_2 from '@/imports/vista_general_minidisco-1.png'
import { Layers, Shield, Sparkles, Disc, Nfc } from 'lucide-react';

export function ProductAnatomy() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#262626] to-[#2D0396] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-[#E2DCD6] mb-4">Anatomía del Llavero</h2>
          <p className="text-lg text-[#E2DCD6]/60">Ingeniería y diseño en cada detalle</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#5C00FF]/20 to-[#2D0396]/20 backdrop-blur-sm border border-[#5C00FF]/30 flex items-center justify-center p-12">
              <img
                src={image_vista_general_minidisco_2}
                alt="Anatomía del producto"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>

            <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#5C00FF] rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#2D0396] rounded-full blur-3xl opacity-50"></div>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4 items-start group">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#5C00FF]/20 border border-[#5C00FF]/30 flex items-center justify-center group-hover:bg-[#5C00FF] transition-colors">
                <Disc className="w-7 h-7 text-[#5C00FF] group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#E2DCD6] mb-2">Carcasa Transparente y Núcleo de Acrílico</h3>
                <p className="text-[#E2DCD6]/70">Protección exterior de plástico transparente de alta durabilidad que resguarda el mini disco interno, fabricado en acrílico sólido de 2mm para darle peso y resistencia premium.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#5C00FF]/20 border border-[#5C00FF]/30 flex items-center justify-center group-hover:bg-[#5C00FF] transition-colors">
                <Layers className="w-7 h-7 text-[#5C00FF] group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#E2DCD6] mb-2">Réplica Fiel de Alta Calidad</h3>
                <p className="text-[#E2DCD6]/70">Impresión de alta resolución que recrea a la perfección el diseño original de tu álbum favorito. Cada detalle del CD clásico se mantiene intacto con colores vibrantes.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#5C00FF]/20 border border-[#5C00FF]/30 flex items-center justify-center group-hover:bg-[#5C00FF] transition-colors">
                <Shield className="w-7 h-7 text-[#5C00FF] group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#E2DCD6] mb-2">Argolla de Acero Reforzado</h3>
                <p className="text-[#E2DCD6]/70">Anillo de metal de alta resistencia diseñado para el uso diario sin deformarse. Disponible para personalizar en elegantes acabados color plata o dorado.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#5C00FF]/20 border border-[#5C00FF]/30 flex items-center justify-center group-hover:bg-[#5C00FF] transition-colors">
                <Nfc className="w-7 h-7 text-[#5C00FF] group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#E2DCD6] mb-2">Tecnología NFC Integrada</h3>
                <p className="text-[#E2DCD6]/70">Conecta tu estilo con tu música. Acerca tu smartphone al llavero y el chip interno te redirigirá instantáneamente a escuchar el álbum en tu plataforma de streaming preferida.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import garantiaPDF from '@/imports/pdf/Política de Garantía.pdf';
import highlight from '@/imports/highlight-1.png';

export function Footer() {
  return (
    <footer className="bg-[#2D0396] text-[#E2DCD6] px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
  src={highlight}
  alt="KeyLink Logo"
  className="w-14 h-14"
/>
              <span className="text-2xl font-bold">KeyLink</span>
            </div>
            <p className="text-sm text-[#E2DCD6]/70 mb-4">
              Moda, creatividad y tech: crea, comparte, conecta.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#5C00FF] flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#5C00FF] flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#5C00FF] flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Tienda</h4>
            <ul className="space-y-2 text-sm text-[#E2DCD6]/70">
              <li><a href="#catalogo" className="hover:text-[#5C00FF] transition-colors">Catálogo</a></li>
              <li><a href="#" className="hover:text-[#5C00FF] transition-colors">Nuevos Lanzamientos</a></li>
              <li><a href="#" className="hover:text-[#5C00FF] transition-colors">Ofertas</a></li>
              <li><a href="#" className="hover:text-[#5C00FF] transition-colors">Personalización</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm text-[#E2DCD6]/70">
              <li><a href={garantiaPDF} target="_blank" rel="noopener noreferrer" className="hover:text-[#5C00FF] transition-colors">Política de Garantía</a></li>
              <li><a href="#" className="hover:text-[#5C00FF] transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-[#5C00FF] transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-[#5C00FF] transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          <div id="contacto">
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-[#E2DCD6]/70">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>contacto@keylink.mx</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+55 33 10 41 54 38</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Guadalajara, Jal. México</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-[#E2DCD6]/50">
          <p>&copy; 2026 KeyLink. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

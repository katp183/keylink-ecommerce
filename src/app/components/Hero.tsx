export function Hero() {
  return (
    <section className="min-h-screen bg-[#262626] flex items-center justify-center px-6 pt-32">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-black text-[#E2DCD6] mb-6 leading-tight">
          Moda, creatividad<br />y tech
        </h1>
        <p className="text-xl md:text-2xl text-[#E2DCD6]/80 mb-4 font-medium">
          Crea, comparte, conecta
        </p>
        <p className="text-lg text-[#E2DCD6]/60 max-w-2xl mx-auto mb-12">
          Los llaveros de mini discos que combinan estilo retro con tecnología moderna.
          Personaliza, colecciona y expresa tu creatividad.
        </p>
        <a
          href="#catalogo"
          className="inline-block bg-[#5C00FF] hover:bg-[#7020FF] text-white px-12 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-[#5C00FF]/30"
        >
          Explorar Colección
        </a>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-black text-[#5C00FF] mb-2">100%</div>
            <div className="text-sm text-[#E2DCD6]/60">Personalizables</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-[#5C00FF] mb-2">100+</div>
            <div className="text-sm text-[#E2DCD6]/60">Diseños únicos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-[#5C00FF] mb-2">72h</div>
            <div className="text-sm text-[#E2DCD6]/60">Envío express</div>
          </div>
        </div>
      </div>
    </section>
  );
}

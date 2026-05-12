import { useState } from 'react';
import { useCart } from '../context/CartContext';

export function Checkout({ onBack }: { onBack: () => void }) {
  // 1. Extraemos processCheckout del contexto
  const { cartItems, processCheckout } = useCart();
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  // 2. Agregamos un estado de carga para evitar que den doble clic al botón
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((total, item) => {
    const priceNumber = Number(item.price.replace(/[^0-9.-]+/g, ''));
    return total + priceNumber * item.quantity;
  }, 0);

  // 3. Volvemos la función asíncrona (async)
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!fullName || !address) {
      alert('Por favor completa tu nombre y dirección de envío.');
      return;
    }

    setIsProcessing(true); // Bloqueamos el botón mientras carga

    // 4. Llamamos a la API a través de nuestro contexto
    const result = await processCheckout();

    setIsProcessing(false); // Desbloqueamos el botón

    if (result.success) {
      alert(`¡Pedido de KeyLink confirmado exitosamente!\nID de rastreo: ${result.id}`);
      onBack(); // Regresamos al usuario al catálogo automáticamente
    } else {
      alert(`Ocurrió un problema: ${result.error}`);
    }
  };

  return (
    <main className="min-h-screen bg-[#121212] text-[#E2DCD6] pt-28 px-6 pb-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#8B8B8B]">Checkout</p>
            <h1 className="mt-3 text-4xl font-black text-white">Confirmar tu orden</h1>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-[#E2DCD6] transition hover:border-[#5C00FF] hover:text-white"
          >
            Volver al catálogo
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-[2rem] border border-white/10 bg-[#1B1B1B] p-8 shadow-xl shadow-[#5C00FF]/10">
            <h2 className="mb-6 text-2xl font-bold text-white">Detalles de envío</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-[#E2DCD6]/80">
                Nombre completo
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Tu nombre completo"
                  disabled={isProcessing}
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-[#121212] px-4 py-4 text-white outline-none transition focus:border-[#5C00FF] disabled:opacity-50"
                />
              </label>
              <label className="block text-sm font-medium text-[#E2DCD6]/80">
                Dirección de envío
                <textarea
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Calle, número, ciudad, estado"
                  rows={5}
                  disabled={isProcessing}
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-[#121212] px-4 py-4 text-white outline-none transition focus:border-[#5C00FF] disabled:opacity-50"
                />
              </label>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full rounded-full bg-[#5C00FF] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#2D0396] disabled:bg-[#5C00FF]/50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isProcessing ? 'Procesando en la nube...' : 'Confirmar pedido'}
              </button>
            </form>
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-[#1B1B1B] p-8 shadow-xl shadow-[#5C00FF]/10">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Resumen de la orden</h2>
              <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-[#E2DCD6]">
                {cartItems.length} artículo{cartItems.length === 1 ? '' : 's'}
              </span>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-sm text-[#E2DCD6]/70">Tu carrito está vacío. Agrega productos antes de continuar.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-white/10 bg-[#121212] p-4">
                    <div className="flex items-start gap-4">
                      <img src={item.image} alt={item.name} className="h-20 w-20 rounded-3xl object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-sm text-[#E2DCD6]/70">{item.quantity} x {item.price}</p>
                      </div>
                      <p className="text-right text-sm text-[#E2DCD6]/80">{item.price}</p>
                    </div>
                  </div>
                ))}

                <div className="rounded-3xl border border-white/10 bg-[#121212] p-5">
                  <div className="flex items-center justify-between text-sm text-[#E2DCD6]/70">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)} MXN</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-[#E2DCD6]/70">
                    <span>Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)} MXN</span>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { ProductAnatomy } from './components/ProductAnatomy';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
import { Checkout } from './components/Checkout';
import { CartProvider } from './context/CartContext';

export default function App() {
  const [route, setRoute] = useState<'home' | 'checkout'>(() =>
    window.location.pathname === '/checkout' ? 'checkout' : 'home',
  );

  useEffect(() => {
    window.history.replaceState(null, '', route === 'checkout' ? '/checkout' : '/');
  }, [route]);
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#262626]">
        <Navbar onCheckout={() => setRoute('checkout')} />
        {route === 'home' ? (
          <>
            <Hero />
            <Catalog />
            <ProductAnatomy />
            <TrustSection />
            <Footer />
          </>
        ) : (
          <Checkout onBack={() => setRoute('home')} />
        )}
      </div>
    </CartProvider>
  );
}
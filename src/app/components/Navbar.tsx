import { useState, useEffect } from 'react';
import { Menu, ShoppingCart, X, LogOut, User } from 'lucide-react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { AuthDialog } from './AuthDialog';
import { useCart } from '../context/CartContext';

export function Navbar({ onCheckout }: { onCheckout: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // 1. Agregamos clearCart aquí
  const { cartItems, totalItems, removeFromCart, clearCart } = useCart();

  const checkUser = async (newUsername?: string) => {
    // 1. ACTUALIZACIÓN OPTIMISTA (Cuando recién inicia sesión)
    if (newUsername) {
      // Extraemos solo lo que está antes del @ (Ej: de "kevin@mail.com" saca "kevin")
      const nombreCorto = newUsername.split('@')[0];
      setUser({ username: nombreCorto });
      setLoading(false);
      return;
    }

    // 2. VERIFICACIÓN AL CARGAR LA PÁGINA
    try {
      const currentUser = await getCurrentUser();
      
      // Intentamos obtener el correo desde los detalles de inicio de sesión de AWS, 
      // o desde nuestra memoria local como respaldo.
      const correoReal = currentUser.signInDetails?.loginId || localStorage.getItem('keylink_user') || 'Usuario';
      
      // Extraemos el nombre corto
      const nombreCorto = correoReal.split('@')[0];

      // Guardamos al usuario pero sobrescribiendo ese UUID feo con el nombre corto
      setUser({ ...currentUser, username: nombreCorto });
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
/*
  const checkUser = async (newUsername?: string) => {
    if (newUsername) {
      setUser({ username: newUsername });
      setLoading(false);
      return;
    }

    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
*/
  useEffect(() => {
    checkUser();

    const listener = Hub.listen('auth', (data) => {
      if (data.payload.event === 'signedIn') {
        checkUser();
      }
      if (data.payload.event === 'signedOut') {
        setUser(null);
      }
    });

    return () => listener();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem('keylink_user');
      
      // 2. Vaciamos el carrito y cerramos la ventana por seguridad
      clearCart();
      setCartOpen(false);
      
      setUser(null);
      setIsOpen(false);
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#262626] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          
            <img
             src="https://keylink-media-kevin-123.s3.amazonaws.com/highlight.png"
              alt="KeyLink Logo"
              className="w-14 h-14"
              />
          <span className="text-3xl font-bold text-[#E2DCD6]">KeyLink</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#catalogo" className="text-lg text-[#E2DCD6] hover:text-[#5C00FF] transition-colors">
            Catálogo
          </a>
          <a href="#contacto" className="text-lg text-[#E2DCD6] hover:text-[#5C00FF] transition-colors">
            Contacto
          </a>
          {user ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#5C00FF]/10 border border-[#5C00FF]/30">
                <User className="w-5 h-5 text-[#5C00FF]" />
                <span className="text-sm text-[#E2DCD6]">Hola, {user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-lg text-[#E2DCD6] hover:text-[#5C00FF] transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </>
          ) : (
            !loading && <AuthDialog onAuthSuccess={checkUser} />
          )}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <ShoppingCart className="w-7 h-7 text-[#E2DCD6]" />
            {totalItems > 0 ? (
              <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#5C00FF] px-1.5 text-xs font-semibold text-white">
                {totalItems}
              </span>
            ) : null}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
            aria-label="Abrir menú"
          >
            {isOpen ? <X className="w-6 h-6 text-[#E2DCD6]" /> : <Menu className="w-6 h-6 text-[#E2DCD6]" />}
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'flex' : 'hidden'} flex-col gap-4 px-6 pb-6 bg-[#262626] border-b border-white/10 items-center text-center`}>
        <a
          href="#catalogo"
          onClick={() => setIsOpen(false)}
          className="text-lg text-[#E2DCD6] hover:text-[#5C00FF] transition-colors"
        >
          Catálogo
        </a>
        <a
          href="#contacto"
          onClick={() => setIsOpen(false)}
          className="text-lg text-[#E2DCD6] hover:text-[#5C00FF] transition-colors"
        >
          Contacto
        </a>
        <div className="flex flex-col items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#5C00FF]/10 border border-[#5C00FF]/30">
                <User className="w-5 h-5 text-[#5C00FF]" />
                <span className="text-sm text-[#E2DCD6]">Hola, {user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-lg text-[#E2DCD6] hover:text-[#5C00FF] transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </>
          ) : (
            !loading && <AuthDialog onAuthSuccess={checkUser} />
          )}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center"
          >
            <ShoppingCart className="w-6 h-6 text-[#E2DCD6]" />
            {totalItems > 0 ? (
              <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#5C00FF] px-1.5 text-xs font-semibold text-white">
                {totalItems}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <div className={`fixed top-0 right-0 z-50 h-screen w-full max-w-sm transform bg-neutral-900 text-[#E2DCD6] shadow-2xl border-l border-white/10 transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold">Tu carrito</h3>
            <p className="text-sm text-[#E2DCD6]/70">{totalItems} artículo{totalItems === 1 ? '' : 's'}</p>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="rounded-full p-2 hover:bg-white/5 transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-6 h-6 text-[#E2DCD6]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cartItems.length === 0 ? (
            <div className="text-sm text-[#E2DCD6]/70">Tu carrito está vacío. Agrega productos para comenzar.</div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-[#1F1F1F] p-4">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <div className="font-semibold text-[#E2DCD6]">{item.name}</div>
                    <div className="text-sm text-[#E2DCD6]/70">{item.quantity} x {item.price}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-[#E2DCD6]/70 hover:text-[#5C00FF]"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-white/10 px-6 py-6">
          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={() => {
              if (cartItems.length === 0) return;
              onCheckout();
              setCartOpen(false);
            }}
            className="w-full rounded-full bg-[#5C00FF] px-5 py-4 text-base font-semibold text-white transition hover:bg-[#2D0396] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Proceder al Pago
          </button>
        </div>
      </div>
    </nav>
  );
}
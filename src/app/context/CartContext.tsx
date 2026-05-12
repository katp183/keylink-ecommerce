import { createContext, useContext, useState, type ReactNode } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type CartContextValue = {
  cartItems: CartItem[];
  totalItems: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  // 1. Agregamos la función de checkout al tipo
  processCheckout: () => Promise<{ success: boolean; id?: string; error?: string }>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // 2. Implementación de la lógica de conexión con AWS API Gateway
  const processCheckout = async () => {
    const usuarioEmail = localStorage.getItem('keylink_user');

    if (!usuarioEmail) {
      return { success: false, error: 'Debes iniciar sesión para realizar un pedido.' };
    }

    if (cartItems.length === 0) {
      return { success: false, error: 'El carrito está vacío.' };
    }

    const datosPedido = {
      correo: usuarioEmail,
      // Concatenamos los nombres de los productos para tu Lambda en Python
      modelo: cartItems.map(item => `${item.name} (x${item.quantity})`).join(', ')
    };

    try {
      const respuesta = await fetch('https://0tr6l9xcye.execute-api.us-east-1.amazonaws.com/api/compra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosPedido),
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        clearCart(); // Vaciamos el carrito tras el éxito
        return { success: true, id: resultado.id };
      } else {
        return { success: false, error: resultado.error || 'Error en el servidor' };
      }
    } catch (error) {
      console.error("Fallo de red en KeyLink API:", error);
      return { success: false, error: 'No se pudo conectar con el servidor de pedidos.' };
    }
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      totalItems, 
      addToCart, 
      removeFromCart, 
      clearCart,
      processCheckout // 3. Exponemos la función
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
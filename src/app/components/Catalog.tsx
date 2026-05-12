
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import imageBadBunny from '@/imports/CDbadbunny.png';
import imageBillie from '@/imports/CDbillie.jpg';
import imageKaty from '@/imports/CDkaty.jpg';
import imageRiot from '@/imports/CDriot.jpg';

const products = [
  {
    id: 1,
    name: 'Colección Bad Bunny',
    price: '$150 MXN',
    image: imageBadBunny,
    description: 'Minidisco del album DeBÍ TiRAR MáS FOToS'
  },
  {
    id: 2,
    name: 'Colección Billie',
    price: '$150 MXN',
    image: imageBillie,
    description: 'Minidisco del album Hit Me Hard and Soft'
  },
  {
    id: 3,
    name: 'Colección Katy',
    price: '$150 MXN',
    image: imageKaty,
    description: 'Minidisco del album Teenage dream'
  },
  {
    id: 4,
    name: 'Colección Paramore',
    price: '$150 MXN',
    image: imageRiot,
    description: 'Minidisco del album Riot!'
  }
];

export function Catalog() {
  const { addToCart } = useCart();

  const handleAddToCart = (producto: any) => {
    const usuarioActivo = localStorage.getItem('keylink_user');

    if (!usuarioActivo) {
      alert('Por favor inicia sesión para agregar productos al carrito.');
      return;
    }

    try {
      addToCart({
        id: String(producto.id),
        name: producto.name,
        price: producto.price,
        image: producto.image,
      });
      alert('¡Producto agregado al carrito con éxito!');
    } catch (error) {
      console.error('Error del carrito:', error);
      alert('Error interno del carrito. Revisa la consola.');
    }
  };

  return (
    <section id="catalogo" className="py-24 bg-[#262626] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-[#E2DCD6] mb-4">Colección Destacada</h2>
          <p className="text-lg text-[#E2DCD6]/60">Diseños únicos que reflejan tu estilo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-[#E2DCD6] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#5C00FF]/20 transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-square overflow-hidden bg-[#E2DCD6]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#262626] mb-1">{product.name}</h3>
                <p className="text-sm text-[#262626]/60 mb-4">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#5C00FF]">{product.price}</span>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#5C00FF] hover:bg-[#7020FF] text-white p-3 rounded-full transition-colors shadow-lg shadow-[#5C00FF]/30"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


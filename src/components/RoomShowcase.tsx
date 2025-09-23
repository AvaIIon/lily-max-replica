import { Button } from '@/components/ui/button';

const showcaseProducts = [
  {
    id: 1,
    name: "Mid-Century Modern Twin Over Twin L-Shaped Bunk Bed",
    price: "$749.49",
    originalPrice: "$909",
    image: "https://via.placeholder.com/200x150"
  },
  {
    id: 2, 
    name: "Mid-Century Modern Cubby Nightstand",
    price: "$129.49",
    originalPrice: "$189",
    image: "https://via.placeholder.com/200x150"
  },
  {
    id: 3,
    name: "Frankie Bookcase", 
    price: "$179.49",
    originalPrice: "$299",
    image: "https://via.placeholder.com/200x150"
  }
];

export const RoomShowcase = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Smile Worthy Spaces
        </h2>
        <p className="text-center text-gray-600 mb-12">Shop the room</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Room Image */}
          <div className="relative">
            <img 
              src="https://via.placeholder.com/600x400" 
              alt="Styled room with Max & Lily furniture"
              className="w-full rounded-lg shadow-lg"
            />
            {/* Product hotspots could be added here */}
          </div>
          
          {/* Products List */}
          <div className="space-y-6">
            {showcaseProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                  {product.id}
                </div>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                  <Button variant="cta" size="sm">
                    Shop Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
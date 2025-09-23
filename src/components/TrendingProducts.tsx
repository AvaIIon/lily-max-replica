import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { sampleProducts, getFormattedPrice } from '@/data/productData';

const tabs = [
  "Going Fast",
  "New Arrivals", 
  "Award Winning",
  "Bunk Beds"
];

// Use real product data from Bedsmart CSV
const products = sampleProducts.slice(0, 10).map(product => {
  const pricing = getFormattedPrice(product);
  return {
    name: product.title,
    price: pricing.current,
    originalPrice: pricing.original || '',
    image: product.imageUrls[0] || "https://via.placeholder.com/300x200",
    availability: product.availability
  };
});

export const TrendingProducts = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Trending Products for Every Room
        </h2>
        
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {tabs.map((tab, index) => (
              <Button
                key={index}
                variant={activeTab === index ? "default" : "ghost"}
                onClick={() => setActiveTab(index)}
                className={`rounded-md ${activeTab === index ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {products.map((product, index) => {
            const originalProduct = sampleProducts[index];
            return (
              <Link
                key={index}
                to={`/product/${originalProduct?.handle || 'unknown'}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/300x200?text=Product+Image";
                    }}
                  />
                  {product.availability === 'In stock' && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      In Stock
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-2 text-sm line-clamp-2">{product.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-primary">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};
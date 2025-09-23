import { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { sampleProducts, getFormattedPrice, getProductsByCategory } from '@/data/productData';

const categoryTabs = [
  { id: 'all', label: 'All Bunk Beds', filter: 'bunk' },
  { id: 'twin-over-twin', label: 'Twin Over Twin', filter: 'twin' },
  { id: 'twin-over-full', label: 'Twin Over Full', filter: 'full' },
  { id: 'loft', label: 'Loft Beds', filter: 'loft' },
  { id: 'storage', label: 'With Storage', filter: 'dresser' }
];

export const BunkBeds = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter products based on category
  const getFilteredProducts = () => {
    const currentTab = categoryTabs.find(tab => tab.id === activeCategory);
    if (!currentTab || currentTab.id === 'all') {
      return sampleProducts;
    }
    
    return sampleProducts.filter(product => 
      product.title.toLowerCase().includes(currentTab.filter.toLowerCase()) ||
      product.category.toLowerCase().includes(currentTab.filter.toLowerCase())
    );
  };

  const products = getFilteredProducts().map(product => {
    const pricing = getFormattedPrice(product);
    return {
      ...product,
      displayPrice: pricing.current,
      originalPrice: pricing.original,
      image: product.imageUrls[0] || "https://via.placeholder.com/300x200"
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-sm text-gray-500 mb-2">
            <span>Home</span> / <span className="text-primary font-medium">Bunk Beds</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bunk Beds Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover our premium collection of space-saving bunk beds perfect for siblings, sleepovers, and maximizing bedroom space.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeCategory === tab.id ? "default" : "outline"}
                onClick={() => setActiveCategory(tab.id)}
                className="rounded-full"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="text-gray-600">
              Showing {products.length} products
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/300x300?text=Product+Image";
                    }}
                  />
                  {product.availability === 'In stock' && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      In Stock
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary">{product.displayPrice}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    variant="cta" 
                    className="w-full"
                    size="sm"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🛏️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try selecting a different category or clear your filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
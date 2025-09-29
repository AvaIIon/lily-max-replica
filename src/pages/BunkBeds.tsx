import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { MiniPromoBanner } from '@/components/MiniPromoBanner';
import { loadBedsmartProducts, getFormattedPrice, generateHandle, getProductsByCategory, clearProductCache } from '@/data/productData';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Star, ChevronDown } from 'lucide-react';

export const BunkBeds = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Clear cache to force fresh load
        clearProductCache();
        const allProducts = await loadBedsmartProducts();
        const bunkBedProducts = getProductsByCategory(allProducts, 'Bunk Beds');
        console.log(`Found ${bunkBedProducts.length} bunk bed products out of ${allProducts.length} total products`);
        setProducts(bunkBedProducts);
        setDisplayedProducts(bunkBedProducts.slice(0, productsPerPage));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const loadMoreProducts = () => {
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * productsPerPage;
    setDisplayedProducts(products.slice(startIndex, endIndex));
    setCurrentPage(nextPage);
  };

  const hasMoreProducts = displayedProducts.length < products.length;

  return (
    <div className="min-h-screen bg-pastel-dream">
      <Header />
      
      {/* Hero Section */}
      <section className="relative gradient-rainbow py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-3xl animate-bounce-slow"></div>
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-10 max-w-3xl mx-auto border-4 border-white/30 shadow-2xl">
            <div className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 text-transparent bg-clip-text mb-6">
              <h1 className="text-6xl font-extrabold drop-shadow-2xl">
                🏢 Bunk Beds Collection
              </h1>
            </div>
            <p className="text-2xl text-white font-semibold max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Space-saving bunk beds perfect for siblings, sleepovers, and maximizing bedroom functionality. Double the fun, half the space! ✨
            </p>
          </div>
        </div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-36 h-36 bg-gradient-to-br from-pink-400 to-red-400 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-28 h-28 bg-gradient-to-br from-green-400 to-cyan-400 rounded-full blur-2xl"></div>
      </section>

      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-2 text-sm bg-gradient-to-r from-purple-200 to-pink-200 px-4 py-3 rounded-full inline-flex shadow-lg">
          <Link to="/" className="font-semibold text-purple-700 hover:text-purple-900 transition-colors">🏠 Home</Link>
          <span className="text-purple-400">→</span>
          <span className="font-bold text-pink-700">🏢 Bunk Beds</span>
        </div>
      </nav>

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-12 bg-gradient-to-r from-orange-200 via-yellow-200 to-pink-200 p-8 rounded-3xl shadow-xl border-4 border-white">
          <div>
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-transparent bg-clip-text mb-3">
              🎨 Bunk Beds Collection ✨
            </h2>
            <p className="text-purple-700 text-xl font-semibold">
              Safe and stylish bunk beds for shared spaces 🌈 • {products.length} colorful products 🎪
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedProducts.map((product, index) => {
                const shouldShowPromo = (index + 1) % 6 === 0;
                const promoType = ['sale', 'shipping', 'guarantee', 'category'][index % 4] as 'sale' | 'shipping' | 'guarantee' | 'category';
                const pricing = getFormattedPrice(product);
                const productHandle = product.handle || generateHandle(product.title);
                
                return (
                  <React.Fragment key={productHandle}>
                    {shouldShowPromo && (
                      <div className="col-span-1">
                        <MiniPromoBanner type={promoType} currentCategory="Bunk Beds" />
                      </div>
                    )}
                <Card className="group hover:shadow-2xl shadow-colorful transition-all duration-300 border-4 hover:border-8 border-gradient-rainbow bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-100 hover:from-yellow-100 hover:via-pink-100 hover:to-purple-200 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 via-pink-300/20 to-purple-300/20 z-10"></div>
                    <img
                      src={product.imageUrls[0] || "https://via.placeholder.com/300x200"}
                      alt={product.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300x200?text=Product+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 via-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
                    {product.salePrice && product.price && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white shadow-2xl animate-bounce z-30 text-lg px-4 py-2">
                        🔥 SALE 💥
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-5 bg-gradient-to-br from-white via-purple-50 to-pink-50">
                    <Link to={`/product/${productHandle}`}>
                      <h3 className="font-bold text-lg bg-gradient-to-r from-purple-700 to-pink-700 text-transparent bg-clip-text mb-3 hover:from-purple-900 hover:to-pink-900 transition-all line-clamp-2">
                        {product.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center mb-3 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-2 rounded-full">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-600 drop-shadow-md" />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-orange-700 ml-2">⭐ (0)</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-700 text-transparent bg-clip-text">{pricing.current}</span>
                        {pricing.original && (
                          <span className="text-sm font-semibold text-red-500 line-through">
                            {pricing.original}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-base"
                        size="sm"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        🛒 Add to Cart
                      </Button>
                    </div>
                    </CardContent>
                    </Card>
                  </React.Fragment>
                );
            })}
            </div>
            
            {/* Load More Button */}
            {hasMoreProducts && (
              <div className="text-center mt-12">
                <Button
                  onClick={loadMoreProducts}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white px-12 py-6 text-xl font-extrabold shadow-2xl shadow-pink-500/50 hover:shadow-purple-500/50 transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 border-4 border-white rounded-full"
                >
                  <ChevronDown className="w-6 h-6 mr-3 animate-bounce" />
                  🎉 Load More Products 🎪 ({products.length - displayedProducts.length} remaining)
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No bunk beds found in our current inventory.</p>
            <p className="text-muted-foreground mb-6">Check back soon for new arrivals!</p>
            <Button asChild>
              <Link to="/">Browse All Products</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};
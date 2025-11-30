import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { MiniPromoBanner } from '@/components/MiniPromoBanner';
import bunkBedsImage from '@/assets/bunk-beds.jpg';
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
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange to-teal py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
              🏢 Bunk Beds Collection
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Space-saving bunk beds perfect for siblings, sleepovers, and maximizing bedroom functionality. Double the fun, half the space!
            </p>
          </div>
        </div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-teal/30 rounded-full blur-xl"></div>
      </section>


      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground">Bunk Beds</span>
        </div>
      </nav>

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Bunk Beds Collection
            </h2>
            <p className="text-muted-foreground text-lg">
              Safe and stylish bunk beds for shared spaces • {products.length} total products
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
                <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200">
                  <div className="relative overflow-hidden bg-gray-50 flex items-center justify-center" style={{ height: '280px' }}>
                    {product.salePrice && product.price && (
                      <Badge className="absolute top-4 right-4 bg-black text-white text-xs px-2 py-1">
                        -{Math.round(((parseFloat(product.price.replace(/[$,]/g, '')) - parseFloat(product.salePrice.replace(/[$,]/g, ''))) / parseFloat(product.price.replace(/[$,]/g, ''))) * 100)}%
                      </Badge>
                    )}
                    <img
                      src={product.imageUrls?.[0]}
                      alt={product.title}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  
                  <CardContent className="p-6 text-center">
                    <Link to={`/product/${productHandle}`}>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-gray-900 mb-1 hover:text-gray-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
                      {product.category}
                    </p>
                    
                    <div className="mb-3">
                      {product.price && product.salePrice ? (
                        <>
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <span className="text-sm text-gray-500 line-through">
                              Starting at {product.price}
                            </span>
                            <span className="text-lg font-bold text-red-600">
                              {product.salePrice}
                            </span>
                          </div>
                          <p className="text-xs text-red-600">
                            You save {Math.round(((parseFloat(product.price.replace(/[$,]/g, '')) - parseFloat(product.salePrice.replace(/[$,]/g, ''))) / parseFloat(product.price.replace(/[$,]/g, ''))) * 100)}%
                          </p>
                        </>
                      ) : (
                        <div className="text-lg font-bold text-gray-900">
                          {product.salePrice || product.price || 'Contact for price'}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-green-600 mb-3 uppercase tracking-wide font-semibold">
                      IN STOCK
                    </p>
                    
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
                      size="sm"
                    >
                      ADD TO CART
                    </Button>
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
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  <ChevronDown className="w-5 h-5 mr-2" />
                  Load More Products ({products.length - displayedProducts.length} remaining)
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
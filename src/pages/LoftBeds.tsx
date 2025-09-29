import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { MiniPromoBanner } from '@/components/MiniPromoBanner';
import { loadBedsmartProducts, getFormattedPrice, generateHandle, getProductsByCategory } from '@/data/productData';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Star, ChevronDown } from 'lucide-react';

export const LoftBeds = () => {
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
        const allProducts = await loadBedsmartProducts();
        const loftBedProducts = getProductsByCategory(allProducts, 'Loft Beds');
        console.log(`Found ${loftBedProducts.length} loft bed products out of ${allProducts.length} total products`);
        setProducts(loftBedProducts);
        setDisplayedProducts(loftBedProducts.slice(0, productsPerPage));
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
      <section className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
              🏗️ Loft Beds Collection
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Maximize your space with our elevated loft beds. Perfect for creating study areas, play spaces, or extra storage underneath. Reach for the stars!
            </p>
          </div>
        </div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-300/25 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-pink-300/25 rounded-full blur-xl"></div>
      </section>

      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground">Loft Beds</span>
        </div>
      </nav>

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Loft Beds Collection
            </h2>
            <p className="text-muted-foreground text-lg">
              Space-saving solutions for modern living • {products.length} total products
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
              {displayedProducts.reduce((acc, product, index) => {
                const pricing = getFormattedPrice(product);
                const productHandle = product.handle || generateHandle(product.title);
                
                // Add promotional banner every 8 products at the start of a new row
                if (index % 8 === 0 && index > 0) {
                  const promoType = ['sale', 'shipping', 'guarantee', 'category'][Math.floor(index / 8) % 4] as 'sale' | 'shipping' | 'guarantee' | 'category';
                  acc.push(
                    <div key={`promo-${index}`} className="col-span-1">
                      <MiniPromoBanner type={promoType} currentCategory="Loft Beds" />
                    </div>
                  );
                }
                
                // Add product card
                acc.push(
                  <Card key={productHandle} className="group hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 border-2 hover:border-green-300 bg-gradient-to-br from-white to-green-50">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.imageUrls[0] || "https://via.placeholder.com/300x200"}
                        alt={product.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/300x200?text=Product+Image";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {product.salePrice && product.price && (
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg animate-pulse">
                          🔥 Sale
                        </Badge>
                      )}
                    </div>
                    
                    <CardContent className="p-4">
                      <Link to={`/product/${productHandle}`}>
                        <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors line-clamp-2">
                          {product.title}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">(0)</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-primary">{pricing.current}</span>
                          {pricing.original && (
                            <span className="text-sm text-muted-foreground line-through">
                              {pricing.original}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                          size="sm"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
                
                return acc;
              }, [] as React.ReactNode[])}
            </div>
            
            {/* Load More Button */}
            {hasMoreProducts && (
              <div className="text-center mt-12">
                <Button
                  onClick={loadMoreProducts}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  <ChevronDown className="w-5 h-5 mr-2" />
                  Load More Products ({products.length - displayedProducts.length} remaining)
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No loft beds found in our current inventory.</p>
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
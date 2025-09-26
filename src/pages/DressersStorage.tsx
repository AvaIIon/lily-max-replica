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

export const DressersStorage = () => {
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
        const dresserProducts = getProductsByCategory(allProducts, 'Dressers');
        console.log(`Found ${dresserProducts.length} dresser products out of ${allProducts.length} total products`);
        setProducts(dresserProducts);
        setDisplayedProducts(dresserProducts.slice(0, productsPerPage));
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
      <section className="relative bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
              🏠 Dressers & Storage Collection
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Organize your space with our stylish dressers, drawers, and storage solutions. Keep everything tidy and accessible with furniture that's as beautiful as it is functional!
            </p>
          </div>
        </div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300/30 rounded-full blur-xl"></div>
      </section>

      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground">Dressers & Storage</span>
        </div>
      </nav>

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Dressers & Storage Collection
            </h2>
            <p className="text-muted-foreground text-lg">
              Smart storage solutions for organized living • {products.length} total products
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
                        <MiniPromoBanner type={promoType} currentCategory="Dressers & Storage" />
                      </div>
                    )}
                    <Card className="group hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 border-2 hover:border-pink-300 bg-gradient-to-br from-white to-pink-50">
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
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
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
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  <ChevronDown className="w-5 h-5 mr-2" />
                  Load More Products ({products.length - displayedProducts.length} remaining)
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No dressers or storage items found in our current inventory.</p>
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
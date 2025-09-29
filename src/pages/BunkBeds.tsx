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
    <div className="min-h-screen bg-background">
      <Header />

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bunk Beds <span className="text-muted-foreground font-normal">({products.length} products)</span>
            </h1>
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
                <Card className="group hover:shadow-lg transition-all duration-300 bg-white">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.imageUrls[0] || "https://via.placeholder.com/300x200"}
                      alt={product.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300x200?text=Product+Image";
                      }}
                    />
                    {product.salePrice && product.price && (
                      <Badge className="absolute top-3 left-3 bg-green-500 text-white shadow-md">
                        🔥 Sale
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <Link to={`/product/${productHandle}`}>
                      <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors line-clamp-2 min-h-[48px]">
                        {product.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">(0)</span>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-primary">{pricing.current}</span>
                      {pricing.original && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          {pricing.original}
                        </span>
                      )}
                    </div>
                    
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-[#6366f1] hover:bg-[#5558e3] text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
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
                  className="bg-[#6366f1] hover:bg-[#5558e3] text-white px-8 py-3 rounded-full"
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